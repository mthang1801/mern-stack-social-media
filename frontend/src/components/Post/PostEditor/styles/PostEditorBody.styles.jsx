import styled from 'styled-components';
import { Link } from 'react-router-dom';
export const Wrapper = styled.div``;

export const DraftEditor = styled.div`
  flex: 1;
  cursor: text !important;
  .DraftEditor-root {
    width: 100% !important;
    max-height: 8rem;
    min-height: 4rem;
    padding: 0.5rem 1rem;
    overflow: auto;
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none;
    &::-webkit-scrollbar {
      display: none;
    }
  }
`;

export const Toolbar = styled.div`
  display: flex;
  padding: 0.5rem 0.75rem;
`;

export const Label = styled.label`
  font-size: 1.4rem;
  display: flex;
  align-items: center;
  color: ${({ name }) => (name === 'post-images' ? 'var(--cyan-1)' : 'orange')};
  &:hover {
    color: ${({ name }) =>
      name === 'post-images' ? 'var(--cyan-2)' : 'orange'};
  }
  input {
    display: none;
  }
  margin: 0 0.5rem;
  cursor: pointer;
`;

export const CardPreview = styled.div`
  margin: 1rem auto;
  width: 100%;
  & * {
    width: 100%;
    max-width: unset;
  }
`;
