import styled from "styled-components";

export const DropdownContainer = styled.div`
  position: relative;
  z-index : 10;
`;

export const DropdownMenu = styled.div`
  position: absolute;
  ${({ position }) =>
    position === "top"
      ? "bottom : 115%"
      : position === "bottom"
      ? "top : 115%"
      : position === "left"
      ? "right : 115%"
      : position === "right"
      ? "left : 115%"
      : null};
  border-radius: 0.5rem;
  border: 1px solid var(--gray-light);
  min-width: 120px;
  overflow-y : hidden;
  width: ${({ width }) => (width ? `${width}px` : "auto")};
  background: ${({ theme }) =>
    theme === "dark" ? "var(--color-card-dark)" : "var(--color-card-default)"}; 
  & > *:hover {
    background: ${({ theme }) =>
      theme === "dark"
        ? "var(--color-hover-dark)"
        : "var(--color-hover-default)"};
  }

`;

export const DropdownItem = styled.div`
  display : flex;
  align-items :center;
  & *{
    display : flex; 
  }
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  padding: 0.5rem 1.25rem;
  display: flex;
  cursor: pointer;
  & *:not(:first-child) {
    margin-left: 0.75rem;
  }
`;