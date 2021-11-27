import styled from 'styled-components/macro';

export const ImageContainer = styled.div`
  margin: 0 1rem;
  cursor: pointer;
  img {
    height: 100%;
    max-height: 15rem;
  }
`;

export const NextArrow = styled.div`
  right: 1rem;
  z-index: 1;
  &::before {
    color: var(--gray-light-2);
  }
`;
export const PrevArrow = styled.div`
  left: 1rem;
  z-index: 1;
  &::before {
    color: var(--gray-light-2);
  }
`;
