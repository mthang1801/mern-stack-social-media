import styled from 'styled-components/macro';
import { Link } from 'react-router-dom';
import ThemeAuth from '../../assets/images/theme-auth.jpg';

export const FormBackground = styled.div`
  background-image: url(${({ background }) => background});
  min-height: 100vh;
`;

export const CustomFormContainer = styled.form`
  width: 100%;
  max-width: 500px;
  height: 100vh;
  padding: 2.5rem 3.5rem;
  text-align: center;
  border: 1px solid #ccc;
  margin: 0rem auto;

  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.15);
  background-color: var(--light);
  color: black;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: var(--fontFamily);
  @media screen and (max-width: 500px) {
    padding: 1.5rem 2rem;
  }
  background-color: white;
  @media screen and (min-width: 768px) {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 10px;
    height: unset;
  }
`;
export const FormHeader = styled.div`
  margin-bottom: 2rem;
`;

export const FormGroups = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 1rem auto;
`;

export const TextForm = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 1rem;
  .MuiFormControl-root {
    width: 100%;
  }
`;

export const ValidTextField = styled.div`
  position: absolute;
  top: 50%;
  right: 0.25rem;
  transform: translate(-50%, -50%);
  color: var(--green-1);
`;

export const FormActions = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Title = styled.h2`
  text-transform: uppercase;
  font-size: 2em;
`;

export const SubTitle = styled.span`
  font-size: 0.95em;
`;

export const StyledLink = styled(Link)`
  color: blue;
`;

export const Option = styled.span`
  font-size: 0.95em;
`;

export const FlashForm = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  & > * {
    display: block;
    width: 46% !important;
  }
  @media screen and (max-width: 500px) {
    flex-direction: column;
    & > * {
      width: 100% !important;
      margin-bottom: 1rem;
    }
  }
`;

export const ErrorMessage = styled.div`
  color: red;
  margin-bottom: 1rem;
`;
