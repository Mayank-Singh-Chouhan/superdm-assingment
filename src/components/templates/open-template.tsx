import { TASK_COLUMN } from '@/data/table-column-data'
import React, { useState } from 'react'
import Table from '../molecules/table'
import { OPEN_TASK_DATA } from '@/data/open-task-data'
import { ITask } from '@/models/interfaces'
import TaskModal from '../organisms/task-modal'

const OpenTemplate = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [focusTask, setFocusTask] = useState<ITask>()

  const handleRowClick = (row : ITask) => {
    setModalOpen(true);
    setFocusTask(row);
  }

  return (
    <section className='h-full gap-3 flex flex-col'>
      <div className='h-16 w-full rounded-xl shrink-0 border border-fs-border'></div>
      <Table handleRowClick={handleRowClick} columns={TASK_COLUMN} data={OPEN_TASK_DATA} />
      <TaskModal task={focusTask} isOpen={isModalOpen} setIsOpen={setModalOpen} />
    </section>
  )
}

export default OpenTemplate