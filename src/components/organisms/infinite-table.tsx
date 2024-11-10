import React, { useEffect, useMemo } from 'react'
import Table from '../molecules/table';
import { TASK_COLUMN } from '@/data/table-column-data';
import { ITask } from '@/models/interfaces';
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';
import TableSkeleton from '../molecules/table-skeleton';

export interface IInfiniteTable<T> {
    queryKey: string;
    data: T[],
    handleRowClick: (row: ITask, index: number) => void;
}

const InfiniteTable = <T,>({ queryKey, data, handleRowClick }: IInfiniteTable<T>) => {
    const PAGE_SIZE = 10;
    const { ref, inView } = useInView();
    const queryClient = useQueryClient();


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
        queryKey: [queryKey],
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
    ) as ITask[]

    // Whenever the Intersection Occurs Fetch new Data
    useEffect(() => {
        if (inView) {
            fetchNextPage()
        }
    }, [fetchNextPage, inView])

    useEffect(() => {
        queryClient.resetQueries({ queryKey: [queryKey] });
    }, [queryClient, queryKey, data]);

    return (
        <div className="overflow-x-auto scroll-hidden rounded-xl">
            {
                isLoading ? 
                <TableSkeleton /> : 
                <>
                    <Table handleRowClick={handleRowClick} columns={TASK_COLUMN} data={ROW_DATA} />

                    {/* Skeleton */}
                    <table ref={ref} className="min-w-full border-t border-t-fs-border min-h-1">
                        {
                            isFetchingNextPage && 
                            <tbody className="divide-y divide-fs-border">
                                {[...Array(2)].map((_, index) => (
                                    <tr
                                        key={index}
                                    >
                                    {[...Array(6)].map((_, colIndex) => (
                                        <td
                                        key={colIndex}
                                        className="px-6 py-4 whitespace-nowrap text-white text-[14px] font-normal"
                                        >
                                        <span className='inline-block h-2 bg-fs-border rounded-2xl min-w-14 w-full'></span>
                                        </td>
                                    ))}
                                    </tr>
                                ))}
                            </tbody>
                        }
                    </table>
                
                </>
            }

        </div>
    )
}

export default InfiniteTable