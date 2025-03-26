import { Dispatch, SetStateAction } from 'react';
interface Props {
    chosenSorting: string;
    setChosenSorting: Dispatch<SetStateAction<string>>;
    closeSorts: () => void;
    options: {
        key: string;
        label: string;
    }[];
}
export declare const DataActionsSorting: ({ chosenSorting, setChosenSorting, closeSorts, options, }: Props) => import("react/jsx-runtime").JSX.Element;
export {};
