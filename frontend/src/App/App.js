import React, { useEffect, lazy, Suspense } from "react";
import GlobalStyles from "./GlobalStyles";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useThemeUI } from "theme-ui";
import { FETCH_CURRENT_USER } from "../apollo/operations/queries";
import mutations from "../apollo/operations/mutations";
import { useLazyQuery } from "@apollo/client";
const HomePage = lazy(() => import("../pages/home"));
const AuthPage = lazy(() => import("../pages/auth"));
const NotificationsPage = lazy(() => import("../pages/notifications"));
const PersonalPage = lazy(() => import("../pages/personal"));

function App() {
  const { colorMode } = useThemeUI();
  const [fetchCurrentUser, { data }] = useLazyQuery(FETCH_CURRENT_USER, {
    fetchPolicy: "cache-and-network",
  });

  const { setCurrentUser, setPersonalUsers } = mutations;

  useEffect(() => {
    let _isMounted = true;
    if (_isMounted) {
      fetchCurrentUser();
    }
    return () => (_isMounted = false);
  }, [fetchCurrentUser]);

  useEffect(() => {
    if (data && data.fetchCurrentUser) {
      setCurrentUser({ ...data.fetchCurrentUser });
      setPersonalUsers(data.fetchCurrentUser)     
    }
  }, [data, setCurrentUser]);

  return (
    <Router>
      <GlobalStyles theme={colorMode} />
      <Suspense fallback={<div>Loading...</div>}>        
        <Switch>
          <Route exact path="/" component={HomePage} />         
          <Route exact path="/auth" component={AuthPage} />
          <Route exact path="/notifications" component={NotificationsPage} />
          <Route path="/:slug" component={PersonalPage} />
        </Switch>
       
      </Suspense>
    </Router>
  );
}

export default App;