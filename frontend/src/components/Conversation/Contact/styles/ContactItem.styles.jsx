import styled from 'styled-components/macro';

export const Wrapper = styled.li`
  display: flex;
  padding: 0.5rem;
  cursor: pointer;
  transition: all 0.25s;
  &:hover {
    background-color: ${({ theme }) =>
      theme ? theme.hover.background : 'var(--hover-background)'};
  }
`;

export const UserInfo = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  & img {
    border-radius: 50%;
  }
`;

export const UserName = styled.span`
  margin-left: 0.5rem;
`;

export const UserSetting = styled.div`
  position: relative;
  visibility: ${({ show }) => (show ? 'visible' : 'hidden')};
  opacity: ${({ show }) => (show ? 1 : 0)};
`;

export const SettingIcon = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
`;

export const SettingDialog = styled.ul`
  position: absolute;
  left: 120%;
  top: 0;
`;

export const SettingItem = styled.li`
  list-style: none;
`;
