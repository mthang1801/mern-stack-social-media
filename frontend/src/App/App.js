import React, { useEffect, useState, lazy, Suspense } from "react";
import GlobalStyles from "./GlobalStyles";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useThemeUI } from "theme-ui";
import {useQuery} from "@apollo/client"
import {userVar} from "../apollo/cache"
import {FETCH_CURRENT_USER} from "../apollo/user/user.types"
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
  const { refetch: fetchCurrentUser } = useQuery(
    FETCH_CURRENT_USER,
    {
      fetchPolicy: "no-cache",
      skip: true,
      notifyOnNetworkStatusChange: true,
    }
  );
  const user = userVar();

  useEffect(() => {
    let _isMounted = true;
    if (fetchCurrentUser && !user) {
      fetchCurrentUser().then(({ data }) => {
        if (data && _isMounted) {
          userVar(data.fetchCurrentUser);
        }
      });
    }
    return () => (_isMounted = false);
  }, [isAuth, fetchCurrentUser, user]); 
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
