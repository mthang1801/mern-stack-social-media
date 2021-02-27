import React, { useEffect, useState } from "react";
import Layout from "../containers/Layout";
import styled from "styled-components";
import Notifications from "../components/Notification/Notifications";
import { useQuery } from "@apollo/client";
import {
  GET_CURRENT_USER,
  GET_NOTIFICATIONS,
} from "../apollo/operations/queries/cache";
import CardRequestAuth from "../components/Card/CardRequestAuth";
import { cacheMutations } from "../apollo/operations/mutations";
import MainBody from "../components/Body/MainBody";
import { FETCH_NOTIFICATIONS } from "../apollo/operations/queries/notification";

const NotificationsPage = () => {
  const {
    data: { user },
  } = useQuery(GET_CURRENT_USER, { fetchPolicy: "cache-only" });
  const { refetch: fetchNotifications } = useQuery(FETCH_NOTIFICATIONS, {
    fetchPolicy: "cache-and-network",
    skip: true,
  });
  const {
    data: { notifications },
  } = useQuery(GET_NOTIFICATIONS, { fetchPolicy: "cache-first" });
  const { setNotifications } = cacheMutations;
  const [fetchNotificationsMore, setFetchNotificationsMore] = useState(false);
  useEffect(() => {
    let _mounted = true;
    if (!notifications.length && fetchNotifications) {
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
    }
    return () => (_mounted = false);
  }, [notifications, fetchNotifications]);

  useEffect(() => {
    let _mounted = true;
    if (fetchNotificationsMore && fetchNotifications) {
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
    return () => (_mounted = false);
  }, [fetchNotificationsMore, setFetchNotificationsMore, fetchNotifications]);

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
            {user ? <Notifications /> : <CardRequestAuth />}
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
