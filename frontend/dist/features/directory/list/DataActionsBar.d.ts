import { Dispatch, FC, SetStateAction } from 'react';
import { DRepStatus } from '../../../types';
type DataActionsBarProps = {
    chosenFilters?: DRepStatus[];
    chosenFiltersLength?: number;
    chosenSorting: string;
    closeFilters?: () => void;
    closeSorts: () => void;
    filterOptions?: {
        key: DRepStatus;
        label: string;
    }[];
    filtersOpen?: boolean;
    filtersTitle?: string;
    isFiltering?: boolean;
    searchText: string;
    setChosenFilters?: Dispatch<SetStateAction<DRepStatus[]>>;
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
