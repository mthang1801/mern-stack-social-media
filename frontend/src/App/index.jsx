import React, { lazy, Suspense } from "react";
import GlobalStyles from "./GlobalStyles";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {useThemeUI} from "theme-ui"
const HomePage = lazy(() => import("../pages/home"));
function App() {
  const {colorMode} = useThemeUI()
  return (
    <Router>
      <GlobalStyles theme={colorMode}/>
      <Switch>
        <Suspense fallback={<div>Loading...</div>}>
          <Route exact path="/" component={HomePage} />
        </Suspense>
      </Switch>
    </Router>
  );
}

export default App;
