import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { Login, UserList, UserDetails, NotFound } from "./views";
import { useUser } from "./context/user.context";

const Routes = () => {
  const { token } = useUser();
  return (
    <Switch>
      {token ? (
        <Redirect from="/login" to="/user" />
      ) : (
        <>
          <Redirect from="*" to="/login" />
          <Route component={Login} exact path="/login" />
        </>
      )}
      <Route component={UserList} exact path="/user" />
      <Route component={UserDetails} path="/user/:id" />
      <Route component={NotFound} path="*" />
    </Switch>
  );
};

export default Routes;
