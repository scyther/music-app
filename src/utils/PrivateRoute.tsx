import { useKeycloak } from "@react-keycloak/web";
import React from "react";

const PrivateRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const { keycloak } = useKeycloak();

  const isLoggedIn = keycloak.authenticated;

  return isLoggedIn ? (
    children
  ) : (
    <div className="d-flex flex-row justify-content-center align-items-center" style={{ height: "100%" }}>
      <h1>Please Login First</h1>
    </div>
  );
};

export default PrivateRoute;
