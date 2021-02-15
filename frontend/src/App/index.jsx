import React,  { useEffect ,lazy, Suspense } from "react";
import GlobalStyles from "./GlobalStyles";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {useThemeUI} from "theme-ui"
import {FETCH_CURRENT_USER}  from "../apollo/operations/queries"
import mutations from "../apollo/operations/mutations"
import {useLazyQuery} from "@apollo/client"
const HomePage = lazy(() => import("../pages/home"));
const AuthPage = lazy(() => import("../pages/auth"));
function App() {
  const {colorMode} = useThemeUI()  
  const [fetchCurrentUser, {data, loading}] = useLazyQuery(FETCH_CURRENT_USER)  
  const {setCurrentUser} = mutations;
  
  useEffect(() => {    
    let _isMounted = true ; 
    if(_isMounted){      
      fetchCurrentUser()
    }
    return () => _isMounted = false ;
  }, [fetchCurrentUser])

  useEffect(() => {    
    if(data && data.fetchCurrentUser){       
      setCurrentUser({...data.fetchCurrentUser})
    }
  },[data, setCurrentUser])  
  if(loading) return <div>Loading...</div>
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
