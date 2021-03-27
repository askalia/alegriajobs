import { Candidature } from "shared/models";

export enum CandidaturesActionsType {
    APPLY_JOB = "APPLY_JOB",
    MOUNT_CANDIDATURES = "MOUNT_CANDIDATURES",
    REFRESH_CANDIDATURES = "REFRESH_CANDIDATURES"
}


const applyJob = (candidatureCreated: Candidature) => ({
    type: CandidaturesActionsType.APPLY_JOB,
    payload: candidatureCreated
});

const mountCandidatures = (candidatures: Candidature[]) => ({
    type: CandidaturesActionsType.MOUNT_CANDIDATURES,
    payload: candidatures
});

const refreshCandidatures = (candidatures: Candidature[]) => ({
    type: CandidaturesActionsType.REFRESH_CANDIDATURES,
    payload: candidatures
})

export const candidaturesActions = {
    applyJob,
    mountCandidatures,
    refreshCandidatures,
}