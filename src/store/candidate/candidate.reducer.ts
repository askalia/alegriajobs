import { ReducerAction } from "../../shared/models/reducer-action.model";
import { Candidate } from "../../shared/models/candidate.model"
import { CandidateActionTypes } from "./candidate.actions";

export type ICandidateState = {
    currentCandidate: Candidate|null
}

const initialCandidateState: ICandidateState = {
    currentCandidate: null
}

export const candidateReducer = (
    currentState: ICandidateState = initialCandidateState, 
    action: ReducerAction<CandidateActionTypes, unknown>): ICandidateState => {
                
    switch (action.type){

        case CandidateActionTypes.SET_CURRENT_CANDIDATE :
            if (! action.payload){
                return currentState
            }
              return {
                ...currentState,
                currentCandidate: action.payload as Candidate
            };
    
        default: 
            return currentState;
    }
}