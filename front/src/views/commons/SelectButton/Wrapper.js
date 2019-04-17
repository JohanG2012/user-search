import styled from 'styled-components';
import colors from '../../../constants/colors';

const Wrapper = styled.div`
  position: absolute;
  top: -230px;
  left: -150px;
  z-index: 999;
  background: ${colors.backgroundSecondary};
  padding: 10px;
  width: ${({ width }) => width || '400px'};
`;

export default Wrapper;
