import styled from 'styled-components';
export const CardWrapper = styled.aside`
  background-color: ${({ theme }) =>
    theme === 'dark' ? 'var(--color-card-dark)' : 'var(--color-card-default)'};
  text-align: center;
  border-radius: 0.7rem;
  overflow: hidden;
  .user-avatar {
    height: 5rem;
    width: 100%;
    background-color: ${({ theme }) =>
      theme === 'dark' ? 'var(--gray-dark)' : 'var(--gray-light)'};
    position: relative;
    &__container {
      position: absolute;
      top: 75%;
      left: 50%;
      transform: translate(-50%, -25%);
    }
    &__image {
      border-radius: 50%;
      border: 2px solid
        ${({ theme }) =>
          theme === 'dark'
            ? 'var(-color-border-dark)'
            : 'var(--color-border-default)'};
    }
  }
  .user-name {
    margin: 2rem 0 1rem 0;
    display: block;
    &__primary {
      // text-transform: capitalize;
      font-weight: bolder;
      font-size: 1.1em;
      margin-bottom: 0.5rem;
    }
    &__secondary {
      font-weight: normal;
      font-size: 0.9em;
      opacity: 0.6;
    }
  }
  .user-association {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    & a {
      padding: 0.5rem 0;
      transition: var(--mainTransition);
      &:hover {
        color: var(--success);
      }
    }
  }
`;
