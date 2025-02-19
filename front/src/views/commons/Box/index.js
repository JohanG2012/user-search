import styled from 'styled-components';

const Box = styled.div`
  box-shadow: ${({ secondary }) =>
    secondary
      ? '0px 0px 40px -5px rgba(0, 0, 0, 0.11)'
      : '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'};
`;

export default Box;
