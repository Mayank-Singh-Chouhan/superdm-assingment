import React from 'react'
import Modal from '../molecules/modal'

interface IConfirmationModal {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    onConfirm: () => void;
}

const ActionConfirmationModal = ({isOpen, setIsOpen, onConfirm} : IConfirmationModal) => {
    return (
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
            <article className="bg-fs-background p-6 rounded-lg">
                <p className='text-white'>Do you confirm this action?</p>
                <div className='flex justify-end gap-3'>
                    <button onClick={() => onConfirm()} className="mt-4 px-4 py-2 bg-fs-border hover:bg-green-500 text-white rounded">
                        Proceed 
                    </button>
                    <button onClick={() => setIsOpen(false)} className="mt-4 px-4 py-2 hover:bg-red-500 bg-fs-border text-white rounded">
                        cancel 
                    </button>
                </div>
            </article>
        </Modal>
    )
}

export default ActionConfirmationModal