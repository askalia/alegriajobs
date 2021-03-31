import { BookmarkedJobs, Job } from "shared/models";
import { jobService } from "shared/services/jobs.service";
import { IMountJoblist, jobActions } from "./jobs.actions";

export interface IJoblistDispatchers {
    listJobs: () => Promise<IMountJoblist>,
    toggleCandidateBookmarkJob: (jobId: Job["id"]) => void,
    listCandidateBookmarkedJobs: (memberId: string) => void    
}



export const JoblistDispatchers = (dispatch?: any): IJoblistDispatchers => ({
    listJobs: () => {
        return jobService.listJobs()
        .then(jobs => dispatch(jobActions.mountJoblist(jobs)))
    },
    toggleCandidateBookmarkJob: (jobId: Job["id"]) => {
        dispatch(jobActions.toggleCandidateBookmarkJob(jobId))
    },
    listCandidateBookmarkedJobs: (candidateId: string) => {
        jobService.listCandidateBookmarkedJobs(candidateId)
        .then(candidateBookmarkedJobs => dispatch(jobActions.mountCandidateBookmarkedJobs(candidateBookmarkedJobs)))
    },
    
})


  