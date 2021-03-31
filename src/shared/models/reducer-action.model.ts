export interface ReducerAction<T extends string, U> {
    type: T;
    payload: U;
}