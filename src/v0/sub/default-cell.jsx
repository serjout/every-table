import React from 'react';
import propTypes from 'prop-types';
import get from 'lodash/fp/get';

export default function DefaultCell({ record, columnKey, className }) {
  return (
    <td className={className}>
      {String(get(columnKey, record))}
    </td>
  );
}

DefaultCell.propTypes = {
  record: propTypes.objectOf(propTypes.any),
  columnKey: propTypes.string,
  className: propTypes.string,
};
