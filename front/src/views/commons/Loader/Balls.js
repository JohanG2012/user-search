import styled, { css } from 'styled-components';
import bouncedelay from './animations';
import colors from '../../../constants/colors';

const baseStyles = css`
  width: ${({ small }) => (small ? '10px' : '18px')};
  height: ${({ small }) => (small ? '10px' : '18px')};
  background-color: ${({ light }) => (light ? colors.light : colors.dark)};

  border-radius: 50%;
  display: inline-block;
  animation: ${bouncedelay} 1.4s infinite ease-in-out both;
`;

export const Ball1 = styled.div`
  ${baseStyles}
  animation-delay: -0.32s;
`;
export const Ball2 = styled.div`
  ${baseStyles}
  animation-delay: -0.16s;
`;
export const Ball3 = styled.div`
  ${baseStyles}
`;
