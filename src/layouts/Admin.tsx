import React from "react";
import {
  Route,
  Switch,
  Redirect,
  withRouter,
  RouteComponentProps,
} from "react-router-dom";
// reactstrap components
import { Container } from "reactstrap";
// core components
import AdminNavbar from "components/layouts/Navbars/AdminNavbar";
import AdminFooter from "components/layouts/Footers/AdminFooter.js";
import Sidebar from "components/layouts/Sidebar/Sidebar.js";
import {
  FirebaseUser,
} from "../shared/services/firebase-utils.service";
import {
  IUserMapDispatchToProps,  
} from "../store/user/user.actions";

import { IRootStore } from "store/root-reducer";
import { connect } from "react-redux";
import {
  IJoblistDispatchers,
  JoblistDispatchers,
} from "store/jobs/jobs.dispatchers";
import {
  CandidaturesDispatchers,
  ICandidaturesDispatchers,
} from "store/candidatures/candidatures.dispatchers";
import candidateAuthService from "shared/services/candidate-auth.service";

import routes from "./admin.routes";
import { Candidate } from "shared/models";

type IAdminProps = { candidate: Candidate }
& RouteComponentProps &
IUserMapDispatchToProps &
IJoblistDispatchers &
ICandidaturesDispatchers;

class Admin extends React.Component<IAdminProps> {
  async componentDidMount() {
    await this.fetchData();
  }
  componentDidUpdate() {
    document.documentElement.scrollTop = 0;
    document?.scrollingElement && (document.scrollingElement.scrollTop = 0);
    //this.refs.mainContent.scrollTop = 0;
  }

  async fetchData() {
    const {
      listJobs,
      listCandidateBookmarkedJobs,
      refreshCandidatures,
    } = this.props;

    await listJobs?.();
    await listCandidateBookmarkedJobs?.(
      candidateAuthService.getCandidate().id as string
    );
    await refreshCandidatures?.(
      candidateAuthService.getCandidate().id as string
    );
  }

  getRoutes = (routes: any[]) => {
    return routes.map((prop, key) => {
      if (prop?.layout === "/admin" || prop?.layout === "/candidate") {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
            exact={prop.exact || false}
          />
        );
      } else {
        return null;
      }
    });
  };

  getBrandText = (path?: string) => {
    const currentRoute = routes.find(r => r.layout + r.path === this.props.location.pathname);
    return (currentRoute?.name || "")    
  };

  getRoutesLinks = () => {
    const displayableRoutes: string[] = [
      "/jobs",
      "/jobs/applied",
      "/jobs/bookmarked",
      "/user-profile",
    ];
    const filtered = routes.filter((rt) => displayableRoutes.includes(rt.path));
    return filtered.sort((current, next) => {
      return (
        displayableRoutes.indexOf(current.path) -
        displayableRoutes.indexOf(next.path)
      );
    });
  };

  render() {
    return (
      <>
        <Sidebar
          {...this.props}
          routes={this.getRoutesLinks()}
          logo={{
            innerLink: "/candidate/jobs",
            imgSrc: require("assets/img/brand/argon-react.png").default,
            imgAlt: "...",
          }}
        />
        <div className="main-content">
          <AdminNavbar
            {...this.props}
            candidate={this.props.candidate}
            brandText={this.getBrandText(this.props.location.pathname)}
          />
          <Switch>
            {this.getRoutes(routes)}
            <Redirect from="*" to="/candidate/jobs" />
          </Switch>
          <Container fluid>
            <AdminFooter />
          </Container>
        </div>
      </>
    );
  }
}

type IUserMapStateToProps = {
  currentUser: FirebaseUser | null;
};
const mapStateToProps = (store: IRootStore): IUserMapStateToProps => ({
  currentUser: store.user.currentUser,
});

const combineMapDispatchToProps = (dispatch: any) => ({
  ...JoblistDispatchers(dispatch),
  ...CandidaturesDispatchers(dispatch),
});

export default connect(
  mapStateToProps,
  combineMapDispatchToProps
)(withRouter(Admin));
