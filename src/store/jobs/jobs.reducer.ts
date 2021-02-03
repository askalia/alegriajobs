import { Job } from "../../shared/models"
import { JobsActions } from "./jobs.actions"

export interface JobsState {
    jobList: Job[]
    candidateBookmarkedJobs: Job['id'][]
}

const initialJoblistState: JobsState = {
    jobList: [],
    candidateBookmarkedJobs: []
}

export const jobsReducer = (
    state: JobsState = initialJoblistState,
    action: { type: JobsActions, payload: unknown }
) => {
    switch (action.type){
        case JobsActions.SET_JOBLIST :
            const jobList = action.payload as Job[];
            
            return {
                ...state,
                jobList: [
                    ...state.jobList,
                    ...jobList
                ]
            };

        case JobsActions.TOGGLE_BOOKMARK_JOB :
            const jobId = action.payload as string;
            if (state.candidateBookmarkedJobs.includes(jobId)) {
                return {
                  ...state,
                  candidateBookmarkedJobs : state.candidateBookmarkedJobs.filter(
                    (favJobId) => favJobId !== jobId
                  ),
                };
              }
              return { ...state, candidateBookmarkedJobs: [...state.candidateBookmarkedJobs , jobId] };

        case JobsActions.MOUNT_CANDIDATE_BOOKMARKED_JOBS : 
        const candidateBookmarkedJobs = action.payload as Job["id"][];
            return {
                ...state,
                candidateBookmarkedJobs: [
                    ...state.candidateBookmarkedJobs,
                    ...candidateBookmarkedJobs
                ]
            }

        default: 
            return state;
    }
}
