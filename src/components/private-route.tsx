import { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function GuardRoute({
  AdminLayout,
  AuthLayout,
  ...rest
}: any) {
  const { currentUser } = useAuth();

  return (
    <Route
      render={(props) => {
        return currentUser ? (
          <AdminLayout {...props} />
        ) : (
          <AuthLayout {...props} />
        );
      }}
    ></Route>
  );
}
