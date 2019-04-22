import styled from 'styled-components';

const Field = styled.input`
  height: 30px;
  width: 440px;
  margin: 10px 20px;
  padding-right: 30px;

  ::-ms-clear {
    display: none;
  }
`;

export default Field;
