import styled from 'styled-components';

const Image = styled.img`
  border-radius: ${({ round }) => (round ? '50%' : 'initial')};
`;

export default Image;
