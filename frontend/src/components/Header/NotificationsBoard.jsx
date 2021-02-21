import React, {memo} from "react";
import styled from "styled-components";
import Button from "../Controls/ButtonDefaultCircle";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { useThemeUI } from "theme-ui";
import Notifications from "../Notification/Notifications"
const NotificationsBoard = () => {
  const { colorMode } = useThemeUI(); 
  return (
    <Wrapper theme={colorMode}>
      <div className="board-header">
        <h4>Notifications</h4>
        <Button variant="outlined">
          <BiDotsHorizontalRounded />
        </Button>
      </div>
      <div className="board-body">
        <Notifications/>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  background-color: ${({ theme }) =>
    theme === "dark" ? "var(--color-card-dark)" : "var(--white)"};
  border-radius: 0.5rem;
  box-shadow: var(--mediumShadow);
  color: inherit;
  border : 1px solid ${({ theme }) =>
  theme === "dark" ? "var(--dark)" : "var(--light)"};
  .board-header {
    display: flex;
    justify-content: space-between;
    padding: 0.5rem 0.75rem;
  }  
`;

export default memo(NotificationsBoard);
