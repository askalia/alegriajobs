
/*export interface AirtableRecord<T> {
    id: string;
    fields: T | {
        [key: string]: any
    };
    createdTime: Date|string;
}*/

type allScalars = string|number|boolean|object|Date

export type AirtableRecord<T> = T | {
    id: string;
    fields: {
        [key: string]: allScalars // | (keyof allScalars)[]
    };
    createdTime: Date|string;
}