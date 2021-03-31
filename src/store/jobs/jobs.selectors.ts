import { createSelector } from "reselect"
import { BookmarkedJobs, Job } from "shared/models"
import { IRootStore } from "../root-reducer"
import { IJobsStore } from "./jobs.reducer"

const getJobsFromStore = (state: IRootStore): IJobsStore => state.jobs

export const getJobsPublished = createSelector([getJobsFromStore], (jobs: IJobsStore): Job[] => {
    return jobs.jobList;
})

export const getBookmarkedJobs = createSelector([getJobsFromStore], (jobs: IJobsStore): BookmarkedJobs|null => {
    return jobs.candidateBookmarkedJobs;
})

export const jobListSelectors = {
    getJobsPublished,
    getBookmarkedJobs
}