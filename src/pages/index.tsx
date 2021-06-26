import Head from 'next/head';
import { GetServerSideProps } from 'next';

import { NoteList } from '../components/NoteList';
import { Layout } from '../components/Layout';

import { parseCookies } from 'nookies';
import { getAPIClient } from '../services/axios';

import { Flex, Text } from '@chakra-ui/react'

type HistoricNode = {
  answer: string,
  isCorrect: boolean,
}

type Note = {
  question: string,
  content: string,
  uuid: string,
  historic: HistoricNode[],
  // schedule: Date,
}

interface HomeProps {
  notes: Note[],
}

export default function Home({ notes }: HomeProps) {
  return (
    <Layout>
      <Head>
        <title>recall.it</title>
      </Head>

      <Flex mb="1rem" border="3px solid" borderColor="pink.200" w="fit-content" p=".2rem .8rem" borderRadius="9999px" borderBottomLeftRadius="0">
        <Text fontSize="1.6rem" fontWeight="500" color="pink.200">Revise</Text>
      </Flex>

      <NoteList firebaseNotes={notes} />
      
    </Layout>
  ) 
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {

  const apiClient = getAPIClient(ctx);
  const { ['nextauth.token']: token } = parseCookies(ctx);
  
  if (!token) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      }
    }
  }
  
  const response = await apiClient.get('/notes');
  const notes = response.data;

  return {
    props: {
      notes,
    }
  }
}