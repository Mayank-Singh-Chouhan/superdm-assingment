import { SortType, TaskStatus } from '@/models/enums';
import { clearFilters, sortTasksByCreatedAt, sortTasksByUpdatedAt } from '@/store/slices/workspace-slice';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

interface ITableToolbar {
    tableType: TaskStatus;
}

const TableToolbar = ({ tableType }: ITableToolbar) => {
    const [isFiltered, setIsFiltered] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(clearFilters(tableType));
    }, [])

    const handleSorting = (sortType: SortType) => {
        setIsFiltered(true)
        if (sortType === SortType.CREATED_DATE) {
            dispatch(sortTasksByCreatedAt(tableType))
        } else if (sortType === SortType.UPDATED_DATE) {
            dispatch(sortTasksByUpdatedAt(tableType))
        }
    }

    const clearFilterHandler = () => {
        dispatch(clearFilters(tableType));
        setIsFiltered(false)
    }
    return (
        <div className="overflow-x-auto shrink-0  rounded-xl border border-fs-border">
            <div className="h-16 w-full min-w-max flex items-center justify-end gap-4 p-3">
                {isFiltered && (
                    <button
                        onClick={clearFilterHandler}
                        className="py-2 px-3 text-white rounded-lg bg-fs-border flex items-center gap-2"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="20px"
                            viewBox="0 -960 960 960"
                            width="20px"
                            fill="#FFFFFF"
                        >
                            <path d="m291-240-51-51 189-189-189-189 51-51 189 189 189-189 51 51-189 189 189 189-51 51-189-189-189 189Z" />
                        </svg>
                    </button>
                )}
                <button
                    onClick={() => handleSorting(SortType.CREATED_DATE)}
                    className="py-2 px-3 text-white rounded-lg bg-fs-border flex items-center gap-2"
                >
                    <span>Sort By Creation</span>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="20px"
                        viewBox="0 -960 960 960"
                        width="20px"
                        fill="#FFFFFF"
                    >
                        <path d="M324-432v-294L219-621l-51-51 192-192 192 192-51 51-105-105v294h-72ZM600-96 408-288l51-51 105 105v-294h72v294l105-105 51 51L600-96Z" />
                    </svg>
                </button>
                <button
                    onClick={() => handleSorting(SortType.UPDATED_DATE)}
                    className="py-2 px-3 text-white rounded-lg bg-fs-border flex items-center gap-2"
                >
                    <span>Sort By Last Updated</span>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="20px"
                        viewBox="0 -960 960 960"
                        width="20px"
                        fill="#FFFFFF"
                    >
                        <path d="M324-432v-294L219-621l-51-51 192-192 192 192-51 51-105-105v294h-72ZM600-96 408-288l51-51 105 105v-294h72v294l105-105 51 51L600-96Z" />
                    </svg>
                </button>
            </div>
        </div>

    )
}

export default TableToolbar