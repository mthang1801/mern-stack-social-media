import React, { useState, useEffect } from 'react';
import {
  Wrapper,
  SenderAvatar,
  NotificationContent,
} from './styles/FlashPopUpNotification.styles';
import { useTheme } from '../../theme';
import { latestNotificationVar } from '../../apollo/cache';
import { useReactiveVar } from '@apollo/client';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import useLocale from '../../locales';
import { notificationContent } from '../../utils/notificationContent';
import { setLatestNotification } from '../../apollo/notification/notification.caches';
const FlashPopUpNotification = ({ onClick }) => {
  const latestNotification = useReactiveVar(latestNotificationVar);
  const { theme } = useTheme();
  const { lang } = useLocale();
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

  return (
    <Wrapper show={latestNotification} theme={theme} onClick={onClickPopup}>
      {latestNotification ? (
        <>
          <SenderAvatar>
            <LazyLoadImage
              src={latestNotification.creator.avatar}
              effect="blur"
            ></LazyLoadImage>
          </SenderAvatar>
          <NotificationContent>
            <span
              dangerouslySetInnerHTML={{
                __html: notificationContent(latestNotification, lang),
              }}
            ></span>
          </NotificationContent>
        </>
      ) : null}
    </Wrapper>
  );
};

export default React.memo(FlashPopUpNotification);
