import Link from 'next/link'
import {
    Flex,
    Text,
    Divider,
    Tag,
} from '@chakra-ui/react'
import { useAuth } from '../hooks/useAuth'

type Note = {
    question: string;
    content: string;
    uuid: string;
    schedule?: {
        seconds: number,
        nanoseconds: number,
    }
}

interface NoteProps {
    note: Note;
}

export function Note({ note }: NoteProps) {
    const { user } = useAuth()

    return (
        <Link href={`/${user?.uid}/${note.uuid}`}>
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
}