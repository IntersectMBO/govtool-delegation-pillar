export interface BasicReducer<T> {
    (prevState: T, newState: Partial<T>): T;
}
export declare const basicReducer: <T>(prevState: T, newState: Partial<T>) => T;
