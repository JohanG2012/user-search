import styled, { css } from 'styled-components';
import Image from '../Image';
import colors from '../../../constants/colors';

const selectedStyles = css`
  border: 2px solid ${colors.accentColor1};
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
`;

export default AvatarImage;
