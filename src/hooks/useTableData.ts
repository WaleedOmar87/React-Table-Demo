import { useState, useEffect } from 'react';

export interface TableData {
  [key: string]: any;
}

const useTableData = (data: TableData[]) => {
  const [filteredData, setFilteredData] = useState<TableData[]>(data);
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    if (searchQuery) {
      const lowerCaseQuery = searchQuery.toLowerCase();
      const filtered = data.filter(item =>
        Object.values(item).some(val => 
          val.toString().toLowerCase().includes(lowerCaseQuery)
        )
      );
      setFilteredData(filtered);
    } else {
      setFilteredData(data);
    }
  }, [searchQuery, data]);

  return { filteredData, searchQuery, setSearchQuery };
};

export default useTableData;

