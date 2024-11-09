import React from 'react';
// import FocusLock from 'react-focus-lock';

interface Identifiable { id: number | string; }
interface Column<T extends Identifiable> {
  header: string;
  accessor: keyof T;
  render?: (value: T) => React.ReactNode;
}

interface TableProps<T extends Identifiable> {
  handleRowClick: (row: T) => void;
  columns: Column<T>[];
  data: T[];
}

const Table = <T extends Identifiable>({ columns, data, handleRowClick }: TableProps<T>) => {
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
        {/* <FocusLock> */}
          <tbody className="divide-y divide-fs-border">
            {data.map((row) => (
              <tr onClick={() => handleRowClick(row)} key={row.id} tabIndex={0} role='button' className='hover:bg-fs-border focus-visible:outline-none focus:bg-fs-border'>
                {columns.map((column, colIndex) => (
                  <td
                    key={colIndex}
                    className="px-6 py-4 whitespace-nowrap text-white text-[14px] font-normal"
                  >
                    {column.render
                      ? column.render(row)
                      : (row[column.accessor] as React.ReactNode)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        {/* </FocusLock> */}
      </table>
    </div>
  );
};

export default Table;