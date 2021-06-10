import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { useToast } from '@chakra-ui/react';
import { api } from '../services/api'

export const NotesContext = createContext({} as NotesContextProps);

type HistoricNode = {
    answer: string,
    isCorrect: boolean,
}

type Note = {
    question: string,
    content: string,
    uuid: string,
    historic: HistoricNode[],
}

interface NotesContextProps {
    notes: Note[];
    addNote: (note: Note) => void;
    reloadNotes: () => void;
}

interface NotesProviderProps {
    children: ReactNode;
    firestoreNotes: Note[];
}

export function NotesProvider({ children, firestoreNotes }: NotesProviderProps) {

    const toast = useToast()
    const [notes, setNotes] = useState([]);

    useEffect(() => {
        setNotes(firestoreNotes);
    }, [])

    async function addNote(note: Note) {
        const response = await api.post('/notes', { data: note });
        setNotes([...notes, note]);

        if (response.status === 201) {
            return toast({
                title: response.data.message,
                position: 'top',
                status: 'success',
            })
        }
        
        toast({
            title: response.data.message,
            position: 'top',
            status: 'error',
        })
    }

    async function deleteNote() {
        
    }

    async function reloadNotes() {
        const response = await api.get('/notes')
        const notes = response.data;
        setNotes(notes)

        toast({
            title: 'Reloaded your notes.',
            position: 'top',
            status: 'success',
        })
    }

    return (
        <NotesContext.Provider
            value={{
                notes,
                addNote,
                reloadNotes,
            }}
        >
            {children}
        </NotesContext.Provider>
    )
}

export function useNotes() {
    return useContext(NotesContext);
}