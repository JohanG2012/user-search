import React from 'react';
import PropTypes from 'prop-types';
import AvatarImage from './AvatarImage';

const propTypes = {
  img: PropTypes.string.isRequired,
};

const Avatar = ({ img, ...rest }) => <AvatarImage round src={img} {...rest} alt="avatar image" />;

Avatar.propTypes = propTypes;

export default Avatar;
