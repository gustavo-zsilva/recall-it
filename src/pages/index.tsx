import Head from 'next/head';
import { GetServerSideProps } from 'next';

import { NotesProvider } from '../contexts/NotesContext';
import { ModalProvider } from '../contexts/ModalContext';

import { AddNoteButton } from '../components/AddNoteButton';
import { NoteList } from '../components/NoteList';
import { Layout } from '../components/Layout';
import { AddNoteModal } from '../components/AddNoteModal';

import axios from 'axios';

interface HomeProps {
  notes: [],
}

export default function Home({ notes }: HomeProps) {
  return (
    <NotesProvider firestoreNotes={notes}>
      <ModalProvider>
        <Layout>
          <Head>
            <title>recall.it</title>
          </Head>

          <NoteList />

          <AddNoteModal />

          <AddNoteButton />
        </Layout>
      </ModalProvider>
    </NotesProvider>
  ) 
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {

  const { token, uid } = req.cookies;

  if (token == null) {
    return {
      redirect: {
        statusCode: 302,
        destination: '/signup',
        permanent: false,
      }
    }
  }

  const response = await axios.get('http://localhost:3000/api/notes', { params: { uid } });
  const notes = response.data;

  return {
    props: {
      notes,
    }
  }
}