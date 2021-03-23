import styled from "styled-components"

export const ImageContainer = styled.div`
  margin : 0 1rem;
  cursor : pointer;
  img{
    height : 100% ; 
    max-height : 15rem;
  }
`

export const NextArrow = styled.div`
  right : -1.5rem;
  &::before{
    color : var(--gray-dark);
  }
`
export const PrevArrow = styled.div`
  left : -1.5rem;
  &::before{
    color : var(--gray-dark);
  }
`