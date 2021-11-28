import styled from 'styled-components/macro';

export const ListSelection = styled.ul`
  transition: var(--mainTransition);
  width: 80vw;
  max-width: 360px;
  border: 1px solid ${({ theme }) => (theme ? theme.border : 'var(--border)')};
  right: 0;
  border-radius: 0.5rem;
  overflow: hidden;

  background-color: ${({ theme }) =>
    theme ? theme.card.primary : 'var(--card-primary)'};
  color: ${({ theme }) => (theme ? theme.text : 'var(--text)')};
  z-index: 2;
  display: ${({ open }) => (open ? 'block' : 'none')};
`;

export const SelectionItem = styled.li`
  width: 100%;
  height: 3rem;
  display: flex;
  align-items: center;
  padding: 0.3rem 0.7rem;
  justify-content: space-between;
  transition: var(--mainTransition);
  cursor: pointer;
  &:hover {
    background-color: ${({ theme }) =>
      theme ? theme.hover.background : 'var(--hover-background)'};
    color: ${({ theme }) => (theme ? theme.hover.text : 'var(--hover-text)')};
  }
`;

export const LeftItem = styled.div`
  display: flex;
  align-items: center;
`;
export const LeftItemIcon = styled.span`
  display: flex;
  align-items: center;
  font-size: 1.25rem;
  margin-right: 0.3rem;
  color: ${({ theme }) => (theme ? theme.text : 'var(--text)')};
`;
export const LeftItemText = styled.span`
  font-size: 1rem;
`;

export const UserProfile = styled.div`
  border-bottom: 1px solid var(--gray-light);
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
`;
export const UserImageContainer = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 0.75rem;
  width: 4rem;
  height: 4rem;
  & > img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
`;
export const UserName = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  margin-left: 0.3rem;
`;

export const UserRedirect = styled.div``;
