import styled from "styled-components";
export const BoxWrapper = styled.div`
  background-color: ${({ theme }) =>
    theme === "dark" ? "var(--color-card-dark)" : "var(--color-card-default)"};
  padding: 1rem;
  border-radius: 0.5rem;
  box-shadow : var(--lightShadow);
  & a {
    color: var(--primary);
    &:hover {
      color: var(--blue);
    }
  }
`;

export const WorkList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  & li {
    padding: 0.3rem 0;
    display : flex;
    align-items: center;   
  }
 
`;

export const Introduce = styled.p`
  padding: 1.5rem 0;
  text-align: center;
  margin: 0;
`;

export const Website = styled.p`
  display : flex;
  align-items: center;
  & > span{
    display : inline-flex;
    font-size : 1.1rem;
    margin-right : 0.3rem;
  }
  & > a{
    margin : 0 0.25rem;
  }
`
