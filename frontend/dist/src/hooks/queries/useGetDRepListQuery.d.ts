import { UseInfiniteQueryOptions } from 'react-query';
import { GetDRepListArguments } from 'services';
import { DRepData, Infinite } from 'types';
export declare const useGetDRepListInfiniteQuery: ({ filters, pageSize, searchPhrase, sorting, status, }: GetDRepListArguments, options?: UseInfiniteQueryOptions<Infinite<DRepData>>) => {
    dRepListFetchNextPage: (options?: import("react-query").FetchNextPageOptions | undefined) => Promise<import("react-query").InfiniteQueryObserverResult<Infinite<DRepData>, unknown>>;
    dRepListHasNextPage: boolean | undefined;
    isDRepListFetching: boolean;
    isDRepListFetchingNextPage: boolean;
    isDRepListLoading: boolean;
    dRepData: DRepData[] | undefined;
    isPreviousData: boolean;
};
