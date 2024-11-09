import React from 'react'
import Table from '../molecules/table'
import { TASK_COLUMN } from '@/data/table-column-data';
import { CLOSED_TASK_DATA } from '@/data/closed-task-data';

const CloseTemplate = () => {

    return (
        <section className='h-full gap-3 flex flex-col'>
            <div className='h-16 w-full rounded-xl shrink-0 border border-fs-border'></div>
            <Table columns={TASK_COLUMN} data={CLOSED_TASK_DATA} />
        </section>
    )
}

export default CloseTemplate