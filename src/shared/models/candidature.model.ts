


export interface Resume {
    url: string;
    filename: string;
 

}

export interface Fields {
    candidate: string[];
    resume: Resume[];
    cover_letter: string;
    job: string[];
}

export interface Candidature {
    fields: Fields;
}