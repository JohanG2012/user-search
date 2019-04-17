import styled, { css } from 'styled-components';
import colors from '../../../constants/colors';

const statusStyle = css`
  display: inline-block;
  margin-left: 10px;
  color: black;
`;

const Text = styled.p`
  color: ${({ danger }) => (danger ? colors.danger : 'initial')};
  text-align: ${({ center }) => (center ? 'center' : 'left')};
  font-size: ${({ fontSize }) => fontSize || 'medium'};
  font-family: ${({ font }) => font || 'inherit'};
  text-transform: ${({ capitalize }) => (capitalize ? 'capitalize' : 'none')}
    ${({ status }) => status && statusStyle};
`;

export default Text;
