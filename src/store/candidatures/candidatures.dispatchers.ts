import { candidatureService, IApplyJob } from "../../shared/services/candidature.service";
import {candidaturesActions} from "../candidatures/candidatures.actions";

export interface ICandidaturesDispatchers {
    applyJob: (args: IApplyJob) => Promise<void>,
    listCandidatures: (candidateId: string) => void,
    refreshCandidatures: (candidateId: string) => void
} 

export const CandidaturesDispatchers = (dispatch: any): ICandidaturesDispatchers => ({
    applyJob: (args: IApplyJob): Promise<any> => {
        return candidatureService.applyJob(args)
        .then(candidatureCreated => {
            return dispatch(candidaturesActions.applyJob(candidatureCreated))
        })
    },
    listCandidatures: (candidateId: string) => (
        candidatureService.listCandidatures(candidateId)
        .then(listCandidatures => dispatch(candidaturesActions.mountCandidatures(listCandidatures)))
    ),
    refreshCandidatures: (candidateId: string) => (
        candidatureService.listCandidatures(candidateId)
        .then(listCandidatures => dispatch(candidaturesActions.mountCandidatures(listCandidatures)))
    ),
    
})