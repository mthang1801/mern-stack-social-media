import styled from 'styled-components/macro';

export const Wrapper = styled.div`
  color: ${({ theme }) =>
    theme === 'dark' ? 'var(--color-text-dark)' : 'var(--color-text-default)'};
  .menu-title {
    padding: 0.5rem 1.6rem;
    font-size: var(--fontSize-1);
    opacity: 0.5;
  }
  ul {
    list-style: none;
  }
  .link-item {
    display: flex;
    margin: 0 1rem;
    justify-content: flex-start;
    align-items: center;
    padding: ${({ aside }) => (aside ? '0.25rem 0.6rem' : '0.5rem 2rem')};
    transition: all 0.1s;
    border: 1px solid transparent;
    &:hover {
      border: 1px solid
        ${({ theme }) => (theme ? theme.border : 'var(--border)')};
      border-radius: 4px;
    }
    &__left {
      display: flex;
      flex: 1;
    }
    &__right {
      & > span {
        display: inline-block;
        border: 1px solid var(--red);
        padding: 0.075rem 0.3rem;
        border-radius: 0.25rem;
        background-color: var(--red);
        color: var(--white);
        font-weight: bolder;
        font-size: 0.9em;
      }
    }
  }
  .link-icon {
    font-size: 1.5rem;
    display: flex;
    margin-right: 1rem;
  }
`;
