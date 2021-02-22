import styled from "styled-components";

export const PersonalContactContainer = styled.div`
  padding: 0 2rem;
  margin-bottom: -0.5rem;
  display: flex;
  & button {
    width: 45px;
    height: 45px;
    margin: 0 0.4rem;
    transform : scale(1.05);
  }
`;

export const ResponseRequests = styled.div`
  position: relative;
`;

export const DropdownResponseRequest = styled.div`
  position: absolute;
  top: 110%;
  background-color: ${({ theme }) =>
    theme === "dark" ? "var(--color-card-dark)" : "var(--color-card-default)"};
  border-radius: 0.5rem;
  box-shadow: var(--lightShadow);
  display: ${({open}) => open ? "block" : "none"};
  
  border: 1px solid
    ${({ theme }) =>
      theme === "dark"
        ? "var(--color-border-dark)"
        : "var(--color-border-default)"};
  div {
    display: flex;
    align-items: center;
    padding: 0.5rem 0.75rem;
    cursor: pointer;
    &:first-child:hover {     
      color : #43a047 ;
    }
    &:last-child:hover {      
      color : #e53935 ;
    }

    & *:last-child {
      margin-right: 0.5rem;
    }
  }
`;
