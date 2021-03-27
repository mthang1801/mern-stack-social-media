import styled from "styled-components";

export const PopupWrapper = styled.div`
  position : fixed;    
  background-color: ${({ theme }) =>
    theme === "dark" ? "var(--color-card-dark)" : "var(--white)"};
  transform : ${({show}) => show ? "translateX(0)" : "translateX(200%)"};
  transition-delay : 1s;
  cursor : pointer;
  border-radius: 0.5rem;
  box-shadow: var(--mediumShadow);
  font-size: 0.9rem;
  padding: 1rem 2rem;
  right : 2rem;
  bottom : 2rem;
  transition : all 1s linear;
  z-index : 11;
`;

export const Wrapper = styled.div`
  position : absolute;    
  background-color: ${({ theme }) =>
    theme === "dark" ? "var(--color-card-dark)" : "var(--white)"};
  transform : ${({show}) => show ? "translateX(0)" : "translateX(25rem)"};
  
  transition-delay : 1s;
  display : flex;
  justify-content : space-between;
  align-items : flex-start;
  cursor : pointer;
  border-radius: 0.5rem;
  box-shadow: var(--mediumShadow);
  font-size: 0.9rem;
  padding: 0.5rem 1rem;
  left: -14rem;
  width : 20rem;
  top : 120%;
  transition : ${({show}) => show ? "all 1s linear": "unset"};
  z-index : 11;
`

export const SenderAvatar = styled.div`
  width : 2rem;
  height : 2rem;
  img{
    width : 100%; 
    height: 100%;
    border-radius : 50%;
  }
`
export const NotificationContent = styled.div`
  flex : 1 ;
  margin-left : 0.5rem;
`
export const SenderName = styled.span`
  font-weight: bold;
  margin-right: 0.5rem;
`

export const Content = styled.span`

`