import styled from 'styled-components/macro';

export const Wrapper = styled.article`
  width: 95%;
  max-width: 500px;
  background-color: ${({ theme }) =>
    theme ? theme.card.primary : 'var(--card-primary)'};
  box-shadow: var(--lightShadow);
  margin: 0 auto 1rem auto;
  border-radius: 0.5rem;
  padding-bottom: 0.25rem;
`;

export const FetchMoreLink = styled.span`
  display: block;
  color: var(--link);
  padding: 0rem 1rem 1.2rem 1rem;
  font-size: 0.9rem;
  cursor: pointer;
  &:hover {
    color: var(--blue-3);
  }
`;
