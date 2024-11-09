import React, { useState } from 'react'
import Modal from '../molecules/modal';
import ActionConfirmationModal from './action-confirmation-modal';
import { ITask } from '@/models/interfaces';
import { TaskModalAction } from '@/models/enums';
import { formatDateString } from '@/lib/utils';

interface ITaskModal {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    task?: ITask;
    modalActions: (action: TaskModalAction) => void; 
}

const TaskModal = ({isOpen, setIsOpen, task, modalActions} : ITaskModal) => {

    const [isModalOpen, setModalOpen] = useState(false);

    const handleKeyDown = (e: KeyboardEvent) => {
        if(!isModalOpen) {
            if (e.key === 'ArrowRight') {
                modalActions(TaskModalAction.NEXT);
            } else if (e.key === 'ArrowLeft') {
                modalActions(TaskModalAction.PREV);
            }
        }
      };

    return (
        <Modal onKeyDown={handleKeyDown} isOpen={isOpen} onClose={() => setIsOpen(false)} >
            <article className='bg-fs-background p-6 rounded-lg'>
                <h2 className="text-lg font-semibold text-white pb-3">{task?.name}</h2>

                <div className='flex flex-col text-[12px] gap-1'>
                    <p className='text-white'><strong>LABELS:</strong> {task?.labels.join(", ")}</p>
                    <p className='text-white'><strong>PRIORITY:</strong> {task?.priority}</p>
                    <p className='text-white'><strong>CREATED:</strong> {task?.created_at ? formatDateString(task?.created_at as string) : "--"}</p>
                    <p className='text-white'><strong>UPDATED:</strong> {task?.updated_at ? formatDateString(task?.updated_at as string) : "--"}</p>
                </div>
                    

                <button
                    onClick={() => setModalOpen(true)}
                    className="mt-4 px-4 py-2 bg-green-500 text-white rounded"
                >
                    Open Second Modal
                </button>
            </article>
            <ActionConfirmationModal isOpen={isModalOpen} setIsOpen={setModalOpen} />
        </Modal >
    )
}

export default TaskModal