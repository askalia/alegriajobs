import { auth } from "../services/firebase-utils.service"
import { postToAirtable, putToAirtable } from "./airtable.service";
import { Candidate } from "../models"
import candidateAuthService from "./candidate-auth.service";

const getCandidateId = (): string => candidateAuthService.getCandidate().id as string;

const registerCandidate = async ({ name, email, password}: {
    name: string; email: string; password: string
}) => {
    const userCreated = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
    
    const response = await postToAirtable<Candidate>({
        table: 'candidates',
        payload: {
            records: [
                {
                    fields: {
                        fullname: name,                  
                        active: true,
                        email,
                        ext_uid: userCreated.user?.uid
                    }
                }              
            ]
          }
    });
    const candidateCreated = response.records[0];

    await putToAirtable<Partial<Candidate>>({
        table: "candidates",
        recordId: candidateCreated.id,
        payload: {
            fields : {
                name: candidateCreated.id
            }            
        }
    });
    
}

export const candidateService = {
    getCandidateId,
    registerCandidate
}