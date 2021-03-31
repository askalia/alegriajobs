import { Candidature } from "../../shared/models"
import { CandidaturesActionsType } from "./candidatures.actions"

export type ICandidaturesStore = {
    candidatures: Candidature[];
}

const initialCandidaturesStore: ICandidaturesStore = {
    candidatures: []
};

export const candidaturesReducer = (
    store: ICandidaturesStore = initialCandidaturesStore,
    action :{ type: CandidaturesActionsType, payload: unknown }
) => {
    switch (action.type){
        case CandidaturesActionsType.APPLY_JOB :
            return applyJob(store, action.payload as Candidature);
        case CandidaturesActionsType.UNAPPLY_JOB :
            return unapplyJob(store, action.payload as Candidature['id']);
        case CandidaturesActionsType.MOUNT_CANDIDATURES : 
            return mountCandidatures(store, action.payload as Candidature[]);
        case CandidaturesActionsType.REFRESH_CANDIDATURES : 
            return refreshCandidatures(store, action.payload as Candidature[]);
        default :
            return store
    }
}

const applyJob = (store: ICandidaturesStore, candidatureCreated: Candidature) => ({
    ...store,
    candidatures: [
        ...store.candidatures,
        candidatureCreated
    ]
});

const unapplyJob = (store: ICandidaturesStore, candidatureId: Candidature['id']) => ({
    ...store, 
    candidatures: store.candidatures.filter(c => c.id !== candidatureId )
})

const mountCandidatures = (store: ICandidaturesStore, listCandidatures: Candidature[]) => {
    if (store.candidatures.length > 0){
        return store;
    }    
    return {
        ...store,
        candidatures: [
            ...store.candidatures,
            ...listCandidatures
        ]
    }
}

const refreshCandidatures = (store: ICandidaturesStore, listCandidatures: Candidature[]) => {
    return listCandidatures
}