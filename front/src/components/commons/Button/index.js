import React from 'react';
import Loader from '../Loader';
import Wrapper from './Button';

const Button = ({ secondary, big, inverse, loading, children, ...props }) => {
  return (
    <Wrapper secondary={secondary} big={big} inverse={inverse} {...props}>
      {loading ? <Loader small white /> : children}
    </Wrapper>
  );
};

export default Button;
