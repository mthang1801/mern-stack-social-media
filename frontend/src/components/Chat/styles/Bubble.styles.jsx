import styled from "styled-components";
import { Link } from "react-router-dom";

export const MentionLinkInfo = styled.div`
  position: absolute;
  visibility: hidden;
  opacity: 1;
  left: -8%;
  z-index: 5;
  background-color: white;
  padding: 0.5rem;
  width: auto;
  min-width: 12rem;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: flex;
  align-items: center;
  border-radius: 0.5rem;
  transition: var(--mainTransition);
  font-size: 0.8rem;
  &:hover {
    opacity: 1;
  }
`;

export const Wrapper = styled.div`
  width: 100%;
  margin-bottom: 1rem;  
  &::after {
    content: "";
    clear: both;
    display: table;
  }
  ${MentionLinkInfo} {
    top: ${({ index }) => (index === 0 ? "1.5rem" : "unset")};
    bottom: ${({ index }) => (index === 0 ? "unset" : "1.5rem")};
  }
`;

export const BubbleContainer = styled.div`
  float: ${({ me }) => (me ? "left" : "right")};
  width: auto;
  min-width: 20rem;
  max-width: 75%;
  display: flex;
  align-items: flex-start;
  ${({ me }) =>
    me
      ? `
    margin-right: 25%;
    flex-direction : row;
    & > *:first-child{
      margin-right: 0.5rem;
    }
  `
      : `
    margin-left: 25%;
    flex-direction : row-reverse;
    & > *:first-child{
      margin-left: 0.5rem;
    }
  `};
`;
export const BubbleTimeline = styled.div`
  &::before {
    content: "";
    clear: both;
    display: table;
  }

  font-size: 0.85rem;
  & > div {
    ${({ me }) =>
      me
        ? `
    margin-left: 2.5rem;
    `
        : `
    margin-left: auto; 
    margin-right : 2.5rem;
      
    `};
    display: flex;
    justify-content: space-between;
    ${({ width }) =>
      width
        ? `    
    width : ${width}px;
  `
        : `
    display : none; 
  `}
  }
`;
export const Avatar = styled.div`
  width: 2rem;
  height: 2rem;
  & img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    border: 1px solid var(--gray);
  }
`;

export const Message = styled.div`
  width: calc(100% - 2rem);
  border-radius: 0.5rem;
  word-break: break-all;
  ${({ me, messageType }) =>
    messageType !== "TEXT"
      ? null
      : me
      ? `
    background : linear-gradient(to right bottom, #e1f5fe, #b3e5fc,#81d4fa) ;  
  `
      : `
  background : linear-gradient(to left bottom, #fafafa , #f5f5f5,#eeeeee) ;  
  `}
  & .DraftEditor-root {
    overflow: unset;
    max-height: unset;
    margin-right: 0;
    max-height: unset;
    padding: 0.5rem;
  }
`;
export const MentionWrapper = styled(Link)`
  position: relative;
  opacity: 1;
  &:hover ${MentionLinkInfo} {
    visibility: visible;
  }
  &:hover {
    opacity: 1;
    z-index: 4;
  }
`;

export const MentionInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

export const MentionAvatar = styled.img`
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  margin-right: 0.4rem;
`;

export const ImageContainer = styled.div`
  width: 100%;
  max-width: 18rem;
  cursor : pointer;
  & img {
    width: 100%;
  }
`;
