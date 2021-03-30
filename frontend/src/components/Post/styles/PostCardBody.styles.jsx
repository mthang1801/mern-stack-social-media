import styled from "styled-components";

export const Wrapper = styled.div`
`;

export const DraftEditor = styled.div`
  cursor: text !important;
  .DraftEditor-root {
    width: 100% !important;   
    padding: 0.5rem 1rem;
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;
    &::-webkit-scrollbar{
      display : none;
    }
    a {
      color : blue;
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
