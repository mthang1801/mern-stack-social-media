import React from "react";
import { BsArrowsFullscreen } from "react-icons/bs";
import {useQuery} from "@apollo/client"
import {GET_CURRENT_USER} from "../../../apollo/operations/queries/cache"
const BoxCreatePostHeader = () => {
  const {data : {user}} =  useQuery(GET_CURRENT_USER, {fetchPolicy : "cache-first"});
  if(!user) return null;
  return (
    <div className="box-header">
      <div className="box-header__avatar">
        <img src={`${user.avatar}`} alt="avatar" />
      </div>
      <div className="box-header__center">
        <div className="box-header__center-username">{user.name}</div>
        <small className="box-header__center-current-position">
          Post To Timeline
        </small>
      </div>
      <div className="box-header__box-zoom">
        <button>
          <BsArrowsFullscreen />
        </button>
      </div>
    </div>
  );
};

export default BoxCreatePostHeader;
