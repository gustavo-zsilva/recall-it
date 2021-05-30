import { useRouter } from 'next/router';

import { AiFillGoogleCircle, AiFillFacebook, AiFillTwitterCircle, AiFillGithub } from 'react-icons/ai';
import { Flex, Button, useToast } from '@chakra-ui/react';

import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';

export function ProviderButtons() {

  const { signInWithGoogle } = useAuth();
  const toast = useToast();
  const router = useRouter();

  async function handleSignInWithGoogle() {
    try {
      const userCredential = await signInWithGoogle();

      const { data } = await axios.post('http://localhost:3000/api/user', {
        data: {
            name: userCredential.user.displayName,
            email: userCredential.user.email,
            uid: userCredential.user.uid,
        }
      })

      toast({
        title: `Welcome, ${userCredential.user.displayName}!`,
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
    <Flex justifyContent="space-between">
        <Button p={7} display="flex" bg="#E94235" _hover={{ bg: "#ca382d" }} onClick={handleSignInWithGoogle}>
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
  )
}