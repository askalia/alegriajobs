import { FirebaseUser } from "../services/firebase-utils.service";

export interface User extends Pick<
  FirebaseUser,
  "uid" | "displayName" | "email" | "phoneNumber" | "photoURL"
> {
    
}