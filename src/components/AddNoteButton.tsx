import { FiPlus } from 'react-icons/fi';
import { Flex, Button } from '@chakra-ui/react';
import { useModal } from '../contexts/ModalContext';

export function AddNoteButton() {

    const { handleOpenModal } = useModal();

    return (
        <Flex pos="fixed" bottom="4rem" alignSelf="flex-end">
            <Button
                borderRadius="50%"
                w="3.8rem"
                h="3.8rem"
                bg="cyan.700"
                _hover={{ bg: "cyan.600" }}
                boxShadow="0 0 6px 6px #00000012"
                onClick={handleOpenModal}
            >
                <FiPlus size={32} color="#FFF" />
            </Button>
        </Flex>
    )
}