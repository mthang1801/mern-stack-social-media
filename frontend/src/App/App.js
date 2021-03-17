import React, { useEffect, useState, lazy, Suspense } from "react";
import GlobalStyles from "./GlobalStyles";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useThemeUI } from "theme-ui";
import { cacheMutations } from "../apollo/operations/mutations";
import { FETCH_CURRENT_USER, FETCH_FRIENDS } from "../apollo/operations/queries/user";
import { useQuery } from "@apollo/client";
import ErrorBoundary from "../containers/ErrorBoundary";
import Explores from "../pages/explores";
import io from "socket.io-client";
import { FETCH_NOTIFICATIONS } from "../apollo/operations/queries/notification";
const HomePage = lazy(() => import("../pages/home"));
const AuthPage = lazy(() => import("../pages/auth"));
const NotificationsPage = lazy(() => import("../pages/notifications"));
const PersonalPage = lazy(() => import("../pages/personal"));
const ContactsPage = lazy(() => import("../pages/contacts"));
const ChatsPage = lazy(() => import("../pages/chats"));

function App() {
  const { colorMode } = useThemeUI();
  const [fetched, setFetched] = useState(false);
  const { setCurrentUser, setFriends, setNotifications } = cacheMutations;

  // const [fetchCurrentUser, { data, error }] = useLazyQuery(FETCH_CURRENT_USER, {
  //   fetchPolicy: "cache-and-network",
  // });
  const {refetch : fetchCurrentUser} = useQuery(FETCH_CURRENT_USER, {fetchPolicy : "cache-and-network"});
  const {refetch: fetchNotifications } = useQuery(FETCH_NOTIFICATIONS, {
    fetchPolicy: "cache-and-network",
    skip: true,
  });
  const {refetch: fetchFriends } = useQuery(FETCH_FRIENDS, {
    fetchPolicy: "cache-and-network",
    skip: true,
  });
  useEffect(() => {
    let _isMounted = true ; 
    fetchCurrentUser().then(async ({data}) => {
      const {fetchCurrentUser} = data ; 
      if(_isMounted){
        setCurrentUser(fetchCurrentUser);  
        //after fetching current user, fetch notification and friends  
        const skip = 0;

        const limitNotifications = +process.env.REACT_APP_NOTIFICATIONS_PER_PAGE;
        const {data : notificationsData} = await fetchNotifications({skip, limit : limitNotifications})        
        setNotifications([...notificationsData.fetchNotifications]);

        const limitFriends = +process.env.REACT_APP_FRIENDS_PER_LOAD;
        const {data : friendsData} = await fetchFriends({skip, limit : limitFriends});
        setFriends([...friendsData.fetchFriends])
      }      
      setFetched(true)
    }).catch(err => {
      setFetched(true)
    })
    
  },[])
  // useEffect(() => {
  //   let _isMounted = true;
  //   if (_isMounted) {
  //     fetchCurrentUser();
  //   }
  //   return () => (_isMounted = false);
  // }, [fetchCurrentUser]);
  // useEffect(() => {
  //   if (data && data.fetchCurrentUser) {
  //     setCurrentUser({ ...data.fetchCurrentUser });
      
  //     setFetched(true);
  //   }
  //   if (error) {
  //     setFetched(true);
  //   }
  // }, [data, setCurrentUser, setPersonalUsers, error]);
  console.log("render")
  // useEffect(()=>{
  //   const socket = io("http://localhost:5000");
  //   console.log(data)
  //   if(data){
  //     socket.emit("userId", data.fetchCurrentUser._id)
  //   }
  // },[data])
  
  if (!fetched) return null;
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
