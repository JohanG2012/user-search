import styled, { css } from 'styled-components';
import colors from '../../../constants/colors';

const statusStyle = css`
  display: inline-block;
  margin-left: 10px;
  color: black;
`;

const Text = styled.p`
  color: ${({ danger }) => (danger ? colors.danger : 'initial')};
  text-align: ${props => (props.center ? 'center' : 'left')};
  font-size: ${props => (props.fontSize ? props.fontSize : 'medium')};
  font-family: ${props => (props.font ? props.font : 'inherit')};
  text-transform: ${props => (props.capitalize ? 'capitalize' : 'none')}
    ${props => props.status && statusStyle};
`;

export default Text;
