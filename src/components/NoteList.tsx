import Link from 'next/link'

import { Box, Text, Flex, Divider, Tag } from '@chakra-ui/react';
import { useNotes } from '../hooks/useNotes';
import { useAuth } from '../hooks/useAuth';
import { Note } from './Note';

type HistoricNode = {
    answer: string,
    isCorrect: boolean,
}

type Note = {
    question: string;
    content: string;
    uuid: string;
    historic: HistoricNode[];
    schedule?: {
        seconds: number,
        nanoseconds: number,
    }
}

type NoteListProps = {
    firebaseNotes: Note[];
}

export function NoteList({ firebaseNotes }: NoteListProps) {

    const { notes } = useNotes(firebaseNotes);

    return (
        <Box display="grid" gridTemplateColumns="repeat(3, 1fr)" gridGap="2rem">
            {notes.length === 0 && <Text>You don't have any notes yet.</Text>}

            {notes.map(note => {
                return (
                    <Note key={note.uuid} note={note} />
                )
            })}
        </Box>
    )
}