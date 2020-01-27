Table component:

    const {observable, action} = mobx;
    const {observer} = mobxReact;
  
    const columns=[
        {
            columnKey: 'a', 
            headerText: 'Text A', 
            sortable: true,
            cellRender({ record, columnKey, className }) {
                return (
                    <td className={className}>** {record[columnKey]} **</td>
                )
            } 
        },
        {columnKey: 'b', width: '50px', cellRender: CustomCellRender },
        {columnKey: 'x'},
        {columnKey: 'c', sortable: true, width: 2 },
    ];
    const hiddenColumns = ['x'];
  
    const state = observable({
        sortKey: 'a',
        isSortReverse: false,
        selection: {},
        records: observable.ref({
            a: { a: new Date(), b: 2, x: 3, c: 5 },
            b: { a: new Date(Date.now() + 1), b: 22, x: 33, c: 4 },
            c: { a: new Date(Date.now() + 2), b: 222, x: 333, c: 3 },
            d: { a: new Date(Date.now() + 3), b: 2222, x: 3333, c: 2 },
        }),
        
        changeSort: action.bound(function ({ sortKey, isSortReverse }) {
            this.sortKey = sortKey;
            this.isSortReverse = isSortReverse;
        }),
        
        changeSelection: action.bound(function ({ selection }) {
            this.selection = selection;
        }),
    })
 
    
    const Container = observer(
        () => (
            <Table
                columns={columns}
                onChangeSort={state.changeSort}
                onChangeSelection={state.changeSelection}
                hiddenColumns={hiddenColumns}
                idKey='id'
                sortKey={state.sortKey}
                selection={state.selection}
                isSortReverse={state.isSortReverse}
                hasHoverHighlight={false}
                records={state.records}
            />
        )
    );
    
    <Container />
    
