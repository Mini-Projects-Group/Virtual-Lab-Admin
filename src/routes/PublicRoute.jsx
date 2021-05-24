import React from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";

const PublicRoute = ({ component: Component, ...rest }) => {
  const token = localStorage.getItem("vl-token");
  return (
    <Route
      {...rest}
      render={(props) => {
        return !token ? <Component {...props} /> : <Redirect to='/auth' />;
      }}
    />
  );
};

export default PublicRoute;
