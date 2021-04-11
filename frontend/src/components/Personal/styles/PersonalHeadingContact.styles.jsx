import styled from "styled-components";

export const PersonalContactContainer = styled.div`
  padding: 0 2rem;
  margin-bottom: -0.5rem;
  display: flex;
  & button {
    width: 45px;
    height: 45px;
    margin: 0 0.5rem;
    transform : scale(1.25);
    font-size : 1.5rem;
  }
`;

export const ResponseRequests = styled.div`
  position: relative;
`;

export const DropdownResponseRequest = styled.div`
  position: absolute;
  top: 110%;
  background-color: ${({ theme }) =>
    theme === "dark" ? "var(--color-card-dark)" : "var(--color-card-default)"};
  border-radius: 0.5rem;
  box-shadow: var(--lightShadow);
  display: ${({open}) => open ? "block" : "none"};
  
  border: 1px solid
    ${({ theme }) =>
      theme === "dark"
        ? "var(--color-border-dark)"
        : "var(--color-border-default)"};
  div {
    display: flex;
    align-items: center;
    padding: 0.5rem 0.75rem;
    cursor: pointer;
    &:first-child:hover {     
      color : #43a047 ;
    }
    &:last-child:hover {      
      color : #e53935 ;
    }

    & *:last-child {
      margin-right: 0.5rem;
    }
  }
`;

export const SettingWrapper =styled.div`
  position : relative; 
`

export const SettingsDropdown = styled.div`
  position : absolute; 
  bottom : 120%;
  width : 160px;
  border-radius : 0.5rem;
  right : 0;
  list-style: none ; 
  background-color : ${({theme}) => theme === "dark" ? "var(--color-card-dark)" : "var(--color-card-default)"};
  border:  1px solid ${({theme}) => theme === "dark" ? "var(--color-border-dark)" : "var(--color-border-default)"}  
`

export const SettingItem = styled.span`  
  cursor : pointer;
  padding : 0.25rem 0.5rem;
  display : flex;
  align-items :center;
  & span {
    display  :flex;
    &:first-child{
      margin-right : 0.5rem;      
    }
    & svg{
      font-size : 1.1rem;
    }
  }
  &:not(:last-child){
    border-bottom : 1px solid var(--gray-light);    
  }
  &:hover{
    background-color : ${({theme}) => theme === "dark" ? "var(--color-hover-dark)" : "var(--color-hover-default)"}
  }
`