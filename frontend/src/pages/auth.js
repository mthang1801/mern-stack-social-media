import React, { lazy } from 'react'
import {Switch, Route} from "react-router-dom"
const SignIn = lazy(() => import("../components/Auth/SignIn"));
const SignUp = lazy(() => import("../components/Auth/SignUp"));
const AuthPage = (props) => {
  const {match, location} = props;
  console.log(match)
  return (
    <Switch>
      <Route exact path={match.path} render={props => <SignIn authPath={match.path} {...props} />}/>
      <Route exact path={`${match.path}/signup`} render={props => <SignUp authPath={match.path} {...props} />} />
    </Switch>
  )
}

export default AuthPage
