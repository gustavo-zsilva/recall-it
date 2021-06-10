import { v4 as uuid } from 'uuid'
import { useForm } from 'react-hook-form';
import { useNotes } from '../contexts/NotesContext';
import { useModal } from '../contexts/ModalContext';
import { Note } from './Note';
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
    question: string,
    content: string,
}

export function AddNoteModal() {

    const { addNote } = useNotes();
    const { isOpen, handleCloseModal } = useModal();
    const { register, handleSubmit, reset, watch, formState } = useForm();

    const question = watch("question", "")
    const content = watch("content", "")

    function onSubmit({ question, content }: Note) {
        const note = {
            question,
            content,
            uuid: uuid(),
            historic: [],
        }
        addNote(note);
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

                    <Note
                        question={question}
                        content={content}
                    />

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Stack spacing="2rem" pb="2rem">
                            <Input
                                {...register("question", {
                                    required: true,
                                    minLength: 4,
                                })}
                                variant="filled"
                                placeholder="Question"
                            />
                            <Textarea
                                {...register("content", {
                                    required: true,
                                    minLength: 12,
                                })}
                                variant="filled"
                                placeholder="Content (Answer)"
                               
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