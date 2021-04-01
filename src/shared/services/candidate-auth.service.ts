import { Candidate } from "shared/models";
import { getFromAirtable } from "./airtable.service";
import { auth, FirebaseUser } from "./firebase-utils.service";
const CANDIDATE_AIRTABLE_KEY = 'candidate-aitable';
const candidateAuthService = {
    logOut(){
        auth.signOut()
        .then(() => {
            candidateAuthService.clearCandidate();
            window.location.href = "/react-airtable-jobboard/auth/login";
        })
        
    },
    async signIn(email: FirebaseUser["email"], password: string){        
        return auth.signInWithEmailAndPassword(email as string, password);
    },
    isCandidateLoggedIn: (): boolean => auth.currentUser !== undefined,
    currentUser: auth.currentUser,

    async setCandidateFromFirebase(firebaseUid: string){
        const candidate: Candidate = await candidateAuthService.fetchCandidate(firebaseUid);        
        window.sessionStorage.setItem(CANDIDATE_AIRTABLE_KEY, JSON.stringify(candidate));                
    },
    clearCandidate(){
        window.sessionStorage.removeItem(CANDIDATE_AIRTABLE_KEY);
    },
    getCandidate(): Candidate{
        return JSON.parse(window.sessionStorage.getItem(CANDIDATE_AIRTABLE_KEY) || "{}");
    },
    async fetchCandidate(firebaseUid: string): Promise<Candidate>{
        const payload = await getFromAirtable({
            table: "candidates",
            view: "candidates",
            filters: [
                `(ext_uid="${firebaseUid}")`
            ]
        });
        return (payload?.records || [])[0];
    }
}

export default candidateAuthService;
