import {
  createContext,
  useContext,
  useState,
  useCallback,
  Dispatch,
  SetStateAction,
  useMemo,
  PropsWithChildren,
} from 'react';

import { useDebounce } from '../hooks';

interface DataActionsBarContextType {
  chosenFilters: string[];
  chosenFiltersLength: number;
  chosenSorting: string;
  closeFilters: () => void;
  closeSorts: () => void;
  debouncedSearchText: string;
  filtersOpen: boolean;
  searchText: string;
  setChosenFilters: Dispatch<SetStateAction<string[]>>;
  setChosenSorting: Dispatch<SetStateAction<string>>;
  setFiltersOpen: Dispatch<SetStateAction<boolean>>;
  setSearchText: Dispatch<SetStateAction<string>>;
  setSortOpen: Dispatch<SetStateAction<boolean>>;
  sortOpen: boolean;
}

const DataActionsBarContext = createContext<
  DataActionsBarContextType | undefined
>(undefined);
DataActionsBarContext.displayName = 'DataActionsBarContext';

const DataActionsBarProvider = ({ children }: PropsWithChildren) => {
  const [searchText, setSearchText] = useState<string>('');
  const debouncedSearchText = useDebounce(searchText, 300);
  const [filtersOpen, setFiltersOpen] = useState<boolean>(false);
  const [chosenFilters, setChosenFilters] = useState<string[]>([]);
  const [sortOpen, setSortOpen] = useState<boolean>(false);
  const [chosenSorting, setChosenSorting] = useState<string>('');

  const closeFilters = useCallback(() => {
    setFiltersOpen(false);
  }, []);

  const closeSorts = useCallback(() => {
    setSortOpen(false);
  }, []);

  const contextValue = useMemo(
    () => ({
      chosenFilters,
      chosenFiltersLength: chosenFilters.length,
      chosenSorting,
      closeFilters,
      closeSorts,
      debouncedSearchText,
      filtersOpen,
      searchText,
      setChosenFilters,
      setChosenSorting,
      setFiltersOpen,
      setSearchText,
      setSortOpen,
      sortOpen,
    }),
    [
      chosenFilters,
      chosenSorting,
      debouncedSearchText,
      filtersOpen,
      searchText,
      sortOpen,
      closeFilters,
      closeSorts,
    ]
  );

  return (
    <DataActionsBarContext.Provider value={contextValue}>
      {children}
    </DataActionsBarContext.Provider>
  );
};

function useDataActionsBar() {
  const context = useContext(DataActionsBarContext);
  if (!context) {
    throw new Error(
      'useDataActionsBar must be used within a DataActionsBarProvider'
    );
  }
  return context;
}
// eslint-disable-next-line no-console
console.log({ DataActionsBarProvider });

export { DataActionsBarProvider, useDataActionsBar };
