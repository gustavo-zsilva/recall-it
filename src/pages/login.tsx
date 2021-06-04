import Head from 'next/head';
import Image from 'next/image';

import { FormEvent, useRef } from 'react';

import { FiUser, FiKey } from 'react-icons/fi';

import { Layout } from '../components/Layout';
import { useAuth } from '../contexts/AuthContext';
import { ProviderButtons } from '../components/ProviderButtons';

import { useForm } from 'react-hook-form';

import { Flex, Heading, Input, InputGroup, InputLeftElement, Button, Stack, Divider, useToast, toast } from '@chakra-ui/react';

export default function Login() {

  const { loginWithEmail } = useAuth();
  const toast = useToast();

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  async function handleLogin(event: FormEvent) {
    event.preventDefault();

    if (!emailRef.current.value || !passwordRef.current.value) return;

    try {
      await loginWithEmail(emailRef.current.value, passwordRef.current.value);

      toast({
        title: "You are now logged in!",
        description: "You can start studying without worries.",
        status: "success",
        position: "top",
        duration: 6000,
        isClosable: true,
      })
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

        <form onSubmit={handleLogin}>
          <Flex flexDir="column" w="25rem">
            <Heading fontFamily="Inter" mb="2rem">login</Heading>
            <Stack spacing="2rem">
              <InputGroup>
                <InputLeftElement children={<FiUser size={24} color="#B1B0C1" />} />
                <Input
                  variant="flushed"
                  placeholder="Your email or username"
                  type="text"
                  isRequired
                  ref={emailRef}
                />
              </InputGroup>
              <InputGroup>
                <InputLeftElement children={<FiKey size={24} color="#B1B0C1" />} />
                <Input
                  variant="flushed"
                  placeholder="Your password"
                  type="password"
                  isRequired
                  ref={passwordRef}
                />
              </InputGroup>
              <Button bg="cyan.600" color="#FFF" _hover={{ bg: "cyan.700" }} type="submit">Login</Button>
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