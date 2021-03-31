
import { Candidate, Job } from "."
export interface BookmarkedJobs {
    id: string;
    fields: {
      candidate: Candidate["id"][],
      jobs: Job["id"][]
    }
    createdTime?: string
};
