Table component:

```javascript
const columns = [
  {
    columnKey: "a",
    headerText: "Text A",
    sortable: true,
  },
  { columnKey: "b", width: "50px" },
  { columnKey: "x" },
  { columnKey: "c", sortable: true, width: 2 },
];
const hiddenColumns = ["x"];

const store = {
  sortKey: "a",
  isSortReverse: false,
  selection: {},
  records: {
    a: { a: new Date(), b: 2, x: 3, c: 5 },
    b: { a: new Date(Date.now() + 1), b: 22, x: 33, c: 4 },
    c: { a: new Date(Date.now() + 2), b: 222, x: 333, c: 3 },
    d: { a: new Date(Date.now() + 3), b: 2222, x: 3333, c: 2 },
  },

  changeSort({ sortKey, isSortReverse }) {
    this.sortKey = sortKey;
    this.isSortReverse = isSortReverse;
  },

  changeSelection({ selection }) {
    this.selection = selection;
  },
};

<Table
  columns={columns}
  onChangeSort={store.changeSort}
  onChangeSelection={store.changeSelection}
  hiddenColumns={hiddenColumns}
  idKey="id"
  sortKey={store.sortKey}
  selection={store.selection}
  isSortReverse={store.isSortReverse}
  hasHoverHighlight={false}
  records={store.records}
/>;
```
