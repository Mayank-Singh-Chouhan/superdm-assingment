import React from 'react'
import Table from '../molecules/table'
import { TASK_COLUMN } from '@/data/table-column-data'
import { IN_PROGRESS_TASK_DATA } from '@/data/inprogress-task-data'

const InProgressTemplate = () => {
  return (
    <section className='h-full gap-3 flex flex-col'>
      <div className='h-16 w-full rounded-xl shrink-0 border border-fs-border'></div>
      <Table columns={TASK_COLUMN} data={IN_PROGRESS_TASK_DATA} />
    </section>
  )
}

export default InProgressTemplate