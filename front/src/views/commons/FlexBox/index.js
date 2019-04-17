import styled from 'styled-components';

const FlexBox = styled.div`
  display: flex;
  flex-wrap: ${({ wrapReverse, noWrap }) => {
    if (wrapReverse) return 'wrap-reverse';
    if (noWrap) return 'nowrap';
    return 'wrap';
  }};
  justify-content: ${({
    justifyAround,
    justifyBetween,
    justifyCenter,
    justifyContent,
    justifyEnd,
  }) => {
    if (justifyContent) return justifyContent;
    if (justifyCenter) return 'center';
    if (justifyAround) return 'space-around';
    if (justifyBetween) return 'space-between';
    if (justifyEnd) return 'flex-end';
    return 'flex-start';
  }};
  align-items: ${({ alignBaseline, alignCenter, alignEnd, alignItems, alignStretch }) => {
    if (alignItems) return alignItems;
    if (alignStretch) return 'stretch';
    if (alignEnd) return 'flex-end';
    if (alignCenter) return 'center';
    if (alignBaseline) return 'baseline';
    return 'flex-start';
  }};
  align-content: ${({
    alignContent,
    contentStart,
    contentEnd,
    contentBetween,
    contentCenter,
    contentAround,
    content,
  }) => {
    if (alignContent) return content;
    if (contentStart) return 'flex-start';
    if (contentEnd) return 'flex-end';
    if (contentCenter) return 'center';
    if (contentBetween) return 'space-between';
    if (contentAround) return 'contentAround';
    return 'stretch';
  }};
  flex-direction: ${({ column }) => (column ? 'column' : 'row')};
`;

export default FlexBox;
