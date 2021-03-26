import styled from "styled-components";

export const PopupWrapper = styled.div`
  position : fixed;    
  background-color: ${({ theme }) =>
    theme === "dark" ? "var(--color-card-dark)" : "var(--white)"};
  transform : ${({show}) => show ? "translateX(0)" : "translateX(200%)"};
  transition-delay : 1s;
  cursor : pointer;
  border-radius: 0.5rem;
  box-shadow: var(--mediumShadow);
  font-size: 0.9rem;
  padding: 1rem 2rem;
  right : 2rem;
  bottom : 2rem;
  transition : all 1s linear;
  z-index : 11;
`;
