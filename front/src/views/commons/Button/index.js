import React from 'react';
import Loader from '../Loader';
import Wrapper from './Button';

const Button = ({ secondary, big, inverse, loading, children, ...rest }) => {
  return (
    <Wrapper type="button" secondary={secondary} big={big} inverse={inverse} {...rest}>
      {loading ? <Loader small white /> : children}
    </Wrapper>
  );
};

export default Button;
