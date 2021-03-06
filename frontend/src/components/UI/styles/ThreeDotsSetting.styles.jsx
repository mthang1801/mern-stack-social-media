import styled, {keyframes} from "styled-components";
const animationDotsSetting = keyframes`
  0%{
    transform : translateY(0);
  }
  50%{
    transform : translateY(-5px);
  }
  100%{
    transform : translateY(0);
  }
`

export const Wrapper = styled.div`  
  display : flex;
  width : 2rem;
  height: 2rem;
  align-items:center;
  jsutify-content: space-around;
  & span{
    width : 0.4rem;
    height: 0.4rem;
    border: 1px solid var(--gray-deep);
    border-radius : 50%;
  }
  &:hover{
    & span{
      border: 1px solid var(--dark);
    }
    & span:first-child{
      animation: ${animationDotsSetting};     
      animation-duration: 1s;
      animation-iteration-count : infinite;      
      
    }
    & span:nth-child(2){
      animation: ${animationDotsSetting};     
      animation-duration: 1s;
      animation-delay : 0.25s;
      animation-iteration-count : infinite;      
      animation-fill-mode: backwards;
    }
    & span:last-child{
      animation: ${animationDotsSetting};     
      animation-duration: 1s;
      animation-delay : 0.5s;
      animation-iteration-count : infinite;      
      animation-fill-mode: backwards;
    }
  }
  
`


