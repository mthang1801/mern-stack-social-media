import React from "react";
import styled from "styled-components";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useThemeUI } from "theme-ui";
import {Link} from "react-router-dom"
const CardProfile = ({ user }) => {
  const { colorMode } = useThemeUI();
  return (
    <CardWrapper theme={colorMode}>
      <div className="user-avatar">
        <Link to={`/${user.slug}`} className="user-avatar__container">
          <LazyLoadImage
            src={user.avatar}            
            alt={user.avatar}
            effect="blur"
            width="60px"
            height="60px"
            className="user-avatar__image"
          />
        </Link>
      </div>
      <a href={`/${user.slug}`} className="user-name">
        <h4 className="user-name__primary">{user.name}</h4>

        <h6 className="user-name__secondary">@{user.slug}</h6>
      </a>
      <div className="user-association">
        <Link to={`/${user.slug}/friends`} >
          <div><strong>100</strong></div>
          <div>Friends</div>
        </Link>
        <Link to={`/${user.slug}/groups`}>
          <div><strong>7</strong></div>
          <div>Groups</div>
        </Link>
        <Link to={`/${user.slug}/followers`}>
          <div><strong>15</strong></div>
          <div>Followers</div>
        </Link>
      </div>
    </CardWrapper>
  );
};

const CardWrapper = styled.aside`  
  background-color: ${({ theme }) =>
    theme === "dark" ? "var(--color-card-dark)" : "var(--color-card-default)"};
  text-align: center;
  border-radius: 0.7rem;
  overflow : hidden;
  .user-avatar {
    height: 5rem;    
    width: 100%;
    background-color: ${({ theme }) =>
      theme === "dark" ? "var(--gray-dark)" : "var(--gray-light)"};
    position: relative;
    &__container {
      position: absolute;
      top: 75%;
      left: 50%;
      transform: translate(-50%, -25%);
    }
    &__image {
      border-radius: 50%;
      border: 2px solid
        ${({ theme }) =>
          theme === "dark"
            ? "var(-color-border-dark)"
            : "var(--color-border-default)"};
    }
  }
  .user-name {
    margin:  2rem 0 1rem 0 ;
    display : block;
    &__primary {
      text-transform: capitalize;
      font-weight: bolder;
      font-size: 1.1em;
      margin-bottom: 0.5rem;
    }
    &__secondary{
      font-weight: normal;
      font-size : 0.9em;
      opacity : 0.6;
    }
  }
  .user-association{
    display : grid; 
    grid-template-columns : repeat(3,1fr);
    & a{
      padding: 0.5rem 0;
      transition : var(--mainTransition);
      &:hover{        
        color : var(--success);
      }
    }    
  }
  
`;

export default React.memo(CardProfile);
