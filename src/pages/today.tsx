import { GetServerSideProps } from "next";
import Head from 'next/head'
import { Layout } from "../components/Layout";
import { Note } from '../components/Note'
import { parseCookies } from 'nookies'
import firebase, { firestore } from '../lib/firebase'
import { Flex, Text } from '@chakra-ui/react'
import { NoteList } from "../components/NoteList";

type HistoricNode = {
  answer: string,
  isCorrect: boolean,
}

type Note = {
  question: string,
  content: string,
  uuid: string,
  historic: HistoricNode[];
  schedule: {
    seconds: number,
    nanoseconds: number,
  }
}

type TodayProps = {
  notes: Note[];
}

export default function Today({ notes }: TodayProps) {
    return (
      <Layout>
        <Head>
          <title>Today | recall.it</title>
        </Head>

        <Flex mb="1rem" border="3px solid" borderColor="pink.200" w="fit-content" p=".2rem .8rem" borderRadius="9999px" borderBottomLeftRadius="0">
          <Text fontSize="1.6rem" fontWeight="500" color="pink.200">Today</Text>
        </Flex>

        <NoteList firebaseNotes={notes} />
        
      </Layout>
    )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {

  const { ['nextauth.token']: token, ['nextauth.uid']: uid } = parseCookies(ctx)

  if (token === 'null') {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      }
    }
  }

  const currentTimestamp = firebase.firestore.Timestamp.now().toDate()
  
  const notesSnapshot = await firestore
    .collection('users')
    .doc(String(uid))
    .collection('notes')
    .where('schedule', '<=', currentTimestamp)
    .get()

  let notes: firebase.firestore.DocumentData = JSON.parse(JSON.stringify(notesSnapshot.docs.map(doc => doc.data())))
  

  return {
    props: {
      notes,
    },
  }
}