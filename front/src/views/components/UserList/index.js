import React from 'react';
import PropTypes from 'prop-types';
import Loader from '../../commons/Loader';
import UserItem from './UserItem';
import FlexScroll from './FlexScroll';
import Title from '../../commons/Title';
import Text from '../../commons/Text';
import LoaderWrapper from './LoaderWrapper';
import Wrapper from './Wrapper';
import SearchField from '../../commons/SearchField';
/* eslint-disable no-underscore-dangle */

const propTypes = {
  title: PropTypes.string,
  users: PropTypes.arrayOf(
    PropTypes.shape({
      name: {
        first: PropTypes.string,
        last: PropTypes.string,
      },
      picture: {
        thumbnail: PropTypes.string,
      },
    }),
  ),
  selectUser: PropTypes.func.isRequired,
  selectedUser: PropTypes.shape({
    _id: PropTypes.string,
  }),
  handleScroll: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  renderActions: PropTypes.node.isRequired,
  searchValue: PropTypes.string.isRequired,
  handleSearch: PropTypes.func.isRequired,
};

const defaultProps = {
  title: '',
  users: [],
  selectedUser: {},
};

const UserList = ({
  title,
  users,
  selectUser,
  selectedUser,
  handleScroll,
  isLoading,
  renderActions,
  searchValue,
  handleSearch,
}) => (
  <div>
    <SearchField
      value={searchValue}
      name={title}
      placeholder="Search e.g. Firstname Lastname"
      onChange={handleSearch}
    />
    <Wrapper secondary>
      <div style={{ height: '600px' }}>
        <Title heading="2" center>
          {title}
        </Title>
        <FlexScroll
          contentStart={users.length}
          contentCenter={!users.length}
          justifyCenter={!users.length}
          onScroll={e => handleScroll(e.target, title)}
        >
          {!users.length && !isLoading && <Text center>No users were found...</Text>}
          {!!users.length &&
            users.map(user => (
              <UserItem
                user={user}
                key={user._id}
                onClick={() => selectUser(user)}
                selected={selectedUser._id === user._id}
              />
            ))}
          {isLoading && (
            <LoaderWrapper>
              <Loader />
            </LoaderWrapper>
          )}
        </FlexScroll>
      </div>
      {renderActions}
    </Wrapper>
  </div>
);

UserList.defaultProps = defaultProps;
UserList.propTypes = propTypes;

export default UserList;
