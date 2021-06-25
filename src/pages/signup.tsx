import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { api } from '../services/api';

import { FiUser, FiKey } from 'react-icons/fi';

import { Layout } from '../components/Layout';
import { ProviderButtons } from '../components/ProviderButtons';
import { useAuth } from '../hooks/useAuth';

import { useForm } from 'react-hook-form';

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

type SignupType = {
  email: string,
  username: string,
  password: string,
  passwordConfirm: string,
}

export default function Signup() {

  const { signUpWithEmail, signInWithGoogle, isUserLoading } = useAuth();
  const toast = useToast();
  const router = useRouter();
  const { register, handleSubmit, reset } = useForm();

  async function handleSignup({ email, username, password, passwordConfirm }: SignupType) {

    if (password !== passwordConfirm) {
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
      const userCredential = await signUpWithEmail(email, password);

      const { data } = await api.post('http://localhost:3000/api/user', {
        data: {
          name: username,
          email: userCredential.user.email,
          uid: userCredential.user.uid,
        }
      })
      
      toast({
        title: `Welcome, ${username}!`,
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
    <Flex gridGap="4rem" maxW="80rem" h="100vh" m="auto" justifyContent="center" alignItems="center">

      <Head>
        <title>Signup | recall.it</title>
      </Head>

      <form onSubmit={handleSubmit(handleSignup)}>
        <Flex flexDir="column" w="25rem">
          <Heading fontFamily="Inter" mb="2rem">signup</Heading>
          <Stack spacing="2rem">
            <InputGroup>
              <InputLeftElement children={<FiUser size={24} color="#B1B0C1" />} />
              <Input
                {...register("email")}
                variant="flushed"
                placeholder="Your email"
                type="email"
                isRequired
              />
            </InputGroup>
            <InputGroup>
              <InputLeftElement children={<FiUser size={24} color="#B1B0C1" />} />
              <Input
                {...register("username")}
                variant="flushed"
                placeholder="Your username"
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
            <InputGroup>
              <InputLeftElement children={<FiKey size={24} color="#B1B0C1" />} />
              <Input
                {...register("passwordConfirm")}
                variant="flushed"
                placeholder="Confirm your password"
                type="password"
                isRequired
              />
            </InputGroup>
            <Button bg="cyan.600" color="#FFF" _hover={{ bg: "cyan.700" }} type="submit">Signup</Button>
            <Link href="/login">
              <Button w="fit-content" variant="link" fontWeight="light" color="cyan.600" _hover={{ color: "cyan.700", textDecor: "underline 2px" }}>
                Already have an account? Login
              </Button>
            </Link>
          </Stack>

          <Divider m="2rem 0" />

          <ProviderButtons />
        </Flex>
      </form>

      <Flex>
        <Image width={400} height={400} src="/assets/study.svg" alt="Login" />
      </Flex>

    </Flex>
  )
}