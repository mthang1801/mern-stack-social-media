import styled from "styled-components";

export const EditorWrapper = styled.section`
  width: 95%;
  max-width: 800px;
  background-color: ${({ theme }) =>
    theme === "dark" ? "var(--color-card-dark)" : "var(--color-card-default)"};  
  box-shadow: var(--lightShadow);
  margin: 0 auto 1rem auto;
  border-radius: 0.5rem;
  padding-bottom : 0.25rem;
`;
