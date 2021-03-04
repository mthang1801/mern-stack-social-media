import styled from "styled-components";

export const Wrapper = styled.div`
  width: 100%;
  height: auto;
  min-height: 100px;
  max-height: 220px;
  display: flex;
  flex-direction: column;
  border-radius: 0.4rem 0.4rem 0 0 ;
  position : relative;
`;

export const ChatInput = styled.div`
  flex: 1;
  height: 75%;  
  position : relative;
  overflow : auto;

  & > div{
    height: 100%;
    padding: 0.5rem;
    font-size: 1rem;
  }
  
`;

export const ChatActions = styled.div`
  padding: 0.2rem 0.5rem;
  display : flex;
  align-items:center;
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
