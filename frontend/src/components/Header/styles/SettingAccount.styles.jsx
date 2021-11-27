import styled from 'styled-components/macro';
export const SettingWrapper = styled.div`
  position: relative;
  ul.popup-setting {
    position: absolute;
    transition: var(--mainTransition);
    top: 110%;
    width: 80vw;
    max-width: 360px;
    border: 1px solid ${({ theme }) => (theme ? theme.border : 'var(--border)')};
    right: 0;
    border-radius: 0.5rem;
    overflow: hidden;

    background-color: ${({ theme }) =>
      theme ? theme.card.primary : 'var(--card-primary)'};
    color: ${({ theme }) => (theme ? theme.text : 'var(--text)')};
    box-shadow: var(--lightShadow);
    z-index: 2;
    & li {
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
          theme ? theme.background : 'var(--background)'};
        color: ${({ theme }) => (theme ? theme.text : 'var(--text)')};
      }
    }
  }

  .popup-item {
    &-left {
      display: flex;
      align-items: center;
      &__icon {
        display: flex;
        font-size: 1.3em;
        margin-right: 0.25rem;
        color: ${({ theme }) => (theme ? theme.text : 'var(--text)')};
      }
    }
    &-right {
    }
  }

  .user-profile {
    border-bottom: 1px solid var(--gray-light);
    margin-bottom: 0.5rem;
  }

  .direct-user-profile {
    display: flex;
    align-items: center;
    padding: 0.75rem;
    .user-image-container {
      width: 3rem;
      height: 3rem;
      & > img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
    .user-name {
      display: flex;
      flex-direction: column;
      flex: 1;
      margin-left: 1rem;
    }
  }

  .popup-item-hide {
    visibility: hidden;
    opacity: 0;
  }

  .popup-setting-hide {
    visibility: hidden;
    opacity: 0;
    transition: var(--mainTransition);
  }
`;
