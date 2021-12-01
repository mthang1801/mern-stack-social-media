import styled from 'styled-components/macro';

export const Wrapper = styled.div``;

export const ImageContainer = styled.div`
  margin: 0 1rem;
  cursor: pointer;
  img {
    height: 100%;
    max-height: 15rem;
  }
`;

export const NextArrow = styled.div`
  z-index: 1 !important;
  right: 0 !important;
  &::before {
    color: ${({ theme }) =>
      theme ? theme.hover.background : 'var(--hover-background)'} !important;
  }
`;
export const PrevArrow = styled.div`
  left: 0 !important;
  z-index: 1;
  &::before {
    color: ${({ theme }) =>
      theme ? theme.hover.background : 'var(--hover-background)'} !important;
  }
`;
