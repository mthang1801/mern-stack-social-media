import styled from 'styled-components/macro';

export const CommentInput = styled.div`
  .DraftEditor-root {
    width: 100%;
    border: 1px solid ${({ theme }) => (theme ? theme.border : 'var(--border)')};
    border-radius: 0.5rem;
    padding: 0.25rem 0.5rem;
    max-height: 5rem;
    overflow: auto;
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none;
    &::-webkit-scrollbar {
      display: none;
    }
  }
`;

export const CommentControls = styled.div`
  display: ${({ show }) => (show ? 'flex' : 'none')};
  align-items: center;

  .e8k2yoa,
  .e13wqaj6 {
    color: inherit;
    margin-top: 0.25rem;
    opacity: 0.6;
    &:hover {
      color: inherit;
    }
  }
`;
export const InputImage = styled.label`
  display: flex;

  input {
    display: none;
  }
  font-size: 1.3rem;
  margin-top: 0.1rem;
  background-color: transparent;
  display: flex;
  cursor: pointer;
`;
