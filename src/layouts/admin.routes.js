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
import Profile from "containers/profile/Profile";
import JobListView from "../containers/joblist.view/joblist.view"
import { BookmarkedJobListView } from "../containers/bookmarked-joblist/bookmarked-joblist.component"
import AppliedJobListView from "../containers/applied-joblist/applied-joblist.view.component"


const routes = [
  {
    path: "/user-profile",
    exact: true,
    name: "My profile",
    icon: "ni ni-single-02 text-yellow",
    component: Profile,
    layout: "/candidate"
  },  
  {
    path: "/jobs/bookmarked",
    name: "My bookmarked jobs",
    icon: "ni ni-favourite-28 text-red",
    component: BookmarkedJobListView,
    layout: "/candidate",
    exact: true,
  },
  {
    path: "/jobs",
    name: "Jobs list",    
    icon: "ni ni-bullet-list-67 text-red",
    component: JobListView,
    layout: "/candidate",
    exact: true
  },
  {
    path: "/jobs/bookmarked/:jobId",    
    name: "My bookmarked jobs",
    icon: "ni ni-favourite-28 text-red",
    component: BookmarkedJobListView,
    layout: "/candidate",
    exact: true,
  },
  {
    path: "/jobs/applied",
    name: "My candidatures",    
    icon: "ni ni-send text-blue",
    component: AppliedJobListView,
    layout: "/candidate",    
  },
  {
    path: "/jobs/applied/:candidatureId",    
    name: "My candidatures",
    icon: "ni ni-send text-blue",
    component: AppliedJobListView,
    layout: "/candidate",        
  },
  {
    path: "/jobs/:jobId",    
    name: "Jobs list",    
    icon: "ni ni-bullet-list-67 text-red",
    component: JobListView,
    layout: "/candidate",
  },
];
export default routes;
