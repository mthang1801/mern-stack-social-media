import React, { lazy, Suspense } from "react";
import GlobalStyles from "./GlobalStyles";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {useThemeUI} from "theme-ui"
const HomePage = lazy(() => import("../pages/home"));
const AuthPage = lazy(() => import("../pages/auth"));
function App() {
  const {colorMode} = useThemeUI()
  return (
    <Router>
      <GlobalStyles theme={colorMode}/>
      <Switch>
        <Suspense fallback={<div>Loading...</div>}>
          <Route exact path="/" component={HomePage} />
          <Route path="/auth" component={AuthPage}/>
        </Suspense>
      </Switch>
    </Router>
  );
}

export default App;
