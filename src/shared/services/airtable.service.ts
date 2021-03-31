import { TableName } from "shared/models";


type AirtableSetup = {
    BASE_ID: string;
    API_VERSION: string;
    API_KEY: string;
    BASE_URL: string;
}

type AirtableGetOptions = {
    table: TableName,
    view?: string,
    recordId?: string,
    filters?: string[]        
}

type AirtableDeleteOptions<T> = {
    table: TableName,
    recordId: T;
}

type AirtablePostOptions<T> = {
    table: TableName,
    payload: T | Object
}

type AirtablePutOptions<T> = {
    table: TableName,
    recordId?: string
    payload: T | Object;
}

const setup: AirtableSetup = { 
    API_VERSION: process.env.REACT_APP_AIRTABLE_API_VERSION as string, 
    BASE_ID: process.env.REACT_APP_AIRTABLE_BASE_ID as string, 
    API_KEY: process.env.REACT_APP_AIRTABLE_API_KEY as string,
    BASE_URL: process.env.REACT_APP_AIRTABLE_BASE_URL as string
};


const setupAirtableGet = async ({ table, view, recordId, filters }: AirtableGetOptions) => {
    let url = `${setup.BASE_URL}/v${setup.API_VERSION || 0}/${setup.BASE_ID}/${table}${recordId ? `/${recordId}` : ''}?api_key=${setup.API_KEY}`;
    if (view){
        url += `&view=${view}`
    }
    if (filters){
        //url += '&filterByFormula='+(filters || []).map(filterFunc => filterFunc()).join('&')
        url += '&filterByFormula='+(filters || []).join('&');
    }

    const response = await fetch(url);
    return response.json();
}

const setupAirtableDelete = async <T>({ table, recordId }: AirtableDeleteOptions<T>): Promise<boolean> => {
    
    let url = `${setup.BASE_URL}/v${setup.API_VERSION || 0}/${setup.BASE_ID}/${table}?api_key=${setup.API_KEY}`;
    url += `&records[]=${recordId}`;
    console.log('url del: ', url);
    type DeletedItemResponse = { records: {
        deleted: boolean,
        id: T
    }[]};
    
    const rawResponse = await fetch(url, { 
        method: "DELETE"});
    const response = await rawResponse.json();
    const { deleted, id } = ((response as DeletedItemResponse).records || [])[0];
    return deleted === true && id === recordId ? Promise.resolve(true) : Promise.reject(false);
}

const setupAirtablePost = async <T>({ table, payload }: AirtablePostOptions<T>) => {
    const url = `${setup.BASE_URL}/v${setup.API_VERSION || 0}/${setup.BASE_ID}/${table}?api_key=${setup.API_KEY}`;    
    
    const response = await fetch(url, { 
        headers: {
            "Content-Type": "application/json"
        }, 
        body: JSON.stringify(payload), 
        method: "POST"});
    return response.json();
}

const setupAirtablePut = async <T>({ table, recordId, payload }: AirtablePutOptions<T>) => {
    const url = `${setup.BASE_URL}/v${setup.API_VERSION || 0}/${setup.BASE_ID}/${table}${recordId ? '/'+recordId : ''}?api_key=${setup.API_KEY}`;
    const response = await fetch(url, { 
        headers: {
            "Content-Type": "application/json"
        }, 
        body: JSON.stringify(payload), 
        method: "PATCH"});
    return response.json();
}

export const getFromAirtable = ({ table, view, recordId, filters}: AirtableGetOptions) => {    
    return setupAirtableGet({ table, view, recordId, filters});
}

export const postToAirtable = <T>({ table, payload }: AirtablePostOptions<T>) => {
    return setupAirtablePost<T>({ table, payload });
}

export const putToAirtable = <T>({ table, recordId, payload }: AirtablePutOptions<T>) => {
    return setupAirtablePut<T>({ table, recordId, payload });
}


export const deleteFromAirtable = <T>({ table, recordId }: AirtableDeleteOptions<T>) => {
    return setupAirtableDelete<T>({ table, recordId });
}


