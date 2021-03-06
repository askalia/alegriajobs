import {HardSkill, AirtablePayload } from '../models'
import { getFromAirtable} from "./airtable.service"

export const listHardSkills = async (): Promise<HardSkill[]> => {
    const payload: AirtablePayload = await getFromAirtable({
      table: "hard_skills",
    });
    return payload?.records.map(({ id, fields: { name, category } }) => ({
      id,
      name,
      category,
    }));
  };
  
  export const HardSkillService = {
    listHardSkills
  }