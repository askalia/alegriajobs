import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider as StoreProvider } from "react-redux";

import "assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/argon-dashboard-react.scss";

import AdminLayout from "./layouts/Admin";
import AuthLayout from "./layouts/Auth";
import store from "./store/store";
import GuardRoute from "./components/guard-route";
import { AuthProvider } from "./contexts/AuthContext";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <StoreProvider store={store}>
        <AuthProvider>
          <GuardRoute
            path="/"
            AdminLayout={AdminLayout}
            AuthLayout={AuthLayout}
          />
        </AuthProvider>
      </StoreProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
