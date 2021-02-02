import { FC, ReactElement } from "react"
import { Job } from "../../shared/models"
import Drawer from "../layouts/Drawer/Drawer"

export type JobDetailPanelProps = {
    job: Job
} 

export const JobDetailPanel: FC<JobDetailPanelProps> = (): ReactElement => {
    <Drawer>
        
    </Drawer>
}