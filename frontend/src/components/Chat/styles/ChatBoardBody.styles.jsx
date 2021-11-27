import styled from 'styled-components/macro';

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) =>
    theme ? theme.background : 'var(--background)'};
  padding: 1rem 2rem;
  overflow: auto;
`;
