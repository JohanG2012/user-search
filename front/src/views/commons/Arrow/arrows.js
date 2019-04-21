import styled, { css } from 'styled-components';
import colors from '../../../constants/colors';

const baseStyles = css`
  width: 0;
  height: 0;
`;

export const DownArrow = styled.div`
  ${baseStyles}
  border-left: 20px solid transparent;
  border-right: 20px solid transparent;

  border-top: ${({ secondary }) =>
    secondary ? `20px solid ${colors.backgroundSecondary}` : `20px solid ${colors.background}`};
`;

export const UpArrow = styled.div`
  ${baseStyles}
  border-left: 20px solid transparent;
  border-right: 20px solid transparent;

  border-bottom: ${({ secondary }) =>
    secondary ? `20px solid ${colors.backgroundSecondary}` : `20px solid ${colors.background}`};
`;

export const RightArrow = styled.div`
  ${baseStyles}
  border-top: 20px solid transparent;
  border-bottom: 20px solid transparent;

  border-left: ${({ secondary }) =>
    secondary ? `20px solid ${colors.backgroundSecondary}` : `20px solid ${colors.background}`};
`;

export const LeftArrow = styled.div`
  ${baseStyles}
  border-top: 20px solid transparent;
  border-bottom: 20px solid transparent;

  border-right: ${({ secondary }) =>
    secondary ? `20px solid ${colors.backgroundSecondary}` : `20px solid ${colors.background}`};
`;
