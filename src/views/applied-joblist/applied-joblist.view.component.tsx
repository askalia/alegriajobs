import React from "react";
import { connect } from "react-redux";
import { IRootStore } from "../../store/root-reducer";
import {
  CandidaturesDispatchers,
  ICandidaturesDispatchers,
} from "../../store/candidatures/candidatures.dispatchers";
import { candidateService } from "../../shared/services/candidate.service";
import { Candidature, Job } from "../../shared/models";

import { Container, Row } from "reactstrap";
import Header from "../../components/layouts/Headers/Header.js";

import { AppliedJoblistTable } from "./applied-joblist-table.component";
import { AppliedJoblistCards } from "./applied-joblist-cards.component";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { CandidatureDetailPanel } from "../../components/candidature-detail-panel/candidature-detail-panel.component";
import {
  IJoblistDispatchers,
  JoblistDispatchers,
} from "store/jobs/jobs.dispatchers";

import "./applied-joblist.view.component.scss"

interface IAppliedJobListViewState {
  displayAs: "CARDS" | "TABLE";
  //openCandidatureDetailPanel: boolean;
  currentCandidature: Candidature | null;
}

interface IAppliedJoblistViewProps
  extends RouteComponentProps<{
      candidatureId?: string;
    }>,
    ICandidaturesDispatchers,
    IJoblistDispatchers {
  candidatures: Candidature[];
  jobList: Job[];
  displayAs: "CARDS" | "TABLE";
}

const initialState: IAppliedJobListViewState = {
  displayAs: "CARDS",
  //openCandidatureDetailPanel: false,
  currentCandidature: null,
};

class AppliedJobListView extends React.Component<
  IAppliedJoblistViewProps,
  IAppliedJobListViewState
> {
  private unsubscribeRouteHistory: () => void = () => {};

  constructor(props: IAppliedJoblistViewProps) {
    super(props);
    this.state = { ...initialState };
  }

  async componentDidMount() {
    await this.loadData();
    this.handleDetailPanel();
  }

  async loadData() {
    const { listCandidatures, listJobs } = this.props;
    await listJobs?.();
    await listCandidatures?.(candidateService.getCandidateId());
  }

  handleDetailPanel() {
    this.unsubscribeRouteHistory = this.props.history.listen((history) => {
      const candidatureId = history.pathname.split("/").pop();
      this.activateCandidatureDetailView(candidatureId);
    });

    const candidatureId = this.props.location.pathname.split("/").pop();

    candidatureId !== "applied" &&
      this.activateCandidatureDetailView(candidatureId);
  }

  activateCandidatureDetailView(candidatureId?: string) {
    if (candidatureId === undefined) {
      return;
    }
    const foundCandidature = this.props.candidatures.find(
      (candidature) => candidature?.id === candidatureId
    );

    foundCandidature !== undefined &&
      this.setState(() => ({
        currentCandidature: foundCandidature,
      }));
  }

  closeCandidatureDetailPanel = () => {
    this.setState(() => ({
      currentCandidature: null,
    }));
    (this.props as RouteComponentProps).history.push(`/candidate/jobs/applied`);
  };

  findJobById = (jobId: string) => {
    return this.props.jobList.find((job) => job.id === jobId);
  };

  onSelectCandidature = (candidature: Candidature, event?: MouseEvent) => {
    event?.preventDefault();
    this.followRoute(candidature?.id as string);
  };

  followRoute(routeSuffix: string) {
    if (!routeSuffix) {
      return;
    }
    (this.props as RouteComponentProps).history.push(
      `/candidate/jobs/applied/${routeSuffix}`
    );
  }

  componentWillUnmount() {
    this.unsubscribeRouteHistory();
    this.setState(() => ({ ...initialState }));
  }

  render() {
    const { candidatures } = this.props;

    const panelsCommonProps = {
      candidatures,
      findJobById: this.findJobById.bind(this),
      onSelect: this.onSelectCandidature,
    };

    return (
      <>
        <Header />
        <Container className="mt--7" fluid>
          {this.state.currentCandidature && (
            <CandidatureDetailPanel
              candidature={this.state.currentCandidature as Candidature}
              close={this.closeCandidatureDetailPanel}
              job={
                this.findJobById(
                  this.state?.currentCandidature?.fields?.job[0] as string
                ) as Job
              }
            />
          )}
          <Row>
            <div className="col list-jobs-applied">
              {this.state.displayAs === "TABLE" ? (
                <AppliedJoblistTable {...panelsCommonProps} />
              ) : (
                <AppliedJoblistCards {...panelsCommonProps} />
              )}
            </div>
          </Row>
        </Container>
      </>
    );
  }
}

const mapStateToProps = (state: IRootStore) => ({
  candidatures: state.candidatures,
  jobList: state.jobs.jobList,
});

const combineMapDispatchToProps = (
  dispatch: any
): ICandidaturesDispatchers & IJoblistDispatchers => ({
  ...JoblistDispatchers(dispatch),
  ...CandidaturesDispatchers(dispatch),
});

export default connect(
  mapStateToProps,
  combineMapDispatchToProps
)(withRouter(AppliedJobListView));
