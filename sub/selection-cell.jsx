import React, { Component } from 'react';
import propTypes from 'prop-types';

import s from '../table.pcss';

export default class SelectionCell extends Component {
  handleChange = () => {
    const { record, isSelected, onChangeRowSelection } = this.props;

    onChangeRowSelection({ record, isSelected: !isSelected });
  };

  render() {
    return (<td className={s.Cell}>
      <input
        type="checkbox"
        checked={this.props.isSelected}
        onChange={this.handleChange}
      />
    </td>);
  }
}

SelectionCell.propTypes = {
  record: propTypes.objectOf(propTypes.any),
  isSelected: propTypes.bool,
  onChangeRowSelection: propTypes.func,
};
