import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 100%;
  margin: 0.5rem 0;
`;

export const Controls = styled.div`
  width: 95%;
  margin: auto;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  border: 1px solid
    ${({ theme }) =>
      theme === 'dark'
        ? 'var(--color-border-dark)'
        : 'var(--color-border-default)'};
  border-left: none;
  border-right: none;
`;

export const Button = styled.button`
  outline: none;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.6rem 1rem;
  border: 1px solid transparent;
  background-color: transparent;
  font-size: 0.95rem;
  cursor: pointer;
  &:hover {
    background-color: ${({ theme }) =>
      theme === 'dark'
        ? 'var(--color-background-dark)'
        : 'var(--color-background-default)'};
    border-radius: 0.5rem;
  }
  & span {
    display: flex;
  }
  & span:not(:first-child) {
    margin-left: 0.2rem;
  }
  & svg {
    font-size: 1.1rem;
  }

  ${({ liked }) =>
    liked &&
    `
    color : var(--blue-1);
    border: 1px solid var(--blue-1);
    border-radius : 0.5rem;
    font-weight :bold;
  `}
`;

export const LikeButton = styled.button`
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
  font-size: 0.9rem;
`;

export const Comments = styled.section`
  margin-top: 0.5rem;
`;

export const UserComment = styled.div`
  width: 100%;
  padding: 0.5rem 1rem;
  display: flex;
  align-items: flex-start;
`;
export const AvatarContainer = styled.div`
  width: 2rem;
  height: 2rem;
  img {
    width: 100%;
    border-radius: 50%;
  }
`;

export const FormComment = styled.div`
  flex: 1;
  margin-left: 0.5rem;
`;

export const PostInfo = styled.div`
  width: 100%;
  padding: 0.5rem 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: ;
`;

export const CounterLike = styled.div`
  display: flex;
  align-items: center;
  & > *:not(:first-child) {
    margin-left: 0.2rem;
  }
  font-size: 0.95rem;
`;

export const CommentCounter = styled.div`
  text-align: right;
  font-size: 0.9rem;
  margin-left: auto;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;
