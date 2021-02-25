import React from "react";
import {
  ContactItemWrapper,
  ContactInfo,
  ContactActions,
  FriendActions
} from "./Contact.styles";
import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Button from "../Controls/ButtonDefault";
import { useThemeUI } from "theme-ui";
import useLanguage from "../Global/useLanguage";
import { BsChatDots, BsCameraVideo, BsThreeDotsVertical } from "react-icons/bs";
import { MdStarBorder } from "react-icons/md";
import { IoMdCall } from "react-icons/io";
const SentRequestContactItem = ({ data, type }) => {
  const { colorMode } = useThemeUI();
  const { i18n, lang } = useLanguage();
  const sentActions = (
    <Button cancel>
      {i18n.store.data[lang].translation.contacts.cancelRequest}
    </Button>
  );
  const receivedActions = (
    <>
      <Button accept variant="outlined">
        {i18n.store.data[lang].translation.contacts.acceptRequest}
      </Button>
      <Button reject>
        {i18n.store.data[lang].translation.contacts.rejectRequest}
      </Button>
    </>
  );

  const friendsActions = (
    <FriendActions>
     <Button favorite>
        <MdStarBorder/>
      </Button>
      <Button chat>
        <BsChatDots />
      </Button>     
      <Button call>
        <IoMdCall />
      </Button>     
      <Button videocall>
        <BsCameraVideo />
      </Button>     
      {/* <Button setting>
        <BsThreeDotsVertical />
      </Button>      */}
    </FriendActions>
  );
  return (
    <ContactItemWrapper theme={colorMode}>
      <ContactInfo>
        <Link to={data.slug}>
          <LazyLoadImage src={data.avatar} alt={data.avatar} />
        </Link>
        <Link to={data.slug}>
          <h6>{data.name}</h6>
          <span>@{data.slug}</span>
        </Link>
      </ContactInfo>
      <ContactActions>
        {type === "sent"
          ? sentActions
          : type === "received"
          ? receivedActions
          : type === "friends"
          ? friendsActions
          : null}
      </ContactActions>
    </ContactItemWrapper>
  );
};

export default SentRequestContactItem;
