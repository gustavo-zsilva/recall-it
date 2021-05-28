import { Box, Flex, Text, Divider, Tag } from '@chakra-ui/react';

export function CardList() {
    return (
        <Box display="grid" gridTemplateColumns="repeat(3, 1fr)" gridGap="2rem">
            <Flex flexDir="column" borderRadius={4} p={4} bg="gray.700" color="#FFF" cursor="pointer">
                <Text fontSize="1.8rem" fontWeight="bold">
                    Testing ChakraUI
                </Text>
                <Divider mt={4} />
                <Text mt={4} bg="whiteAlpha.100" p={2} borderRadius={2}>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. {''}
                    Incidunt vitae eos sit ipsum deserunt consequuntur quo molestiae {''}
                    exercitationem nesciunt magnam id rem temporibus, {''}
                    cumque aspernatur sunt! Officiis quidem neque ipsum.
                </Text>
                <Text mt={4}>
                    By: {''}
                    <Tag colorScheme="whiteAlpha">ChakraUI</Tag>
                </Text>
            </Flex>
        </Box>
    )
}