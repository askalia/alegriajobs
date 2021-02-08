import { Candidature } from "../../shared/models"
import { CandidaturesActionsType } from "./candidatures.actions"

export interface CandidaturesState {
    candidatures: Candidature[]
}

const initialCandidaturesState: CandidaturesState = {
    candidatures : []
}

export const candidaturesReducer = (
    state: CandidaturesState = initialCandidaturesState,
    action :{ type: CandidaturesActionsType, payload: unknown }
) => {
    switch (action.type){
        case CandidaturesActionsType.APPLY_JOB :
            const candidatureCreated = action.payload as Candidature;
            return {
                ...state,
                candidatures: [
                    ...state.candidatures,
                    candidatureCreated
                ]
            }
        default :
            return state
    }
}