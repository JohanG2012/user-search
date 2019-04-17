import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { initUsersState, setUserPermission, fetchUsers } from '../../../state/users/actions';
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
  next: state.users.next,
  addIsLoading: getLoadingState(state, 'ADD_PERMISSION'),
  actionIsLoading: state.users.userActionIsLoading,
  users: getUsers(state),
  usersWithPermissions: getUsersWithPersmissions(state),
});

const mapDispatchToProps = dispatch => ({
  setUsersState: values => dispatch(initUsersState(values)),
  updateUserPermission: values => dispatch(setUserPermission(values)),
  getUsers: values => dispatch(fetchUsers(values)),
});

UserManagementContainer.propTypes = propTypes;

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserManagementContainer);
