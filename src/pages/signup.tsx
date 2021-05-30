import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';

import { FormEvent, useRef } from 'react';

import axios from 'axios';

import { FiUser, FiKey } from 'react-icons/fi';

import { Layout } from '../components/Layout';
import { ProviderButtons } from '../components/ProviderButtons';
import { useAuth } from '../contexts/AuthContext';

import {
  Flex,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Button,
  Stack,
  Divider,
  useToast,
} from '@chakra-ui/react';

export default function Signup() {

  const { signUpWithEmail, signInWithGoogle, isUserLoading } = useAuth();
  const toast = useToast();
  const router = useRouter();

  const emailRef = useRef<HTMLInputElement>(null);
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const passwordConfirmRef = useRef<HTMLInputElement>(null);

  async function handleSignup(event: FormEvent) {
    event.preventDefault();

    if (!emailRef.current.value || !passwordRef.current.value || !usernameRef.current.value) return;

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return toast({
        title: "Your passwords are not matching.",
        description: "Check and try again.",
        status: "error",
        position: "top",
        duration: 9000,
        isClosable: true,
      })
    }

    try {
      const userCredential = await signUpWithEmail(emailRef.current.value, passwordRef.current.value);

      const { data } = await axios.post('http://localhost:3000/api/user',{
        data: {
          name: usernameRef.current.value,
          email: userCredential.user.email,
          uid: userCredential.user.uid,
        }
      })
      
      toast({
        title: `Welcome, ${usernameRef.current.value}!`,
        description: data.message,
        status: "success",
        position: "top",
        duration: 5000,
        isClosable: true,
      })

      router.push('/');

    } catch (err) {
      console.error(err);
      
      toast({
        title: err.message,
        description: "Try signing up again.",
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
        <title>Signup | recall.it</title>
      </Head>

      <Flex gridGap="4rem" m="0 auto">

        <form onSubmit={handleSignup}>
          <Flex flexDir="column" w="25rem">
            <Heading fontFamily="Inter" mb="2rem">signup</Heading>
            <Stack spacing="2rem">
              <InputGroup>
                <InputLeftElement children={<FiUser size={24} color="#B1B0C1" />} />
                <Input
                  variant="flushed"
                  placeholder="Your email"
                  type="email"
                  isRequired
                  ref={emailRef}
                />
              </InputGroup>
              <InputGroup>
                <InputLeftElement children={<FiUser size={24} color="#B1B0C1" />} />
                <Input
                  variant="flushed"
                  placeholder="Your username"
                  type="text"
                  isRequired
                  ref={usernameRef}
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
              <InputGroup>
                <InputLeftElement children={<FiKey size={24} color="#B1B0C1" />} />
                <Input
                  variant="flushed"
                  placeholder="Confirm your password"
                  type="password"
                  isRequired
                  ref={passwordConfirmRef}
                />
              </InputGroup>
              <Button bg="cyan.600" color="#FFF" _hover={{ bg: "cyan.700" }} type="submit">Signup</Button>
            </Stack>

            <Divider m="2rem 0" />

            <ProviderButtons />
          </Flex>
        </form>

        <Flex>
          <Image width={400} height={400} src="/assets/study.svg" alt="Login" />
        </Flex>

      </Flex>
    </Layout>
  )
}