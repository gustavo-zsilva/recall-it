import { v4 as uuid } from 'uuid'
import { useForm } from 'react-hook-form';
import { useNotes } from '../hooks/useNotes';
import { useModal } from '../hooks/useModal';
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
    Flex,
    Text,
    Divider,
    Tag,
} from '@chakra-ui/react';

type Note = {
    question: string,
    content: string,
}

export function AddNoteModal() {

    const { addNote } = useNotes()
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

                    <Flex
                        bg={"gray.700"}
                        transition=".2s"
                        flexDir="column"
                        borderRadius={4} 
                        p={4}
                        mb="2rem"
                        color="#FFF"
                        cursor="pointer"
                    >
                        <Text fontSize="1.8rem" fontWeight="bold">
                            {question}
                        </Text>
                        <Divider mt={4} />
                        <Text mt={4} bg="whiteAlpha.100" p={2} borderRadius={2} h="100%">
                            {content}
                        </Text>
                        <Text mt={4}>
                            By: {''}
                            <Tag colorScheme="whiteAlpha">You</Tag>
                        </Text>
                    </Flex>

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