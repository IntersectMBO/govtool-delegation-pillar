import { forwardRef } from 'react';
import { Typography } from '@mui/material';

import { useModal } from '@/context';
import { useScreenDimension } from '@/hooks';
import { ICONS } from '@/consts';

import { ModalWrapper } from './ModalWrapper';
import { ModalHeader } from './ModalHeader';
import { ModalContents } from './ModalContents';

export interface LoadingModalState {
  message: React.ReactNode;
  title: string;
  dataTestId: string;
}

export const LoadingModal = forwardRef<HTMLDivElement>((_, ref) => {
  const { state } = useModal<LoadingModalState>();
  const { isMobile } = useScreenDimension();

  return (
    <ModalWrapper
      dataTestId={state ? state.dataTestId : 'loading-modal'}
      hideCloseButton
      ref={ref}
    >
      <div style={{ width: 100, height: 100, margin: '0 auto' }}>
        <img
          src={ICONS.loaderIcon}
          style={{ animation: `spin 2s linear infinite` }}
          alt="loader"
        />
      </div>
      <ModalHeader sx={{ marginTop: '34px', px: isMobile ? 0 : 3 }}>
        {state?.title}
      </ModalHeader>
      <ModalContents>
        <Typography
          textAlign="center"
          sx={{ fontSize: '16px', fontWeight: '400' }}
        >
          {state?.message}{' '}
        </Typography>
      </ModalContents>
    </ModalWrapper>
  );
});
