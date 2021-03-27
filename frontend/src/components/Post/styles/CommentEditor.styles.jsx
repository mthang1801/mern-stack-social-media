import styled from "styled-components";


export const CommentInput = styled.div`
  .DraftEditor-root{
    width : 100% ; 
    border : 1px solid ${({theme}) => theme === "dark" ? "var(--color-border-dark)" : "var(--color-border-default)"};
    border-radius: 0.5rem;
    padding: 0.25rem 0.5rem;
    max-height: 5rem;
    overflow : auto;
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;
    &::-webkit-scrollbar{
      display : none;
    }    
  }
`

export const CommentControls = styled.div`
  display : ${({show}) => show ? "block" : "none"};
  .e8k2yoa, .e13wqaj6{    
    color : inherit;  
    transform: scale(1.5);
    opacity : 0.6;
    &:hover{
      color : inherit; 
    }
  }
`