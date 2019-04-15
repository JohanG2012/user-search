import styled, { css } from 'styled-components';
import colors from '../../constants/colors';

const inverseStyles = css`
  background-color: colors.white;
  color: colors.primary;
`;

const Button = styled.button`
  border-radius: 5px;
  background-color: ${props => (props.secondary ? colors.secondary : colors.primary)};
  color: ${colors.white};
  padding: 10px 15px;
  font-size: ${({ big }) => (big ? '20px' : '16px')};
  outline: none;
  cursor: pointer;
  margin: 15px;
  border: 2px solid ${props => (props.secondary ? colors.secondary : colors.primary)};
  ${({ inverse }) => inverse && inverseStyles};
`;

export default Button;
