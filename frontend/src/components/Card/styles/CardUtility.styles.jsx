import styled from 'styled-components/macro';

export const CardWrapper = styled.aside`
  background-color: ${({ theme }) =>
    theme ? theme.card.primary : 'var(--card-priamry)'};
  text-align: center;
  border-radius: 0.7rem;
  overflow: hidden;
  padding: 1.5rem;
  .auth {
    & > * {
      margin: 1rem auto;
    }
  }
`;

export const Welcome = styled.h4`
  font-size: 1.1em;
  font-weight: 600;
`;
