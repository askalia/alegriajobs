/*!

=========================================================
* Argon Dashboard React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import { connect } from "react-redux";
// reactstrap components
import { Badge, Card, CardHeader, Table, Container, Row } from "reactstrap";
import shortid from "shortid";
// core components
import Header from "../../components/layouts/Headers/Header.js";

import "./joblist.view.scss";

import {
  IJoblistDispatchers,
  JoblistDispatchers,
} from "../../store/jobs/jobs.dispatchers";
import { RootState } from "store/root-reducer";
import { JobsState } from "store/jobs/jobs.reducer";
import { HardSkill } from "shared/models/index.js";
import { candidateService } from "../../shared/services/candidate.service";
import Drawer from "../../components/layouts/Drawer/Drawer";

class JobListView extends React.Component {
  componentDidMount() {
    const { listJobs, listCandidateBookmarkedJobs } = this
      .props as IJoblistDispatchers;
    listJobs?.();

    listCandidateBookmarkedJobs?.(candidateService.getCandidateId());
  }

  isBookmarkedJob = (jobId: string) => {
    return (this
      .props as IMapStateToJoblistViewProps).candidateBookmarkedJobs.includes(
      jobId
    );
  };

  bookmarkJob = (jobId: string) => {
    (this.props as IJoblistDispatchers).toggleCandidateBookmarkJob(jobId);
  };

  render() {
    const { jobList } = this.props as IMapStateToJoblistViewProps;
    return (
      <>
        <Header />
        <Drawer
          {...this.props}
          routes={[]}
          toggleSidenav={true}
          sidenavOpen={true}
        />
        {/* Page content */}
        <Container className="mt--7" fluid>
          {/* Table */}

          <Row>
            <div className="col">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <h3 className="mb-0">Card tables</h3>
                </CardHeader>

                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col"></th>
                      <th scope="col">Title</th>
                      <th scope="col">Category</th>
                      <th scope="col">Skills</th>
                      <th scope="col">status</th>
                      <th scope="col">Company</th>
                      <th scope="col">Location</th>
                      <th scope="col">Posted at</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(jobList || []).map((job) => (
                      <tr key={shortid.generate()}>
                        <td>
                          <span
                            className="btn-inner--icon favorite-button"
                            onClick={(e) => this.bookmarkJob(job.id)}
                          >
                            <i
                              className={`ni ni-favourite-28 ${
                                this.isBookmarkedJob(job.id) ? "text-red" : ""
                              }`}
                            />
                          </span>
                        </td>
                        <td>{job.fields.title}</td>
                        <td>
                          <Badge
                            color={
                              job.fields.category === "tech"
                                ? "info"
                                : "warning"
                            }
                            pill
                          >
                            {job.fields.category}
                          </Badge>
                        </td>
                        <td>
                          {(job.fields.hard_skills || []).map(
                            (sk: HardSkill) => (
                              <>
                                <Badge
                                  color="success"
                                  key={shortid.generate()}
                                  pill
                                >
                                  {sk.name}
                                </Badge>
                                &#160;
                              </>
                            )
                          )}
                        </td>
                        <td>{job.fields.status}</td>
                        <td>{job.fields.employer?.name}</td>
                        <td>{job.fields.location}</td>
                        <td>{job.fields.posted_at}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card>
            </div>
          </Row>
        </Container>
      </>
    );
  }
}

type IMapStateToJoblistViewProps = {
  jobList: JobsState["jobList"];
  candidateBookmarkedJobs: JobsState["candidateBookmarkedJobs"];
};

const mapStateToJoblistViewProps = (
  state: RootState
): IMapStateToJoblistViewProps => ({
  jobList: state.jobs.jobList,
  candidateBookmarkedJobs: state.jobs.candidateBookmarkedJobs,
});

export default connect(
  mapStateToJoblistViewProps,
  JoblistDispatchers
)(JobListView);
