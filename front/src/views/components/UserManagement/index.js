import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import UserList from '../UserList';
import FlexBox from '../../commons/FlexBox';
import Button from '../../commons/Button';
import SearchField from '../../commons/SearchField';
import ListWrapper from './ListWrapper';

const propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string,
      name: {
        first: PropTypes.string,
        last: PropTypes.string,
      },
      picture: {
        thumbnail: PropTypes.string,
      },
      permission: PropTypes.bool,
    }),
  ),
  usersWithPermissions: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string,
      name: {
        first: PropTypes.string,
        last: PropTypes.string,
      },
      picture: {
        thumbnail: PropTypes.string,
      },
      permission: PropTypes.bool,
    }),
  ),
  updateUserPermission: PropTypes.func.isRequired,
  addIsLoading: PropTypes.bool.isRequired,
  removeIsLoading: PropTypes.bool.isRequired,
  usersIsLoading: PropTypes.bool.isRequired,
  getUsers: PropTypes.func.isRequired,
  next: PropTypes.shape({
    permission: PropTypes.string,
    users: PropTypes.string,
  }).isRequired,
};

const defaultProps = {
  users: [],
  usersWithPermissions: [],
};

const UserManagement = ({
  users,
  usersWithPermissions,
  updateUserPermission,
  addIsLoading,
  removeIsLoading,
  usersIsLoading,
  getUsers,
  next: { users: nextUsers, permission: nextPermission },
}) => {
  const [selectedUser, selectUser] = useState();

  const handleScroll = (target, element) => {
    const startFetchAt = 140;
    const shouldFetch = target.scrollHeight - target.scrollTop - startFetchAt < target.clientHeight;
    const permission = element === 'Assigned users';
    let next = '';
    if (nextPermission && element === 'Assigned users') {
      next = `&next=${nextPermission}`;
    }
    if (nextUsers && element === 'All users') {
      next = `&next=${nextUsers}`;
    }
    if (shouldFetch && next) {
      const querystring = `?permission=${permission}&fields=_id,name.first,name.last,picture.thumbnail,permission${next}`;
      getUsers({ querystring });
    }
  };

  return (
    <Fragment>
      <FlexBox justifyBetween>
        <div>
          <SearchField placeholder="Search e.g. Firstname Lastname" />
          <ListWrapper secondary>
            <UserList
              handleScroll={handleScroll}
              title="All users"
              users={users}
              selectUser={selectUser}
              selectedUser={selectedUser}
              isLoading={usersIsLoading}
            />
            <FlexBox justifyEnd>
              <Button disabled={!selectedUser}>Avatar</Button>
              <Button
                loading={addIsLoading}
                disabled={!selectedUser || selectedUser.permission || addIsLoading}
                onClick={() => {
                  updateUserPermission({
                    user: selectedUser,
                    permission: true,
                    action: 'ADD_PERMISSION',
                  });
                  selectUser({});
                }}
              >
                Add
              </Button>
            </FlexBox>
          </ListWrapper>
        </div>
        <div>
          <SearchField placeholder="Search e.g. Firstname Lastname" />
          <ListWrapper secondary>
            <UserList
              handleScroll={handleScroll}
              title="Assigned users"
              users={usersWithPermissions}
              selectUser={selectUser}
              selectedUser={selectedUser}
              isLoading={usersIsLoading}
            />
            <FlexBox justifyEnd>
              <Button>Avatar</Button>
              <Button
                loading={removeIsLoading}
                disabled={!selectedUser || !selectedUser.permission || removeIsLoading}
                onClick={() => {
                  updateUserPermission({
                    user: selectedUser,
                    permission: false,
                    action: 'REMOVE_PERMISSION',
                  });
                  selectUser({});
                }}
              >
                Remove
              </Button>
            </FlexBox>
          </ListWrapper>
        </div>
      </FlexBox>
    </Fragment>
  );
};

UserManagement.defaultProps = defaultProps;
UserManagement.propTypes = propTypes;

export default UserManagement;
