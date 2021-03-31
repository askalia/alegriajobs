//import { v2 as cloudinary } from "cloudinary" // cloudinary = require('cloudinary').v2;
import { Candidature, Job } from "shared/models";
import { deleteFromAirtable, getFromAirtable, postToAirtable } from "./airtable.service";
import { fileUploadService } from "./file-upload.service";
import turndownService from "turndown";
import shortid from "shortid";

export type IApplyJob = { job: Job, candidateId: string, resume: File, coverLetter: string };

const applyJob = async ({ job, candidateId, resume, coverLetter} : IApplyJob): Promise<Candidature> => {
    const customFileName = shortid.generate();
    const filePublicUrl = await fileUploadService.uploadFile(resume, customFileName)    
    console.log('filePublicUrl : ', filePublicUrl)
    if (filePublicUrl !== undefined){
        const data = {
            fields: {
              candidate: [candidateId],
              cover_letter: new turndownService().turndown(coverLetter),
              job: [
                job.id
              ],
              resume: [
                {
                  filename: filePublicUrl.split('/').pop(),
                  url: filePublicUrl
                }
              ],                          
            }
          };
          
        const candidatureCreated  = await postToAirtable<Candidature>({
            table: "candidatures",
            payload: data
        })
        return candidatureCreated;                          
    }
    return Promise.reject();
}

const unapplyJob = async (candidatureId: Candidature["id"]): Promise<boolean> => {    
  return deleteFromAirtable<Candidature["id"]>({
    table: "candidatures",
    recordId: candidatureId
  })  
}


const listCandidatures = async (
  candidateId: string
): Promise<Candidature[]> => {
  const candidatures: { records: Candidature[] } = await getFromAirtable({
    table: "candidatures",
    filters : [
      `FIND("${candidateId}", candidate)`
    ]
  });  
  return candidatures.records;
};
  
export const candidatureService = {
    applyJob,
    unapplyJob,
    listCandidatures
}