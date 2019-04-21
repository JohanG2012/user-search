import styled, { css } from 'styled-components';
import Image from '../Image';
import colors from '../../../constants/colors';

const selectedStyles = css`
  box-shadow: 0 0 0 2px ${colors.accentColor1};
`;

const selectableStyles = css`
  cursor: pointer;
`;

const secondaryStyles = css`
  &:hover {
    box-shadow: 0 0 0 2px ${colors.accentColor2};
  }
`;

const AvatarImage = styled(Image)`
  ${({ selectable }) => selectable && selectableStyles}
  ${({ secondary }) => secondary && secondaryStyles}
  ${({ selected }) => selected && selectedStyles}
  background: ${colors.accentColor2};
  height: ${({ large }) => large || '48px'};
  width: ${({ large }) => large || '48px'};
`;

export default AvatarImage;
