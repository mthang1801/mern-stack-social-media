import React, { lazy, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { userVar } from '../apollo/cache';
import { useReactiveVar } from '@apollo/client';
const SignIn = lazy(() => import('../components/Auth/SignIn'));
const SignUp = lazy(() => import('../components/Auth/SignUp'));

const AuthPage = ({ setIsAuth, ...props }) => {
  const { match, location, history } = props;
  const user = useReactiveVar(userVar);
  useEffect(() => {
    if (user && location.state && location.state.from) {
      history.replace(location.state.from);
      setIsAuth(true);
    } else if (user) {
      history.replace('/');
      setIsAuth(Date.now());
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
