import React, { useState } from 'react';
import PropTypes from 'prop-types';
import UserList from '../UserList';
import FlexBox from '../../commons/FlexBox';
import Button from '../../commons/Button';
import AvatarSelection from '../AvatarSelection';
import searchTypes from '../../../state/search/types';
import usersTypes from '../../../state/users/types';
import avatarsTypes from '../../../state/avatars/types';

const USERS = 'All users';
const ASSIGNED = 'Assigned users';

const userPropTypes = PropTypes.arrayOf(
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
);

const propTypes = {
  isLoading: PropTypes.shape({}).isRequired,
  users: userPropTypes.isRequired,
  assignedUsers: userPropTypes.isRequired,
  updateUserPermission: PropTypes.func.isRequired,
  avatars: PropTypes.arrayOf(
    PropTypes.shape({ picture: PropTypes.shape({ thumbnail: PropTypes.string }) }),
  ).isRequired,
  getAvatars: PropTypes.func.isRequired,
  updateUserAvatar: PropTypes.func.isRequired,
  getUsers: PropTypes.func.isRequired,
  next: PropTypes.shape({
    assignedUsers: PropTypes.string,
    users: PropTypes.string,
  }).isRequired,
  search: PropTypes.func.isRequired,
  searchResult: PropTypes.shape({
    assignedUsers: PropTypes.arrayOf(userPropTypes),
    users: PropTypes.arrayOf(userPropTypes),
  }).isRequired,
  resetSearch: PropTypes.func.isRequired,
};

const UserManagement = ({
  users,
  assignedUsers,
  updateUserPermission,
  getUsers,
  avatars,
  getAvatars,
  updateUserAvatar,
  isLoading,
  search,
  searchResult,
  resetSearch,
  next: { users: nextUsers, assignedUsers: nextAssigned },
}) => {
  const [state, setState] = useState({
    selectedUser: {},
    fields: { [USERS]: '', [ASSIGNED]: '' },
  });
  const { selectedUser, fields } = state;

  const handleScroll = (target, userType) => {
    const permission = userType === ASSIGNED;
    const searchOrUsersIsLoading =
      isLoading[usersTypes.FETCH_USERS_ROOT] ||
      (isLoading[searchTypes.SEARCH_ASSIGNED_USERS_ROOT] && permission) ||
      (isLoading[searchTypes.SEARCH_USERS_ROOT] && !permission);

    if (searchOrUsersIsLoading) {
      return;
    }
    const startFetchAt = 140;
    const shouldFetch = target.scrollHeight - target.scrollTop - startFetchAt < target.clientHeight;
    let next = '';
    if (nextAssigned && permission) {
      next = `&next=${nextAssigned}`;
    }
    if (nextUsers && !permission) {
      next = `&next=${nextUsers}`;
    }

    const isNotSearch = (permission && !state.fields[ASSIGNED]) || (!permission && !fields[USERS]);
    const isUserSearch = !permission && fields[USERS];
    const isAssignedSearch = permission && fields[ASSIGNED];

    if (shouldFetch && next) {
      if (isAssignedSearch) {
        search({ searchQuery: fields[ASSIGNED], permission, next });
      }
      if (isUserSearch) {
        search({ searchQuery: fields[USERS], permission, next });
      }
      if (isNotSearch) {
        getUsers({ permission, next });
      }
    }
  };

  const handlePermissionChange = permission => {
    updateUserPermission({
      user: selectedUser,
      permission,
    });
    setState({ ...state, selectedUser: {} });
  };

  const handleSearch = ({ target: { value, name } }, permission) => {
    setState({ ...state, fields: { ...fields, [name]: value } });
    if (value) {
      search({ searchQuery: value, permission });
    } else {
      resetSearch({ permission });
    }
  };

  const handleUserSelect = value => setState({ ...state, selectedUser: value });

  /* eslint-disable no-underscore-dangle */
  const handleAvatarSelection = picture => {
    updateUserAvatar({ id: selectedUser._id, picture });
    setState({ ...state, selectedUser: {} });
  };
  /* eslint-enable no-underscore-dangle */

  const userActions = (
    <FlexBox justifyEnd>
      <AvatarSelection
        avatars={avatars}
        handleAvatarSelection={handleAvatarSelection}
        current={selectedUser}
        getItems={getAvatars}
        isLoading={
          !!(isLoading[avatarsTypes.FETCH_AVATARS_ROOT] || isLoading[usersTypes.UPDATE_AVATAR_ROOT])
        }
        disabled={
          !!(
            Object.entries(selectedUser).length === 0 ||
            selectedUser.permission ||
            isLoading[avatarsTypes.FETCH_AVATARS_ROOT] ||
            isLoading[usersTypes.UPDATE_AVATAR_ROOT]
          )
        }
      />

      <Button
        loading={isLoading[usersTypes.ADD_PERMISSION_ROOT]}
        disabled={
          Object.entries(selectedUser).length === 0 ||
          selectedUser.permission ||
          isLoading[usersTypes.ADD_PERMISSION_ROOT]
        }
        onClick={() => handlePermissionChange(true)}
      >
        Add
      </Button>
    </FlexBox>
  );

  const assignedUserActions = (
    <FlexBox justifyEnd>
      <AvatarSelection
        avatars={avatars}
        handleAvatarSelection={handleAvatarSelection}
        current={selectedUser}
        getItems={getAvatars}
        isLoading={
          !!(isLoading[avatarsTypes.FETCH_AVATARS_ROOT] || isLoading[usersTypes.UPDATE_AVATAR_ROOT])
        }
        disabled={
          !!(
            Object.entries(selectedUser).length === 0 ||
            !selectedUser.permission ||
            isLoading[avatarsTypes.FETCH_AVATARS_ROOT] ||
            isLoading[usersTypes.UPDATE_AVATAR_ROOT]
          )
        }
      />
      <Button
        loading={isLoading[usersTypes.REMOVE_PERMISSION_ROOT]}
        disabled={
          Object.entries(selectedUser).length === 0 ||
          !selectedUser.permission ||
          isLoading[usersTypes.REMOVE_PERMISSION_ROOT]
        }
        onClick={() => handlePermissionChange(false)}
      >
        Remove
      </Button>
    </FlexBox>
  );
  return (
    <FlexBox justifyBetween>
      <UserList
        searchValue={fields[USERS]}
        handleSearch={event => handleSearch(event, false)}
        handleScroll={handleScroll}
        title={USERS}
        users={searchResult.users.length || fields[USERS] ? searchResult.users : users}
        selectUser={handleUserSelect}
        selectedUser={selectedUser}
        isLoading={!!isLoading[usersTypes.FETCH_USERS_ROOT]}
        renderActions={userActions}
      />
      <UserList
        searchValue={fields[ASSIGNED]}
        handleSearch={event => handleSearch(event, true)}
        handleScroll={handleScroll}
        title={ASSIGNED}
        users={
          searchResult.assignedUsers.length || fields[ASSIGNED]
            ? searchResult.assignedUsers
            : assignedUsers
        }
        selectUser={handleUserSelect}
        selectedUser={selectedUser}
        isLoading={!!isLoading[usersTypes.FETCH_USERS_ROOT]}
        renderActions={assignedUserActions}
      />
    </FlexBox>
  );
};

UserManagement.propTypes = propTypes;

export default UserManagement;
