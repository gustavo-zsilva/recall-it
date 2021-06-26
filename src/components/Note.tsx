import Link from 'next/link'
import {
    Flex,
    Text,
    Divider,
    Tag,
} from '@chakra-ui/react'
import { useAuth } from '../hooks/useAuth'
import { useTheme } from '../hooks/useTheme'

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
    const { theme } = useTheme()

    return (
        <Link href={`/${user?.uid}/${note.uuid}`}>
            <Flex
                bg={theme.bg}
                transition=".2s"
                flexDir="column"
                borderRadius=".4rem"
                p="1rem"
                color="#FFF"
                cursor="pointer"
                _hover={{ bg: "pink.300" }}
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