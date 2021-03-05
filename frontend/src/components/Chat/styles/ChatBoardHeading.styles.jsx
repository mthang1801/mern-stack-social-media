import styled, {css} from "styled-components"


export const Wrapper = styled.header`
height: 65px;
width : 100%; 
background-color : #e8f5e9;
display : flex;
padding: 1rem 2rem;  
justify-content: space-between;
align-items : center;
`

export const User = styled.div`
display : flex;
align-items : center;  
`

export const Avatar = styled.div`
width : 2.5rem;
height : 2.5rem;
& > img{
  width : 100%; 
  height: 100%;
  border-radius : 50%;
}
`

export const UserInfo  = styled.div`
margin-left : 0.4rem;
h4{
  font-size : 1rem;
}
flex: 1;
`

export const Controls = styled.div`
  display : flex;
  align-items: center;
`

export const LinkItem = styled.span`
  display : inline-block;
  cursor : pointer;
  font-size : 1.4rem;
  margin :  0  0.5rem;
  ${({phone}) => phone && `
    color : #039be5 ;
    &:hover{
      color : #0277bd ; 
    }
  `} 
  ${({video}) => video && `
    color : #e53935; 
    &:hover{
      color : #c62828;
    }
  `}
  ${({photo}) => photo &&`
    color : #00897b;
    &:hover{
      color : #00695c;
    }
  `}

  ${({file}) => file && `
    color : #3949ab;
    &:hover{
      color: #283593;
    }
  `}
 
`