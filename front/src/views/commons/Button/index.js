import React from 'react';
import PropTypes from 'prop-types';
import Loader from '../Loader';
import Wrapper from './Button';

const propTypes = {
  secondary: PropTypes.bool,
  big: PropTypes.bool,
  inverse: PropTypes.bool,
  loading: PropTypes.bool,
  children: PropTypes.string,
};

const defaultProps = {
  secondary: false,
  big: false,
  inverse: false,
  loading: false,
  children: '',
};

const Button = ({ loading, children, ...rest }) => (
  <Wrapper type="button" {...rest}>
    {loading ? <Loader small light /> : children}
  </Wrapper>
);

Button.defaultProps = defaultProps;
Button.propTypes = propTypes;

export default Button;
