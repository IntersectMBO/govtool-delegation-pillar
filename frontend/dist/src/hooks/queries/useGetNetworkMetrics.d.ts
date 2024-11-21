export declare const useGetNetworkMetrics: () => {
    networkMetrics: import("../../types").NetworkMetrics | undefined;
    fetchNetworkMetrics: <TPageData>(options?: (import("react-query").RefetchOptions & import("react-query").RefetchQueryFilters<TPageData>) | undefined) => Promise<import("react-query").QueryObserverResult<import("../../types").NetworkMetrics, unknown>>;
};
