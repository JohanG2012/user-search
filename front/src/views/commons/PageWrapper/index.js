import styled from 'styled-components';

const PageWrapper = styled.div`
  padding-left: ${({ full }) => {
    if (full) return 0;
    return 'calc((100vw - 1000px) / 2)';
  }};
  padding-right: ${({ full }) => {
    if (full) return 0;
    return 'calc((100vw - 1000px) / 2)';
  }};
  padding-top: ${({ fullVertical, small }) => {
    if (fullVertical) return 0;
    if (small) return '15px';
    return '25px';
  }};
  padding-bottom: ${({ fullVertical, small }) => {
    if (fullVertical) return 0;
    if (small) return '15px';
    return '25px';
  }};
`;

export default PageWrapper;
