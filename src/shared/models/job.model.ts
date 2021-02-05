import { CategoryName, HardSkill, Status, Employer } from "./";

export interface Job {
    id: string;
    fields : {
        category: CategoryName;
        posted_at: Date;
        hard_skills: HardSkill[];
        status: Status;
        title: string;
        description: string;
        salary: number;
        location: string;
        employer?: Employer;
    }
    createdAt: Date|string;
}