import { FC } from 'react';
import { To } from 'react-router-dom';
export interface WalletOption {
    icon: string;
    label: string;
    name: string;
    cip95Available: boolean;
    dataTestId?: string;
    pathToNavigate?: To;
}
export declare const WalletOptionButton: FC<WalletOption>;
