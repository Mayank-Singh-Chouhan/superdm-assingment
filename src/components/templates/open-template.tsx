import { TASK_COLUMN } from '@/data/table-column-data'
import React from 'react'
import Table from '../molecules/table'
import { OPEN_TASK_DATA } from '@/data/open-task-data'

const OpenTemplate = () => {
  return (
    <section className='h-full gap-3 flex flex-col'>
      <div className='h-16 w-full rounded-xl shrink-0 border border-fs-border'></div>
      <Table columns={TASK_COLUMN} data={OPEN_TASK_DATA} />
    </section>
  )
}

export default OpenTemplate