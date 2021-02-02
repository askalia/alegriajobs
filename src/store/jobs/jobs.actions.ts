import { Job } from "shared/models";

export enum JobsActions {
    SET_JOBLIST = "SET_JOBLIST",
    TOGGLE_BOOKMARK_JOB = "TOGGLE_BOOKMARK_JOB",  
    MOUNT_CANDIDATE_BOOKMARKED_JOBS = "MOUNT_CANDIDATE_BOOKMARKED_JOBS"  
}

export const mountJoblist = (fetchedJoblist: Job[]) => ({
    type: JobsActions.SET_JOBLIST,
    payload: fetchedJoblist
});

export const toggleCandidateBookmarkJob = (jobId: Job['id']) => ({
    type: JobsActions.TOGGLE_BOOKMARK_JOB,
    payload: jobId
});

export const mountCandidateBookmarkedJobs = (bookmarkedJobs: Job["id"][]) => ({
    type: JobsActions.MOUNT_CANDIDATE_BOOKMARKED_JOBS,
    payload: bookmarkedJobs
});

export const jobActions = {
    mountJoblist,
    toggleCandidateBookmarkJob,
    mountCandidateBookmarkedJobs
}