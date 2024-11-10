import React, { useEffect, useState } from 'react'
import Modal from '../molecules/modal';
import ActionConfirmationModal from './action-confirmation-modal';
import { ITask, ITaskComment } from '@/models/interfaces';
import { TaskModalAction, TaskStatus } from '@/models/enums';
import { formatDateString } from '@/lib/utils';
import { useDispatch } from 'react-redux';
import { changeStatus } from '@/store/slices/workspace-slice';
import { useAppSelector } from '@/store/hooks';
import { addComments } from '@/store/slices/comments-slice';

interface ITaskModal {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    task: ITask;
    modalActions: (action: TaskModalAction) => void;
}

const TaskModal = ({ isOpen, setIsOpen, task, modalActions }: ITaskModal) => {

    const allComments = useAppSelector(state => state.comments.comments); 
    const dispatch = useDispatch();
    
    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState<TaskStatus>(task?.status as TaskStatus);
    const [comment, setComment] = useState<string>("");
    const [newStatus, setNewStatus] = useState<TaskStatus | null>(null); 
    const [comments, setComments] = useState<Array<ITaskComment>>([]);

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

    const handleAddComment = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const newComment: ITaskComment = {
            task_id: task.id,
            content: comment,
            name_of_sender: "You"
        }

        setComments(prev => [newComment, ...prev])
        dispatch(addComments(newComment));
        setComment("");
    }
    
    useEffect(() => {
        // fetch logic here
        const taskComments = allComments.filter((comment) => {
            return comment.task_id === task.id;
        })

        setComments(taskComments);
    }, [task.id]) 

    return (
        <Modal onKeyDown={handleKeyDown} isOpen={isOpen} onClose={() => setIsOpen(false)} >
            <article className='bg-fs-background p-6 text-white rounded-lg'>
                <h2 className="text-lg font-semibold text-white pb-3">{task?.name}</h2>

                <div className='flex flex-col text-[12px] gap-1'>
                    <p><strong>Labels:</strong> {task?.labels.join(", ")}</p>
                    <p><strong>Priority:</strong> {task?.priority}</p>
                    <p><strong>Created at:</strong> {task?.created_at ? formatDateString(task?.created_at as string) : "--"}</p>
                    <p><strong>Updated at:</strong> {task?.updated_at ? formatDateString(task?.updated_at as string) : "--"}</p>
                    <select onChange={(e) => handleStatusChangeRequest(e)} value={selectedStatus} className='mt-2 rounded-sm bg-[#4e4f50] text-white p-2 max-w-32'>
                        <option value={TaskStatus.IN_PROGRESS}>In Progress</option>
                        <option value={TaskStatus.OPEN}>Open</option>
                        <option value={TaskStatus.CLOSED}>Closed</option>
                    </select>
                    <p className='font-bold mt-2'>Comments:</p>
                    <div className='bg-[#4e4f50] h-40 rounded-lg p-3'>
                        <form onSubmit={handleAddComment} className='flex gap-2 w-full mb-3'>
                            <input value={comment} onChange={(e) => setComment(e.target.value)} placeholder='Add Comment Here' type='text' className='p-2 text-black w-full rounded-sm' />
                            <button type='submit' className='bg-fs-background p-2 rounded-sm shrink-0'>Add</button>
                        </form>
                        {comments.map((comment) => {
                            return (
                                <p key={comment.content}><strong>{comment.name_of_sender}:</strong> {comment.content}</p>
                            )
                        })}
                    </div>

                </div>
            </article>
            <ActionConfirmationModal onConfirm={handleConfirmChange} isOpen={isModalOpen} setIsOpen={setModalOpen} />
        </Modal >
    )
}

export default TaskModal