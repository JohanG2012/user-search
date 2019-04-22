import styled, { css } from 'styled-components';
import { darken } from 'polished';
import colors from '../../../constants/colors';

const inverseStyles = css`
  background-color: colors.white;
  color: colors.primary;
`;

const hoverStyles = css`
  :hover {
    background-color: ${({ secondary }) =>
      secondary ? darken(0.2, colors.secondary) : darken(0.2, colors.primary)};
    border: 2px solid
      ${({ secondary }) =>
        secondary ? darken(0.2, colors.secondary) : darken(0.2, colors.primary)};
    transition: background ease-out 0.3s, border ease-out 0.3s;
  }
`;

const Button = styled.button`
  background-color: ${({ secondary }) => (secondary ? colors.secondary : colors.primary)};
  color: ${colors.white};
  padding: 5px 10px;
  font-size: ${({ big }) => (big ? '20px' : '16px')};
  outline: none;
  cursor: pointer;
  margin: 15px;
  transition: background ease-in 0.3s, border ease-in 0.3s;
  border: 2px solid ${({ secondary }) => (secondary ? colors.secondary : colors.primary)};
  ${({ inverse }) => inverse && inverseStyles};
  ${({ disabled }) => !disabled && hoverStyles}
  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }

  :focus {
    outline: 1px solid ${darken(0.3, '#9ecaed')};
  }
`;

export default Button;
