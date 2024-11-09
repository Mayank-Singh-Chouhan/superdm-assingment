import { useInfiniteQuery } from '@tanstack/react-query';
import React, { useRef, useEffect, useMemo } from 'react';
import FocusLock from 'react-focus-lock';
import { useInView } from 'react-intersection-observer';

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


  const PAGE_SIZE = 10;
  const { ref, inView } = useInView()


  const fetchMockData = ({ pageParam = 0 }) => {
    // Simulate fetching data by slicing the mock data array
    const start = pageParam * PAGE_SIZE;
    const end = start + PAGE_SIZE;

    const rowData = data.slice(start, end);

    return new Promise((resolve) => {
      setTimeout(() => resolve(rowData), 1000); // Simulate network delay
    });
  };

  const { data: MOCK_DATA, isLoading, fetchNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryFn: fetchMockData,
    queryKey: ['mockData'],
    initialPageParam: 0,
    getNextPageParam: (_, pages) => {
      if (pages.flat().length < data.length) {
        return pages.length; // Next page index
      }
      return undefined; // No more pages
    }
  })

  const ROW_DATA = useMemo(
    () => MOCK_DATA?.pages.flatMap(row => row),
    [MOCK_DATA]
  ) as T[]

  // Whenever the Intersection Occurs Fetch new Data
  useEffect(() => {

    if (inView) {
      fetchNextPage()
    }

  }, [fetchNextPage, inView])

  if (isLoading) {
    return <>Loading...</>
  }

  return (
    <div className="overflow-x-auto scroll-hidden rounded-xl">
      <FocusLock>
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
            {ROW_DATA.map((row, index) => (
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
            <tr>
              {/* Loader */}
              <td ref={ref} className='my-3 min-h-2 bg-red-600'>
                {isFetchingNextPage && <>Loading...</>}
              </td>
            </tr>
          </tbody>
        </table>
      </FocusLock>
    </div>
  );
};

export default Table;