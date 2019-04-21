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
import { getUsers, getAssignedUsers } from '../../../state/users/selectors';

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
  isLoading: state.loading || {},
  avatars: state.avatars.data,
  next: {
    users: state.search.users.next || state.users.next.users,
    assignedUsers: state.search.assignedUsers.next || state.users.next.assignedUsers,
  },
  users: getUsers(state),
  assignedUsers: getAssignedUsers(state),
  searchResult: { users: state.search.users.data, assignedUsers: state.search.assignedUsers.data },
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
