import React, { cloneElement } from 'react';
import PropTypes from 'prop-types';
import Wrapper from './Wrapper';
import FlexBox from '../FlexBox';
import Text from '../Text';
import Arrow from '../Arrow';

const propTypes = {
  items: PropTypes.arrayOf(PropTypes.node).isRequired,
  text: PropTypes.string.isRequired,
  width: PropTypes.string,
  toggleModal: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
};

const defaultProps = {
  width: '',
};

const SelectionModal = ({ items, text, width, toggleModal, onSelect }) => (
  <Wrapper secondary width={width}>
    <Text secondary center>
      {text}
    </Text>
    <FlexBox justifyAround>
      {items.map(item =>
        cloneElement(
          item,
          {
            onClick: () => {
              toggleModal();
              onSelect(item.props.selectValue);
            },
            onKeyPress: () => {
              toggleModal();
              onSelect(item.props.selectValue);
            },
          },
          null,
        ),
      )}
    </FlexBox>
    <FlexBox justifyCenter style={{ position: 'relative', top: '20px' }}>
      <Arrow secondary />
    </FlexBox>
  </Wrapper>
);

SelectionModal.defaultProps = defaultProps;
SelectionModal.propTypes = propTypes;

export default SelectionModal;
