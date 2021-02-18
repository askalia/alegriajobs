import { combineReducers} from "redux";
import { jobsReducer, IJobsStore } from "./jobs/jobs.reducer";
import { candidaturesReducer, ICandidaturesStore } from "./candidatures/candidatures.reducer"
//import { ShoppingCartState, shoppingCartReducer } from "./shopping-cart/shopping-cart.reducer";
//import {userReducer, UserState} from "./user/user.reducer"

export type IRootStore = {
    jobs: IJobsStore,
    candidatures: ICandidaturesStore
}

export default combineReducers({
    jobs: jobsReducer,
    candidatures: candidaturesReducer
    
})