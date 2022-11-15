import { useKeycloak } from "@react-keycloak/web";
import React from "react";

 
const PrivateRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const { keycloak } = useKeycloak();

  const isLoggedIn = keycloak.authenticated;

  return isLoggedIn ? children : null;
};

export default PrivateRoute;
