import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  initUsersState,
  setUserPermission,
  fetchUsers,
  setUserAvatar,
} from '../../../state/users/actions';
import { searchForUsers, removeSearch } from '../../../state/search/actions';
import { fetchAvatars } from '../../../state/avatars/actions';

import UserManagement from '../../components/UserManagement';
import { getUsers, getUsersWithPersmissions } from '../../../state/users/selectors';
import { getLoadingState } from '../../../state/loading/selectors';
import searchTypes from '../../../state/search/types';

const propTypes = {
  setUsersState: PropTypes.func.isRequired,
};

const UserManagementContainer = ({ setUsersState, ...rest }) => {
  const { users } = rest;
  useEffect(() => {
    if (!users.length) {
      setUsersState();
    }
  }, []);

  return <UserManagement {...rest} />;
};

const mapStateToProps = state => ({
  usersIsLoading: getLoadingState(state, 'FETCH_USERS'),
  removeIsLoading: getLoadingState(state, 'REMOVE_PERMISSION'),
  avatars: state.avatars.data,
  next: {
    users: state.search.users.next || state.users.next.users,
    assigned: state.search.assigned.next || state.users.next.permission,
  },
  addIsLoading: getLoadingState(state, 'ADD_PERMISSION'),
  avatarsIsLoading: getLoadingState(state, 'FETCH_AVATARS'),
  avatarIsLoading: getLoadingState(state, 'UPDATE_AVATAR'),
  assignedSearchIsLoading: getLoadingState(state, searchTypes.SEARCH_ASSIGNED_USERS_ROOT),
  usersSearchIsLoading: getLoadingState(state, searchTypes.SEARCH_USERS_ROOT),
  users: getUsers(state),
  usersWithPermissions: getUsersWithPersmissions(state),
  searchResult: { users: state.search.users.data, assigned: state.search.assigned.data },
});

const mapDispatchToProps = dispatch => ({
  setUsersState: values => dispatch(initUsersState(values)),
  updateUserPermission: values => dispatch(setUserPermission(values)),
  updateUserAvatar: values => dispatch(setUserAvatar(values)),
  getUsers: values => dispatch(fetchUsers(values)),
  getAvatars: values => dispatch(fetchAvatars(values)),
  search: values => dispatch(searchForUsers(values)),
  resetSearch: values => dispatch(removeSearch(values)),
});

UserManagementContainer.propTypes = propTypes;

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserManagementContainer);
