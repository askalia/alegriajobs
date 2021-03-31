
import firebase from "firebase/app" ;
//import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";

let _firebaseInstance: firebase.app.App | undefined = undefined;

const _firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    //messagingSenderId: process.env.REACT_APP_FIREBASE_MESSENGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    //measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

const setupFirebase = (): firebase.app.App => {
    
    // Initialize Firebase
    if (_firebaseInstance === undefined){
        console.log('setup firebase')
        _firebaseInstance = firebase.initializeApp(_firebaseConfig);
        //firebase.analytics();
    }
    return _firebaseInstance;
}



setupFirebase();

export const auth = firebase.auth();
//export const firestore = firebase.firestore();
export const storage = firebase.storage();

export type FirebaseUser = firebase.User;
export type FirebaseUnsubscribe = firebase.Unsubscribe;
//export type FirebaseDocumentData = firebase.firestore.DocumentData;
export type FirebaseUserCredential = firebase.auth.UserCredential;
export default firebase;

export const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.setCustomParameters({
        prompt: "select_account"    
    }); 
    return auth.signInWithPopup(provider) 
};
