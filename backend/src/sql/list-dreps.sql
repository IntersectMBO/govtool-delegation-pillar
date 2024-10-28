WITH DRepDistr AS (
  SELECT
    *,
    ROW_NUMBER() OVER (PARTITION BY drep_hash.id ORDER BY drep_distr.epoch_no DESC) AS rn
  FROM
    drep_distr
    JOIN drep_hash ON drep_hash.id = drep_distr.hash_id
),
DRepActivity AS (
  SELECT
    drep_activity AS drep_activity,
    epoch_no AS epoch_no
  FROM
    epoch_param
  WHERE
    epoch_no IS NOT NULL
  ORDER BY
    epoch_no DESC
  LIMIT 1
),
DRepStatus AS (
  SELECT
    dh.id AS drep_hash_id,
    CASE
      WHEN dr_deposit.deposit < 0 THEN 'Retired'
      WHEN dr_deposit.deposit >= 0 AND (DRepActivity.epoch_no - MAX(COALESCE(block.epoch_no, block_first_register.epoch_no))) <= DRepActivity.drep_activity THEN 'Active'
      ELSE 'Inactive'
    END AS status
  FROM
    drep_hash dh
    LEFT JOIN (
      SELECT
        dr.id,
        dr.drep_hash_id,
        dr.deposit,
        ROW_NUMBER() OVER (PARTITION BY dr.drep_hash_id ORDER BY dr.tx_id DESC) AS rn
      FROM
        drep_registration dr
      WHERE
        dr.deposit IS NOT NULL
    ) AS dr_deposit ON dr_deposit.drep_hash_id = dh.id
    AND dr_deposit.rn = 1
    LEFT JOIN tx ON tx.id = dr_deposit.id
    LEFT JOIN block ON block.id = tx.block_id
    LEFT JOIN block AS block_first_register ON block_first_register.id = tx.block_id
    CROSS JOIN DRepActivity
  GROUP BY dh.id, dr_deposit.deposit, DRepActivity.epoch_no, DRepActivity.drep_activity
)
SELECT
  encode(dh.raw, 'hex') as drep_id,
  dh.view,
  dh.has_script,
  va.url,
  encode(va.data_hash, 'hex') as data_hash,
  dr_deposit.deposit,
  DRepDistr.amount as voting_power,
  DRepStatus.status,
  (DRepActivity.epoch_no - MAX(COALESCE(block.epoch_no, block_first_register.epoch_no))) <= DRepActivity.drep_activity AS active,
  encode(dr_voting_anchor.tx_hash, 'hex') AS tx_hash,
  newestRegister.time AS last_register_time,
  COALESCE(latestDeposit.deposit, 0) as latest_deposit,
  non_deregister_voting_anchor.url IS NOT NULL AS has_non_deregister_voting_anchor,
  fetch_error.message as fetch_error,
  off_chain_vote_drep_data.payment_address,
  off_chain_vote_drep_data.given_name,
  off_chain_vote_drep_data.objectives,
  off_chain_vote_drep_data.motivations,
  off_chain_vote_drep_data.qualifications,
  off_chain_vote_drep_data.image_url,
  off_chain_vote_drep_data.image_hash,
  CASE
    WHEN COALESCE(latestDeposit.deposit, 0) >= 0 THEN
      CASE
        WHEN va.url IS NOT NULL THEN 'DRep'
        ELSE 'DirectVoter'
      END
    ELSE
      CASE
        WHEN non_deregister_voting_anchor.url IS NOT NULL THEN 'DRep'
        ELSE 'DirectVoter'
      END
  END AS type
