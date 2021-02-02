import { AirtableRecord } from "./airtable-record.model";

export interface AirtablePayload<T> {
    records: AirtableRecord<T>[]
}