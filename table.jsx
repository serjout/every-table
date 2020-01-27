import React, { PureComponent } from 'react';
import createRow from './sub/createRow';
import createHeader from './sub/createHeader';
import propTypes from 'prop-types';
import cn from 'classnames';
import sortBy from 'lodash/fp/sortBy';
import valuesIn from 'lodash/fp/valuesIn';
import reverse from 'lodash/fp/reverse';
import omit from 'lodash/fp/omit';
import flow from 'lodash/fp/flow';

import s from './table.pcss';

export default class Table extends PureComponent {
  static propTypes = {
    columns: propTypes.arrayOf(
      propTypes.shape({
        columnKey: propTypes.string.isRequired,
        cellRender: propTypes.func,
        headerText: propTypes.string,
        headerCellClassName: propTypes.string,
        sortable: propTypes.bool,
        width: propTypes.oneOfType([propTypes.number, propTypes.string]),
        addon: propTypes.string,
      })
    ).isRequired,
    idKey: propTypes.string.isRequired,
    sortKey: propTypes.string,
    forceSort: propTypes.bool,
    isSortReverse: propTypes.bool,
    className: propTypes.string,
    headerClassName: propTypes.string,
    rowClassName: propTypes.string,
    cellClassName: propTypes.string,
    hiddenColumns: propTypes.arrayOf(propTypes.string),
    /**
     * id to record map or array of records
     */
    records: propTypes.oneOfType([
      propTypes.objectOf(propTypes.object),
      propTypes.arrayOf(propTypes.object),
    ]),
    selection: propTypes.oneOfType([
      propTypes.objectOf(propTypes.bool),
      propTypes.arrayOf(propTypes.string),
    ]),

    onChangeSort: propTypes.func,
    onChangeSelection: propTypes.func,
    onRowClick: propTypes.func,
  };

  static defaultProps = {
    hiddenColumns: Array.prototype,
    records: Array.prototype,
  };

  constructor(props) {
    super(props);

    this.updateSubComponets(null, props);
  }

  componentWillReceiveProps(nextProps) {
    this.updateSubComponets(this.props, nextProps);
  }

  handleChangeRowSelection = ({ record, isSelected }) => {
    const { selection, idKey, onChangeSelection } = this.props;
    const id = record[idKey];

    onChangeSelection({
      selection: isSelected
        ? Object.assign({ [id]: isSelected }, selection)
        : omit(selection, id),
    });
  };

  render() {
    const {
      hiddenColumns,
      idKey,
      sortKey,
      isSortReverse,
      className,
      records,
      headerClassName,
      rowClassName,
      cellClassName,
      onChangeSort,
      selection,
      onChangeSelection,
      onRowClick,
    } = this.props;
    const {
      Header,
      Row,
    } = this.subComponents;
    const processedSelection = this.processSelection(selection);
    const processedRecords = this.processDataObject(records);

    return (
      <table className={cn(s.Table, className)} >
        <thead>
          <Header
            idKey={idKey}
            onChangeSort={onChangeSort}
            className={headerClassName}
            hiddenColumns={hiddenColumns}
            sortKey={sortKey}
            isSortReverse={isSortReverse}
            selection={processedSelection}
            onChangeSelection={onChangeSelection}
            records={processedRecords}
          />
        </thead>
        <tbody>
          {processedRecords.map(rec => {
            const id = rec[idKey];

            return (<Row
              key={id}
              record={rec}
              hiddenColumns={hiddenColumns}
              className={rowClassName}
              cellClassName={cellClassName}
              onClick={onRowClick}
              onChangeRowSelection={this.handleChangeRowSelection}
              isSelected={selection && !!selection[id]}
            />);
          })}
        </tbody>
      </table>
    );
  }

  processSelection(selection) {
    return selection instanceof Array
      ? selection.reduce((map, key) => Object.assign(map, { [key]: true }), {})
      : selection;
  }

  sortValues = flow(
    valuesIn,
    sortBy([this.props.sortKey, this.props.idKey]),
    arr => this.props.isSortReverse ? reverse(arr) : arr
  );

  processDataObject = records => {
    if (Array.isArray(records) && !this.props.forceSort) {
      return records;
    }

    return this.sortValues(records);
  };

  updateSubComponets(props, nextProps) {
    const { columns, selection } = nextProps;
    const hasSelection = !!selection;

    if (props && props.columns === columns && !!props.selection === hasSelection) {
      return;
    }

    const allColumns = hasSelection
      ? [{ columnKey: '$selection' }, ...columns]
      : columns;

    this.subComponents = {
      Header: createHeader(allColumns),
      Row: createRow(allColumns),
    };
  };


}
