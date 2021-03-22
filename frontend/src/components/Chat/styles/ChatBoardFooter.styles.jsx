import styled from "styled-components";

export const Wrapper = styled.div`
  width: 100%;
  height: auto; 
  display: flex;
  flex-direction: column;
  border-radius: 0.4rem 0.4rem 0 0 ;
  position : relative;  
  background-color : var(--gray-light);
`;

export const ChatInput = styled.div`
  flex: 1;  
  position : relative;  
  display : flex;
  flex-direction : column;  
`;

export const ChatActions = styled.div`
  background-color: ;
  display : flex;
  align-items:center;
  padding: 0.5rem ;
  border-bottom : 1px solid var(--gray-deep);
`;

export const Label = styled.label`
  display: inline-flex;
  cursor: pointer;
  font-size: 1.6rem;
  margin-right: 0.5rem;  
  position : relative;      
  & input{
    display : none ; 
  }  
  
`;

export const EmojiComponent = styled.div`  
  display: ${({ show }) => (show ? "block" : "none")};
  position: absolute;
  bottom: 100%;
  left:  -1rem;
  & button{
    & > span {
      cursor:pointer !important;
    }
    outline : none;
    border:none;
  }
`;

export const SendMessage = styled.button`
  display : inline-block;
  position : absolute;
  border:  none ; 
  outline: none  ;
  font-size : 1.5rem;
  background-color: transparent ; 
  cursor : pointer;
  color:  #3949ab;
  right:  1rem;
  bottom: 0.2rem;
  &:hover{
    color: #1a237e;
  }

`

export const PlaceHolder = styled.div`
  position : absolute;
  left: 1rem;
  top : 25%;
  color : var(--gray-deep);
  cursor: auto;
  display : ${({show}) => show ? "block" : "none"};
`