import styled from 'styled-components';
import colors from '../../../constants/colors';

const Arrow = styled.div`
  width: 0;
  height: 0;
  border-left: 20px solid transparent;
  border-right: 20px solid transparent;

  border-top: 20px solid ${colors.backgroundSecondary};
`;
export default Arrow;
