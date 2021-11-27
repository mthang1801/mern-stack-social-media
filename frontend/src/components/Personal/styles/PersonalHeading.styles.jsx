import styled from 'styled-components/macro';
import { Link } from 'react-router-dom';
export const Container = styled.div`
  width: 100%;
  background-color: ${({ theme }) =>
    theme === 'dark' ? 'var(--color-card-dark)' : 'var(--color-card-default)'};
  height: 600px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-top: 60px;
`;

export const PersonalHeadingBackground = styled.div`
  width: 100%;
  height: 55%;
  margin: 0 auto;
  background: ${({ background }) =>
    background ? `url(${background}) no-repeat center ` : 'unset'};
  background-size: 100% 100%;
  border-radius: 4px;
  position: relative;
  @media screen and (min-width: 992px) {
    width: 90%;
    height: 75%;
  }
  text-align: center;
`;

export const BackgroundImageContainer = styled.div`
  & > img {
    width: 8rem;
    height: 8rem;
    border-radius: 50%;
    border: 5px solid
      ${({ theme }) =>
        theme === 'dark' ? 'var(--gray)' : 'var(--color-border-default)'};
  }
  position: absolute;
  bottom: -8rem;
  left: 50%;
  transform: translateX(-50%);
  @media screen and (min-width: 992px) {
    & > img {
      width: 10rem;
      height: 10rem;
    }
    left: 10%;
    display: flex;
    bottom: 0;
    transform: translateY(50%);
  }
`;

export const UserName = styled.div`
  text-align: center;
  h4 {
    text-transform: capitalize;
  }
  @media screen and (min-width: 992px) {
    align-self: flex-end;
    margin-bottom: 1rem;
    text-align: left;
  }
`;

export const Footer = styled.div`
  margin: 1rem auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  height: 45%;
  @media screen and (min-width: 992px) {
    width: 90%;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-end;
    height: 25%;
  }
`;

export const PersonalMenus = styled.div`
  margin: 3rem auto;
  @media screen and (min-width: 992px) {
    margin: 0;
  }
`;

export const ProfileMenuItemLink = styled(Link)`
  padding: 1rem 1.5rem;
  transition: var(--mainTransition);
  &:hover {
    background-color: ${({ theme }) =>
      theme === 'dark'
        ? 'var(--color-background-dark)'
        : 'var(--color-background-default)'};
    border-radius: ${({ active }) =>
      active === 'true' ? '0.5rem 0.5rem 0 0' : '0.5rem'};
  }
  border-bottom: ${({ active }) =>
    active === 'true' ? '2px solid var(--primary)' : '2px solid transparent'};
`;
