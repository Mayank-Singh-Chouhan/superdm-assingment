import React, { useState } from 'react'
import Table from '../molecules/table'
import { TASK_COLUMN } from '@/data/table-column-data';
import { CLOSED_TASK_DATA } from '@/data/closed-task-data';
import TaskModal from '../organisms/task-modal';
import { ITask } from '@/models/interfaces';

const CloseTemplate = () => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [focusTask, setFocusTask] = useState<ITask>()

    const handleRowClick = (row: ITask) => {
        setModalOpen(true);
        setFocusTask(row);
    }

    return (
        <section className='h-full gap-3 flex flex-col'>
            <div className='h-16 w-full rounded-xl shrink-0 border border-fs-border'></div>
            <Table handleRowClick={handleRowClick} columns={TASK_COLUMN} data={CLOSED_TASK_DATA} />
            <TaskModal task={focusTask as ITask} isOpen={isModalOpen} setIsOpen={setModalOpen} />
        </section>
    )
}

export default CloseTemplate