import styled from "styled-components";
import {Link} from "react-router-dom";
export const CustomFormContainer = styled.form`
  width : 90%; 
  max-width : 500px ;
  padding : 2.5rem 3.5rem ;
  text-align : center;  
  border: 1px solid #ccc;
  margin : 1rem auto;
  border-radius : 10px;
  box-shadow : 0 3px 6px rgba(0,0,0,0.15);
  background-color : var(--light);
  display : flex ; 
  flex-direction : column ; 
  align-items : center;    
  font-family : var(--fontFamily);
  @media screen and (max-width: 500px){    
    padding : 1.5rem 2rem;
  };
`
export const FormHeader = styled.div`
  margin-bottom: 2rem;
`

export const FormGroups = styled.div`
  display : flex;
  width : 100%;
  flex-direction : column;
  justify-content : center;
  align-items : center;
  margin : 1rem auto ;

`

export const FormActions = styled.div`
  display : flex ;
  flex-direction : column;
  justify-content :center;
  align-items: center;  
`

export const Title = styled.h2`
  text-transform : uppercase ;  
  font-size : 2em;
`

export const SubTitle = styled.span`
  color : #505050;
  font-size : .95em;
`

export const StyledLink = styled(Link)`
  color : blue;
`

export const Option = styled.span`
  font-size : .95em;
`

export const FlashForm = styled.div`
  width : 100%;
  display : flex ; 
  justify-content : space-around;
  & > * {
    display : block;
    width : 46% !important;
  }
  @media screen and (max-width : 500px){    
    flex-direction : column;        
    &> *{
      width : 100% !important;
      margin-bottom : 1rem;
    }
  }
  
`

export const ErrorMessage = styled.div`
  color : red ; 
  margin-bottom : 1rem;
`
