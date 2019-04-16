import styled, { css } from 'styled-components';

const baseStyle = css`
  text-transform: ${props => (props.capitalize ? 'capitalize' : 'none')};
  text-align: ${props => (props.center ? 'center' : 'left')};
  color: ${props => (props.secondary ? props.theme.black30 : props.theme.primary)};
  font-weight: ${props => (props.weight ? props.weight : 'normal')};
  font-family: ${props => (props.font ? props.font : 'inherit')};
`;

export const Heading1 = styled.h1`
  ${baseStyle}
  margin: .67em 0;
  font-size: ${props => (props.fontSize ? props.fontSize : '2em')};
`;
export const Heading2 = styled.h2`
  ${baseStyle}
  margin: .75em 0;
  font-size: ${props => (props.fontSize ? props.fontSize : '1.5em')};
`;
export const Heading3 = styled.h3`
  ${baseStyle}
  margin: .83em 0;
  font-size: ${props => (props.fontSize ? props.fontSize : '1.17em')};
`;
export const Heading4 = styled.h4`
  ${baseStyle}
  margin: 1.12em 0;
  font-size: ${props => (props.fontSize ? props.fontSize : '1em')};
`;
export const Heading5 = styled.h5`
  ${baseStyle}
  margin: 1.5em 0;
  font-size: ${props => (props.fontSize ? props.fontSize : '.83em')};
`;
export const Heading6 = styled.h6`
  ${baseStyle}
  margin: 1.67em 0;
  font-size: ${props => (props.fontSize ? props.fontSize : '.75em')};
`;
