import React, { useState, useEffect } from 'react';
import { LeftSide, RightSide } from './styles/Conversation.styles';
import { userVar, contactVar } from '../../apollo/cache';
import { useReactiveVar, useQuery } from '@apollo/client';
import { FETCH_USER_FRIENDS_DATA } from '../../apollo/contact/contact.queries';
import constant from '../../constant/constant';
import { pushFriendsListToContact } from '../../apollo/contact/contact.caches';
import Search from '../Chat/Search';

const Conversation = () => {
  return (
    <>
      <LeftSide></LeftSide>
      <RightSide>2</RightSide>
    </>
  );
};

export default Conversation;
