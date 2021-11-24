import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) =>
    theme === 'dark'
      ? 'var(--color-background-dark)'
      : 'var(--color-background-default)'};
  padding: 1rem 2rem;
  overflow: auto;
`;
