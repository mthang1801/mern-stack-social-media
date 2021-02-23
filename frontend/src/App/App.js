import React, { useEffect, lazy, Suspense } from "react";
import GlobalStyles from "./GlobalStyles";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useThemeUI } from "theme-ui";
import { FETCH_CURRENT_USER, GET_CURRENT_PERSONAL_USER, GET_CURRENT_USER, GET_PERSONAL_USERS } from "../apollo/operations/queries";
import mutations from "../apollo/operations/mutations";
import subscriptions from "../apollo/operations/subscriptions"
import { useLazyQuery, useQuery } from "@apollo/client";
const HomePage = lazy(() => import("../pages/home"));
const AuthPage = lazy(() => import("../pages/auth"));
const NotificationsPage = lazy(() => import("../pages/notifications"));
const PersonalPage = lazy(() => import("../pages/personal"));

function App() {
  const { colorMode } = useThemeUI();
  const {refetch : fetchCurrentUser, subscribeToMore : subscribeUser} = useQuery(FETCH_CURRENT_USER, {
    fetchPolicy: "cache-and-network",
    skip : true
  });
  const {data : {currentPersonalUser}} = useQuery(GET_CURRENT_PERSONAL_USER,{fetchPolicy : "cache-and-network"})
  const {data : {user}} = useQuery(GET_CURRENT_USER, {fetchPolicy : "cache-and-network"});
  const {data : {personalUsers}} = useQuery(GET_PERSONAL_USERS,{fetchPolicy : "cache-and-network"})
  const { setCurrentUser, setPersonalUsers, setCurrentPersonalUser } = mutations;

  useEffect(() => {
    let _isMounted = true;
    if (_isMounted && !user) {
      fetchCurrentUser().then(({data}) => {
        setCurrentUser({ ...data.fetchCurrentUser });
        setPersonalUsers(data.fetchCurrentUser);
      });
    }
    return () => (_isMounted = false);
  }, [fetchCurrentUser,user, setPersonalUsers]);
  
  //function to handle when subscription called
  const updateSubscriptionOnChange = (sender, receiver) => {
    console.log("listening");
    setCurrentUser({
      ...user,
      friends: [...receiver.friends],
      following: [...receiver.following],
      followed: [...receiver.followed],
      sendRequestToAddFriend: [...receiver.sendRequestToAddFriend],
      receiveRequestToAddFriend: [...receiver.receiveRequestToAddFriend],
    });
    if (personalUsers[sender.slug]) {
      const updatedReceiver = {
        ...personalUsers[sender.slug],
        friends: [...sender.friends],
        following: [...sender.following],
        followed: [...sender.followed],
        sendRequestToAddFriend: [...sender.sendRequestToAddFriend],
        receiveRequestToAddFriend: [...sender.receiveRequestToAddFriend],
      };
      setPersonalUsers(updatedReceiver);
    }
    if (currentPersonalUser && currentPersonalUser._id.toString() === receiver._id.toString()) {
      setCurrentPersonalUser({
        ...currentPersonalUser,
        friends: [...sender.friends],
        following: [...sender.following],
        followed: [...sender.followed],
        sendRequestToAddFriend: [...sender.sendRequestToAddFriend],
        receiveRequestToAddFriend: [...sender.receiveRequestToAddFriend],
      });
    }
  };

  useEffect(() => {
    let unsubscribeRejectRquestToAddFriend,
      unsubscribeCancelRequestToAddFriend,
      unsubscribeRemoveFriend;
    if (subscribeUser && user) {
      unsubscribeRejectRquestToAddFriend = subscribeUser({
        document:
          subscriptions.userSubscription
            .REJECT_REQUEST_TO_ADD_FRIEND_SUBSCRIPTION,
        variables: { userId: user._id },
        updateQuery: (_, { subscriptionData }) => {
          const {
            sender,
            receiver,
          } = subscriptionData.data.rejectRequestToAddFriendSubscription;
          updateSubscriptionOnChange(sender, receiver);
        },
      });

      unsubscribeCancelRequestToAddFriend = subscribeUser({
        document:
          subscriptions.userSubscription
            .CANCEL_REQUEST_TO_ADD_FRIEND_SUBSCRIPTION,
        variables: { userId: user._id },
        updateQuery: (_, { subscriptionData }) => {
          const {
            sender,
            receiver,
          } = subscriptionData.data.cancelRequestToAddFriendSubscription;
          updateSubscriptionOnChange(sender, receiver);
        },
      });

      unsubscribeRemoveFriend = subscribeUser({
        document: subscriptions.userSubscription.REMOVE_FRIEND,
        variables: { userId: user._id },
        updateQuery: (_, { subscriptionData }) => {
          const {
            sender,
            receiver,
          } = subscriptionData.data.removeFriendSubscription;
          updateSubscriptionOnChange(sender, receiver);
        },
      });
    }
    return () => {
      if (unsubscribeCancelRequestToAddFriend) {
        unsubscribeCancelRequestToAddFriend();
      }
      if (unsubscribeRejectRquestToAddFriend) {
        unsubscribeRejectRquestToAddFriend();
      }
      if (unsubscribeRemoveFriend) {
        unsubscribeRemoveFriend();
      }
    };
  }, [subscribeUser, user]);

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
