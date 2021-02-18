import { Job } from "./job.model";


export interface Thumbnails {
    small: {
        url: string
    }
}

export interface Resume {
    url: string;
    filename: string;
    thumbnails?: Thumbnails 

}

export interface Fields {
    candidate: string[];
    resume: Resume[];
    cover_letter: string;
    job: string[]
}

export interface Candidature {
    id?: string;
    fields: Fields;
}