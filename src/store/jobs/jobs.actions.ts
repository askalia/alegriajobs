import { Job } from "shared/models";

export enum JobsActionTypes {
    SET_JOBLIST = "SET_JOBLIST",
    TOGGLE_BOOKMARK_JOB = "TOGGLE_BOOKMARK_JOB",  
    MOUNT_CANDIDATE_BOOKMARKED_JOBS = "MOUNT_CANDIDATE_BOOKMARKED_JOBS"  ,
    APPLY_JOB = "APPLY_JOB"
}

export interface IMountJoblist {
    type: JobsActionTypes.SET_JOBLIST;
    payload: Job[];
}

export const mountJoblist = (fetchedJoblist: Job[]) => ({
    type: JobsActionTypes.SET_JOBLIST,
    payload: fetchedJoblist
});

export const toggleCandidateBookmarkJob = (jobId: Job['id']) => ({
    type: JobsActionTypes.TOGGLE_BOOKMARK_JOB,
    payload: jobId
});

export const mountCandidateBookmarkedJobs = (bookmarkedJobs: Job["id"][]) => ({
    type: JobsActionTypes.MOUNT_CANDIDATE_BOOKMARKED_JOBS,
    payload: bookmarkedJobs
});


export const jobActions = {
    mountJoblist,
    toggleCandidateBookmarkJob,
    mountCandidateBookmarkedJobs,

};