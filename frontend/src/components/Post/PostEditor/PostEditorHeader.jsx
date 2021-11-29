import React, { useState, useEffect, useRef } from 'react';
import {
  Wrapper,
  Information,
  Controls,
  SelectStatus,
  DropdownStatus,
  StatusItem,
  ButtonZoom,
  Selected,
} from './styles/PostEditorHeader.styles';
import { Link } from 'react-router-dom';
import LazyLoad from 'react-lazyload';
import useLocale from '../../../locales';
import { MdZoomOutMap } from 'react-icons/md';
import { useTheme } from '../../../theme';
const PostEditorHeader = ({
  user,
  postStatus,
  setPostStatus,
  setOpenDialog,
  openDialog,
  isEdited,
}) => {
  const { translation } = useLocale();
  const { status } = translation.post;
  const { theme } = useTheme();
  const currentStatus = status.find(
    (statusItem) => statusItem.key.toUpperCase() === postStatus.toUpperCase()
  );

  const [openDropdown, setOpenDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function trackUserClickWithDropdown(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        return setOpenDropdown(false);
      }
    }
    window.addEventListener('click', trackUserClickWithDropdown);
    return () =>
      window.removeEventListener('click', trackUserClickWithDropdown);
  }, [dropdownRef]);

  return (
    <Wrapper theme={theme}>
      <Information>
        <Link to={`/${user.slug}`}>
          <LazyLoad>
            <img src={user.avatar} alt={user.avatar} />
          </LazyLoad>
        </Link>
        <div>
          <Link to={`${user.slug}`} style={{ textTransform: 'capitalize' }}>
            {user.name.toUpperCase()}
          </Link>
          <SelectStatus ref={dropdownRef}>
            <Selected
              theme={theme}
              style={{ textTransform: 'capitalize' }}
              status={currentStatus.key.toUpperCase()}
              onClick={() => setOpenDropdown((prevState) => !prevState)}
            >
              <span>{currentStatus.icon()}</span>
              <span>{currentStatus.name}</span>
            </Selected>
            <DropdownStatus theme={theme} open={openDropdown}>
              {status &&
                status
                  .filter(
                    (status) =>
                      status.key.toUpperCase() !== postStatus.toUpperCase()
                  )
                  .map(({ key, name, icon }) => (
                    <StatusItem
                      theme={theme}
                      key={key}
                      status={name.toUpperCase()}
                      onClick={() => setPostStatus(key.toUpperCase())}
                    >
                      <span>{icon()}</span>
                      <span>{name}</span>
                    </StatusItem>
                  ))}
            </DropdownStatus>
          </SelectStatus>
        </div>
      </Information>
      <Controls>
        {!openDialog && !isEdited ? (
          <ButtonZoom onClick={setOpenDialog}>
            <MdZoomOutMap />
          </ButtonZoom>
        ) : null}
      </Controls>
    </Wrapper>
  );
};

export default PostEditorHeader;
