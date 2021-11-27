import styled from 'styled-components/macro';

export const ContactItemWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 0.5rem;
  &:hover {
    background-color: ${({ theme }) =>
      theme ? theme.hover.background : 'var(--hover-background)'};
  }
`;

export const Avatar = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  position: relative;
  & img {
    width: 100%;
    border-radius: 50%;
  }
  ${({ active }) =>
    active &&
    `
    & img{
      border: 2px solid var(--green-1);
    }
    &::after{
      position: absolute;
      content: ""; /* this is important */
      height: 0.5rem;
      width: 0.5rem;
      border-radius : 50%;
      background-color : var(--green-1);
      right: 0%;
      top: 65%;      
    }
  `}
`;

export const UserContactOverview = styled.div`
  flex: 1;
  margin-left: 1rem;
  overflow: hidden;
  h4 {
    font-size: 1rem;
  }
  font-weight: normal;
`;

export const ContactControls = styled.div`
  display: none;
  @media screen and (min-width: 768px) {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: relative;
    span {
      display: block;
      cursor: pointer;
      margin-left: auto;
      text-align: right;
      font-size: 1.2rem;
      opacity: ${({ show }) => (show ? 1 : 0)};
      visibility: ${({ show }) => (show ? 'visible' : 'hidden')};
      transition: var(--mainTransition);
      color: inherit;
    }
  }
`;
