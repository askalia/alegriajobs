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
import Index from "views/Index.js";
import Profile from "views/examples/Profile.js";
import Maps from "views/examples/Maps.js";
import Register from "views/examples/Register.js";
import Login from "views/examples/Login.js";
import Tables from "views/examples/Tables.js";
import Icons from "views/examples/Icons.js";

import JobListView from "./views/joblist.view/joblist.view"
import { BookmarkedJobListView } from "./views/bookmarked-joblist/bookmarked-joblist.component"
import AppliedJobListView from "./views/applied-joblist/applied-joblist.view.component"

var routes = [
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: Index,
    layout: "/admin"
  },
  {
    path: "/icons",
    name: "Icons",
    icon: "ni ni-planet text-blue",
    component: Icons,
    layout: "/admin"
  },
  {
    path: "/maps",
    name: "Maps",
    icon: "ni ni-pin-3 text-orange",
    component: Maps,
    layout: "/admin"
  },
  {
    path: "/user-profile",
    name: "User Profile",
    icon: "ni ni-single-02 text-yellow",
    component: Profile,
    layout: "/admin"
  },
  {
    path: "/tables",
    name: "Tables",
    icon: "ni ni-bullet-list-67 text-red",
    component: Tables,
    layout: "/admin"
  },

  
  {
    path: "/jobs",
    name: "Jobs list",    
    icon: "ni ni-bullet-list-67 text-red",
    component: JobListView,
    layout: "/admin",
    exact: true
  },
  
  {
    path: "/login",
    name: "Login",
    icon: "ni ni-key-25 text-info",
    component: Login,
    layout: "/auth"
  },
  {
    path: "/jobs/bookmarked",
    name: "Bookmarked Jobs",
    icon: "ni ni-favourite-28 text-red",
    component: BookmarkedJobListView,
    layout: "/admin",
    exact: true,
  },
  {
    path: "/jobs/bookmarked/:jobId",
    name: "Bookmarked Jobs ID",
    icon: "ni ni-favourite-28 text-red",
    component: BookmarkedJobListView,
    layout: "/admin",
    exact: true,
  },
  {
    path: "/jobs/applied",
    name: "Jobs applied",    
    icon: "ni ni-send text-blue",
    component: AppliedJobListView,
    layout: "/admin",
    //noDisplay: true
  },
  {
    path: "/jobs/applied/:candidatureId",
    name: "Jobs applied ID",    
    icon: "ni ni-send text-blue",
    component: AppliedJobListView,
    layout: "/admin",    
    //noDisplay: true
  },
  {
    path: "/jobs/:jobId",
    name: "Jobs list ID",    
    icon: "ni ni-bullet-list-67 text-red",
    component: JobListView,
    layout: "/admin",
    //noDisplay: true
  },
  {
    path: "/register",
    name: "Register",
    icon: "ni ni-circle-08 text-pink",
    component: Register,
    layout: "/auth"
  }
];
export default routes;
