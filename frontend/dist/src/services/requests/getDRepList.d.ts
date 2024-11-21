import { type Infinite, type DRepStatus, type DRepListSort, DRepData } from 'types';
export type GetDRepListArguments = {
    filters?: string[];
    page?: number;
    pageSize?: number;
    sorting?: DRepListSort;
    status?: DRepStatus[];
    searchPhrase?: string;
};
export declare const getDRepList: ({ apiUrl, validationApiUrl, sorting, filters, page, pageSize, searchPhrase: rawSearchPhrase, status, }: GetDRepListArguments & {
    apiUrl: string;
    validationApiUrl: string;
}) => Promise<Infinite<DRepData>>;
