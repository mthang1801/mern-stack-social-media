import styled from 'styled-components/macro';

export const CardWrapper = styled.div`
  text-align: center;
  padding : 2rem;
  width : 90%;
  margin: auto;
  max-width : 400px;
  background : ${({ theme }) =>
    theme === 'dark'
      ? 'linear-gradient(to right bottom, #575757, #383535)'
      : 'linear-gradient(to right bottom, #e4eced, #dae9eb, #d5eaed)'};
  border-radius : 0.75rem;
  box-shadow : var(--mediumShadow);
  h4{
    font-size : 1.1em;
    font-weight : 500;    
  }
.buttons-container{
  display : flex;
  margin: 1rem auto;
  justify-content : space-around;
  & > *{
    width  45%;
  }  
}

`;

export const Welcome = styled.h4`
  font-size: 1.1em;
  font-weight: 600;
`;
