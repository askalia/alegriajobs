import { FirebaseUser } from "shared/services/firebase-utils.service";
import { ReducerAction } from "../../shared/models"
import { UserActionTypes } from "./user.actions";

export type IUserState = {
    currentUser: FirebaseUser | null
};

const initialUserState: IUserState = {
    currentUser: null
} 

export const userReducer = (
    currentState: IUserState = initialUserState, 
    action: ReducerAction<UserActionTypes, FirebaseUser|null>): IUserState => {
                
    switch (action.type){

        case UserActionTypes.SET_CURRENT_USER :
            if (! action.payload){
                return currentState
            }
              return {
                ...currentState,
                currentUser: action.payload
            };
        case UserActionTypes.SIGNIN_WITH_CREDENTIALS :
        case UserActionTypes.SIGNIN_WITH_GOOGLE : {
            if (! action.payload){
                return currentState
            }
            return  {
                ...currentState,
                currentUser: action.payload
            }            
        }
        case UserActionTypes.SIGNUP: {
            if (! action.payload){
                return currentState
            }
            
            ///const fullUser = await getUser(action.payload?.uid);
            return {
                ...currentState,
                currentUser: action.payload
            }
        }
        default: 
            return currentState;
    }
}