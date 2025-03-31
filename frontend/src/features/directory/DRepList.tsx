import { FC, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Box } from '@mui/material';

import { Button, CircularLoader, Typography } from '@/components';
import { DREP_DIRECTORY_FILTERS, DREP_DIRECTORY_SORTING } from '@/consts';
import { usePillarContext, useDataActionsBar } from '@/context';
import {
  useDelegateTodRep,
  useGetAdaHolderCurrentDelegationQuery,
  useGetDRepDetailsQuery,
  useGetDRepListInfiniteQuery,
} from '@/hooks';
import { isSameDRep } from '@/utils';
import { DRepListSort, DRepStatus } from '@/types';
import { DataActionsBar } from './list/DataActionsBar';
import { DRepCard } from './list/DRepCard';
import { EmptyStateDrepDirectory } from './EmptyStateDrepDirectory';

export const DRepList: FC = () => {
  const {
    dRepID: myDRepId,
    pendingTransaction,
    stakeKey,
    isEnabled: isConnected,
  } = usePillarContext();
  const { t } = useTranslation();

  const { debouncedSearchText, ...dataActionsBarProps } = useDataActionsBar();
  const { chosenFilters, chosenSorting, setChosenSorting } =
    dataActionsBarProps;

  useEffect(() => {
    if (!chosenSorting) setChosenSorting(DRepListSort.Random);
  }, [chosenSorting, setChosenSorting]);

  const { delegate, isDelegating } = useDelegateTodRep();

  const { currentDelegation } = useGetAdaHolderCurrentDelegationQuery(stakeKey);
  const inProgressDelegation = pendingTransaction.delegate?.resourceId;

  const { dRep: meAsDRep } = useGetDRepDetailsQuery(myDRepId, {
    enabled: !!inProgressDelegation || !!currentDelegation,
  });

  const {
    dRepData: dRepList,
    isPreviousData,
    dRepListHasNextPage,
    dRepListFetchNextPage,
  } = useGetDRepListInfiniteQuery(
    {
      searchPhrase: debouncedSearchText,
      sorting: chosenSorting as DRepListSort,
      status: chosenFilters as DRepStatus[],
    },
    {
      enabled: !!chosenSorting,
      keepPreviousData: true,
    }
  );

  if (!dRepList) {
    return <CircularLoader />;
  }

  const showMeAsDRep =
    debouncedSearchText === myDRepId || debouncedSearchText === '';
  const listedDRepsWithoutYourself = dRepList?.filter(
    (dRep) => !dRep.doNotList && !isSameDRep(dRep, myDRepId)
  );
  const dRepListToDisplay =
    meAsDRep && showMeAsDRep
      ? [meAsDRep, ...listedDRepsWithoutYourself]
      : listedDRepsWithoutYourself;

  return (
    <>
      <Typography fontSize={18} fontWeight={500} sx={{ mb: 3 }}>
        {t('dRepDirectory.listTitle')}
      </Typography>

      <DataActionsBar
        {...dataActionsBarProps}
        filterOptions={DREP_DIRECTORY_FILTERS}
        filtersTitle={t('dRepDirectory.filterTitle')}
        sortOptions={DREP_DIRECTORY_SORTING}
      />

      <Box
        component="ul"
        display="flex"
        flexDirection="column"
        gap={3}
        mt={4}
        p={0}
        sx={{
          opacity: isPreviousData ? 0.5 : 1,
          transition: 'opacity 0.2s',
          flex: 1,
        }}
      >
        {dRepList?.length === 0 && <EmptyStateDrepDirectory />}
        {dRepListToDisplay?.map((dRep) => (
          <Box key={dRep.drepId} component="li" sx={{ listStyle: 'none' }}>
            <DRepCard
              dRep={dRep}
              isConnected={isConnected}
              isDelegationLoading={
                isDelegating === dRep.view || isDelegating === dRep.drepId
              }
              isMe={isSameDRep(dRep, myDRepId)}
              isMyDrep={isSameDRep(dRep, currentDelegation?.dRepView)}
              onDelegate={() => delegate(dRep.drepId)}
            />
          </Box>
        ))}
      </Box>

      {dRepListHasNextPage && dRepList.length >= 10 && (
        <Box sx={{ justifyContent: 'center', display: 'flex' }}>
          <Button
            data-testid="show-more-button"
            variant="outlined"
            onClick={() => dRepListFetchNextPage()}
          >
            {t('showMore')}
          </Button>
        </Box>
      )}
    </>
  );
};
