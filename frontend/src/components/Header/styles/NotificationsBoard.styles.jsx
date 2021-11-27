import styled from 'styled-components/macro';
import InfiniteScroll from 'react-infinite-scroll-component';

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) =>
    theme ? theme.card.primary : 'var(--card-primary)'};
  border-radius: 0.5rem;
  box-shadow: var(--mediumShadow);
  color: inherit;
  border: 1px solid ${({ theme }) => (theme ? theme.border : 'var(--border)')};
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
