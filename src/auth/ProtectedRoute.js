import React from 'react';
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({ component: Component, ...props  }) => {
  return (
    <Route
      {...props}
      render={(routeProps) =>
        props.loggedIn ? <Component {...routeProps} {...props} /> : <Redirect to="/signin" />
      }
    />
)}

export default ProtectedRoute;
