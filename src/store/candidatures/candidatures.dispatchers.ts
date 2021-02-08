import { candidatureService, IApplyJob } from "../../shared/services/candidature.service";
import {candidaturesActions} from "../candidatures/candidatures.actions";

export interface ICandidaturesDispatchers {
    applyJob: (args: IApplyJob) => void
} 

export const CandidaturesDispatchers = (dispatch: any): ICandidaturesDispatchers => ({
    applyJob: (args: IApplyJob): Promise<any> => {
        return candidatureService.applyJob(args)
        .then(candidatureCreated => {        console.log('candidatures created : ', candidatureCreated);
            return dispatch(candidaturesActions.applyJob(candidatureCreated))
        })
    }
    
})