import React, { useState } from 'react'
import Table from '../molecules/table'
import { TASK_COLUMN } from '@/data/table-column-data'
import { ITask } from '@/models/interfaces'
import TaskModal from '../organisms/task-modal'
import { TaskModalAction } from '@/models/enums'
import { useAppSelector } from '@/store/hooks'

const InProgressTemplate = () => {
  const IN_PROGRESS_TASK_DATA = useAppSelector(state => state.workspaces.inprogress);

  const [isModalOpen, setModalOpen] = useState(false);
  const [focusTask, setFocusTask] = useState<ITask>()
  const [focusTaskIdx, setFocusTaskIdx] = useState<number>(-1);

  const handleRowClick = (row : ITask, index: number) => {
    setModalOpen(true);
    setFocusTask(row);
    setFocusTaskIdx(index)
  }

  const modalActions = (action : TaskModalAction) => {
    if(action == TaskModalAction.NEXT) {
      setFocusTaskIdx(prev => (prev + 1) % IN_PROGRESS_TASK_DATA.length);
      setFocusTask(IN_PROGRESS_TASK_DATA[focusTaskIdx]);
    } else if(action == TaskModalAction.PREV) {
      setFocusTaskIdx(prev => prev === 0 ? IN_PROGRESS_TASK_DATA.length - 1 : prev - 1 );
      setFocusTask(IN_PROGRESS_TASK_DATA[focusTaskIdx]);
    }
  }

  return (
    <section className='h-full gap-3 flex flex-col'>
      <div className='h-16 w-full rounded-xl shrink-0 border border-fs-border'></div>
      <Table handleRowClick={handleRowClick} columns={TASK_COLUMN} data={IN_PROGRESS_TASK_DATA} />
      <TaskModal modalActions={modalActions} task={focusTask} isOpen={isModalOpen} setIsOpen={setModalOpen} />
    </section>
  )
}

export default InProgressTemplate