import styled, { css } from 'styled-components';
import FlexBox from '../../commons/FlexBox';

const selectedStyles = css`
  border: 1px solid #9ecaed;
  box-shadow: 0 0 10px #9ecaed;
`;

const ItemWrapper = styled(FlexBox)`
  width: 100px;
  margin: 10px 0 0 0 !important;
  height: 125px;
  padding: 10px;
  cursor: pointer;
  overflow: hidden;
  ${({ selected }) => selected && selectedStyles}
`;

export default ItemWrapper;
