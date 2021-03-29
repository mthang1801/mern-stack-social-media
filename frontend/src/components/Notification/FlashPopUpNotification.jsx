import React, { useState, useEffect } from "react";
import {
  Wrapper,
  SenderAvatar,
  NotificationContent,
  SenderName,
} from "./styles/FlashPopUpNotification.styles";
import { useThemeUI } from "theme-ui";
import useLanguage from "../Global/useLanguage";
import { GET_LATEST_NOTIFICATION } from "../../apollo/operations/queries/cache";
import { useQuery } from "@apollo/client";
import { cacheMutations } from "../../apollo/operations/mutations/cache";
import { LazyLoadImage } from "react-lazy-load-image-component";

import { notificationContent } from "../../utils/notificationContent";
const FlashPopUpNotification = ({ onClick }) => {
  const { setLatestNotification } = cacheMutations;
  const {
    data: { latestNotification },
  } = useQuery(GET_LATEST_NOTIFICATION, { fetchPolicy: "cache-only" });
  const { colorMode } = useThemeUI();
  const { i18n, lang } = useLanguage();

  const { message } = i18n.store.data[lang].translation.notifications;
  useEffect(() => {
    let timer;
    if (latestNotification) {
      clearTimeout(timer);
      timer = setTimeout(() => {
        setLatestNotification(null);
      }, 6000);
    }
    return () => clearTimeout(timer);
  }, [latestNotification]);

  const onClickPopup = () => {
    onClick();
    setLatestNotification(null);
  };
  console.log(latestNotification);
  return (
    <Wrapper show={latestNotification} theme={colorMode} onClick={onClickPopup}>
      {latestNotification ? (
        <>
          <SenderAvatar>
            <LazyLoadImage
              src={latestNotification.creator.avatar}
              effect="blur"
            ></LazyLoadImage>
          </SenderAvatar>
          <NotificationContent>
            <SenderName>{latestNotification.creator.name}</SenderName>
            <span>
              {notificationContent(
                latestNotification.field,
                latestNotification.action,
                lang
              )}
            </span>
          </NotificationContent>
        </>
      ) : null}
    </Wrapper>
  );
};

export default React.memo(FlashPopUpNotification);
