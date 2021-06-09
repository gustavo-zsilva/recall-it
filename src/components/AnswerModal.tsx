import { useModal } from '../contexts/ModalContext'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
} from '@chakra-ui/react'

export function AnswerModal() {

    const { isOpen, handleCloseModal } = useModal()

    return (
        <Modal isOpen={isOpen} onClose={handleCloseModal}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>What's the answer to this question?</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}