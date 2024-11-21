import { Dispatch, SetStateAction } from 'react';
import { VoterInfo } from 'types';
export declare const RegisterAsDRepForm: ({ onClickCancel, setStep, voter, }: {
    onClickCancel: () => void;
    setStep: Dispatch<SetStateAction<number>>;
    voter?: VoterInfo | undefined;
}) => import("react/jsx-runtime").JSX.Element;
