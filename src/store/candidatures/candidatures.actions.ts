import { Candidature } from "shared/models";

export enum CandidaturesActionsType {
    APPLY_JOB = "APPLY_JOB",
    UNAPPLY_JOB = "UNAPPLY_JOB",
    MOUNT_CANDIDATURES = "MOUNT_CANDIDATURES",
    REFRESH_CANDIDATURES = "REFRESH_CANDIDATURES"
}


const applyJob = (candidatureCreated: Candidature) => ({
    type: CandidaturesActionsType.APPLY_JOB,
    payload: candidatureCreated
});

const unapplyJob = (candidatureDeletedId: Candidature['id']) => ({
    type: CandidaturesActionsType.UNAPPLY_JOB,
    payload: candidatureDeletedId
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
    unapplyJob,
    mountCandidatures,
    refreshCandidatures,
}