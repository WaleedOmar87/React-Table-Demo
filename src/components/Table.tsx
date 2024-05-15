import React, { useContext, useState } from 'react';
import { useTable, usePagination } from 'react-table';
import Select from 'react-select';
import { TableContext } from './TableProvider';
import useTableData, { TableData } from '../hooks/useTableData';

interface TableProps {
  data: TableData[];
  columns: { Header: string, accessor: string }[];
}

const Table: React.FC<TableProps> = ({ data, columns }) => {
  const { columns: contextColumns, setColumns } = useContext(TableContext);
  const [pageSize, setPageSize] = useState<number>(10);

  const { filteredData, searchQuery, setSearchQuery } = useTableData(data);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize: setTablePageSize,
    state: { pageIndex }
  } = useTable(
    {
      columns,
      data: filteredData,
      initialState: { pageIndex: 0, pageSize },
    },
    usePagination
  );

  const handleColumnToggle = (selected: any) => {
    setColumns(selected ? selected.map((col: any) => col.value) : []);
  };

  return (
    <div>
      <input
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search"
      />
      <Select
        isMulti
        options={columns.map(col => ({ label: col.Header, value: col.accessor }))}
        onChange={handleColumnToggle}
        placeholder="Toggle Columns"
      />
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers
                .filter(col => !contextColumns.length || contextColumns.includes(col.accessor as string))
                .map(column => (
                  <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map(row => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells
                  .filter(cell => !contextColumns.length || contextColumns.includes(cell.column.id))
                  .map(cell => (
                    <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div>
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {'<<'}
        </button>
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {'<'}
        </button>
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          {'>'}
        </button>
        <button onClick={() => gotoPage(pageOptions.length - 1)} disabled={!canNextPage}>
          {'>>'}
        </button>
        <span>
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{' '}
        </span>
        <select
          value={pageSize}
          onChange={e => {
            setTablePageSize(Number(e.target.value));
            setPageSize(Number(e.target.value));
          }}
        >
          {[10, 20, 30, 40, 50].map(size => (
            <option key={size} value={size}>
              Show {size}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Table;

