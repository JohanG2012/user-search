import styled, { css } from 'styled-components';
import { darken } from 'polished';
import colors from '../../../constants/colors';

const inverseStyles = css`
  background-color: colors.white;
  color: colors.primary;
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
  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
  :hover {
    background-color: ${({ secondary }) =>
      secondary ? darken(0.2, colors.secondary) : darken(0.2, colors.primary)};
    border: 2px solid
      ${({ secondary }) =>
        secondary ? darken(0.2, colors.secondary) : darken(0.2, colors.primary)};
    transition: background ease-out 0.3s, border ease-out 0.3s;
  }
`;

export default Button;