FROM
  drep_hash dh
  JOIN DRepStatus ON DRepStatus.drep_hash_id = dh.id
  JOIN (
    SELECT
      dr.id,
      dr.drep_hash_id,
      dr.deposit,
      ROW_NUMBER() OVER (PARTITION BY dr.drep_hash_id ORDER BY dr.tx_id DESC) AS rn
    FROM
      drep_registration dr
    WHERE
      dr.deposit IS NOT NULL
  ) AS dr_deposit ON dr_deposit.drep_hash_id = dh.id
  AND dr_deposit.rn = 1
  JOIN (
    SELECT
      dr.id,
      dr.drep_hash_id,
      dr.deposit,
      ROW_NUMBER() OVER (PARTITION BY dr.drep_hash_id ORDER BY dr.tx_id DESC) AS rn
    FROM
      drep_registration dr
  ) AS latestDeposit ON latestDeposit.drep_hash_id = dh.id
  AND latestDeposit.rn = 1
  LEFT JOIN (
    SELECT
      dr.id,
      dr.drep_hash_id,
      dr.voting_anchor_id,
      ROW_NUMBER() OVER (PARTITION BY dr.drep_hash_id ORDER BY dr.tx_id DESC) AS rn,
      tx.hash AS tx_hash
    FROM
      drep_registration dr
      JOIN tx ON tx.id = dr.tx_id
  ) AS dr_voting_anchor ON dr_voting_anchor.drep_hash_id = dh.id
  AND dr_voting_anchor.rn = 1
  LEFT JOIN (
    SELECT
      dr.id,
      dr.drep_hash_id,
      dr.voting_anchor_id,
      ROW_NUMBER() OVER (PARTITION BY dr.drep_hash_id ORDER BY dr.tx_id DESC) AS rn,
      tx.hash AS tx_hash
    FROM
      drep_registration dr
      JOIN tx ON tx.id = dr.tx_id
      WHERE dr.deposit IS NOT NULL
      AND dr.deposit >= 0
  ) AS dr_non_deregister_voting_anchor ON dr_non_deregister_voting_anchor.drep_hash_id = dh.id
  AND dr_non_deregister_voting_anchor.rn = 1
  LEFT JOIN (
    SELECT
      dr.id,
      dr.drep_hash_id,
      dr.voting_anchor_id,
      ROW_NUMBER() OVER (PARTITION BY dr.drep_hash_id ORDER BY dr.tx_id DESC) AS rn
    FROM
      drep_registration dr
  ) AS second_to_newest_drep_registration ON second_to_newest_drep_registration.drep_hash_id = dh.id
  AND second_to_newest_drep_registration.rn = 2
  LEFT JOIN DRepDistr ON DRepDistr.hash_id = dh.id
  AND DRepDistr.rn = 1
  LEFT JOIN voting_anchor va ON va.id = dr_voting_anchor.voting_anchor_id
  LEFT JOIN voting_anchor non_deregister_voting_anchor ON non_deregister_voting_anchor.id = dr_non_deregister_voting_anchor.voting_anchor_id
  LEFT JOIN (
    SELECT fetch_error AS message, voting_anchor_id
    FROM off_chain_vote_fetch_error
    WHERE fetch_time = (
      SELECT MAX(fetch_time)
      FROM off_chain_vote_fetch_error
    )
    GROUP BY fetch_error, voting_anchor_id
  ) AS fetch_error ON fetch_error.voting_anchor_id = va.id
  LEFT JOIN off_chain_vote_data ON off_chain_vote_data.voting_anchor_id = va.id
  LEFT JOIN off_chain_vote_drep_data ON off_chain_vote_drep_data.off_chain_vote_data_id = off_chain_vote_data.id 
  CROSS JOIN DRepActivity
  LEFT JOIN voting_procedure AS voting_procedure ON voting_procedure.drep_voter = dh.id
  LEFT JOIN tx AS tx ON tx.id = voting_procedure.tx_id
  LEFT JOIN block AS block ON block.id = tx.block_id
  LEFT JOIN (
    SELECT
      block.time,
      dr.drep_hash_id,
      ROW_NUMBER() OVER (PARTITION BY dr.drep_hash_id ORDER BY dr.tx_id DESC) AS rn
    FROM
      drep_registration dr
      JOIN tx ON tx.id = dr.tx_id
      JOIN block ON block.id = tx.block_id
    WHERE
      NOT (dr.deposit < 0)
  ) AS newestRegister ON newestRegister.drep_hash_id = dh.id
  AND newestRegister.rn = 1
  LEFT JOIN (
    SELECT
      dr.tx_id,
      dr.drep_hash_id,
      ROW_NUMBER() OVER (PARTITION BY dr.drep_hash_id ORDER BY dr.tx_id ASC) AS rn
    FROM
      drep_registration dr
  ) AS dr_first_register ON dr_first_register.drep_hash_id = dh.id
  AND dr_first_register.rn = 1
  LEFT JOIN tx AS tx_first_register ON tx_first_register.id = dr_first_register.tx_id
  LEFT JOIN block AS block_first_register ON block_first_register.id = tx_first_register.block_id
WHERE
  (array_length($3::text[], 1) IS NULL OR DRepStatus.status = ANY($3::text[]))
  AND (
    (
      COALESCE($1, '') = '' 
      OR dh.view ILIKE $1 
      OR off_chain_vote_drep_data.given_name ILIKE $1
    )
    AND (
      CASE 
        WHEN 
          (
            COALESCE(latestDeposit.deposit, 0) >= 0 AND va.url IS NULL 
            OR COALESCE(latestDeposit.deposit, 0) < 0 AND non_deregister_voting_anchor.url IS NULL
          ) 
        THEN dh.view ILIKE $1
        ELSE TRUE
      END
    )
  )
GROUP BY
  dh.raw,
  second_to_newest_drep_registration.voting_anchor_id,
  dh.view,
  dh.has_script,
  va.url,
  va.data_hash,
  dr_deposit.deposit,
  DRepDistr.amount,
  DRepStatus.status,
  DRepActivity.epoch_no,
  DRepActivity.drep_activity,
  dr_voting_anchor.tx_hash,
  newestRegister.time,
  latestDeposit.deposit,
  non_deregister_voting_anchor.url,
  fetch_error.message,
  off_chain_vote_drep_data.payment_address,
  off_chain_vote_drep_data.given_name,
  off_chain_vote_drep_data.objectives,
  off_chain_vote_drep_data.motivations,
  off_chain_vote_drep_data.qualifications,
  off_chain_vote_drep_data.image_url,
  off_chain_vote_drep_data.image_hash
ORDER BY
  CASE
    WHEN $2 = 'Random' THEN RANDOM()
    WHEN $2 = 'VotingPower' THEN DRepDistr.amount
    WHEN $2 = 'RegistrationDate' THEN EXTRACT(EPOCH FROM newestRegister.time)
    WHEN $2 = 'Status' THEN
      CASE
        WHEN DRepStatus.status = 'Retired' THEN 1
        WHEN DRepStatus.status = 'Active' THEN 2
        ELSE 3
      END
  END
