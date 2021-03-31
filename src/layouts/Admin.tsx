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
import AdminNavbar from "components/layouts/Navbars/AdminNavbar.js";
import AdminFooter from "components/layouts/Footers/AdminFooter.js";
import Sidebar from "components/layouts/Sidebar/Sidebar.js";
import {
  FirebaseUnsubscribe,
  FirebaseUser,
} from "../shared/services/firebase-utils.service";
import {
  IUserMapDispatchToProps,
  mapUserDispatchToProps,
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

class Admin extends React.Component<
  RouteComponentProps &
    IUserMapDispatchToProps &
    IJoblistDispatchers &
    ICandidaturesDispatchers
> {
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
    for (let i = 0; i < routes.length; i++) {
      if (
        this.props.location.pathname.indexOf(
          routes[i].layout + routes[i].path
        ) !== -1
      ) {
        return routes[i].name;
      }
    }
    return "Brand";
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
