import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Button from '../Button';
import SelectionModal from './SelectionModal';

/* eslint-disable react/forbid-prop-types */
const propTypes = {
  items: PropTypes.arrayOf(PropTypes.node).isRequired,
  getItems: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
  children: PropTypes.string.isRequired,
  isLoading: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired,
  current: PropTypes.any.isRequired,
  modalWidth: PropTypes.string,
  handleSelection: PropTypes.func.isRequired,
};

const defaultProps = {
  modalWidth: '',
};

const SelectButton = ({
  items,
  getItems,
  disabled,
  children,
  isLoading,
  text,
  current,
  modalWidth: width,
  handleSelection,
}) => {
  const [modalIsOpen, toggleModal] = useState(false);
  useEffect(() => toggleModal(false), [current]);
  return (
    <div style={{ position: 'relative' }}>
      {!isLoading && !!items.length && modalIsOpen && (
        <SelectionModal
          text={text}
          items={items}
          width={width}
          onSelect={handleSelection}
          toggleModal={() => toggleModal(!modalIsOpen)}
        />
      )}
      <Button
        loading={isLoading}
        disabled={disabled}
        onClick={async () => {
          if (items.length) {
            toggleModal(!modalIsOpen);
          } else {
            await getItems();
            toggleModal(!modalIsOpen);
          }
        }}
      >
        {children}
      </Button>
    </div>
  );
};

SelectButton.defaultProps = defaultProps;
SelectButton.propTypes = propTypes;

export default SelectButton;
