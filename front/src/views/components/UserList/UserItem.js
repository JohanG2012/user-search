import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '../../commons/Avatar';
import Text from '../../commons/Text';
import ItemWrapper from './ItemWrapper';

const propTypes = {
  user: PropTypes.shape({
    name: { first: PropTypes.string, last: PropTypes.string },
    picture: { thumbnail: PropTypes.string },
  }).isRequired,
  selected: PropTypes.bool.isRequired,
};

const UserItem = ({
  user: {
    name: { first, last },
    picture: { thumbnail },
  },
  selected,
  ...rest
}) => (
  <ItemWrapper {...rest} alignCenter justifyCenter column selected={selected}>
    <Avatar img={thumbnail} />
    <Text center fontSize="12px" style={{ margin: '5px 0 0 0' }} capitalize>
      {first}
    </Text>
    <Text center fontSize="12px" style={{ margin: 0 }} capitalize>
      {last}
    </Text>
  </ItemWrapper>
);

UserItem.propTypes = propTypes;

export default UserItem;
