import React, { useRef} from 'react';
import FocusLock from 'react-focus-lock';

interface Identifiable { id: number | string; }
interface Column<T extends Identifiable> {
  header: string;
  accessor: keyof T;
  render?: (value: T) => React.ReactNode;
}

interface TableProps<T extends Identifiable> {
  handleRowClick: (row: T, index: number) => void;
  columns: Column<T>[];
  data: T[];
}

const Table = <T extends Identifiable>({ columns, data, handleRowClick }: TableProps<T>) => {

  const rowRefs = useRef<(HTMLTableRowElement | null)[]>([]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTableRowElement>, index: number) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const nextIndex = (index + 1) % data.length;
      rowRefs.current[nextIndex]?.focus();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const prevIndex = (index - 1 + data.length) % data.length;
      rowRefs.current[prevIndex]?.focus();
    } else if (e.key === 'Enter') {
      e.preventDefault();
      rowRefs.current[index]?.click();
    }
  };

  return (
    <FocusLock>
      <table className="min-w-full">
        <thead className="sticky backdrop-blur-md rounded-xl bg-fs-border top-0 z-50">
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
          {data.map((row, index) => (
            <tr
              onClick={() => handleRowClick(row, index)}
              key={row.id} tabIndex={0}
              role='button'
              className='hover:bg-fs-border focus-visible:outline-none focus:bg-fs-border'
              ref={(el) => { rowRefs.current[index] = el; }}
              onKeyDown={(e) => handleKeyDown(e, index)}
            >
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
      </table>
    </FocusLock>

  );
};

export default Table;