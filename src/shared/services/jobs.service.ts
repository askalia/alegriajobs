import { getFromAirtable } from "./airtable.service";
import { HardSkillService } from "./hardskills.service";
import { EmployerService } from "./employer.service";
import { AirtablePayload, Candidature, Employer, HardSkill, Job, Status, BookmarkedJobs } from "../models";



const listJobs = async (): Promise<Job[]> => {
  console.log('GET ALL JOBS')

  const refListHardSkills: HardSkill[] = await HardSkillService.listHardSkills();
  const refListEmployers: Employer[] = await EmployerService.listEmployers();
  const jobsPayload: AirtablePayload<Job> = await getFromAirtable({
    table: "jobs",
    view: "jobs_published"    
  });
  
  return jobsPayload.records.map(({ id, fields, ...rest }: Job) => ({
    id,
    fields: {
      ...fields,
      status: fields.status as Status,
      hard_skills: (fields.hard_skills as string[]).map(
        (jobSkill: string) =>
          refListHardSkills.find((hs) => hs?.id === jobSkill) as HardSkill
      ),
      employer: refListEmployers.find(
        (refEmployer) => refEmployer.id === (fields.employer as string[])[0]
      ),
    },
    ...rest,
  }));
};

type BookmarkedJobsPayload = {
  records: BookmarkedJobs[];
};




const listCandidateBookmarkedJobs = async (
  candidateId: string
): Promise<BookmarkedJobs> => {
  const bookmarkedJobRecord: BookmarkedJobsPayload = await getFromAirtable({
    table: "bookmarked_jobs",
    view: "bookmarked_jobs",
    filters: [`(candidate="${candidateId}")`]    
  });  
  return (bookmarkedJobRecord?.records || [])[0];  
};


const statusPositions: string[] = [
  "draft",
  "published",
  "retired"
];

const canApplyJob = (job: Job, listJobsApplied: Candidature[]): boolean => {
  const foundJob = (listJobsApplied || []).find((jobApplied) =>
    jobApplied?.fields?.job?.includes(job?.id)
  );  
  return foundJob === undefined; 
}

export const jobService = {
  listJobs,
  listCandidateBookmarkedJobs,
  statusPositions,
  canApplyJob
};
