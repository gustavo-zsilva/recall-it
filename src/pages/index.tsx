import Head from 'next/head';
import { GetServerSideProps } from 'next';

import { NotesProvider } from '../contexts/NotesContext';
import { ModalProvider } from '../contexts/ModalContext';

import { AddNoteButton } from '../components/AddNoteButton';
import { NoteList } from '../components/NoteList';
import { Layout } from '../components/Layout';
import { AddNoteModal } from '../components/AddNoteModal';

import { parseCookies } from 'nookies';
import { getAPIClient } from '../services/axios';

type Note = {
  question: string,
  content: string,
}

interface HomeProps {
  notes: Note[],
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
        </Layout>
      </ModalProvider>
    </NotesProvider>
  ) 
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {

  const apiClient = getAPIClient(ctx);
  const { ['nextauth.token']: token } = parseCookies(ctx);
  
  if (token === 'null') {
    return {
      redirect: {
        destination: '/signup',
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