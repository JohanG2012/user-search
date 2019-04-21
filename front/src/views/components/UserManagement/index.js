import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import UserList from '../UserList';
import FlexBox from '../../commons/FlexBox';
import Button from '../../commons/Button';
import ListWrapper from './ListWrapper';
import AvatarSelection from '../AvatarSelection';
import SearchField from '../../commons/SearchField';

const USERS = 'All users';
const ASSIGNED = 'Assigned users';

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
  avatars: PropTypes.shape({ picture: PropTypes.shape({ thumbnail: PropTypes.string }) })
    .isRequired,
  getAvatars: PropTypes.func.isRequired,
  avatarsIsLoading: PropTypes.bool.isRequired,
  avatarIsLoading: PropTypes.bool.isRequired,
  updateUserAvatar: PropTypes.func.isRequired,
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
  avatars,
  getAvatars,
  avatarsIsLoading,
  updateUserAvatar,
  assignedSearchIsLoading,
  usersSearchIsLoading,
  avatarIsLoading,
  search,
  searchResult,
  resetSearch,
  next: { users: nextUsers, assigned: nextAssigned },
}) => {
  const [state, setState] = useState({
    selectedUser: {},
    fields: { userSearch: '', assignedUserSearch: '' },
  });

  const handleScroll = (target, element) => {
    const permission = element === ASSIGNED;
    if (
      usersIsLoading ||
      (assignedSearchIsLoading && permission) ||
      (usersSearchIsLoading && !permission)
    ) {
      return;
    }
    const startFetchAt = 140;
    const shouldFetch = target.scrollHeight - target.scrollTop - startFetchAt < target.clientHeight;
    let next = '';
    if (nextAssigned && element === ASSIGNED) {
      next = `&next=${nextAssigned}`;
    }
    if (nextUsers && element === USERS) {
      next = `&next=${nextUsers}`;
    }
    const isNotSearch =
      (permission && !state.fields.assignedUserSearch) || (!permission && !state.fields.userSearch);
    const isUserSearch = !permission && state.fields.userSearch;
    const isAssignedSearch = permission && state.fields.assignedUserSearch;
    if (shouldFetch && next) {
      if (isAssignedSearch) {
        search({ searchQuery: state.fields.assignedUserSearch, permission, next });
      }
      if (isUserSearch) {
        search({ searchQuery: state.fields.userSearch, permission, next });
      }
      if (isNotSearch) {
        const querystring = `?permission=${permission}&fields=_id,name.first,name.last,picture.thumbnail,permission${next}`;
        getUsers({ querystring });
      }
    }
  };

  const handlePermissionChange = permission => {
    updateUserPermission({
      user: state.selectedUser,
      permission,
      action: permission ? 'ADD_PERMISSION' : 'REMOVE_PERMISSION',
    });
    setState({ ...state, selectedUser: '' });
  };

  const handleSearch = ({ target: { value, name } }, permission) => {
    setState({ ...state, fields: { ...state.fields, [name]: value } });
    if (value) {
      search({ searchQuery: value, permission });
    } else {
      resetSearch({ permission });
    }
  };

  /* eslint-disable no-underscore-dangle */
  const handleAvatarSelection = picture => {
    updateUserAvatar({ id: state.selectedUser._id, picture });
    setState({ ...state, selectedUser: {} });
  };
  /* eslint-enable no-underscore-dangle */

  return (
    <Fragment>
      <FlexBox justifyBetween>
        <div>
          <SearchField
            value={state.fields.userSearch}
            name="userSearch"
            placeholder="Search e.g. Firstname Lastname"
            onChange={event => handleSearch(event, false)}
          />
          <ListWrapper secondary>
            <UserList
              handleScroll={handleScroll}
              title={USERS}
              users={
                searchResult.users.length || state.fields.userSearch ? searchResult.users : users
              }
              selectUser={value => setState({ ...state, selectedUser: value })}
              selectedUser={state.selectedUser}
              isLoading={usersIsLoading}
            />
            <FlexBox justifyEnd>
              <AvatarSelection
                avatars={avatars}
                handleAvatarSelection={handleAvatarSelection}
                current={state.selectedUser}
                getItems={getAvatars}
                isLoading={avatarsIsLoading || avatarIsLoading}
                disabled={
                  !state.selectedUser ||
                  state.selectedUser.permission ||
                  avatarsIsLoading ||
                  avatarIsLoading
                }
              />

              <Button
                loading={addIsLoading}
                disabled={!state.selectedUser || state.selectedUser.permission || addIsLoading}
                onClick={() => handlePermissionChange(true)}
              >
                Add
              </Button>
            </FlexBox>
          </ListWrapper>
        </div>
        <div>
          <SearchField
            value={state.fields.assignedUserSearch}
            name="assignedUserSearch"
            placeholder="Search e.g. Firstname Lastname"
            onChange={event => handleSearch(event, true)}
          />
          <ListWrapper secondary>
            <UserList
              handleScroll={handleScroll}
              title={ASSIGNED}
              users={
                searchResult.assigned.length || state.fields.assignedUserSearch
                  ? searchResult.assigned
                  : usersWithPermissions
              }
              selectUser={value => setState({ ...state, selectedUser: value })}
              selectedUser={state.selectedUser}
              isLoading={usersIsLoading}
            />
            <FlexBox justifyEnd>
              <AvatarSelection
                avatars={avatars}
                handleAvatarSelection={handleAvatarSelection}
                current={state.selectedUser}
                getItems={getAvatars}
                isLoading={avatarsIsLoading || avatarIsLoading}
                disabled={
                  !state.selectedUser ||
                  !state.selectedUser.permission ||
                  avatarsIsLoading ||
                  avatarIsLoading
                }
              />
              <Button
                loading={removeIsLoading}
                disabled={!state.selectedUser || !state.selectedUser.permission || removeIsLoading}
                onClick={() => handlePermissionChange(false)}
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
