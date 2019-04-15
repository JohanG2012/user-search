import React from 'react';
import Image from '../Image';

const propTypes = {
  img: propTypes.string.isRequired,
};

const Avatar = ({ img }) => <Image round src={img} alt="avatar image" />;

Avatar.propTypes = propTypes;

export default Avatar;
