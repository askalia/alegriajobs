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
import {
  Badge,
  Card,
  CardHeader,
  Table,
  Container,
  Row,
  Col,
  InputGroup,
  InputGroupText,
  InputGroupAddon,
  FormGroup,
  Input,
} from "reactstrap";
import shortid from "shortid";
// core components
import Header from "../../components/layouts/Headers/Header.js";

import "./joblist.view.scss";

import {
  IJoblistDispatchers,
  JoblistDispatchers,
} from "../../store/jobs/jobs.dispatchers";
import {
  CandidaturesDispatchers,
  ICandidaturesDispatchers,
} from "../../store/candidatures/candidatures.dispatchers";
import { IRootStore } from "store/root-reducer";
import { IJobsStore } from "store/jobs/jobs.reducer";
import { HardSkill, Job } from "shared/models";
import { candidateService } from "../../shared/services/candidate.service";
//import Drawer from "../../components/layouts/Drawer/Drawer";
import { JobDetailPanel } from "components/job-detail-panel/job-detail-panel.component";
import {
  SortDirectionIcon,
  SortDirection,
} from "components/sort-direction-icon/sort-direction-icon.component";
import { jobService } from "shared/services/jobs.service";
import { withRouter, RouteComponentProps } from "react-router-dom";

import { jobListSelectors } from "../../store/jobs/jobs.selectors";
import { ICandidateState } from "store/candidate/candidate.reducer.js";
import { ICandidaturesStore } from "store/candidatures/candidatures.reducer.js";

type IJobListViewProps = {
  bookmarkedJobsOnly?: boolean;
};

interface IJobListViewState {
  job: Job | null;
  openJobDetailPanel: boolean;
  jobList: Job[];
  sort: {
    direction: SortDirection;
    sortBy: keyof Job["fields"];
  };
}

class JobListView extends React.Component<
  IJobListViewProps,
  IJobListViewState
