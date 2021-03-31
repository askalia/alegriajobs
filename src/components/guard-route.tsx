import { Route } from "react-router-dom";
import candidateAuthService from "shared/services/candidate-auth.service";
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
          <AdminLayout {...props} candidate={candidateAuthService.getCandidate()} />
        ) : (
          <AuthLayout {...props} />
        );
      }}
    ></Route>
  );
}
