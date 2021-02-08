import { createSelector } from "reselect"
import { RootState } from "../root-reducer"
import { JobsState } from "./jobs.reducer"

const getJobsFromStore = (state: RootState): JobsState => state.jobs

export const getJobsPublished = createSelector([getJobsFromStore], (jobs: JobsState) => {
    return jobs.jobList.filter(job => job.fields.status === "published")
})

export const jobListSelectors = {
    getJobsPublished
}