import { putToAirtable } from "shared/services/airtable.service";
import candidateAuthService from "shared/services/candidate-auth.service";
import { BookmarkedJobs, Job } from "../../shared/models"
import { JobsActionTypes } from "./jobs.actions"

export interface IJobsStore {
    jobList: Job[];
    candidateBookmarkedJobs: BookmarkedJobs|null;
}

const initialJoblistStore: IJobsStore = {
    jobList: [],
    candidateBookmarkedJobs: null
}

export const jobsReducer = (
    store: IJobsStore = initialJoblistStore,
    action: { type: JobsActionTypes, payload: unknown }
) => {

    switch (action.type){
        case JobsActionTypes.SET_JOBLIST :
            return setJobList(store, action.payload as Job[])            
        case JobsActionTypes.TOGGLE_BOOKMARK_JOB:
            return toogleBookmarkJob(store, action.payload as string);
        case JobsActionTypes.MOUNT_CANDIDATE_BOOKMARKED_JOBS:
            return mountCandidatureBookmarkedJobs(store, action.payload as BookmarkedJobs);
        default:
            return store;
    }    
}



const setJobList = (store: IJobsStore, jobList: Job[]) => {
    if (store.jobList.length > 0){  
        return store;
    }
    return {
        ...store,
        jobList: [
            ...store.jobList,
            ...jobList
        ]
    };
};

const toogleBookmarkJob = (store: IJobsStore, jobId: string) => {


    if (store.candidateBookmarkedJobs === null){
        store.candidateBookmarkedJobs = {
            fields: {
                candidate: [candidateAuthService.getCandidate().id],
                jobs: [jobId]
            }
        } as BookmarkedJobs
    }    
    let newStore = null;
    // is inside : remove
    if ((store.candidateBookmarkedJobs?.fields?.jobs || []).includes(jobId)) {
        const newBookmarkedJobs = {
            ...store.candidateBookmarkedJobs
        }
        newBookmarkedJobs.fields.jobs = newBookmarkedJobs.fields.jobs.filter(
            (favJobId) => favJobId !== jobId
        );

        newStore = {
            ...store,
            candidateBookmarkedJobs : newBookmarkedJobs,
        };        
    }
    // no exist : add
    else {        
        newStore = {
            ...store     
        };
        (newStore.candidateBookmarkedJobs as BookmarkedJobs).fields.jobs = [
            ...store.candidateBookmarkedJobs?.fields?.jobs || [],
            jobId
        ];        
    }   
    const bookmarkedJobToSend = { ...newStore.candidateBookmarkedJobs };
    delete bookmarkedJobToSend.createdTime;    
    
    putToAirtable<{ records: BookmarkedJobs[]}>({
        table:"bookmarked_jobs",
        payload: {
            records: [
                bookmarkedJobToSend
            ]
        }
    })

    return newStore  ;
};

const mountCandidatureBookmarkedJobs = (store: IJobsStore, candidateBookmarkedJobs: BookmarkedJobs) => ({
    ...store,
    candidateBookmarkedJobs
})
