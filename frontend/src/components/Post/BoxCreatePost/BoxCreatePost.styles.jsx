import styled from "styled-components";

const Box = styled.div`
  width: 95%;
  margin: auto;
  
  background-color: ${({ theme }) =>
    theme === "dark" ? "var(--color-card-dark)" : "var(--white)"};
  border-radius: 8px;
  box-shadow: var(--lightShadow);
  & > * {
    padding: 0.5rem 1rem;
    &:not(:last-child){
      border-bottom: 1px solid
      ${({ theme }) =>
        theme === "dark" ? "var(--gray-dark)" : "var(--gray-light)"};
    }
  }
  .box-header {
    display: flex;
    align-items: center;
    &__avatar {
      width: 40px;
      height: 40px;
      margin-right: 0.5rem;
      & img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
    &__center {
      flex: 1;
      &-username {
        text-transform: capitalize;
        font-size: 0.95rem;
        font-weight: 600;
      }
      &-current-position {
        padding: 0.2rem 0.6rem;
        text-align: center;
        background-color: var(--light);
        border-radius: 0.5rem;
      }
    }
    &__box-zoom {
      button {
        outline: none;
        border: none;
        background-color: transparent;
        cursor: pointer;
        font-size: 1.2rem;
      }
    }
  }
  .box-body {
    .text-post {
      width: 100%;
      position: relative;
      background-color: ${({ theme }) =>
        theme === "dark" ? "var(--color-card-dark)" : "var(--white)"};
      color: inherit;
      outline: none;
      border: none;
      padding: 0.5rem 0;
      resize: none;
      font-family: var(--fontFamily);
      font-size: 1rem;
      & .rc-mentions-measure {
        position: absolute;
        top: 0;
      }      
    }
    .image-gallery-svg {
      height: 30px;
    }
  }
  .box-footer {
    &__actions {
      display: flex;
      label.input-icon {
        display : flex;
        cursor: pointer;
        font-size: 1.6rem;
        margin-right: 0.5rem;
        & input,
        & span {
          display: none;
        }
      }
      .input-photo {
        color: var(--success);
      }
      .input-emoji {
        color: var(--yellow);
        position: relative;
      }
      .show-emoji {
        display: block !important;
        position: absolute;
        z-index: 1;
      }
      .button-icon{
        position : relative;
        display : flex;
        align-items : center;
        button{
          display : flex;
          outline : none ; 
          border: none;
          font-size : 1.3rem;
          background-color :transparent;
          cursor : pointer;
          color : var(--success);
        }
        .status-box{
          position : absolute;
          font-size : 0.9rem;
          visibility : hidden ; 
          opacity : 0 ;
          width : 10rem;         
          transition : var(--mainTransition);
          z-index: 2;
          top : 100%;          
          background-color: ${({ theme }) =>
          theme === "dark" ? "var(--color-card-dark)" : "var(--white)"};  
          border-radius : 0.5rem;
          border: 1px solid     ${({ theme }) =>
          theme === "dark" ? "var(--color-background-dark)" : "var(--color-background-default)"};       
          box-shadow : var(--lightShadow);
          overflow : hidden;                    
        }   
        .show-status{
          visibility : visible ; 
          opacity : 1 ;                         
        }     
        
        .status-box label{
          display : flex;
          align-items: center;
          padding : 0.5rem;
          cursor : pointer;          
          &:hover{
            background-color: ${({ theme }) =>
            theme === "dark" ? "var(--color-background-dark)" : "var(--color-background-default)"}; 
          }
          
          span{
            flex:  1;
            display : flex;
            align-items: center;
            & > *{
              margin-right : 0.5rem;
            }
          }
        }
      }
    }
  }
`;

export {Box}