import { ReactNode, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import FocusLock from 'react-focus-lock';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  onKeyDown?: (event : KeyboardEvent) => void;
}

export default function Modal({ isOpen, onClose, children, onKeyDown }: ModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

  // Close modal on pressing the Escape key
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
      if (onKeyDown) {
        onKeyDown(event);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Close modal on clicking outside of the modal content
  const handleClickOutside = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === overlayRef.current) onClose();
  };

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div
      ref={overlayRef}
      onClick={handleClickOutside}
      className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-black bg-opacity-50 z-50"
    >
      <FocusLock>
        <div className="bg-fs-border backdrop-blur-lg relative p-8 rounded-xl shadow-lg min-w-[32rem] max-w-full overflow-y-auto">
          {children}
          <button
            onClick={onClose}
            className="absolute top-2 right-2 rounded bg-fs-background hover:bg-red-500"
          >
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="m336-280 144-144 144 144 56-56-144-144 144-144-56-56-144 144-144-144-56 56 144 144-144 144 56 56ZM200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm0-560v560-560Z"/></svg>
          </button>
        </div>
      </FocusLock>
    </div>,
    document.body
  );
}

