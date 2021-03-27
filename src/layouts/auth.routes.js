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
import Signup from "views/auth/signup";
import Signin from "views/auth/signin";

const routes = [
 
  {
    path: "/login",
    name: "Signin",
    icon: "ni ni-key-25 text-info",
    component: Signin,
    layout: "/auth"
  },
  
  {
    path: "/signup",
    name: "Signup",
    icon: "ni ni-circle-08 text-pink",
    component: Signup,
    layout: "/auth"
  }
];
export default routes;
