import { createSelector } from "reselect"
import { IRootStore } from "../root-reducer"
import { IJobsStore } from "./jobs.reducer"

const getJobsFromStore = (state: IRootStore): IJobsStore => state.jobs

export const getJobsPublished = createSelector([getJobsFromStore], (jobs: IJobsStore) => {
    return jobs.jobList.filter(job => job.fields.status === "published")
})

export const jobListSelectors = {
    getJobsPublished
}