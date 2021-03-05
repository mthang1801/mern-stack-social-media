import React, { useEffect, useState, lazy, Suspense } from "react";
import GlobalStyles from "./GlobalStyles";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useThemeUI } from "theme-ui";
import { cacheMutations } from "../apollo/operations/mutations";
import { FETCH_CURRENT_USER } from "../apollo/operations/queries/user";
import { useLazyQuery } from "@apollo/client";
import ErrorBoundary from "../containers/ErrorBoundary";
import Explores from "../pages/explores";
const HomePage = lazy(() => import("../pages/home"));
const AuthPage = lazy(() => import("../pages/auth"));
const NotificationsPage = lazy(() => import("../pages/notifications"));
const PersonalPage = lazy(() => import("../pages/personal"));
const ContactsPage = lazy(() => import("../pages/contacts"));
const ChatsPage = lazy(() => import("../pages/chats"));

function App() {
  const { colorMode } = useThemeUI();
  const [fetched, setFetched] = useState(false)
  const [fetchCurrentUser, { data }] = useLazyQuery(FETCH_CURRENT_USER, {
    fetchPolicy: "cache-and-network",
    onCompleted : data => {      
      setCurrentUser({...data.fetchCurrentUser})      
      setFetched(true);
    },
    onError : error => {
      setFetched(true);
    }
  });
 

  const { setCurrentUser, setPersonalUsers } = cacheMutations;

  useEffect(() => {
    let _isMounted = true;
    if (_isMounted) {
      fetchCurrentUser();
    }
    return () => (_isMounted = false);
  }, [fetchCurrentUser]);
  // useEffect(() => {
  //   console.log(data)
  //   if (data && data.fetchCurrentUser) {
  //     setCurrentUser({ ...data.fetchCurrentUser });
  //     setPersonalUsers(data.fetchCurrentUser);
  //   }
  // }, [data, setCurrentUser, setPersonalUsers]);
  if(!fetched) return null
  return (
    <Router>
      <GlobalStyles theme={colorMode} />
      <ErrorBoundary>
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/explores" component={Explores} />
            <Route path="/auth" component={AuthPage} />
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

export default App;
