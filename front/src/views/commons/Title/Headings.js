import styled, { css } from 'styled-components';
import colors from '../../../constants/colors';

const baseStyle = css`
  text-transform: ${({ capitalize }) => (capitalize ? 'capitalize' : 'none')};
  text-align: ${({ center }) => (center ? 'center' : 'left')};
  color: ${({ secondary }) => (secondary ? colors.black : colors.textPrimary)};
  font-weight: ${({ weight }) => weight || 'normal'};
  font-family: ${({ font }) => font || 'inherit'};
`;

export const Heading1 = styled.h1`
  ${baseStyle}
  margin: .67em 0;
  font-size: ${({ fontSize }) => fontSize || '2em'};
`;
export const Heading2 = styled.h2`
  ${baseStyle}
  margin: .75em 0;
  font-size: ${({ fontSize }) => fontSize || '1.5em'};
`;
export const Heading3 = styled.h3`
  ${baseStyle}
  margin: .83em 0;
  font-size: ${({ fontSize }) => fontSize || '1.17em'};
`;
export const Heading4 = styled.h4`
  ${baseStyle}
  margin: 1.12em 0;
  font-size: ${({ fontSize }) => fontSize || '1em'};
`;
export const Heading5 = styled.h5`
  ${baseStyle}
  margin: 1.5em 0;
  font-size: ${({ fontSize }) => fontSize || '.83em'};
`;
export const Heading6 = styled.h6`
  ${baseStyle}
  margin: 1.67em 0;
  font-size: ${({ fontSize }) => fontSize || '.75em'};
`;
