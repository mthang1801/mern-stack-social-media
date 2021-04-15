import React, { useEffect, useState, lazy, Suspense } from "react";
import GlobalStyles from "./GlobalStyles";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useThemeUI } from "theme-ui";
import {useFetchCurrentUser} from "../apollo/user/user.actions"
import ErrorBoundary from "../containers/ErrorBoundary";
import Explores from "../pages/explores";
import HomePage from "../pages/home"
import useUserStatusSubscriptions from "../hooks/useUserStatusSubscriptions"
import useContactSubscription from "../hooks/useContactSubscription"
const AuthPage = lazy(() => import("../pages/auth"));
const NotificationsPage = lazy(() => import("../pages/notifications"));
const PersonalPage = lazy(() => import("../pages/personal"));
const ContactsPage = lazy(() => import("../pages/contacts"));
const ChatsPage = lazy(() => import("../pages/chats"));

function App() { 
  const { colorMode } = useThemeUI();  
  const [isAuth, setIsAuth] = useState(null)  
  useFetchCurrentUser(isAuth)  ;
 
  useUserStatusSubscriptions()
  useContactSubscription()    
  
  return (
    <Router>
      <GlobalStyles theme={colorMode} />
      <ErrorBoundary>
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/explores" component={Explores} />
            <Route path="/auth" render={(props) => <AuthPage setIsAuth={setIsAuth} {...props}/>} />
            <Route path="/contacts" component={ContactsPage} />
            <Route path="/chats" component={ChatsPage} />
            <Route path="/notifications" component={NotificationsPage} />
            <Route path="/:slug" component={PersonalPage} />
          </Switch>
        </Suspense>
      </ErrorBoundary>
    </Router>
  );
}

export default (App);
