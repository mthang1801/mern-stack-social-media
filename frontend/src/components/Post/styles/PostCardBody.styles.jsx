import styled from 'styled-components/macro';

export const Wrapper = styled.div``;

export const DraftEditor = styled.div`
  cursor: text !important;
  .DraftEditor-root {
    width: 100% !important;
    padding: 0.5rem 1rem;
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none;
    &::-webkit-scrollbar {
      display: none;
    }
    a {
      color: var(--blue-1);
    }
    a[aria-label='hashtag'] {
      color: inherit;
      opacity: 0.8;
      background: linear-gradient(
        to bottom,
        #90caf9 40%,
        #64b5f6 60%,
        #42a5f5 100%
      );
      padding: 0.1rem;
    }
  }
`;

export const HashtagLink = styled.span`
  color: #575f67;
  cursor: pointer;
  display: inline-block;
  background: #e6f3ff;
  padding-left: 2px;
  padding-right: 2px;
  border-radius: 2px;
  text-decoration: none;
`;

export const CardPreview = styled.div`
  margin: 1rem auto;
`;
