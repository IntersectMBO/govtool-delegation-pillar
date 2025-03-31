import { Dispatch, FC, SetStateAction } from 'react';
type DataActionsBarProps = {
    chosenFilters?: string[];
    chosenFiltersLength?: number;
    chosenSorting: string;
    closeFilters?: () => void;
    closeSorts: () => void;
    filterOptions?: {
        key: string;
        label: string;
    }[];
    filtersOpen?: boolean;
    filtersTitle?: string;
    isFiltering?: boolean;
    searchText: string;
    setChosenFilters?: Dispatch<SetStateAction<string[]>>;
    setChosenSorting: Dispatch<SetStateAction<string>>;
    setFiltersOpen?: Dispatch<SetStateAction<boolean>>;
    setSearchText: Dispatch<SetStateAction<string>>;
    setSortOpen: Dispatch<SetStateAction<boolean>>;
    sortOpen: boolean;
    sortOptions?: {
        key: string;
        label: string;
    }[];
};
export declare const DataActionsBar: FC<DataActionsBarProps>;
export {};
