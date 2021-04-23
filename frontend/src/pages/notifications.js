import React, { useEffect, useState } from "react";
import Layout from "../containers/Layout";
import {
  Wrapper,
  NotificationsContent,
  OtherContents,
} from "./styles/notifications.styles";
import NotificationItem from "../components/Notification/NotificationItem";
import { useQuery, useReactiveVar } from "@apollo/client";
import { userVar, notificationsVar } from "../apollo/cache";
import CardRequestAuth from "../components/Card/CardRequestAuth";
import InfiniteScroll from "react-infinite-scroll-component";
import MainBody from "../containers/MainBody";
import { FETCH_NOTIFICATIONS } from "../apollo/notification/notification.types";
import { addNotificationsToNotifcationsList, setNotifications } from "../apollo/notification/notification.caches";
const NotificationsPage = () => {
  const user = useReactiveVar(userVar);
  const notifications = useReactiveVar(notificationsVar);
  const [fetchedNotifications, setFetchedNotifications] = useState(false);
  const [loadingNotifications, setLoadingNotifications] = useState(true);
  const { refetch: fetchNotifications } = useQuery(FETCH_NOTIFICATIONS, {
    fetchPolicy: "cache-and-network",
    skip: true,
  });  

  useEffect(() => {
    if (
      !fetchedNotifications &&
      user?.notifications?.length && !notifications.length
    ) {
      fetchNotifications()
        .then(({ data }) => {
          console.log(data);
          if (data) {
            setNotifications(data.fetchNotifications);
            setLoadingNotifications(false);
            setFetchedNotifications(true);
          }
        })
        .catch(() => {
          setLoadingNotifications(false);
          setFetchedNotifications(true);
        });
    } else if (!fetchedNotifications && notifications.length) {
      setFetchedNotifications(true);
      setLoadingNotifications(false);
    }
  }, [fetchedNotifications, user,user?.notifications?.length && notifications]);

  const fetchMoreNotifications = () => {
    const skip = notifications.length; 
    const limit = +process.env.REACT_APP_NOTIFICATIONS_PER_PAGE;
    fetchNotifications({skip, limit}).then(({data})=> {
      if(data){
        addNotificationsToNotifcationsList(data.fetchNotifications)
      }
    })
  }

  return (
    <Layout>
      <MainBody>
        <Wrapper>
          <NotificationsContent>
            {loadingNotifications ? (
              <div>Loading Notifications 1...</div>
            ) : user ? (
              <InfiniteScroll
                dataLength={notifications.length}
                hasMore={notifications.length < user.notifications.length}
                loader={<div>Loading Notifications...</div>}
                next={fetchMoreNotifications}
                scrollThreshold={0.85}
              >
                {notifications.map((notification) => (
                  <NotificationItem
                    key={`notification-${notification._id}`}
                    notifications={notifications}
                    notification={notification}
                  />
                ))}
              </InfiniteScroll>
            ) : (
              <CardRequestAuth />
            )}
          </NotificationsContent>
          <OtherContents></OtherContents>
        </Wrapper>
      </MainBody>
    </Layout>
  );
};

export default NotificationsPage;
