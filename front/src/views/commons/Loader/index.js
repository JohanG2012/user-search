import React from 'react';
import Wrapper from './Wrapper';
import { Ball1, Ball2, Ball3 } from './Balls';

const Loader = props => (
  <Wrapper>
    <Ball1 {...props} />
    <Ball2 {...props} />
    <Ball3 {...props} />
  </Wrapper>
);

export default Loader;
