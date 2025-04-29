WITH DRepDistr AS (
  SELECT DISTINCT ON (drep_distr.hash_id)
    drep_distr.*
  FROM
    drep_distr
  ORDER BY drep_distr.hash_id, drep_distr.epoch_no DESC
),
DRepActivity AS (
  SELECT
    drep_activity,
    epoch_no
  FROM
    epoch_param
  WHERE
    epoch_no IS NOT NULL
  ORDER BY
    epoch_no DESC
  LIMIT 1
),
LatestVotingProcedure AS (
  SELECT DISTINCT ON (vp.drep_voter)
    vp.*
  FROM
    voting_procedure vp
  WHERE 
    vp.drep_voter IS NOT NULL
  ORDER BY vp.drep_voter, vp.tx_id DESC
),
LatestVoteEpoch AS (
  SELECT
    block.epoch_no,
    lvp.drep_voter as drep_id
  FROM
    LatestVotingProcedure lvp
    JOIN tx ON tx.id = lvp.tx_id
    JOIN block ON block.id = tx.block_id
),
LatestDRepRegistration AS (
  SELECT DISTINCT ON (dr.drep_hash_id)
      dr.id,
      dr.drep_hash_id,
      dr.deposit,
      dr.voting_anchor_id,
      encode(tx.hash, 'hex') AS tx_hash,
      block.epoch_no,
      block.time
  FROM
      drep_registration dr
  JOIN tx ON tx.id = dr.tx_id
  JOIN block ON block.id = tx.block_id
  ORDER BY
      dr.drep_hash_id, dr.tx_id DESC
),
LatestExistingVotingAnchor AS (
  SELECT
    subquery.drep_registration_id,
    subquery.drep_hash_id,
    subquery.voting_anchor_id,
    subquery.url,
    subquery.metadata_hash,
    subquery.ocvd_id
  FROM (
    SELECT
      dr.id AS drep_registration_id,
      dr.drep_hash_id,
      va.id AS voting_anchor_id,
      va.url,
      encode(va.data_hash, 'hex') AS metadata_hash,
      ocvd.id AS ocvd_id,
      ROW_NUMBER() OVER (PARTITION BY dr.drep_hash_id ORDER BY dr.tx_id DESC) AS rn
    FROM
      drep_registration dr
    JOIN voting_anchor va ON dr.voting_anchor_id = va.id
    JOIN off_chain_vote_data ocvd ON va.id = ocvd.voting_anchor_id
    WHERE
      ocvd.voting_anchor_id IS NOT NULL
  ) subquery
  WHERE
    subquery.rn = 1
),
DRepActive AS (
	SELECT
		dh.id,
		(DRepActivity.epoch_no - GREATEST(lve.epoch_no, ldr.epoch_no)) <= DRepActivity.drep_activity AS active
	FROM
		drep_hash dh
	CROSS JOIN DRepActivity
	LEFT JOIN LatestDRepRegistration ldr ON ldr.drep_hash_id = dh.id AND COALESCE(ldr.deposit, 0) >= 0
	LEFT JOIN LatestVoteEpoch lve ON lve.drep_id = dh.id	
),
DRepStatus AS (
	SELECT
		dh.id,
		CASE
			WHEN ldr.deposit < 0 THEN 'Retired'
			WHEN DRepActive.active THEN 'Active'
			ELSE 'Inactive'
		END AS status
	FROM drep_hash dh
	LEFT JOIN LatestDRepRegistration ldr ON ldr.drep_hash_id = dh.id
	LEFT JOIN DRepActive ON DRepActive.id = dh.id
),
DRepType AS (
	SELECT
		dh.id,
		CASE
			WHEN leva.url IS NOT NULL THEN 'DRep'
			ELSE 'DirectVoter'
		END AS type
	FROM
		drep_hash dh
	LEFT JOIN LatestExistingVotingAnchor leva ON leva.drep_hash_id = dh.id
),
FetchError AS (
	SELECT DISTINCT ON (voting_anchor_id)
		voting_anchor_id,
		fetch_error
	FROM off_chain_vote_fetch_error
	ORDER BY voting_anchor_id, id DESC
)
SELECT 
	ENCODE(dh.raw, 'hex') drep_id,
	dh.view,
	leva.url metadata_url,
	leva.metadata_hash,
	COALESCE(ldr.deposit, 0) deposit,
	COALESCE(dd.amount, 0) voting_power,
	ds.status,
	dt.type,
	ldr.tx_hash latest_tx_hash,
	ldr.time latest_registration_date,
	fe.fetch_error metadata_error,
	ocvdd.payment_address,
	ocvdd.given_name,
	ocvdd.objectives,
	ocvdd.motivations,
	ocvdd.qualifications,
	ocvdd.image_url,
	ocvdd.image_hash
FROM
	drep_hash dh
	JOIN LatestDRepRegistration ldr ON ldr.drep_hash_id = dh.id
	LEFT JOIN LatestExistingVotingAnchor leva ON leva.drep_hash_id = dh.id
	LEFT JOIN DRepDistr dd ON dd.hash_id = dh.id
	LEFT JOIN DRepStatus ds ON ds.id = dh.id
	LEFT JOIN DRepType dt ON dt.id = dh.id
	LEFT JOIN FetchError fe ON fe.voting_anchor_id = leva.voting_anchor_id
	LEFT JOIN off_chain_vote_drep_data ocvdd ON ocvdd.off_chain_vote_data_id = leva.ocvd_id
WHERE
  (array_length($3::text[], 1) IS NULL OR ds.status = ANY($3::text[]))
  AND (
    (
      COALESCE($1, '') = '' 
      OR dh.view ILIKE '%' || $1 || '%'
      OR ocvdd.given_name ILIKE '%' || $1 || '%'
      OR ocvdd.payment_address ILIKE '%' || $1 || '%'
      OR ocvdd.objectives ILIKE '%' || $1 || '%'
      OR ocvdd.motivations ILIKE '%' || $1 || '%'
      OR ocvdd.qualifications ILIKE '%' || $1 || '%'
    )
    AND (
      CASE 
        WHEN dt.type = 'DirectVoter' 
        THEN dh.view ILIKE '%' || $1 || '%'
        ELSE TRUE
      END
    )
)
GROUP BY
	dh.raw,
	dh.view,
	leva.url,
	leva.metadata_hash,
	ldr.deposit,
	dd.amount,
	ds.status,
	dt.type,
	ldr.tx_hash,
	ldr.time,
	fe.fetch_error,
	ocvdd.payment_address,
	ocvdd.given_name,
	ocvdd.objectives,
	ocvdd.motivations,
	ocvdd.qualifications,
	ocvdd.image_url,
	ocvdd.image_hash
ORDER BY
	CASE WHEN $2 = 'VotingPower' THEN COALESCE(dd.amount, 0) END DESC NULLS LAST,
	CASE WHEN $2 = 'RegistrationDate' THEN ldr.time END DESC NULLS LAST,
	CASE WHEN $2 = 'Status' THEN
		CASE
			WHEN ds.status = 'Active' THEN 1
			WHEN ds.status = 'Retired' THEN 2
			ELSE 3
		END
	END ASC NULLS LAST,
	CASE WHEN $2 NOT IN ('VotingPower', 'RegistrationDate', 'Status') OR $2 IS NULL THEN RANDOM() END