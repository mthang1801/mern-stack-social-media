import React, { lazy, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { GET_CURRENT_USER } from "../apollo/operations/queries";
import { useLazyQuery } from "@apollo/client";
const SignIn = lazy(() => import("../components/Auth/SignIn"));
const SignUp = lazy(() => import("../components/Auth/SignUp"));

const AuthPage = (props) => {
  const { match, location, history } = props;
  const [getCurrentUser, { data }] = useLazyQuery(GET_CURRENT_USER, {
    fetchPolicy: "cache-only",
  });
  
  useEffect(() => {
    let _isMounted = true;
    if (_isMounted) {
      getCurrentUser();
    }
    return () => (_isMounted = false);
  }, [getCurrentUser]);
  useEffect(() => {    
    if (data) {
      if (data.user && location.state && location.state.from) {
        history.replace(location.state.from);
      } else if (data.user) {
        history.replace("/");
      }
    }
  }, [data, history, location.state]);  
  return (
    <Switch>
      <Route
        exact
        path={match.path}
        render={(props) => <SignIn authPath={match.path} {...props} />}
      />
      <Route
        exact
        path={`${match.path}/signup`}
        render={(props) => <SignUp authPath={match.path} {...props} />}
      />
    </Switch>
  );
};

export default AuthPage;
