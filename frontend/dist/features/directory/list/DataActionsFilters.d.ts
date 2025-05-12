import { Dispatch, SetStateAction } from 'react';
import { DRepStatus } from '../../../types';
interface Props {
    chosenFilters: DRepStatus[];
    setChosenFilters: Dispatch<SetStateAction<DRepStatus[]>>;
    closeFilters: () => void;
    options: {
        key: DRepStatus;
        label: string;
    }[];
    title?: string;
}
export declare const DataActionsFilters: ({ chosenFilters, setChosenFilters, closeFilters, options, title, }: Props) => import("react/jsx-runtime").JSX.Element;
export {};
