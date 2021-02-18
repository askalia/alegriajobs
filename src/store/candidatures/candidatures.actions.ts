import { Candidature } from "shared/models";

export enum CandidaturesActionsType {
    APPLY_JOB = "APPLY_JOB",
    MOUNT_CANDIDATURES = "MOUNT_CANDIDATURES"
}


const applyJob = (candidatureCreated: Candidature) => ({
    type: CandidaturesActionsType.APPLY_JOB,
    payload: candidatureCreated
});

const mountCandidatures = (candidatures: Candidature[]) => ({
    type: CandidaturesActionsType.MOUNT_CANDIDATURES,
    payload: candidatures
})

export const candidaturesActions = {
    applyJob,
    mountCandidatures
}