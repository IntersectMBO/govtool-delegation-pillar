import { Box, Link } from '@mui/material';
import { useEffect, useState } from 'react';

import { usePillarContext } from '@/context';
import { useDelegateTodRep, useScreenDimension, useTranslation } from '@/hooks';
import { DRepData, MetadataValidationStatus } from '@/types';
import { Button, Card, ExternalModalButton, Typography } from '@/components';

import { DRepDetailsCardHeader } from './details/DRepDetailsCardHeader';
import { DRepDetailsInfoItem } from './details/DRepDetailsInfoItem';
import { CopyableText } from './details/CopyableText';
import { DataMissingInfoBox } from './details/DataMissingInfoBox';
import { StatusPill } from './common/StatusPill';
import { useValidateMutation } from '@/hooks/mutations';
import { ICONS } from '@/consts';
import {
  correctDRepDirectoryFormat,
  encodeCIP129Identifier,
} from '../../utils';

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
    motivations,
    objectives,
    paymentAddress,
    qualifications,
    status,
    url,
    view,
    drepId,
    votingPower,
    metadataHash,
  } = dRepData;

  const [isValidating, setIsValidating] = useState(false);
  const [metadataStatus, setMetadataStatus] = useState<
    MetadataValidationStatus | undefined
  >();
  const { validateMetadata } = useValidateMutation();

  useEffect(() => {
    if (!url) return;

    const validate = async () => {
      setIsValidating(true);

      const { status: metadataValidationStatus } = await validateMetadata({
        standard: 'CIP119',
        url,
        hash: metadataHash ?? '',
      });

      setMetadataStatus(metadataValidationStatus);
      setIsValidating(false);
    };
    validate();
  }, [url]);

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
          isValidating={isValidating}
          metadataStatus={metadataStatus}
        />
        {/* ERROR MESSAGES */}
        {metadataStatus && (
          <DataMissingInfoBox
            isDataMissing={metadataStatus}
            isDrep
            sx={{ mb: 0 }}
            isValidating={isValidating}
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
        <DRepDetailsInfoItem
          label={t('drepId')}
          dataTestId="cip-129-drep-id"
          isValidating={isValidating}
        >
          <CopyableText
            value={encodeCIP129Identifier({
              txID: `${'22'}${drepId}`,
              bech32Prefix: 'drep',
            })}
            dataTestId="copy-cip-129-drep-id-button"
          />
        </DRepDetailsInfoItem>

        <DRepDetailsInfoItem
          label={t('cip105DRepId')}
          dataTestId="cip-105-drep-id"
          isValidating={isValidating}
        >
          <CopyableText
            isSemiTransparent
            value={view}
            dataTestId="copy-drep-id-button"
          />
        </DRepDetailsInfoItem>

        <DRepDetailsInfoItem
          label={t('status')}
          dataTestId="drep-status"
          isValidating={isValidating}
        >
          <StatusPill status={status} />
        </DRepDetailsInfoItem>
        <DRepDetailsInfoItem
          label={t('votingPower')}
          dataTestId="drep-voting-power"
          isValidating={isValidating}
        >
          <Typography
            data-testid="voting-power"
            sx={{ display: 'flex', flexDirection: 'row', mt: 0.5 }}
          >
            {'₳ '}
            {correctDRepDirectoryFormat(votingPower)}
          </Typography>
        </DRepDetailsInfoItem>
      </Box>
      {/* BASIC INFO END */}

      {/* BUTTONS */}
      {!isValidating &&
        isConnected &&
        ['Active', 'Inactive'].includes(status) &&
        !isMyDrep && (
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
      {!isValidating &&
        !isConnected &&
        ['Active', 'Inactive'].includes(status) && (
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
          {url && (
            <DRepDetailsInfoItem
              label={t('forms.dRepData.metadataUrl')}
              dataTestId="metadata-url"
            >
              <Link
                data-testid="metadata-url-link"
                href={url}
                target="_blank"
                sx={{
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  display: 'flex',
                  gap: 1,
                  alignItems: 'center',
                }}
              >
                <Typography
                  color="primary"
                  fontWeight={400}
                  sx={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {url}
                </Typography>
                <img
                  alt="link"
                  height={16}
                  src={ICONS.externalLinkIcon}
                  width={16}
                />
              </Link>
            </DRepDetailsInfoItem>
          )}
          {metadataHash && (
            <DRepDetailsInfoItem
              label={t('forms.dRepData.metadataHash')}
              dataTestId="metadata-hash"
            >
              <CopyableText
                value={metadataHash}
                dataTestId="copy-metadata-hash"
              />
            </DRepDetailsInfoItem>
          )}
        </>
      )}
      {/* CIP-119 DATA END */}
    </Card>
  );
};
