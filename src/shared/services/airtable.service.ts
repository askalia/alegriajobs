import { TableName } from "shared/models";


type AirtableSetup = {
    BASE_ID: string;
    API_VERSION: string;
    API_KEY: string;
    BASE_URL: string;
}

type AirtableOptions = {
    table: TableName,
    recordId?: string,
    filters?: {
        [key: string]: string
    }
}



const setupAirtableString = () => {    
    const setup: AirtableSetup = { 
        API_VERSION: process.env.REACT_APP_AIRTABLE_API_VERSION as string, 
        BASE_ID: process.env.REACT_APP_AIRTABLE_BASE_ID as string, 
        API_KEY: process.env.REACT_APP_AIRTABLE_API_KEY as string,
        BASE_URL: process.env.REACT_APP_AIRTABLE_BASE_URL as string
    };
    return async ({ table, recordId, filters }: AirtableOptions) => {
        const url = `${setup.BASE_URL}/v${setup.API_VERSION || 0}/${setup.BASE_ID}/${table}${recordId ? `/${recordId}` : ''}?api_key=${setup.API_KEY}`;
        console.log('url : ', url)
        const payload = await fetch(url);
        return payload.json();
    }
    
}

export const callAirtable = ({ table, recordId, filters}: AirtableOptions) => {
    return setupAirtableString()({ table, recordId, filters});
}


