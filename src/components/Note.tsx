import Link from 'next/link'
import {
    Flex,
    Text,
    Divider,
    Tag,
} from '@chakra-ui/react'

interface NoteProps {
    question: string;
    content: string;
}

export function Note({ question, content }: NoteProps) {
    return (
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
    )
}