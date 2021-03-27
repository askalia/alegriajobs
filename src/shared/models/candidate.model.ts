

export interface CandidateFields {
    email: string;
    fullname: string;
    active: boolean;
    candidatures?: string[];
    ext_uid: string;
    bookmarked_jobs?: string[];
}

export interface Candidate {
    id?: string;
    fields: CandidateFields;    
}


