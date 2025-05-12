import { Dispatch, SetStateAction, PropsWithChildren } from 'react';
import { DRepStatus } from '../types';
interface DataActionsBarContextType {
    chosenFilters: DRepStatus[];
    chosenFiltersLength: number;
    chosenSorting: string;
    closeFilters: () => void;
    closeSorts: () => void;
    debouncedSearchText: string;
    filtersOpen: boolean;
    searchText: string;
    setChosenFilters: Dispatch<SetStateAction<DRepStatus[]>>;
    setChosenSorting: Dispatch<SetStateAction<string>>;
    setFiltersOpen: Dispatch<SetStateAction<boolean>>;
    setSearchText: Dispatch<SetStateAction<string>>;
    setSortOpen: Dispatch<SetStateAction<boolean>>;
    sortOpen: boolean;
}
declare const DataActionsBarProvider: ({ children }: PropsWithChildren) => import("react/jsx-runtime").JSX.Element;
declare function useDataActionsBar(): DataActionsBarContextType;
export { DataActionsBarProvider, useDataActionsBar };
