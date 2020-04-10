import React, { PureComponent } from 'react';
import propTypes from 'prop-types';
import DefaultCell from './default-cell';
import SelectionCell from './selection-cell';
import cn from 'classnames';

import s from '../table.pcss';

const specialRenders = {
  '$selection': SelectionCell,
};

/**
 * table regular row factory
 * @param columns
 * @returns {Function} subclass of React.Component
 */
export default function createHeader(columns) {
  const keys = columns.map((col) => col.columnKey);
  const rendersMap = {};

  columns.forEach((col) => {
    rendersMap[col.columnKey] = col.cellRender || DefaultCell;
  });

  return class Row extends PureComponent {
    static propTypes = {
      hiddenColumns: propTypes.arrayOf(propTypes.string).isRequired,
      record: propTypes.objectOf(propTypes.any),
      className: propTypes.string,
      cellClassName: propTypes.string,
      isSelected: propTypes.bool,
      onChangeSelection: propTypes.func,
      onClick: propTypes.func,
    };

    handleClick= () => {
      const { onClick, record, isSelected } = this.props;

      onClick && onClick({ record, isSelected });
    };

    render() {
      const {
        hiddenColumns,
        record,
        className,
        cellClassName,
      } = this.props;
      const visibleKeys = keys.filter((key) => hiddenColumns.indexOf(key) === -1);

      return (
        <tr className={cn(s.Row, className )} onClick={this.handleClick}>
          {visibleKeys.map((columnKey) => {
            if (columnKey in specialRenders) {
              const SpecialRender = specialRenders[columnKey];

              return <SpecialRender {...this.props} key={columnKey} />;
            }

            const Render = rendersMap[columnKey];

            return (
              <Render
                className={cn(s.Cell, cellClassName)}
                key={columnKey}
                columnKey={columnKey}
                record={record}
              />
            );
          })}
        </tr>
      );
    }
  };
}
