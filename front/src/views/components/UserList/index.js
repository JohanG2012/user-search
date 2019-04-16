import React from 'react';
import PropTypes from 'prop-types';
import UserItem from './UserItem';
import Box from '../../commons/Box';
import FlexBox from '../../commons/FlexBox';
import Title from '../../commons/Title';

const propTypes = {
  title: PropTypes.string,
  users: PropTypes.arrayOf(PropTypes.shape({})),
};

const defaultProps = {
  title: '',
  users: [],
};

const UserList = ({ title, users }) => (
  <div style={{ height: '600px' }}>
    <Title heading="2" center>
      {title}
    </Title>
    <FlexBox justifyBetween>
      {users.map(user => (
        <UserItem style={{ margin: '10px' }} user={user} />
      ))}
    </FlexBox>
  </div>
);

UserList.defaultProps = defaultProps;
UserList.propTypes = propTypes;

export default UserList;
