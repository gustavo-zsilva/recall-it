import Head from 'next/head';
import Image from 'next/image';

import { FiUser, FiKey } from 'react-icons/fi';
import { AiFillGoogleCircle, AiFillFacebook, AiFillTwitterCircle, AiFillGithub } from 'react-icons/ai';

import { Layout } from "../components/Layout";
import { Flex, Heading, Input, InputGroup, InputLeftElement, Button, Stack, Divider } from '@chakra-ui/react';

export default function Signup() {
  return (
    <Layout>
      <Head>
        <title>Signup | recall.it</title>
      </Head>

      <Flex gridGap="4rem" m="0 auto">

        <Flex flexDir="column" w="25rem">
          <Heading fontFamily="Inter" mb="2rem">signup</Heading>
          <Stack spacing="2rem">
            <InputGroup>
              <InputLeftElement children={<FiUser size={24} color="#B1B0C1" />} />
              <Input variant="flushed" placeholder="Your email or username" type="text" />
            </InputGroup>
            <InputGroup>
              <InputLeftElement children={<FiKey size={24} color="#B1B0C1" />} />
              <Input variant="flushed" placeholder="Your password" type="password" />
            </InputGroup>
            <InputGroup>
              <InputLeftElement children={<FiKey size={24} color="#B1B0C1" />} />
              <Input variant="flushed" placeholder="Confirm your password" type="password" />
            </InputGroup>
            <Button bg="cyan.600" color="#FFF" _hover={{ bg: "cyan.700" }} type="submit">Signup</Button>
          </Stack>

          <Divider m="2rem 0" />

          <Flex justifyContent="space-between">
            <Button p={7} display="flex" bg="#E94235" _hover={{ bg: "#ca382d" }}>
              <AiFillGoogleCircle size={32} color="#FFF"/>
            </Button>
            <Button p={7} colorScheme="facebook">
              <AiFillFacebook size={32} />
            </Button>
            <Button p={7} colorScheme="twitter">
              <AiFillTwitterCircle size={32} />
            </Button>
            <Button p={7} bg="#2D3748" _hover={{ bg: "#1d2430" }}>
              <AiFillGithub size={32} color="#FFF" />
            </Button>
          </Flex>
        </Flex>

        <Flex>
          <Image width={400} height={400} src="/assets/login.svg" alt="Login" />
        </Flex>

      </Flex>
    </Layout>
  )
}