import React from 'react';
import PropTypes from 'prop-types';
import Wrapper from './Wrapper';
import Loader from './Loader';
import LoadingText from './LoadingText';

const propTypes = {
  children: PropTypes.string,
};

const defaultProps = {
  children: '',
};

const Spinner = ({ children, ...props }) => (
  <Wrapper {...props}>
    <Loader />
    {children && <LoadingText>{children}</LoadingText>}
  </Wrapper>
);

Spinner.defaultProps = defaultProps;
Spinner.propTypes = propTypes;

export default Spinner;
