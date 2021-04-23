import styled from "styled-components";
import InfiniteScroll from "react-infinite-scroll-component";

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) =>
    theme === "dark" ? "var(--color-card-dark)" : "var(--white)"};
  border-radius: 0.5rem;
  box-shadow: var(--mediumShadow);
  color: inherit;
  border: 1px solid
    ${({ theme }) => (theme === "dark" ? "var(--dark)" : "var(--light)")};
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0rem 0.75rem;  
`;

export const Title = styled.h4`
  font-size: 1.2rem;
`;

export const Body = styled.section`    
`;
