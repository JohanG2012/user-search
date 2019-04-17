import styled, { css } from 'styled-components';
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
  border: 2px solid ${({ secondary }) => (secondary ? colors.secondary : colors.primary)};
  ${({ inverse }) => inverse && inverseStyles};
  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`;

export default Button;
