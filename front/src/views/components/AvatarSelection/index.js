import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '../../commons/Avatar';
import SelectButton from '../../commons/SelectButton';

const propTypes = {
  avatars: PropTypes.arrayOf(
    PropTypes.shape({
      picture: PropTypes.shape({
        thumbnail: PropTypes.string,
        medium: PropTypes.string,
        large: PropTypes.string,
      }),
    }),
  ).isRequired,
  handleAvatarSelection: PropTypes.func.isRequired,
};
/* eslint-disable no-underscore-dangle */
const AvatarSelection = ({ avatars, handleAvatarSelection: handleSelection, ...rest }) => {
  const avatarList = avatars.map(avatar => (
    <Avatar
      selectValue={avatar.picture}
      tabIndex="0"
      key={avatar._id}
      secondary
      selectable
      img={avatar.picture.thumbnail}
      style={{ margin: '10px' }}
    />
  ));

  return (
    <SelectButton
      tabIndex="0"
      items={avatarList}
      handleSelection={handleSelection}
      {...rest}
      text="Choose your avatar"
    >
      Avatar
    </SelectButton>
  );
};
/* eslint-enable no-underscore-dangle */

AvatarSelection.propTypes = propTypes;

export default AvatarSelection;
