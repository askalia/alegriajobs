import { Dispatch } from "react";
import { FirebaseUser } from "shared/services/firebase-utils.service";
import { ReducerAction } from "../../shared/models";

export enum UserActionTypes {
    SET_CURRENT_USER = "SET_CURRENT_USER",
    SIGNIN_WITH_CREDENTIALS = "SIGNIN_WITH_CREDENTIALS",
    SIGNIN_WITH_GOOGLE = "SIGNIN_WITH_GOOGLE",
    SIGNUP = "SIGNUP"
}

export type setCurrentUserReturnType = ReducerAction<UserActionTypes.SET_CURRENT_USER, FirebaseUser>

export const setCurrentUser = (currentUser: FirebaseUser): setCurrentUserReturnType  => ({
   type: UserActionTypes.SET_CURRENT_USER,
   payload: currentUser
});

export type IUserMapDispatchToProps = {
    setCurrentUser: (user: FirebaseUser) => void;
};

export const mapUserDispatchToProps = (dispatch: Dispatch<setCurrentUserReturnType>): IUserMapDispatchToProps => ({
    setCurrentUser: (user: FirebaseUser) => dispatch(setCurrentUser(user)),
});