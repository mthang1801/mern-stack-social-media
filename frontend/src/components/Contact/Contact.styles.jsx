import styled from 'styled-components/macro';

export const ContactWrapper = styled.div`
  position: relative;
  border: 1px solid ${({ theme }) => (theme ? theme.border : 'var(--border)')};
  box-shadow: ${({ theme }) => (theme ? theme.boxShadow : 'var(--boxShadow)')};
  border-radius: 0.5rem;
  padding: 2rem 0;
  margin: 2rem auto 4rem auto;
  background-color: ${({ theme }) =>
    theme ? theme.card.primary : 'var(--card-primary)'};
`;

export const Title = styled.h4`
  position: absolute;
  top: -1rem;
  left: 2.5%;
  background: ${({ theme }) =>
    theme
      ? `linear-gradient(to bottom, ${theme.background} 55%, inherit 50%)`
      : 'linear-gradient(to bottom, var(--background) 55%, inherit 50%)'};
  padding: 0 1rem;
  font-size: 1.2rem;
`;

export const ContactItemWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 1rem;
  &:hover {
    background-color: ${({ theme }) =>
      theme ? theme.hover.background : 'var(--hover-background)'};
  }
`;

export const ContactInfo = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  width: 60%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  & img {
    width: 4rem;
    height: 4rem;
    border-radius: 50%;
  }
  & a:last-child {
    margin-left: 1rem;
    display: flex;
    flex-direction: column;
  }
`;

export const ContactActions = styled.div`
  display: flex;
  flex-direction: column;
  & > * {
    margin: 0.25rem;
  }
  @media screen and (min-width: 768px) {
    flex-direction: row;
    & > * {
      margin: 0 0.25rem;
    }
  }
`;

export const FriendActions = styled.div`
  display: grid;
  margin-left: auto;
  grid-template-columns: repeat(2, 1fr);
  grid-gaps: 0.5rem;
  @media screen and (min-width: 768px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

export const LinkReadMore = styled.div`
  text-align: center;
  margin: 1rem auto 0rem auto;
  & span {
    color: var(--link);
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
`;
