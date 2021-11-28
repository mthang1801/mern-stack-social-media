import styled from 'styled-components/macro';

export const Wrapper = styled.div`
  .btn-fb {
    font-size: 14px;
    font-weight: 500;
    font-family: Roboto, sans-serif;
    width: 100%;
    outline: none;
    border: none;
    background-color: #3b5998;
    padding: 0.75rem;
    color: white;
    cursor: pointer;
    display: flex;
    flex-direction: row;
    align-items: center;
    font-weight: bold;
    justify-content: center;
    border-radius: 5px;
    box-shadow: var(--lightShadow);
  }

  .btn-fb:hover {
    background-color: #243c6e;
  }

  .btn-fb > svg {
    font-size: 1.5em;
    vertical-align: middle;
  }
`;
