import Head from 'next/head'
import Image from 'next/image'
import { Header } from '../components/Header';
import { Box, Flex, Text, Divider, Tag } from '@chakra-ui/react';

export default function Home() {
  return (
    <Flex maxW="80rem" m="auto" flexDir="column" transition=".2s">
      <Head>
        <title>Recall.it</title>
      </Head>

      <Header />

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

        <Flex flexDir="column" borderRadius={4} p={4} bg="gray.700" color="#FFF" cursor="pointer">
          <Text fontSize="1.8rem" fontWeight="bold">Testing ChakraUI</Text>
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

        <Flex flexDir="column" borderRadius={4} p={4} bg="cyan.700" color="#FFF" cursor="pointer" transition=".2s" _hover={{ transform: 'scale(1.05)' }}>
          <Text fontSize="1.8rem" fontWeight="bold">Testing ChakraUI</Text>
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
    </Flex>
  ) 
}
