import React from "react";

import { Redirect, Route, RouteProps } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const isAuthenticated = localStorage.getItem("vl-token") ? true : false;
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? <Component /> : <Redirect to='/' />
      }
    />
  );
};

export default PrivateRoute;
