import React from 'react';
import PropTypes from 'prop-types';
import Image from '../Image';

const propTypes = {
  img: PropTypes.string.isRequired,
};

const Avatar = ({ img }) => <Image round src={img} alt="avatar image" />;

Avatar.propTypes = propTypes;

export default Avatar;
