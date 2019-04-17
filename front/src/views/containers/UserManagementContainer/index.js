import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  initUsersState,
  setUserPermission,
  fetchUsers,
  setUserAvatar,
} from '../../../state/users/actions';
import { fetchAvatars } from '../../../state/avatars/actions';
import UserManagement from '../../components/UserManagement';
import { getUsers, getUsersWithPersmissions } from '../../../state/users/selectors';
import { getLoadingState } from '../../../state/loading/selectors';

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
  next: state.users.next,
  addIsLoading: getLoadingState(state, 'ADD_PERMISSION'),
  avatarsIsLoading: getLoadingState(state, 'FETCH_AVATARS'),
  avatarIsLoading: getLoadingState(state, 'UPDATE_AVATAR'),
  users: getUsers(state),
  usersWithPermissions: getUsersWithPersmissions(state),
});

const mapDispatchToProps = dispatch => ({
  setUsersState: values => dispatch(initUsersState(values)),
  updateUserPermission: values => dispatch(setUserPermission(values)),
  updateUserAvatar: values => dispatch(setUserAvatar(values)),
  getUsers: values => dispatch(fetchUsers(values)),
  getAvatars: values => dispatch(fetchAvatars(values)),
});

UserManagementContainer.propTypes = propTypes;

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserManagementContainer);