> {
  private unsubscribeRouteHistory: () => void = () => {};

  constructor(props: IJobListViewProps = { bookmarkedJobsOnly: false }) {
    super(props);

    this.state = {
      job: null,
      openJobDetailPanel: false,
      sort: {
        direction: "asc",
        sortBy: "posted_at",
      },
      jobList: (this.props as IMapStateToJoblistViewProps).jobList,
    } as IJobListViewState;
  }

  sortButton = ({ sortBy }: { sortBy: keyof Job["fields"] }) => {
    return (
      <SortDirectionIcon
        sortBy={sortBy}
        currentSortBy={this.state.sort.sortBy}
        onChangeDirection={this.setSortDirection}
      />
    );
  };

  async componentDidMount() {
    console.log("componentDidMount");
    const { listJobs, listCandidateBookmarkedJobs, refreshCandidatures } = this
      .props as IJoblistDispatchers & {
      refreshCandidatures: (candidateId: string) => Promise<void>;
    };

    await listJobs?.();
    await listCandidateBookmarkedJobs?.(candidateService.getCandidateId());
    await refreshCandidatures?.(candidateService.getCandidateId());

    const router = this.props as RouteComponentProps;

    this.unsubscribeRouteHistory = router.history.listen((history) => {
      const jobId = history.pathname.split("/").pop();
      this.activateJobDetailView(jobId);
    });
    const jobId = (this.props as RouteComponentProps<{ jobId?: string }>).match
      .params.jobId;
    console.log("jobId: here ", jobId);
    this.activateJobDetailView(jobId);
  }

  componentWillUnmount() {
    this.unsubscribeRouteHistory();
  }

  activateJobDetailView(jobId?: string) {
    if (jobId === undefined) {
      return;
    }
    const foundJob = (this.props as IMapStateToJoblistViewProps).jobList.find(
      (job) => job.id === jobId
    );
    console.log("foundJob : ", foundJob);

    foundJob !== undefined &&
      this.setState(
        () => ({
          job: foundJob,
        }),
        () => {
          this.openJobDetailPanel();
        }
      );
  }

  isBookmarkedJob = (jobId: string) => {
    return (
      (this.props as IMapStateToJoblistViewProps)?.candidateBookmarkedJobs || []
    ).includes(jobId);
  };

  bookmarkJob = (jobId: string) => {
    (this.props as IJoblistDispatchers).toggleCandidateBookmarkJob(jobId);
  };

  setCurrentJob = (job: Job, event: MouseEvent) => {
    if (
      event &&
      (event?.target as HTMLElement).nodeName !== "TD" &&
      (event?.target as HTMLElement).nodeName !== "TR"
    ) {
      this.closeJobDetailPanel();
      return;
    }
    this.followRoute(job.id);
  };

  followRoute(routeSuffix: string) {
    const baseUrl = this.props.bookmarkedJobsOnly
      ? "/candidate/jobs/bookmarked"
      : "/candidate/jobs";
    (this.props as RouteComponentProps).history.push(
      `${baseUrl}/${routeSuffix}`
    );
  }

  closeJobDetailPanel = () => {
    this.setState(() => ({
      openJobDetailPanel: false,
      job: null,
    }));
  };

  openJobDetailPanel = () => {
    this.setState(() => ({
      openJobDetailPanel: true,
    }));
  };

  setSearch = (searchPattern: string) => {
    const filterFunc = (valueSearchOn: string | undefined) =>
      (valueSearchOn || "").toLowerCase().includes(searchPattern.toLowerCase());

    const mapProps = (
      filterFunc: (valueSearchOn: string | undefined) => boolean
    ) => {
      return {
        title: (job: Job) => filterFunc(job?.fields?.title),
        location: (job: Job) => filterFunc(job?.fields?.location),
        category: (job: Job) => filterFunc(job?.fields?.category),
        employer: (job: Job) => filterFunc(job?.fields?.employer?.name),
        status: (job: Job) => filterFunc(job?.fields?.status),
        hard_skills: (job: Job) =>
          filterFunc(job?.fields?.hard_skills.map((sk) => sk.name).join("")),
      };
    };

    const jobProps = mapProps(filterFunc);

    const filteredJobList = [
      ...(this.props as IMapStateToJoblistViewProps).jobList,
    ].filter((job) =>
      Object.entries(jobProps).some(([, searchMatcher]) => searchMatcher(job))
    );

    this.setState(() => ({
      jobList: filteredJobList,
    }));
  };

  setSortDirection = (
    sortBy: keyof Job["fields"],
    sortDirection: SortDirection
  ) => {
    const resolveFieldName = (job: Job, fieldName: keyof Job["fields"]) => {
      const map = {
        title: job?.fields?.title,
        location: job?.fields?.location,
        category: job?.fields?.category,
        employer: job?.fields?.employer?.name,
        posted_at: new Date(job.fields.posted_at).getTime(),
      } as Record<keyof Job["fields"], string | number>;

      return String(map[fieldName] || "");
    };

    const getSortPattern = (propName: keyof Job["fields"]) => {
      switch (propName) {
        case "title":
        case "category":
        case "employer":
        case "posted_at":
        case "location":
          return (currentJob: Job, nextJob: Job) => {
            const currentJobFieldValue = resolveFieldName(currentJob, sortBy);
            const nextJobFieldValue = resolveFieldName(nextJob, sortBy);

            if (
              (currentJobFieldValue === "" && nextJobFieldValue === "") ||
              currentJobFieldValue === nextJobFieldValue
            ) {
              return 0;
            }
            if (currentJobFieldValue < nextJobFieldValue) {
              return sortDirection === "asc" ? -1 : 1;
            } else {
              return sortDirection === "desc" ? -1 : 1;
            }
          };
        case "status":
          return (currentJob: Job, nextJob: Job) => {
            const currentJobFieldValue = String(
              currentJob.fields[sortBy] || ""
            ).toLowerCase();
            const nextJobFieldValue = String(
              nextJob.fields[sortBy] || ""
            ).toLowerCase();
            const currentJobStatusPosition = jobService.statusPositions.findIndex(
              (refStatus) => refStatus === currentJobFieldValue
            );
            const nextJobStatusPosition = jobService.statusPositions.findIndex(
              (refStatus) => refStatus === nextJobFieldValue
            );

            if (currentJobStatusPosition < nextJobStatusPosition) {
              return sortDirection === "asc" ? -1 : 1;
            } else {
              return sortDirection === "desc" ? -1 : 1;
            }
          };
      }
    };

    console.log("setSortDirection : ", sortDirection, sortBy);
    const filteredJobList = [
      ...(this.props as IMapStateToJoblistViewProps).jobList,
    ].sort(getSortPattern(sortBy));

    console.log(
      "filteredJobList  ",
      filteredJobList.map((j) => j.fields.title)
    );

    this.setState(() => ({
      sort: {
        direction: sortDirection,
        sortBy,
      },
      jobList: filteredJobList,
    }));
  };

  scopeJobs = (jobList: Job[]) => {
    if (!this.props.bookmarkedJobsOnly) {
      return jobList;
    }
    return jobList.filter((job) => this.isBookmarkedJob(job.id));
  };

  canApplyJob = (job: Job) => {
    return jobService.canApplyJob(job, (this
      .props as IMapStateToJoblistViewProps).jobsApplied);
    
  };

  render() {
    return (
      <>
        <Header />

        {/* Page content */}
        <Container className="mt--7" fluid>
          {/* Table */}
          {this.state.openJobDetailPanel === true && (
            <JobDetailPanel
              job={this.state.job as Job}
              close={this.closeJobDetailPanel}
              canApplyJob={this.canApplyJob(this.state.job as Job)}
              applyJob={(this.props as ICandidaturesDispatchers).applyJob}
            />
          )}
          <Row>
            <div className="col">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <Row>
                    <Col lg="6">
                      <FormGroup>
                        <InputGroup className="mb-4">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="ni ni-zoom-split-in" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder="Search by title or location or category or..."
                            type="text"
                            onChange={(e) =>
                              this.setSearch(
                                (e.target as HTMLInputElement).value
                              )
                            }
                          />
                        </InputGroup>
                      </FormGroup>
                    </Col>
                  </Row>
                </CardHeader>

                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col"></th>
                      <th scope="col">
                        Title {this.sortButton({ sortBy: "title" })}
                      </th>
                      <th scope="col">
                        Category
                        {this.sortButton({ sortBy: "category" })}
                      </th>
                      <th scope="col">Skills</th>
                      <th scope="col">
                        Status
                        {this.sortButton({ sortBy: "status" })}
                      </th>
                      <th scope="col">
                        Company
                        {this.sortButton({ sortBy: "employer" })}
                      </th>
                      <th scope="col">
                        Location {this.sortButton({ sortBy: "location" })}
                      </th>
                      <th scope="col">
                        Posted at
                        {this.sortButton({ sortBy: "posted_at" })}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.scopeJobs(
                      this.state.jobList.length
                        ? this.state.jobList
                        : (this.props as IMapStateToJoblistViewProps).jobList
                    ).map((job) => (
                      <tr
                        key={shortid.generate()}
                        onClick={(e: any) => this.setCurrentJob(job, e)}
                      >
                        <td className="bookmarkJob">
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
                              <Badge
                                color="success"
                                key={shortid.generate()}
                                pill
                              >
                                {sk.name}
                              </Badge>
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
  jobList: IJobsStore["jobList"];
  candidateBookmarkedJobs: IJobsStore["candidateBookmarkedJobs"];
  jobsApplied: ICandidaturesStore;
};

const mapStateToJoblistViewProps = (
  state: IRootStore
): IMapStateToJoblistViewProps => ({
  jobList: jobListSelectors.getJobsPublished(state),
  candidateBookmarkedJobs: state.jobs.candidateBookmarkedJobs,
  jobsApplied: state.candidatures,
});

const combineMapDispatchToProps = (dispatch: any) => ({
  ...JoblistDispatchers(dispatch),
  ...CandidaturesDispatchers(dispatch),
});

export default connect(
  mapStateToJoblistViewProps,
  combineMapDispatchToProps
)(withRouter(JobListView));
