import React, { lazy, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { GET_CURRENT_USER } from "../apollo/operations/queries/cache";
import { useQuery } from "@apollo/client";
const SignIn = lazy(() => import("../components/Auth/SignIn"));
const SignUp = lazy(() => import("../components/Auth/SignUp"));

const AuthPage = (props) => {
  const { match, location, history } = props;
  const {
    data: { user },
  } = useQuery(GET_CURRENT_USER, {
    fetchPolicy: "cache-only",
  });

  useEffect(() => {
    if (user && location.state && location.state.from) {
      history.replace(location.state.from);
    } else if (user) {
      history.replace("/");
    }
  }, [user, history, location.state]);
  return (
    <Switch>
      <Route
        exact
        path={match.path}
        render={(props) => <SignIn authPath={match.path} {...props} />}
      />
      <Route
        path={`${match.path}/signup`}
        render={(props) => <SignUp authPath={match.path} {...props} />}
      />
    </Switch>
  );
};

export default AuthPage;
