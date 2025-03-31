import { Dispatch, SetStateAction } from 'react';
type Props = {
    filtersOpen?: boolean;
    setFiltersOpen?: Dispatch<SetStateAction<boolean>>;
    chosenFiltersLength?: number;
    chosenSorting: string;
    sortOpen: boolean;
    setSortOpen: Dispatch<SetStateAction<boolean>>;
    children?: React.ReactNode;
    isFiltering?: boolean;
};
export declare const OrderActionsChip: (props: Props) => import("react/jsx-runtime").JSX.Element;
export {};
