import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchAvatars } from '../../../state/avatars/actions';
import UserManagement from '../../components/UserManagement';

const propTypes = {
  getAvatars: PropTypes.func.isRequired,
};

const UserManagementContainer = ({ getAvatars }) => {
  useEffect(() => {
    getAvatars();
  });

  return <UserManagement />;
};

const mapStateToProps = (/* state */) => ({});

const mapDispatchToProps = dispatch => ({
  getAvatars: values => dispatch(fetchAvatars(values)),
});

UserManagementContainer.propTypes = propTypes;

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserManagementContainer);
