import React, { useEffect, useMemo } from 'react'
import Table from '../molecules/table';
import { TASK_COLUMN } from '@/data/table-column-data';
import { ITask } from '@/models/interfaces';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';

export interface IInfiniteTable<T> {
    queryKey: string;
    data: T[],
    handleRowClick: (row: ITask, index: number) => void;
}

const InfiniteTable = <T,>({ queryKey, data, handleRowClick }: IInfiniteTable<T>) => {
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

    if (isLoading) {
        return <>Loading...</>
    }
    return (
        <div className="overflow-x-auto scroll-hidden rounded-xl">
            <Table handleRowClick={handleRowClick} columns={TASK_COLUMN} data={ROW_DATA} />
            <div ref={ref} className='min-h-3 bg-red-500'>
                {isFetchingNextPage && <>Loading...</>}
            </div>
        </div>
    )
}

export default InfiniteTable