import React, { PureComponent } from 'react';
import propTypes from 'prop-types';
import HeaderCell from './HeaderCell';
import SelectionHeaderCell from './SelectionHeaderCell';
import cn from 'classnames';

import s from '../table.pcss';

const specialRenders = {
  '$selection': SelectionHeaderCell,
};

/**
 * table header row factory
 * @param columns
 * @returns {Function} subclass of React.Component
 */
export default function createHeader(columns) {
  const keys = columns.map(col => col.columnKey);
  const headerTextMap = {};
  const widthMap = {};
  const sortableMap = {};
  const classMap = {};

  columns.forEach(col => {
    headerTextMap[col.columnKey] = col.headerText;
    sortableMap[col.columnKey] = col.sortable;
    widthMap[col.columnKey] = col.width;
    classMap[col.columnKey] = col.headerCellClassName;
  });

  return class Header extends PureComponent {
    static propTypes = {
      hiddenColumns: propTypes.arrayOf(propTypes.string).isRequired,
      idKey: propTypes.string.isRequired,
      sortKey: propTypes.string,
      isSortReverse: propTypes.bool,
      headerClassName: propTypes.string,
      selection: propTypes.objectOf(propTypes.bool),
      records: propTypes.arrayOf(propTypes.object),

      onChangeSort: propTypes.func,
      onChangeSelection: propTypes.func,
    };

    render() {
      const {
        hiddenColumns,
        sortKey,
        isSortReverse,
        headerClassName,
        onChangeSort,
      } = this.props;
      const visibleKeys = keys.filter(key => hiddenColumns.indexOf(key) === -1);

      const flexMultiplier = getFlexMultiplier(visibleKeys, widthMap);

      return (
        <tr className={cn(s.HeaderRow, headerClassName)}>
          {visibleKeys.map(columnKey => {
            if (columnKey in specialRenders) {
              const SpecialRender = specialRenders[columnKey];

              return <SpecialRender {...this.props} key={columnKey} />;
            }

            const text = headerTextMap[columnKey] === undefined ? columnKey : headerTextMap[columnKey];
            const width = columnKey in widthMap
              ? processWidth(widthMap[columnKey], flexMultiplier)
              : undefined;

            return (
              <HeaderCell
                className={classMap[columnKey]}
                key={columnKey}
                columnKey={columnKey}
                text={text}
                isSortable={sortableMap[columnKey]}
                sortKey={sortKey}
                isSortReverse={isSortReverse}
                onClick={onChangeSort}
                width={width}
              />
            );
          })}
        </tr>
      );
    }
  };
}

export function hasUnit(width) {
  return typeof width === 'string' && (width.endsWith('%') || width.endsWith('px'));
}

export function getFlexMultiplier(keys, widthMap) {
  const flexSum = keys.reduce((sum, columnKey) => {
    const width = widthMap[columnKey];

    if (hasUnit(width)) {
      return sum;
    }

    return sum + Number(width);
  }, 0);

  return 100 / flexSum;
}

export function processWidth(width, flexMultiplier) {
  return hasUnit(width) ? width : `${Number(width) * flexMultiplier}%`;
}
