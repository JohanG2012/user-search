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

const AvatarSelection = ({ avatars, handleAvatarSelection: handleSelection, ...rest }) => {
  const avatarList = avatars.map(avatar => (
    <Avatar
      selectValue={avatar.picture}
      secondary
      selectable
      img={avatar.picture.thumbnail}
      style={{ margin: '10px' }}
    />
  ));

  return (
    <SelectButton
      items={avatarList}
      handleSelection={handleSelection}
      {...rest}
      text="Choose your avatar"
    >
      Avatar
    </SelectButton>
  );
};

AvatarSelection.propTypes = propTypes;

export default AvatarSelection;
