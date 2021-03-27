import { Candidature } from "../../shared/models"
import { CandidaturesActionsType } from "./candidatures.actions"

export type ICandidaturesStore = Candidature[];

const initialCandidaturesStore: ICandidaturesStore = [];

export const candidaturesReducer = (
    store: ICandidaturesStore = initialCandidaturesStore,
    action :{ type: CandidaturesActionsType, payload: unknown }
) => {
    switch (action.type){
        case CandidaturesActionsType.APPLY_JOB :
            return applyJob(store, action.payload as Candidature)

        case CandidaturesActionsType.MOUNT_CANDIDATURES : 
            return mountCandidatures(store, action.payload as Candidature[]);

        case CandidaturesActionsType.REFRESH_CANDIDATURES : 
            return refreshCandidatures(store, action.payload as Candidature[]);
        default :
            return store
    }
}

const applyJob = (store: ICandidaturesStore, candidatureCreated: Candidature) => ([
    ...store,
    candidatureCreated
]);

const mountCandidatures = (store: ICandidaturesStore, listCandidatures: Candidature[]) => {
    if (store.length > 0){
        return store;
    }    
    return [
        ...store,
        ...listCandidatures
    ]
}

const refreshCandidatures = (store: ICandidaturesStore, listCandidatures: Candidature[]) => {
    return listCandidatures
}