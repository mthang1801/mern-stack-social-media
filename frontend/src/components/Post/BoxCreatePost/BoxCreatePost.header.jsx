import React from "react";
import { BsArrowsFullscreen } from "react-icons/bs";
const BoxCreatePostHeader = ({user}) => {
  return (
    <div className="box-header">
      <div className="box-header__avatar">
        <img src={`/images/${user.avatar}`} alt="avatar" />
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
