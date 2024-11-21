import { Dispatch, SetStateAction } from 'react';
interface Props {
    chosenFilters: string[];
    setChosenFilters: Dispatch<SetStateAction<string[]>>;
    closeFilters: () => void;
    options: {
        key: string;
        label: string;
    }[];
    title?: string;
}
export declare const DataActionsFilters: ({ chosenFilters, setChosenFilters, closeFilters, options, title, }: Props) => import("react/jsx-runtime").JSX.Element;
export {};
