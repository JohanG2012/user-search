import styled, { css } from 'styled-components';
import bouncedelay from './animations';

const baseStyles = css`
  width: 18px;
  height: 18px;
  background-color: #333;

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
