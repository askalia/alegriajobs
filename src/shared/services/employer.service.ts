import { AirtablePayload, Employer } from '../models'
import { getFromAirtable} from "./airtable.service"

export const listEmployers = async (): Promise<Employer[]> => {
    const payload: AirtablePayload = await getFromAirtable({
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