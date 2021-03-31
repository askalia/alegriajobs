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
import Profile from "views/examples/Profile.js";
import JobListView from "../views/joblist.view/joblist.view"
import { BookmarkedJobListView } from "../views/bookmarked-joblist/bookmarked-joblist.component"
import AppliedJobListView from "../views/applied-joblist/applied-joblist.view.component"


const routes = [
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    //component: Index,
    component: JobListView,
    layout: "/candidate"
  },
  
  {
    path: "/user-profile",
    name: "User Profile",
    icon: "ni ni-single-02 text-yellow",
    component: Profile,
    layout: "/candidate"
  },
  {
    exact: true,
    path: "/index",
    name: "Jobs list ID",    
    icon: "ni ni-bullet-list-67 text-red",
    component: JobListView,
    layout: "/candidate",
    //noDisplay: true
  },  
  {
    path: "/jobs/bookmarked",
    name: "Bookmarked Jobs",
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
    name: "Bookmarked Jobs ID",
    icon: "ni ni-favourite-28 text-red",
    component: BookmarkedJobListView,
    layout: "/candidate",
    exact: true,
  },
  {
    path: "/jobs/applied",
    name: "Candidatures",    
    icon: "ni ni-send text-blue",
    component: AppliedJobListView,
    layout: "/candidate",    
  },
  {
    path: "/jobs/applied/:candidatureId",
    name: "Jobs applied ID",    
    icon: "ni ni-send text-blue",
    component: AppliedJobListView,
    layout: "/candidate",        
  },
  {
    path: "/jobs/:jobId",
    name: "Jobs list ID",    
    icon: "ni ni-bullet-list-67 text-red",
    component: JobListView,
    layout: "/candidate",
  },
  
  
  
];
export default routes;
