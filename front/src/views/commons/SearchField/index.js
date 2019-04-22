import React from 'react';
import Field from '../Field';

const SearchField = ({ handleReset, loading, value, ...rest }) => (
  <div style={{ position: 'relative' }}>
    <Field value={value} {...rest} />
    {!loading && !value && (
      <i
        style={{ position: 'absolute', top: 15, right: 28 }}
        className="fa fa-search"
        aria-hidden="true"
      />
    )}
    {!loading && value && (
      <i
        style={{ position: 'absolute', top: 16, right: 30, cursor: 'pointer' }}
        className="fa fa-times-circle"
        aria-hidden="true"
        onClick={handleReset}
      />
    )}
    {loading && (
      <i
        style={{ position: 'absolute', top: 16, right: 27 }}
        className="fa fa-spinner fa-pulse"
        aria-hidden="true"
      />
    )}
  </div>
);

export default SearchField;
