import React, { Component } from 'react';
import propTypes from 'prop-types';

import s from '../table.pcss';

export default class SelectionHeaderCell extends Component {
  handleChange = ({ target }) => {
    const { idKey, records, onChangeSelection } = this.props;

    const selection = target.checked
      ? records.reduce((all, record) => Object.assign(all, { [record[idKey]]: true }), {})
      : {};

    onChangeSelection({ selection });
  };

  render() {
    const { idKey, records, selection } = this.props;

    const ids = records.map((x) => x[idKey]);
    const hasSelected = ids.some((x) => selection[x]);
    const isAllSelected = hasSelected && ids.every((x) => selection[x]);
    const isIndeterminate = hasSelected !== isAllSelected;

    return (<th className={s.HeaderCell}>
      <input
        ref={(node) => node && (node.indeterminate = isIndeterminate)}
        type="checkbox"
        checked={isAllSelected}
        onChange={this.handleChange}
      />
    </th>);
  }
}

SelectionHeaderCell.propTypes = {
  idKey: propTypes.string,
  selection: propTypes.objectOf(propTypes.bool),
  onChangeSelection: propTypes.func,
  records: propTypes.arrayOf(propTypes.object),
};
