//import { v2 as cloudinary } from "cloudinary" // cloudinary = require('cloudinary').v2;
import { Candidature, Job } from "shared/models";
import { postAirtable } from "./airtable.service";
import { fileUploadService } from "./file-upload.service";
import turndownService from "turndown";
import shortid from "shortid";

export type IApplyJob = { job: Job, candidateId: string, resume: File, coverLetter: string };

const applyJob = async ({ job, candidateId, resume, coverLetter} : IApplyJob): Promise<Candidature> => {
    const customFileName = shortid.generate();
    const filePublicUrl = await fileUploadService.uploadFile(resume, customFileName)    
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
                    filename: ("" + filePublicUrl)?.split('/')?.pop()?.replace(".pdf", ".png"),
                  url: filePublicUrl.replace(".pdf", ".png")
                }
              ],                          
            }
          };
          
        const candidatureCreated  = await postAirtable<Candidature>({
            table: "candidatures",
            payload: data
        })
        return candidatureCreated;                          
    }
    return Promise.reject();
}
  



export const candidatureService = {
    applyJob    
}