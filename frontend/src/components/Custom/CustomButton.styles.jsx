import styled, { css } from 'styled-components';
import { darken, lighten } from 'polished';
const ButtonColor = css`
  background-color: ${({ color }) =>
    color ? `${color.trim().toString()}` : 'black'};
`;

const VariantOutlined = css`
  background-color: white;
  color: ${({ color }) => (color ? `${color.trim().toString()}` : 'black')};
  border: ${({ color }) =>
    color ? `1px solid ${color.trim().toString()}` : '1px solid black'};
  &:hover {
    background-color: ${({ color }) =>
      color ? `${color.trim().toString()}` : 'black'};
    color: ${({ color }) =>
      color ? lighten(1, `${color.trim().toString()}`) : 'white'};
    border: none;
  }
`;

const VariantContained = css`
  background-color: ${({ bgColor }) =>
    bgColor ? `${bgColor.trim().toString()}` : '#252525'};
  color: ${({ color }) => (color ? `${color.trim().toString()}` : 'white')};
  border: none;
  &:hover {
    background-color: ${({ bgColor }) =>
      bgColor ? darken(0.1, `${bgColor.trim().toString()}`) : 'black'};
    border: none;
    color: ${({ color }) =>
      color ? lighten(0.1, `${color.trim().toString()}`) : 'white'};
  }
`;

const ButtonVariant = (props) => {
  if (!props.variant) {
    return;
  }
  return props.variant === 'outlined' ? VariantOutlined : VariantContained;
};

const ButtonStyle = css`
  background-color: black;
  color: white;
  border: none;
  &:hover {
    background-color: white;
    color: black;
    border: 1px solid black;
  }
`;

const getButtonStyles = (props) => {
  return ButtonStyle;
};

const ButtonSizeSmall = css`
  padding: 0 0.75rem 0 0.75rem;
  height: 40px;
  line-height: 40px;
`;

const ButtonSizeLarge = css`
  padding: 0 1.4rem 0 1.4rem;
  height: 55px;
  line-height: 55px;
`;

const ButtonSizeXLarge = css`
  padding: 0 1.8rem 0 1.8rem;
  height: 60px;
  line-height: 60px;
`;

const ButtonSize = (props) => {
  switch (props.size) {
    case 'small':
      return ButtonSizeSmall;
    case 'large':
      return ButtonSizeLarge;
    case 'xlarge':
      return ButtonSizeXLarge;
    default:
      return;
  }
};

const ButtonWidthOptions = {
  25: { width: '25%' },
  50: { width: '50%' },
  75: { width: '75%' },
  100: { width: '100%' },
};

const ButtonWidth = (props) => {
  switch (props.width) {
    case '25':
      return ButtonWidthOptions['25'];
    case '50':
      return ButtonWidthOptions['50'];
    case '75':
      return ButtonWidthOptions['75'];
    case '100':
      return ButtonWidthOptions['100'];
    default:
      return;
  }
};

export const IconButton = styled.span`
  font-size: 1.5em;
  height: 100%;
  margin-right: 0.2rem;
  padding: 0.15rem;
`;

const ButtonDisabled = css`
  border: 1px solid #999999;
  background-color: #cccccc;
  color: #666666;
  cursor: not-allowed;
`;

export const CustomButtonContainer = styled.button`
  text-transform: uppercase;
  width: auto;
  height: 50px;
  letter-spacing: 0.5px;
  line-height: 50px;
  padding: 0 1rem 0 1rem;
  font-weight: bolder;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  outline: none;
  border: none;
  position: relative;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  ${getButtonStyles};
  ${ButtonColor};
  ${ButtonVariant};
  ${ButtonSize};
  ${ButtonWidth};
  &:disabled {
    ${ButtonDisabled}
  }
`;
