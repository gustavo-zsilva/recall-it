import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

import { FiUser, FiKey } from 'react-icons/fi';

import { Layout } from '../components/Layout';
import { useAuth } from '../contexts/AuthContext';
import { ProviderButtons } from '../components/ProviderButtons';

import { useForm } from 'react-hook-form';

import { Flex, Heading, Input, InputGroup, InputLeftElement, Button, Stack, Divider, useToast, toast } from '@chakra-ui/react';

type LoginType = {
  email: string,
  password: string,
}

export default function Login() {

  const { loginWithEmail } = useAuth();
  const { register, handleSubmit, reset } = useForm();
  const toast = useToast();

  async function handleLogin(data: LoginType) {

    try {
      await loginWithEmail(data.email, data.password);

      toast({
        title: "You are now logged in!",
        description: "You can start studying without worries.",
        status: "success",
        position: "top",
        duration: 6000,
        isClosable: true,
      })

      reset()
    } catch (err) {
      console.error(err);

      toast({
        title: err.message,
        description: "Try logging in again.",
        status: "error",
        position: "top",
        duration: 9000,
        isClosable: true,
      })
    }
  }

  return (
    <Layout>
      <Head>
        <title>Login | recall.it</title>
      </Head>

      <Flex gridGap="4rem" m="0 auto">

        <form onSubmit={handleSubmit(handleLogin)}>
          <Flex flexDir="column" w="25rem">
            <Heading fontFamily="Inter" mb="2rem">login</Heading>
            <Stack spacing="2rem">
              <InputGroup>
                <InputLeftElement children={<FiUser size={24} color="#B1B0C1" />} />
                <Input
                  {...register("email")}
                  variant="flushed"
                  placeholder="Your email"
                  type="text"
                  isRequired
                />
              </InputGroup>
              <InputGroup>
                <InputLeftElement children={<FiKey size={24} color="#B1B0C1" />} />
                <Input
                  {...register("password")}
                  variant="flushed"
                  placeholder="Your password"
                  type="password"
                  isRequired
                />
              </InputGroup>
              <Button bg="cyan.600" color="#FFF" _hover={{ bg: "cyan.700" }} type="submit">Login</Button>
              <Link href="/signup">
                <Button w="fit-content" variant="link" fontWeight="light" color="cyan.600" _hover={{ color: "cyan.700", textDecor: "underline 2px" }}>
                  Don't have an account? Sign Up
                </Button>
              </Link>
            </Stack>

            <Divider m="2rem 0" />

            <ProviderButtons />
          </Flex>
        </form>

        <Flex>
          <Image width={400} height={400} src="/assets/login.svg" alt="Login" />
        </Flex>

      </Flex>
    </Layout>
  )
}