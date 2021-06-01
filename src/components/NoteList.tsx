import { Box, Flex, Text, Divider, Tag, Skeleton } from '@chakra-ui/react';
import { useNotes } from '../contexts/NotesContext';

export function NoteList() {

    const { notes } = useNotes();

    return (
        <Box display="grid" gridTemplateColumns="repeat(3, 1fr)" gridGap="2rem">
            {notes.map(note => {
                return (
                    <Flex key={note.title} flexDir="column" borderRadius={4} p={4} bg="gray.700" color="#FFF" cursor="pointer">
                        <Text fontSize="1.8rem" fontWeight="bold">
                            {note.title}
                        </Text>
                        <Divider mt={4} />
                        <Text mt={4} bg="whiteAlpha.100" p={2} borderRadius={2} h="100%">
                            {note.content}
                        </Text>
                        <Text mt={4}>
                            By: {''}
                            <Tag colorScheme="whiteAlpha">ChakraUI</Tag>
                        </Text>
                    </Flex>
                )
            })}
        </Box>
    )
}