import { Infinite, DRepStatus, DRepListSort, DRepData } from '../../types';
export type GetDRepListArguments = {
    filters?: string[];
    page?: number;
    pageSize?: number;
    sorting?: DRepListSort;
    status?: DRepStatus[];
    searchPhrase?: string;
};
export declare const getDRepList: ({ apiUrl, sorting, filters, page, pageSize, searchPhrase: rawSearchPhrase, status, }: GetDRepListArguments & {
    apiUrl: string;
    validationApiUrl: string;
}) => Promise<Infinite<DRepData>>;
