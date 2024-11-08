import React from 'react';

interface Column<T> {
  header: string;
  accessor: keyof T; // Ensuring that accessor is a valid key of the data type
  render?: (value: T) => React.ReactNode;
}

interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
}

const Table = <T,>({ columns, data }: TableProps<T>) => {
  return (
    <div className="overflow-x-auto scroll-hidden rounded-xl">
      <table className="min-w-full">
        <thead className="sticky backdrop-blur-md bg-fs-border top-0 z-50">
          <tr>
            {columns.map((column, index) => (
              <th
                key={index}
                scope="col"
                className="px-6 py-4 text-left text-[14px] font-medium text-white whitespace-nowrap tracking-wider"
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-fs-border">
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} className='hover:bg-fs-border cursor-pointer'>
              {columns.map((column, colIndex) => (
                <td
                  key={colIndex}
                  className="px-6 py-4 whitespace-nowrap text-sm text-white text-[14px] font-normal"
                >
                  {column.render
                    ? column.render(row)
                    : (row[column.accessor] as React.ReactNode)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;