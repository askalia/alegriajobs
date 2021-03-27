import { getFromAirtable } from "./airtable.service";
import { HardSkillService } from "./hardskills.service";
import { EmployerService } from "./employer.service";
import { AirtablePayload, Candidature, Employer, HardSkill, Job, Status } from "../models";


const listJobs = async (): Promise<Job[]> => {
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
  fields: {
    bookmarked_jobs: Job["id"][];
  };
};

type BookmarkedJobRecord = {
  fields: {
    jobs: Job["id"][];
  };
};



const listCandidateBookmarkedJobs = async (
  candidateId: string
): Promise<Job["id"][]> => {
  const payload: BookmarkedJobsPayload = await getFromAirtable({
    table: "candidates",
    recordId: candidateId,
  });
  const bookmarkedJobRecord: BookmarkedJobRecord = await getFromAirtable({
    table: "bookmarked_jobs",
    recordId: (payload?.fields?.bookmarked_jobs || [])[0],
  });
  return bookmarkedJobRecord.fields.jobs;
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
