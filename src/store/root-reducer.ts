import { combineReducers} from "redux";
import { jobsReducer, IJobsStore } from "./jobs/jobs.reducer";
import { candidaturesReducer, ICandidaturesStore } from "./candidatures/candidatures.reducer"
import { userReducer, IUserState } from "./user/user.reducer"

export type IRootStore = {
    user: IUserState,
    jobs: IJobsStore,
    candidatures: ICandidaturesStore
}

export default combineReducers({
    user: userReducer,
    jobs: jobsReducer,
    candidatures: candidaturesReducer
    
})