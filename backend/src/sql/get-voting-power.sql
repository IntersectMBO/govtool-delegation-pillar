SELECT COALESCE(drep_distr.amount, 0) AS amount
FROM drep_hash
LEFT JOIN drep_distr ON drep_hash.id = drep_distr.hash_id
WHERE drep_hash.raw = DECODE($1::text, 'hex')
ORDER BY epoch_no DESC
LIMIT 1;
