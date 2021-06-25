import { GetServerSideProps } from "next";
import Head from 'next/head'
import { Layout } from "../components/Layout";
import { Note } from '../components/Note'
import { parseCookies } from 'nookies'
import firebase, { firestore } from '../lib/firebase'
import { Box } from '@chakra-ui/react'

type Note = {
  question: string,
  content: string,
  uuid: string,
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

        <Box display="grid" gridTemplateColumns="repeat(3, 1fr)" gridGap="2rem">
          { notes.map(note => (
            <Note note={note} />
          )) }
        </Box>
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

  const currentTimestamp = firebase.firestore.Timestamp.now()
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