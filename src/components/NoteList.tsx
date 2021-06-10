import Link from 'next/link'

import { Box, Text, Flex, Divider, Tag } from '@chakra-ui/react';
import { useNotes } from '../contexts/NotesContext';
import { Note } from './Note';
import { useAuth } from '../contexts/AuthContext';

export function NoteList() {

    const { notes } = useNotes();
    const { user } = useAuth();

    return (
        <Box display="grid" gridTemplateColumns="repeat(3, 1fr)" gridGap="2rem">
            {notes.length === 0 && <Text>You don't have any notes yet.</Text>}

            {notes.map(note => {
                // const [isSelected, setIsSelected] = useState(false);
                return (
                    <Link href={`/${user?.uid}/${note.uuid}`} key={note.uuid}>
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
                                {note.question}
                            </Text>
                            <Divider mt={4} />
                            <Text mt={4} bg="whiteAlpha.100" p={2} borderRadius={2} h="100%">
                                {note.content}
                            </Text>
                            <Text mt={4}>
                                By: {''}
                                <Tag colorScheme="whiteAlpha">You</Tag>
                            </Text>
                        </Flex>
                    </Link>

                )
            })}
        </Box>
    )
}