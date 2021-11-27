import styled from 'styled-components/macro';
import { Link } from 'react-router-dom';

export const ResponseInput = styled.div`
  width: 95%;
  margin: 0.5rem 0 0.5rem auto;
  display: flex;
`;
export const ResponsesComponent = styled.div`
  width: 95%;
  margin: 0.5rem 0 0.5rem auto;
  display: block;
`;

export const Response = styled.div`
  flex: 1;
  margin-left: 0.5rem;
`;

export const LoadMoreResponse = styled.span`
  color: inherit;
  font-size: 0.88rem;
  padding: 0.5rem 0.4rem;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
  display: flex;
  align-items: center;
  & span {
    margin-left: 0.1rem;
  }
`;
export const UserAvatar = styled.div`
  width: 2rem;
  height: 2rem;
  img {
    width: 100%;
    border-radius: 50%;
  }
`;

export const CommentResponse = styled.div`
  width: 90%;
  margin-left: auto;
  margin-right: 1rem;
  padding: 0 1rem;
`;
