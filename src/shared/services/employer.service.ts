import { AirtablePayload, Employer } from '../models'
import { callAirtable} from "./airtable.service"

export const listEmployers = async (): Promise<Employer[]> => {
    const payload: AirtablePayload = await callAirtable({
      table: "employers",
    });
    return payload?.records.map(({ id, fields: { name, email } }) => ({
      id,
      name,
      email
    }));
  };
  
  export const EmployerService = {
    listEmployers
  }