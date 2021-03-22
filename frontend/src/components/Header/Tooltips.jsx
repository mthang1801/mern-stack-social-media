import React from "react";
import styled from "styled-components";
import classNames from "classnames";
const Tooltips = ({ className, children, showTooltips }) => {
  return (
    <div className={className}>
      <span className={classNames("tooltiptext", { show: showTooltips })}>
        {children}
      </span>
    </div>
  );
};

export default styled(React.memo(Tooltips))`
  display: none;
  @media screen and (min-width: 768px) and (max-width: 992px) {
    position: absolute;
    bottom: -65%;
    left: 50%;
    display: inline-block;

    & .tooltiptext {
      visibility: hidden;
      width: 120px;
      border: 1px solid var(--dark);
      text-align: center;
      border-radius: 6px;
      padding: 5px 0;
      position: absolute;
      z-index: 1;
      bottom: 125%;
      left: 50%;
      margin-left: -60px;
      opacity: 0;
      transition: opacity 0.3s;
    }

    & .tooltiptext::before {
      content: "";
      position: absolute;
      top: -30%;
      left: 50%;
      margin-left: -5px;
      border-width: 5px;
      border-style: solid;
      border-color: transparent transparent #555 transparent;
    }
    .show {
      opacity: 0.6;
      background-color: var(--dark);
      color: var(--white);
      visibility: visible;
    }
  }
`;
