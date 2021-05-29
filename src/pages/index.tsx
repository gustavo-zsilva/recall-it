import Head from 'next/head'
import Image from 'next/image'
import { Header } from '../components/Header';
import { CardList } from '../components/CardList';
import { FiPlus } from 'react-icons/fi';
import { Box, Flex, Text, Divider, Tag, Button } from '@chakra-ui/react';
import { Layout } from '../components/Layout';

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>recall.it</title>
      </Head>

      <CardList />

      <Flex pos="absolute" bottom="4rem" right={0}>
        <Button borderRadius="50%" w="3.8rem" h="3.8rem" bg="cyan.700" _hover={{ bg: "cyan.600" }} boxShadow="0 0 6px 6px #00000012">
          <FiPlus size={32} color="#FFF" />
        </Button>
      </Flex>
    </Layout>
  ) 
}
