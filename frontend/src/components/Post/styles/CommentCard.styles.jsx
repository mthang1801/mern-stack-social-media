import styled from 'styled-components/macro';
import { Link } from 'react-router-dom';
export const CommentContainer = styled.div`
  width: 100%;
  padding: 0.3rem 1rem;
  display: flex;
`;

export const UserAvatar = styled.div`
  width: 2rem;
  height: 2rem;
  img {
    width: 100%;
    border-radius: 50%;
  }
`;

export const CommentContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-left: 0.5rem;
`;

export const CommentText = styled.div`
  font-size: 0.88rem;
  border: 1px solid
    ${({ theme }) =>
      theme === 'dark'
        ? 'var(--color-border-dark)'
        : 'var(--color-border-default)'};
  border-radius: 0.5rem;
  padding: 0.25rem 0.7rem;
  opacity: 0.8;
  position: relative;
`;

export const UserName = styled(Link)`
  font-size : 0.95rem ; 
  font-weight : bold;  
  opacity : 1 
  &:hover{
    opacity : 1 ;
  }
`;

export const CommentControls = styled.div`
  font-size: 0.85rem;
`;
export const ControlItem = styled.span`
  margin: 0 0.4rem;
  cursor: pointer;
  opacity: 0.7;
  ${({ active }) =>
    active &&
    `
    color: var(--blue-1); 
    opacity : 1;
  `};
  &:hover {
    opacity: 1;
  }
`;

export const LikeButton = styled.div`
  width: 1.25rem;
  height: 1.25rem;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(
    to right bottom,
    var(--blue-1) 35%,
    var(--blue-2) 70%,
    var(--blue-3) 100%
  );
  outline: none;
  border: none;
  color: white;
  font-size: 1rem;
  margin-right: 0.25rem;
`;

export const LikeCounters = styled.div`
  position: absolute;
  bottom: -0.7rem;
  right: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 1rem;
  background: ${({ theme }) =>
    theme === 'dark' ? 'var(--color-card-dark)' : 'var(--color-card-default)'};
  padding: 0 0.3rem 0 0;
  box-shadow: var(--lightShadow);
  border: 1px solid var(--light-gray-1);
`;
