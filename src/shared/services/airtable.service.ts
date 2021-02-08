import { TableName } from "shared/models";


type AirtableSetup = {
    BASE_ID: string;
    API_VERSION: string;
    API_KEY: string;
    BASE_URL: string;
}

type AirtableGetOptions = {
    table: TableName,
    recordId?: string,
    filters?: {
        [key: string]: string
    }
}

type AirtablePostPutOptions<T> = {
    table: TableName,
    recordId?: string
    payload: T | Object
}

const setup: AirtableSetup = { 
    API_VERSION: process.env.REACT_APP_AIRTABLE_API_VERSION as string, 
    BASE_ID: process.env.REACT_APP_AIRTABLE_BASE_ID as string, 
    API_KEY: process.env.REACT_APP_AIRTABLE_API_KEY as string,
    BASE_URL: process.env.REACT_APP_AIRTABLE_BASE_URL as string
};


const setupAirtableGet = async ({ table, recordId, filters }: AirtableGetOptions) => {
    const url = `${setup.BASE_URL}/v${setup.API_VERSION || 0}/${setup.BASE_ID}/${table}${recordId ? `/${recordId}` : ''}?api_key=${setup.API_KEY}`;
    console.log('url get: ', url)
    const response = await fetch(url);
    return response.json();
}

const setupAirtablePostPut = async <T>({ table, recordId, payload }: AirtablePostPutOptions<T>) => {
    const url = `${setup.BASE_URL}/v${setup.API_VERSION || 0}/${setup.BASE_ID}/${table}${recordId ? `/${recordId}` : ''}?api_key=${setup.API_KEY}`;
    console.log('url post/put: ', url)
    console.log('POST : ', payload)
    const response = await fetch(url, { 
        headers: {
            "Content-Type": "application/json"
        }, 
        body: JSON.stringify(payload), 
        method: "POST"});
    return response.json();
}

export const callAirtable = ({ table, recordId, filters}: AirtableGetOptions) => {    
    return setupAirtableGet({ table, recordId, filters});
}

export const postAirtable = <T>({ table, payload }: AirtablePostPutOptions<T>) => {
    return setupAirtablePostPut<T>({ table, payload });
}


