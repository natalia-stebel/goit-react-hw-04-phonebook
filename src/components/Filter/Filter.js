import React from 'react';

import PropTypes from 'prop-types';

import css from "./Filter.module.css"

export const Filter = ({ onChange, value }) => {
  return (
    <label className={css.labelFilter}>
      Find contacts by name
      <input
      className={css.inputFilter}
        name="filter"
        onChange={onChange}
        type="text"
        value={value}
      />
    </label>
  );
};

Filter.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};