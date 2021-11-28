import styled, { keyframes } from 'styled-components/macro';

const LocalesBoardMovement = keyframes`
  from {
    transform : translateX(100%); 
    visibility: hidden;
  }
  to{
    transform : translateX(0);
    visibility: visible;
  }
`;

export const ListLocalesSelection = styled.ul`
  transition: var(--mainTransition);
  width: 80vw;
  max-width: 360px;
  border: 1px solid ${({ theme }) => (theme ? theme.border : 'var(--border)')};
  right: 0;
  border-radius: 0.5rem;
  overflow: hidden;
  visibility: hidden;
  background-color: ${({ theme }) =>
    theme ? theme.card.primary : 'var(--card-primary)'};
  color: ${({ theme }) => (theme ? theme.text : 'var(--text)')};
  z-index: 3;
  animation: ${LocalesBoardMovement} 0.2s linear;
  animation-delay: 0.1s;
  animation-fill-mode: forwards;
  display: ${({ open }) => (open ? 'block' : 'none')};
  & svg {
    width: 1.25rem;
    height: 1.25rem;
    margin-right: 0.2rem;
  }
`;
