import React, { useEffect, useState } from "react";
import Layout from "../containers/Layout";
import styled from "styled-components";
import Notifications from "../components/Notification/Notifications";
import { useQuery, useReactiveVar } from "@apollo/client";
import { userVar, notificationsVar } from "../apollo/cache";
import CardRequestAuth from "../components/Card/CardRequestAuth";
import MainBody from "../components/Body/MainBody";
import { FETCH_NOTIFICATIONS } from "../apollo/notification/notification.types";
import {setNotifications} from "../apollo/notification/notification.caches"
const NotificationsPage = () => {
  const user = useReactiveVar(userVar);
  const notifications = useReactiveVar(notificationsVar);
  const { refetch: fetchNotifications } = useQuery(FETCH_NOTIFICATIONS, {
    fetchPolicy: "cache-and-network",
    skip: true,
  });   
  const [fetchNotificationsMore, setFetchNotificationsMore] = useState(false);
  useEffect(() => {
    let _mounted = true;
    if (user && fetchNotifications) {
      if (!notifications.length) {
        fetchNotifications({
          variables: {
            skip: 0,
            limit: +process.env.REACT_APP_NOTIFICATIONS_PER_PAGE,
          },
        }).then(({ data }) => {
          if (data && data.fetchNotifications && _mounted) {
            setNotifications([...data.fetchNotifications]);
          }
        });
      } else if (fetchNotificationsMore) {
        const skip = notifications.length;
        const limit = +process.env.REACT_APP_NOTIFICATIONS_PER_PAGE;
        fetchNotifications({ skip, limit }).then(
          ({ data: { fetchNotifications } }) => {
            if (_mounted) {
              setNotifications([...notifications, ...fetchNotifications]);
              setFetchNotificationsMore(false);
            }
          }
        );
      }
    }

    return () => (_mounted = false);
  }, [
    user,
    notifications,
    fetchNotifications,
    setFetchNotificationsMore,
    fetchNotificationsMore,
  ]);

  useEffect(() => {
    function setLoadmoreOnScroll() {
      const {
        scrollHeight,
        scrollTop,
        clientHeight,
      } = document.documentElement;
      if (clientHeight + scrollTop > scrollHeight * 0.75) {
        setFetchNotificationsMore(true);
      }
    }
    window.addEventListener("scroll", (e) => {
      setLoadmoreOnScroll();
    });
    return () =>
      window.removeEventListener("scroll", () => {
        setLoadmoreOnScroll();
      });
  }, []);

  return (
    <Layout>
      <MainBody>
        <MainContent>
          <div className="notifications">
            {user ? (
              <Notifications notifications={notifications} />
            ) : (
              <CardRequestAuth />
            )}
          </div>
          <div className="sidebar"></div>
        </MainContent>
      </MainBody>
    </Layout>
  );
};

const MainContent = styled.div`
  display: flex;
  margin: auto;
  padding: 1.5rem 0;
  .notifications {
    width: 100%;
  }
  .sidebar {
    display: none;
  }
  @media screen and (min-width: 768px) {
    .notifications {
      width: calc(100% - 320px);
      padding: 0 1rem;
    }
    .sidebar {
      display: block;
      width: 320px;
      padding: 0 1rem;
    }
  }
  @media screen and (min-width: 992px) {
    padding: 0;
    .notifications {
      width: 50%;
    }
    .sidebar {
      width: 50%;
    }
  }
  @media screen and (min-width: 1920px) {
    .notifications {
      width: 55%;
    }
    .sidebar {
      width: 45%;
    }
  }
`;
export default NotificationsPage;
