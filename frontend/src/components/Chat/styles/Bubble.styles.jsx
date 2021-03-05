import styled from "styled-components"

export const Wrapper = styled.div`
  width : 100%;  
  margin-bottom : 1rem;  
  &::after{
    content: "";
    clear: both;
    display: table;
  }
`

export const BubbleContainer = styled.div`
  float : ${({me}) => me ? "left" : "right"};  
  width : auto; 
  max-width : 75%;
  display : flex;  
  align-items: flex-start;
  ${({me}) => me ? `
    margin-right: 25%;
    flex-direction : row;
    & > *:first-child{
      margin-right: 0.5rem;
    }
  ` : `
    margin-left: 25%;
    flex-direction : row-reverse;
    & > *:first-child{
      margin-left: 0.5rem;
    }
  `}; 
  
`

export const Avatar = styled.div`
  width : 2rem;
  height : 2rem;
  & img{
    width : 100%;
    height: 100%;
    border-radius : 50%;
    border : 1px solid var(--gray);
  }
`



export const Message = styled.div`
  width : calc(100% - 2rem);
  padding: 0.75rem;
  border-radius : 0.5rem;
  box-shadow : var(--lightShadow);
  ${({me}) => me ? `
    background-color : #039be5  ;  
  ` : `
  
  `}
`