import React, { useEffect, useState, useRef } from "react";
import Button from "../Controls/ButtonDefault";
import Avatar from "../../assets/images/mvt-icon.png";
import { BsArrowsFullscreen } from "react-icons/bs";
import { GET_POST_STATUS } from "../../apollo/operations/queries";
import { useQuery } from "@apollo/client";
import useLanguage from "../Global/useLanguage";
import styled from "styled-components";
import classNames from "classnames";
import { useThemeUI } from "theme-ui";
import { darken } from "polished";

const PostToolbarHeader = () => {
  const getPostStatus = useQuery(GET_POST_STATUS);
  const { i18n, lang } = useLanguage();
  const { postStatus } = getPostStatus.data;
  const [currentStatus, setCurrentStatus] = useState({});
  const [listStatus, setListStatus] = useState([]);
  const [toggleStatus, setToggleStatus] = useState(false);
  const btnStatusRef = useRef(false);
  const { colorMode } = useThemeUI();
  useEffect(() => {
    setCurrentStatus(
      i18n.store.data[lang].translation.status.find(
        (x) => x.name === postStatus
      )
    );
    setListStatus(i18n.store.data[lang].translation.status);
  }, [postStatus, lang, i18n.store.data, setListStatus]);

  useEffect(() => {
    function handleClickOutsideBtnStatus(e) {
      if (btnStatusRef.current && !btnStatusRef.current.contains(e.target)) {
        setToggleStatus(false);
      }
    }
    window.addEventListener("click", (e) => {
      handleClickOutsideBtnStatus(e);
    });
    return () =>
      window.removeEventListener("click", (e) => {
        handleClickOutsideBtnStatus(e);
      });
  }, []);
  return (
    <ToolbarHeading theme={colorMode}>
      <div className="user-btn-avatar">
        <Button>
          <img src={Avatar} alt="user" />
        </Button>
      </div>
      <div className="user-name-status">
        <div className="user-name">MVT</div>
        <div className="status" ref={btnStatusRef}>
          {currentStatus.name && (
            <button
              className="current-status"
              onClick={() => setToggleStatus((prevStatus) => !prevStatus)}
            >
              {currentStatus.icon()}{" "}
              <span className="status-name">{currentStatus.name}</span>
            </button>
          )}
          <ul
            className={classNames("status-list", {
              "show-status": toggleStatus,
            })}
          >
            {listStatus.map((status) => (
              <li key={status.name} className="status-item">
                {status.icon()}
                <span className="status-name">{status.name}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="zoom">
        <BsArrowsFullscreen />
      </div>
    </ToolbarHeading>
  );
};

const ToolbarHeading = styled.div`
  display: flex;
  padding: 0.25rem 0.5rem;
  align-items: center;
  .user-btn-avatar {
    margin-right: 1rem;
  }
  .user-name-status {
    flex: 1;
    font-size: 0.9em;
  }
  .current-status {
    display: inline-flex;
    align-items: center;
    padding: 0.25rem 0.5rem;
    background-color: ${({ theme }) =>
      theme === "dark" ? "var(--gray-dark)" : "var(--white)"};
    border-radius: 0.6rem;
    outline: none;
    border: none;
    cursor: pointer;
    &:hover {
      &:hover {
        background-color: ${({ theme }) =>
          theme === "dark"
            ? `${darken(0.1, "#454545")}`
            : `${darken(0.005, "#dedede")}`};
      }
    }
  }
  .status {
    position: relative;
  }
  .status-list {
    visibility: hidden;
    opacity: 0;
    position: absolute;
    top: 110%;
    z-index: 1;
    left: -0.75rem;
    width: 120px;
    text-align: center;
    list-style: none;
    border: 1px solid var(--gray-deep);
    border-radius: 0.5rem;
    overflow: hidden;
    transition: var(--mainTransition);
    background-color: ${({ theme }) =>
      theme === "dark" ? "var(--gray-dark)" : "var(--white)"};
  }
  .show-status {
    visibility: visible;
    opacity: 1;
  }
  .status-item {
    display: flex;
    align-items: center;

    padding: 0.5rem 1rem;
    &:not(:last-child) {
      border-bottom: 1px solid var(--gray-deep);
    }
    cursor: pointer;
    &:hover {
      background-color: ${({ theme }) =>
        theme === "dark"
          ? `${darken(0.1, "#454545")}`
          : `${darken(0.005, "#dedede")}`};
    }
  }
  .status-name {
    margin-left: 5px;
    text-transform: capitalize;
  }
  .zoom {
    font-size: 1.25rem;
    cursor: pointer;
  }
`;

export default PostToolbarHeader;
