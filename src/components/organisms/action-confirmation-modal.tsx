import React from 'react'
import Modal from '../molecules/modal'

interface IConfirmationModal {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ActionConfirmationModal = ({isOpen, setIsOpen} : IConfirmationModal) => {
    return (
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
            <h2 className="text-lg font-semibold">Second Modal</h2>
            <p>This is the second modal content.</p>
        </Modal>
    )
}

export default ActionConfirmationModal