import styled, { css } from 'styled-components';
import { lighten } from 'polished';
import FlexBox from '../../commons/FlexBox';
import colors from '../../../constants/colors';

const selectedStyles = css`
  border: 1px solid #9ecaed;
  box-shadow: 0 0 10px #9ecaed;
`;

/* stylelint-disable selector-combinator-blacklist, selector-type-no-unknown */
const hoverStyles = css`
  :hover > img {
    box-shadow: 0 0 0 2px ${lighten(0.1, colors.primary)};
    transition: box-shadow ease-out 0.3s;
  }

  :focus > img {
    box-shadow: 0 0 0 2px ${lighten(0.1, colors.primary)};
    transition: box-shadow ease-out 0.3s;
  }
`;

const ItemWrapper = styled(FlexBox)`
  width: 100px;
  height: 125px;
  padding: 10px;
  transition: box-shadow ease-in 0.3s;
  cursor: pointer;
  overflow: hidden;
  ${({ selected }) => selected && selectedStyles}
  ${({ selected }) => !selected && hoverStyles}
  :focus {
    outline: none;
  }
`;
/* stylelint-enable selector-combinator-blacklist */
export default ItemWrapper;
