import { createContext, ReactNode, useContext, useState } from 'react';
import { useDisclosure } from '@chakra-ui/react';

export const ModalContext = createContext({} as ModalContextProps);

interface ModalContextProps {
    isOpen: boolean;
    handleOpenModal: () => void;
    handleCloseModal: () => void;
}

interface ModalProviderProps {
    children: ReactNode;
}

export function ModalProvider({ children }: ModalProviderProps) {

    const { isOpen, onClose, onOpen } = useDisclosure();

    function handleOpenModal() {
        onOpen();
    }

    function handleCloseModal() {
        onClose();
    }

    return (
        <ModalContext.Provider
            value={{
                isOpen,
                handleOpenModal,
                handleCloseModal,
            }}
        >
            {children}
        </ModalContext.Provider>
    )
}
