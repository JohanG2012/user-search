import React from 'react';
import PropTypes from 'prop-types';
import { UpArrow, DownArrow, RightArrow, LeftArrow } from './arrows';

const propTypes = {
  up: PropTypes.bool,
  down: PropTypes.bool,
  left: PropTypes.bool,
  right: PropTypes.bool,
};

const defaultProps = {
  up: false,
  down: false,
  left: false,
  right: false,
};

const Arrow = ({ up, down, left, right, ...rest }) => {
  if (up) return <UpArrow {...rest} />;
  if (down) return <DownArrow {...rest} />;
  if (right) return <RightArrow {...rest} />;
  if (left) return <LeftArrow {...rest} />;
  return <DownArrow {...rest} />;
};

Arrow.defaultProps = defaultProps;
Arrow.propTypes = propTypes;
export default Arrow;
