import { Box } from '@mui/material';

import { usePillarContext } from '@/context';
import { useDelegateTodRep, useScreenDimension, useTranslation } from '@/hooks';
import { correctAdaFormat } from '@/utils';
import { DRepData, Reference } from '@/types';
import { Button, Card, ExternalModalButton, Typography } from '@/components';

import { DRepDetailsCardHeader } from './details/DRepDetailsCardHeader';
import { DRepDetailsInfoItem } from './details/DRepDetailsInfoItem';
import { CopyableText } from './details/CopyableText';
import { ReferencesGroup } from './details/ReferencesGroup';
import { DataMissingInfoBox } from './details/DataMissingInfoBox';
import { StatusPill } from './common/StatusPill';

type DRepDetailsProps = {
  dRepData: DRepData;
  isMe?: boolean;
  isMyDrep?: boolean;
  isMyDrepInProgress?: boolean;
};

export const DRepDetailsCard = ({
  dRepData,
  isMe,
  isMyDrep,
  isMyDrepInProgress,
}: DRepDetailsProps) => {
  const {
    pendingTransaction,
    isEnabled: isConnected,
    connectWallet,
  } = usePillarContext();
  const { t } = useTranslation();
  const { screenWidth } = useScreenDimension();
  const { delegate, isDelegating } = useDelegateTodRep();

  const {
    metadataStatus,
    motivations,
    objectives,
    paymentAddress,
    qualifications,
    references,
    status,
    url,
    view,
    votingPower,
  } = dRepData;

  const groupedReferences = references?.reduce<Record<string, Reference[]>>(
    (acc, reference) => {
      const type = reference['@type'];
      if (!acc[type]) {
        acc[type] = [];
      }
      acc[type].push(reference);
      return acc;
    },
    {}
  );

  const linkReferences = groupedReferences?.Link;
  const identityReferences = groupedReferences?.Identity;

  return (
    <Card
      {...((isMe || isMyDrep) && {
        variant: 'primary',
      })}
      {...(isMyDrepInProgress && {
        variant: 'warning',
        label: t('inProgress'),
      })}
      sx={{
        borderRadius: 5,
        pb: 4.25,
        pt: 2.25,
        display: 'flex',
        flexDirection: 'column',
        gap: 6,
      }}
    >
      {/* BASIC INFO */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        <DRepDetailsCardHeader
          dRepData={dRepData}
          isMe={isMe}
          isMyDrep={isMyDrep}
        />
        {/* ERROR MESSAGES */}
        {metadataStatus && (
          <DataMissingInfoBox
            isDataMissing={metadataStatus}
            isDrep
            sx={{ mb: 0 }}
          />
        )}
        {metadataStatus && !!url && (
          <ExternalModalButton
            label={t('govActions.seeExternalData')}
            sx={{ mb: 0, alignSelf: 'flex-start' }}
            url={url}
          />
        )}
        {/* ERROR MESSAGES END */}
        <DRepDetailsInfoItem label={t('drepId')} dataTestId="drep-id">
          <CopyableText value={view} dataTestId="copy-drep-id-button" />
        </DRepDetailsInfoItem>
        <DRepDetailsInfoItem label={t('status')} dataTestId="drep-status">
          <StatusPill status={status} />
        </DRepDetailsInfoItem>
        <DRepDetailsInfoItem
          label={t('votingPower')}
          dataTestId="drep-voting-power"
        >
          <Typography
            data-testid="voting-power"
            sx={{ display: 'flex', flexDirection: 'row', mt: 0.5 }}
          >
            {'₳ '}
            {correctAdaFormat(votingPower)}
          </Typography>
        </DRepDetailsInfoItem>
      </Box>
      {/* BASIC INFO END */}

      {/* BUTTONS */}
      {isConnected && status === 'Active' && !isMyDrep && (
        <Button
          data-testid="delegate-button"
          disabled={!!pendingTransaction?.delegate}
          isLoading={
            isDelegating === dRepData.view || isDelegating === dRepData.drepId
          }
          onClick={() => delegate(dRepData.drepId)}
          size="extraLarge"
          sx={{ width: '100%', maxWidth: screenWidth < 1024 ? '100%' : 286 }}
          variant="contained"
        >
          {t('delegate')}
        </Button>
      )}
      {!isConnected && status === 'Active' && (
        <Button
          data-testid="connect-to-delegate-button"
          onClick={connectWallet}
          size="extraLarge"
          sx={{ width: '100%', maxWidth: screenWidth < 1024 ? '100%' : 286 }}
          variant="outlined"
        >
          {t('connectToDelegate')}
        </Button>
      )}
      {/* BUTTONS END */}

      {/* CIP-119 DATA */}
      {!metadataStatus && (
        <>
          <DRepDetailsInfoItem
            label={t('forms.dRepData.objectives')}
            text={objectives}
            dataTestId="objectives"
          />
          <DRepDetailsInfoItem
            label={t('forms.dRepData.motivations')}
            text={motivations}
            dataTestId="motivations"
          />
          <DRepDetailsInfoItem
            label={t('forms.dRepData.qualifications')}
            text={qualifications}
            dataTestId="qualifications"
          />
          {linkReferences?.length > 0 && (
            <DRepDetailsInfoItem
              label={t('forms.dRepData.referenceTypes.link.title')}
              dataTestId="references-link"
            >
              <ReferencesGroup references={linkReferences} />
            </DRepDetailsInfoItem>
          )}
          {identityReferences?.length > 0 && (
            <DRepDetailsInfoItem
              label={t('forms.dRepData.referenceTypes.identity.title')}
              dataTestId="references-identity"
            >
              <ReferencesGroup references={identityReferences} />
            </DRepDetailsInfoItem>
          )}
          <DRepDetailsInfoItem
            label={t('forms.dRepData.paymentAddress')}
            dataTestId="payment-address"
          >
            {paymentAddress && (
              <CopyableText
                value={paymentAddress}
                dataTestId="copy-payment-address-button"
              />
            )}
          </DRepDetailsInfoItem>
        </>
      )}
      {/* CIP-119 DATA END */}
    </Card>
  );
};
