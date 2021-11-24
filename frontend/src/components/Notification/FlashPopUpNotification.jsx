import React, { useState, useEffect } from 'react';
import {
  Wrapper,
  SenderAvatar,
  NotificationContent,
} from './styles/FlashPopUpNotification.styles';
import { useThemeUI } from 'theme-ui';
import useLanguage from '../Global/useLanguage';
import { latestNotificationVar } from '../../apollo/cache';
import { useReactiveVar } from '@apollo/client';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import { notificationContent } from '../../utils/notificationContent';
import { setLatestNotification } from '../../apollo/notification/notification.caches';
const FlashPopUpNotification = ({ onClick }) => {
  const latestNotification = useReactiveVar(latestNotificationVar);
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
