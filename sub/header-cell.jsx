import React, { Component } from 'react';
import propTypes from 'prop-types';
import cn from 'classnames';

import s from '../table.pcss';

export default class HeaderCell extends Component {
  handleClick = () => {
    const { isSortable, columnKey, sortKey, isSortReverse, onClick } = this.props;

    if (isSortable && onClick) {
      onClick({
        sortKey: columnKey,
        oldSortKey: sortKey,
        isSortReverse: columnKey === sortKey ? !isSortReverse : Boolean(isSortReverse),
      });
    }
  };

  render() {
    const { isSortable, columnKey, sortKey, isSortReverse, text, width, className } = this.props;
    const isSortKey = isSortable && columnKey === sortKey;
    const style = width
      ? (width.endsWith('px') ? { minWidth: width } : { width })
      : undefined;

    return (
      <th
        className={cn(
          s.HeaderCell,
          className,
          {
            [s.HeaderCellSortable]: isSortable,
            [s.HeaderCellUp]: isSortKey && isSortReverse,
            [s.HeaderCellDown]: isSortKey && !isSortReverse,
          }
        )}
        style={style}
        onClick={this.handleClick}
      >
        {text}
      </th>
    );
  }
};

HeaderCell.propTypes = {
  className: propTypes.string,
  columnKey: propTypes.string.isRequired,
  text: propTypes.string.isRequired,
  width: propTypes.string,
  isSortable: propTypes.bool,
  sortKey: propTypes.string,
  isSortReverse: propTypes.bool,
  onClick: propTypes.func,
};
