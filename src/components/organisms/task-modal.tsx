import React, { useState } from 'react'
import Modal from '../molecules/modal';
import ActionConfirmationModal from './action-confirmation-modal';
import { ITask } from '@/models/interfaces';

interface ITaskModal {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    task?: ITask;
}

const TaskModal = ({isOpen, setIsOpen, task} : ITaskModal) => {

    const [isModalOpen, setModalOpen] = useState(false);

    return (
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} >
            <h2 className="text-lg font-semibold text-white">{task?.name}</h2>
            <p className='text-white'>{task?.labels.join(", ")}</p>
            <button
                onClick={() => setModalOpen(true)}
                className="mt-4 px-4 py-2 bg-green-500 text-white rounded"
            >
                Open Second Modal
            </button>
            <ActionConfirmationModal isOpen={isModalOpen} setIsOpen={setModalOpen} />
        </Modal >
    )
}

export default TaskModal