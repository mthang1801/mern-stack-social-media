import styled from 'styled-components/macro';

export const NavigationWrapper = styled.ul`
  display: flex;
  align-items: center;
  list-style: none;
  height: 100%;
  margin: 0;
  padding: 0;
  .nav-item {
    position: relative;
    height: 100%;
  }
  .nav-link {
    transition: var(--mainTransition);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 1rem;
    height: 100%;

    border-bottom: 2px solid transparent;
    &:hover {
      border-bottom: 2px solid
        ${({ theme }) => (theme ? theme.border : 'var(--border)')};
    }
  }
  .nav-icon {
    display: flex;
    font-size: 1.25rem;
    margin-top: 0.1rem;
    margin-right: 0.15rem;
  }
  .nav-name {
    font-size: 0.85rem;
  }
  .nav-link-active {
    color: var(--link);
    border-bottom: 2px solid var(--link) !important ;
  }
  @media screen and (min-width: 768px) and (max-width: 992px) {
    .nav-name {
      display: none;
    }
    .nav-icon {
      font-size: 1.5rem;
    }
  }
`;
