import { Link } from 'react-router-dom';
import { Trans } from 'react-i18next';
import { Box, Chip } from '@mui/material';

import { Button, Share } from '@/components';
import { ICONS, PATHS } from '@/consts';
import { usePillarContext } from '@/context';
import {
  useGetAdaHolderVotingPowerQuery,
  useScreenDimension,
  useTranslation,
} from '@/hooks';
import { correctDRepDirectoryFormat } from '@/utils';
import { DRepData, MetadataValidationStatus } from '@/types';
import { DataMissingHeader } from './DataMissingHeader';

type DRepDetailsProps = {
  dRepData: DRepData;
  isMe?: boolean;
  isMyDrep?: boolean;
  isValidating?: boolean;
  metadataStatus?: MetadataValidationStatus;
};

export const DRepDetailsCardHeader = ({
  dRepData,
  isMe,
  isMyDrep,
  isValidating,
  metadataStatus,
}: DRepDetailsProps) => {
  const { stakeKey } = usePillarContext();
  const { t } = useTranslation();
  const { screenWidth } = useScreenDimension();
  const { votingPower: myVotingPower } =
    useGetAdaHolderVotingPowerQuery(stakeKey);

  const { givenName, imageUrl } = dRepData;

  return (
    <div>
      {(isMe || isMyDrep) && (
        <Box
          sx={{
            alignSelf: 'stretch',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            mb: '18px',
            ...(screenWidth <= 1020 && {
              flexDirection: 'column',
              gap: 3,
            }),
          }}
        >
          <Chip
            color="primary"
            label={
              <Trans
                i18nKey={
                  isMe
                    ? isMyDrep
                      ? 'dRepDirectory.myDelegationToYourself'
                      : 'dRepDirectory.meAsDRep'
                    : 'dRepDirectory.myDRep'
                }
                values={{
                  ada: correctDRepDirectoryFormat(myVotingPower),
                }}
              />
            }
            sx={{
              boxShadow: (theme) => theme.shadows[2],
              color: (theme) => theme.palette.text.primary,
              px: 3,
              py: 0.5,
              ...(isMyDrep &&
                !isMe && {
                  width: '100%',
                }),
              ...(screenWidth <= 1020 && {
                width: '100%',
              }),
            }}
          />

          {isMe && (
            <Box
              sx={{
                alignItems: 'center',
                display: 'flex',
                gap: 1,
                ...(screenWidth < 1020 && {
                  width: '100%',
                }),
              }}
            >
              <Link to={`../../${PATHS.editDRepMetadata}`} state={dRepData}>
                <Button
                  data-testid="edit-drep-data-button"
                  variant="outlined"
                  sx={{
                    ...(screenWidth < 1020 && {
                      width: '100%',
                    }),
                  }}
                >
                  {t('dRepDirectory.editBtn')}
                  <img
                    alt="sorting active"
                    src={ICONS.editIcon}
                    style={{ marginLeft: '4px' }}
                  />
                </Button>
              </Link>
              {screenWidth >= 1020 && <Share link={window.location.href} />}
            </Box>
          )}
        </Box>
      )}
      <DataMissingHeader
        isDRep
        title={givenName ?? undefined}
        image={imageUrl}
        isDataMissing={metadataStatus}
        titleStyle={{ wordBreak: 'break-word', whiteSpace: 'wrap' }}
        isValidating={isValidating}
      />
    </div>
  );
};
