import React from 'react'
import {useQuery} from "@apollo/client";
import {GET_NOTIFICATIONS} from "../../apollo/operations/queries"
import NotificationItem from "./NotificationItem";
import styled from "styled-components"
const Notifications = () => {
  const {data : {notifications}} = useQuery(GET_NOTIFICATIONS, {fetchPolicy : "cache-only"})
  
  // //useLazyQuery
  // const [
  //   fetchNotifications,
  //   {
  //     data: notificationsData,
  //     loading: fetchLoadingNotifications,
  //     subscribeToMore: subscribeToMoreNotifications,
  //     fetchMore,
  //   },
  // ] = useLazyQuery(FETCH_NOTIFICATIONS);
  // const [
  //   fetchCountNumberNotificationsUnseen,
  //   { data: countNotificationsUnseenData },
  // ] = useLazyQuery(FETCH_COUNT_NUMBER_NOTIFICATIONS_UNSEEN, {
  //   fetchPolicy: "network-only",
  // });
  // //useQuery
  // const {
  //   data: { countNumberNotificationsUnseen },
  // } = useQuery(GET_COUNT_NUMBER_NOTIFICATIONS_UNSEEN, {
  //   fetchPolicy: "cache-first",
  // });
  // const {
  //   data: { notifications },
  // } = useQuery(GET_NOTIFICATIONS, { fetchPolicy: "cache-first" });
  // const {
  //   data: { newNotifications },
  // } = useQuery(GET_NEW_NOTIFICATIONS, { fetchPolicy: "cache-first" });
  // //mutations
  // const {
  //   setCountNumberNotificationsUnseen,
  //   setNotifications,
  //   setNewNotifications,
  // } = mutations;
  // //useRef
  // const notificationRef = useRef(false);

  // useEffect(() => {
  //   if (countNumberNotificationsUnseen === null) {
  //     fetchCountNumberNotificationsUnseen();
  //   }
  // }, [countNumberNotificationsUnseen, fetchCountNumberNotificationsUnseen]);

  // useEffect(() => {
  //   if (
  //     countNotificationsUnseenData &&
  //     countNotificationsUnseenData.countNotificationsUnseen
  //   ) {
  //     setCountNumberNotificationsUnseen(
  //       countNotificationsUnseenData.countNotificationsUnseen
  //     );
  //   }
  // }, [countNotificationsUnseenData, setCountNumberNotificationsUnseen]);

  // useEffect(() => {
  //   if (!notifications.length && !notificationsData) {
  //     fetchNotifications({
  //       variables: {
  //         skip: 0,
  //         limit: +process.env.REACT_APP_NOTIFICATIONS_PER_PAGE,
  //       },
  //     });
  //   }
  //   if (notificationsData && notificationsData.fetchNotifications) {
  //     setNotifications([...notificationsData.fetchNotifications]);
  //   }
  // }, [fetchNotifications, notificationsData, notifications]);

  // useEffect(() => {
  //   let unsubscribePostCreated;
  //   if (subscribeToMoreNotifications) {
  //     unsubscribePostCreated = subscribeToMoreNotifications({
  //       document:
  //         subcriptions.notificationSubscription.POST_CREATED_SUBSCRIPTIONS,
  //       variables: { userId: user._id },
  //       updateQuery: (prev, { subscriptionData }) => {
  //         if (!subscriptionData.data) return prev;
  //         const newNotification =
  //           subscriptionData.data.notifyCreatedPost.notification;
  //         setOpenPopupNotification(true);
  //         setNewNotifications(newNotification._id);
  //         setCountNumberNotificationsUnseen(countNumberNotificationsUnseen + 1);

  //         return {
  //           fetchNotifications: [
  //             { ...newNotification, new: true },
  //             ...prev.fetchNotifications,
  //           ],
  //         };
  //       },
  //     });
  //   }

  //   return () => {
  //     if (unsubscribePostCreated) {
  //       unsubscribePostCreated();
  //     }
  //   };
  // }, [countNumberNotificationsUnseen, subscribeToMoreNotifications]);

  // useEffect(() => {
  //   let timer;
  //   timer = setTimeout(() => {
  //     setOpenPopupNotification(false);
  //   }, 10000);
  //   return () => clearTimeout(timer);
  // }, [openPopupNotification]);

  // useEffect(() => {
  //   function handleClickOutsideNotificationBoard(e) {
  //     if (
  //       notificationRef.current &&
  //       !notificationRef.current.contains(e.target)
  //     ) {
  //       setOpenNotificationBoard(false);
  //     }
  //   }
  //   window.addEventListener("click", (e) => {
  //     handleClickOutsideNotificationBoard(e);
  //   });
  //   return () =>
  //     window.removeEventListener("click", (e) => {
  //       handleClickOutsideNotificationBoard(e);
  //     });
  // }, []);

  // const handleClickNotification = () => {
  //   setOpenNotificationBoard((prevStatus) => !prevStatus);
  // };

  // const handleClickFlashPopupNotification = () => {
  //   setOpenNotificationBoard(true);
  //   setOpenPopupNotification(false);
  // };

  // const handleScrollBoard = (e) => {
  //   const { target } = e;
  //   if (target.clientHeight + target.scrollTop > target.scrollHeight * 0.75) {
  //     setLoadingMore(true);
  //   }
  // };

  // useEffect(() => {
  //   if (loadingMore) {
  //     if (fetchMore) {
  //       fetchMore({
  //         query: FETCH_NOTIFICATIONS,
  //         variables: {
  //           skip: notifications.length,
  //           limit: +process.env.REACT_APP_NOTIFICATIONS_PER_PAGE,
  //         },
  //         updateQuery: (prev, { fetchMoreResult }) => {
  //           return {
  //             fetchNotifications: [
  //               ...notifications,
  //               ...fetchMoreResult.fetchNotifications,
  //             ],
  //           };
  //         },
  //       }).then(() => setLoadingMore(false));
  //     } else {
  //       fetchNotifications({
  //         variables: {
  //           skip: notifications.length,
  //           limit: +process.env.REACT_APP_NOTIFICATIONS_PER_PAGE,
  //         },
  //       });
  //       setLoadingMore(false);
  //     }
  //   }
  // }, [loadingMore, fetchLoadingNotifications]);


  if(!notifications.length) return <NoNotifications>No notifications</NoNotifications>
  return notifications.map(notification => (
    <NotificationItem key={`notification-${notification._id}`} notifications={notifications} notification={notification}/>
  ))
}

const NoNotifications = styled.div`
  text-align: center;
  padding : 3rem;
  font-size : 1.1em;  
`

export default Notifications
