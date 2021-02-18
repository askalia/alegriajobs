import { Job } from "../../shared/models"
import {  JobsActionTypes } from "./jobs.actions"

export interface IJobsStore {
    jobList: Job[];
    candidateBookmarkedJobs: Job['id'][];
}

const initialJoblistStore: IJobsStore = {
    jobList: [],
    candidateBookmarkedJobs: []
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
    
    return reducerBuilder<IJobsStore, JobsActionTypes>(store)
    .set(JobsActionTypes.SET_JOBLIST, setJobList)
    .set(JobsActionTypes.TOGGLE_BOOKMARK_JOB, toogleBookmarkJob)
    .set(JobsActionTypes.MOUNT_CANDIDATE_BOOKMARKED_JOBS, mountCandidatureBookmarkedJobs)
    .run(action.type, action.payload)
    
}



const setJobList = (store: IJobsStore, jobList: Job[]) => {
    console.log('setJobList ')
    if (store.jobList.length > 0){            
        return store;
    }
    const c = {
        ...store,
        jobList: [
            ...store.jobList,
            ...jobList
        ]
    };
    console.log('CCC : ', c)
    return c;
};

const toogleBookmarkJob = (store: IJobsStore, jobId: string) => {
    if (store.candidateBookmarkedJobs.includes(jobId)) {
        return {
            ...store,
            candidateBookmarkedJobs : store.candidateBookmarkedJobs.filter(
            (favJobId) => favJobId !== jobId
            ),
        };
    }
    return { ...store, candidateBookmarkedJobs: [...store.candidateBookmarkedJobs , jobId] };
};

const mountCandidatureBookmarkedJobs = (store: IJobsStore, candidateBookmarkedJobs: Job["id"][]) => ({
    ...store,
    candidateBookmarkedJobs: [
        ...store.candidateBookmarkedJobs || [],
        ...candidateBookmarkedJobs ||[]
    ]
})

/*
const runReducer = (store: IJobsStore) => {
    const _listReducers = (store: IJobsStore) => ({
        [JobsActionTypes.SET_JOBLIST as string] : (c): IJobsStore => {
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
        },
        [JobsActionTypes.TOGGLE_BOOKMARK_JOB as string] : (jobId: string): IJobsStore => {        
            if (store.candidateBookmarkedJobs.includes(jobId)) {
                return {
                    ...store,
                    candidateBookmarkedJobs : store.candidateBookmarkedJobs.filter(
                    (favJobId) => favJobId !== jobId
                    ),
                };
            }
            return { ...store, candidateBookmarkedJobs: [...store.candidateBookmarkedJobs , jobId] };
        },
        [JobsActionTypes.MOUNT_CANDIDATE_BOOKMARKED_JOBS as string] : (candidateBookmarkedJobs: Job["id"][] ): IJobsStore => {
            return {
                ...store,
                candidateBookmarkedJobs: [
                    ...store.candidateBookmarkedJobs || [],
                    ...candidateBookmarkedJobs ||[]
                ]
            }
        }        
    });
    return (action: { type: JobsActionTypes, payload: unknown }): IJobsStore => (
        (_listReducers(store)[action.type] as Function)?.(action.payload) || store
    )
}*/