import { useNotes } from '../contexts/NotesContext';
import { useModal } from '../contexts/ModalContext';
import { useForm } from 'react-hook-form';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    Stack,
    Input,
    Textarea,
    Button,
} from '@chakra-ui/react';

type Note = {
    title: string,
    content: string,
}

export function AddNoteModal() {

    const { addNote } = useNotes();
    const { isOpen, handleCloseModal } = useModal();
    const { register, handleSubmit, reset, formState } = useForm();

    function onSubmit(data: Note) {
        addNote(data);
        handleCloseModal();
        reset();
    }

    return (
        <Modal isOpen={isOpen} onClose={handleCloseModal}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Add New Note</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Stack spacing="2rem" pb="2rem">
                            <Input
                                {...register("title", {
                                    required: true,
                                    minLength: 4,
                                })}
                                variant="filled"
                                placeholder="Note title"
                            />
                            <Textarea
                                {...register("content", {
                                    required: true,
                                    minLength: 12,
                                })}
                                variant="filled"
                                placeholder="Note content"
                               
                            />
                            <Button
                                w="100%"
                                color="#FFF"
                                bg="cyan.600"
                                _hover={{ bg: "cyan.700" }}
                                type="submit"
                                isLoading={formState.isSubmitting}
                            >
                                Submit
                            </Button>
                        </Stack>
                    </form>
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}