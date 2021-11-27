import styled from 'styled-components/macro';

export const EditorWrapper = styled.section`
  width: ${({ fullWidth }) => (fullWidth ? '100%' : '95%')};
  max-width: ${({ fullWidth }) => (fullWidth ? 'unset' : '500px')};
  min-height: ${({ fullWidth }) => (fullWidth ? '300px' : 'unset')};
  background-color: ${({ theme }) =>
    theme === 'dark' ? 'var(--color-card-dark)' : 'var(--color-card-default)'};
  box-shadow: var(--lightShadow);
  margin: 0 auto 1rem auto;
  border-radius: 0.5rem;
  padding-bottom: 0.25rem;
  display: flex;
  flex-direction: column;

  ${({ isEdited }) =>
    isEdited &&
    `
    width : 100%; 
    max-width : unset;
  `}
`;
