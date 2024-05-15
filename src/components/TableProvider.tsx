import React, { createContext, ReactNode, useState } from 'react';

interface TableProviderProps {
  children: ReactNode;
}

interface TableContextProps {
  columns: string[];
  setColumns: (columns: string[]) => void;
}

export const TableContext = createContext<TableContextProps | undefined>(undefined);

export const TableProvider: React.FC<TableProviderProps> = ({ children }) => {
  const [columns, setColumns] = useState<string[]>([]);

  return (
    <TableContext.Provider value={{ columns, setColumns }}>
      {children}
    </TableContext.Provider>
  );
};

