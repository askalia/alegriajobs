import { createSelector} from "reselect"
import { RootState } from "../root-reducer"
import { UserState } from "./user.reducer";

const getUserStateFromStore = (state: RootState) => state.user;

export const getCurrentUser = createSelector([getUserStateFromStore], (userState: UserState) => {
    console.log('getCurrentUser');
    return userState.currentUser;
})
