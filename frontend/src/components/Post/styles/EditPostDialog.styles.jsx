import styled from 'styled-components';

export const PostEditorContainer = styled.div`
  width: 100%;
  max-width: 600px;
  max-height: 600px;
  overflow-y: auto;
  position: fixed;
  top: 35%;
  left: 50%;
  transform: translate(-50%, -50%);
  @media screen and (min-width: 768px) {
    top: 15%;
    left: 50%;
    transform: translateX(-50%);
  }
  & > * {
    width: 100%;
    max-width: unset;
  }
  overflow: auto;
`;
