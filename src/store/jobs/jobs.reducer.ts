import { putToAirtable } from "shared/services/airtable.service";
import candidateAuthService from "shared/services/candidate-auth.service";
import { jobService } from "shared/services/jobs.service";
import { BookmarkedJobs, Job, User } from "../../shared/models"
import {  jobActions, JobsActionTypes, mountJoblist, toggleCandidateBookmarkJob } from "./jobs.actions"

export interface IJobsStore {
    jobList: Job[];
    candidateBookmarkedJobs: BookmarkedJobs|null;
}

const initialJoblistStore: IJobsStore = {
    jobList: [],
    candidateBookmarkedJobs: null
}



function reducerBuilder<S, A>(store: S) {    
    var reducersMap = new Map<A, Function>();        
    const api = {
        set: (actionType: A, reducerFunction: Function) => {
            reducersMap.set(actionType, reducerFunction);
            return api;
        },
        run: (actionType: A, payload: unknown) => reducersMap.has(actionType) ? reducersMap.get(actionType)?.(store, payload) : store
    }
    return api;
    
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
    
    /*return reducerBuilder<IJobsStore, JobsActionTypes>(store)
    .set(JobsActionTypes.SET_JOBLIST, setJobList)
    .set(JobsActionTypes.TOGGLE_BOOKMARK_JOB, toogleBookmarkJob)
    .set(JobsActionTypes.MOUNT_CANDIDATE_BOOKMARKED_JOBS, mountCandidatureBookmarkedJobs)
    .run(action.type, action.payload)
    */
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
    console.log('STATE OF : ', store.candidateBookmarkedJobs)
    let newStore = null;
    // is inside : remove
    if ((store.candidateBookmarkedJobs?.fields?.jobs || []).includes(jobId)) {
        console.log('contains job')
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
        console.log('STATE OF AFTER: ', store.candidateBookmarkedJobs)
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
    console.log('store is now : ', newStore)
    const bookmarkedJobToSend = { ...newStore.candidateBookmarkedJobs };
    delete bookmarkedJobToSend.createdTime;    
    console.log('PATcH : ', {
        table:"bookmarked_jobs",
        payload: {
            records: [
                bookmarkedJobToSend
            ]
        }
    })
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
