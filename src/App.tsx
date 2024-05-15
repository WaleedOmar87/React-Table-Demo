import React from 'react';
import Table from './components/Table';
import { TableProvider } from './components/TableProvider';
import withErrorBoundary from './components/withErrorBoundary';

const data = [
  { id: 1, firstName: 'John', lastName: 'Doe', age: 28 },
  { id: 2, firstName: 'Jane', lastName: 'Doe', age: 22 },
  // More data...
];

const columns = [
  { Header: 'ID', accessor: 'id' },
  { Header: 'First Name', accessor: 'firstName' },
  { Header: 'Last Name', accessor: 'lastName' },
  { Header: 'Age', accessor: 'age' },
];

const TableWithErrorBoundary = withErrorBoundary(Table as any);

const App: React.FC = () => (
  <TableProvider>
    <TableWithErrorBoundary data={data} columns={columns} />
  </TableProvider>
);

export default App;

