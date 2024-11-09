import React, { useState } from 'react'
import Modal from '../molecules/modal';
import ActionConfirmationModal from './action-confirmation-modal';
import { ITask } from '@/models/interfaces';
import { TaskModalAction, TaskStatus } from '@/models/enums';
import { formatDateString } from '@/lib/utils';
import { useDispatch } from 'react-redux';
import { changeStatus } from '@/store/slices/workspace-slice';

interface ITaskModal {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    task: ITask;
    modalActions: (action: TaskModalAction) => void;
}

const TaskModal = ({ isOpen, setIsOpen, task, modalActions }: ITaskModal) => {

    const dispatch = useDispatch();
    
    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState<TaskStatus>(task?.status as TaskStatus);
    const [newStatus, setNewStatus] = useState<TaskStatus | null>(null); 
    


    const handleKeyDown = (e: KeyboardEvent) => {
        if (!isModalOpen) {
            if (e.key === 'ArrowRight') {
                e.preventDefault();
                modalActions(TaskModalAction.NEXT);
            } else if (e.key === 'ArrowLeft') {
                e.preventDefault();
                modalActions(TaskModalAction.PREV);
            }
        }
    };

    const handleStatusChangeRequest = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value as TaskStatus;
        setNewStatus(value);  
        setModalOpen(true);  
    };

    const handleConfirmChange = () => {
        if (newStatus && task) {
            setSelectedStatus(newStatus);
            dispatch(changeStatus({task, newStatus}));
        }

        setNewStatus(null); 
        setModalOpen(false);
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
                    <select onChange={(e) => handleStatusChangeRequest(e)} value={selectedStatus} className='mt-2 rounded-sm bg-[#4e4f50] text-white p-2 max-w-32'>
                        <option value={TaskStatus.IN_PROGRESS}>In Progress</option>
                        <option value={TaskStatus.OPEN}>Open</option>
                        <option value={TaskStatus.CLOSED}>Closed</option>
                    </select>
                </div>
            </article>
            <ActionConfirmationModal onConfirm={handleConfirmChange} isOpen={isModalOpen} setIsOpen={setModalOpen} />
        </Modal >
    )
}

export default TaskModal