import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';

import { PATHS } from 'consts';
import { useScreenDimension, useTranslation } from 'hooks';
import { Button } from 'components';

interface Props {
  actionButtonText?: string;
  actionButtonDataTestId?: string;
  onActionButton: () => void;
  isLoadingActionButton?: boolean;
  disableActionButton?: boolean;
  backButtonText?: string;
  onBackButton?: () => void;
}

export const TransactionStepButtons = ({
  actionButtonText,
  actionButtonDataTestId,
  backButtonText,
  isLoadingActionButton,
  disableActionButton,
  onBackButton,
  onActionButton,
}: Props) => {
  const { isMobile } = useScreenDimension();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const navigateToDashboard = () => navigate(PATHS.dashboard);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: isMobile ? 'column-reverse' : 'row',
        gap: isMobile ? 3 : 0,
        justifyContent: 'space-between',
      }}
    >
      <Button
        data-testid="back-button"
        onClick={onBackButton ?? navigateToDashboard}
        size="extraLarge"
        sx={{
          px: 6,
        }}
        variant="outlined"
      >
        {backButtonText ?? t('back')}
      </Button>
      <Button
        data-testid={actionButtonDataTestId ?? 'continue-button'}
        disabled={disableActionButton || isLoadingActionButton}
        isLoading={isLoadingActionButton}
        onClick={onActionButton}
        size="extraLarge"
        sx={{
          px: 6,
        }}
        variant="contained"
      >
        {actionButtonText ?? t('continue')}
      </Button>
    </Box>
  );
};
