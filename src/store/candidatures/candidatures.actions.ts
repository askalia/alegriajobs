import { Candidature } from "shared/models";
import { IApplyJob } from "../../shared/services/candidature.service"

export enum CandidaturesActionsType {
    APPLY_JOB = "APPLY_JOB"
}


const applyJob = (candidatureCreated: Candidature) => ({
    type: CandidaturesActionsType.APPLY_JOB,
    payload: candidatureCreated
});

export const candidaturesActions = {
    applyJob
}