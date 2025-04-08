export const PATHS = {
  dRepDirectory: '/',
  dRepDetails: '/:dRepId',
  editDRepMetadata: '/edit_drep',
  registerAsDRep: '/register_drep',
  registerAsDirectVoter: '/register_direct_voter',
  retireAsDrep: '/retire_drep',
  retireAsDirectVoter: '/retire_direct_voter',
  dashboardDRepDirectoryDRep: '/connected/drep_directory/:dRepId',
  dRepDirectoryDRep: '/drep_directory/:dRepId',

  // tmp
  dashboard: '/home',
};

export const DOCS = {
  functions:
    'https://docs.gov.tools/about/what-is-cardano-govtool/govtool-functions',
  directVoting:
    'https://docs.gov.tools/about/what-is-cardano-govtool/govtool-functions/direct-voting',
  dReps: 'https://docs.gov.tools/using-govtool/govtool-functions/dreps',
  dRepErrors:
    'https://docs.gov.tools/using-govtool/govtool-functions/dreps/drep-error-conditions',
  storingMetadata:
    'https://docs.gov.tools/using-govtool/govtool-functions/storing-information-offline',
  voteAbstain:
    'https://docs.gov.tools/using-govtool/govtool-functions/delegating/abstain-from-every-vote',
  voteNoConfidence:
    'https://docs.gov.tools/using-govtool/govtool-functions/delegating/signal-no-confidence-on-every-vote',
};
