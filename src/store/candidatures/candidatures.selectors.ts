import { createSelector } from "reselect"
import { Candidature } from "../../shared/models"
import { IRootStore } from "../root-reducer"
import { ICandidaturesStore } from "./candidatures.reducer"

const getCandidaturesFromStore = (state: IRootStore): ICandidaturesStore => state.candidatures

export const getCandidatures = createSelector([getCandidaturesFromStore], (candidatures: ICandidaturesStore): Candidature[] => {
    return candidatures.candidatures;
})

export const candidaturesSelectors = {
    getCandidatures
    
}