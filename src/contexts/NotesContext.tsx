import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import { useToast } from '@chakra-ui/react';
import axios from 'axios';

export const NotesContext = createContext({} as NotesContextProps);

type Note = {
    title: string,
    content: string,
}

interface NotesContextProps {
    notes: Note[];
    addNote: (note: Note) => void;
}

interface NotesProviderProps {
    children: ReactNode;
    firestoreNotes: Note[];
}

export function NotesProvider({ children, firestoreNotes }: NotesProviderProps) {

    const toast = useToast()
    const { user } = useAuth();
    const [notes, setNotes] = useState([]);

    useEffect(() => {
        setNotes(firestoreNotes);
    }, [])

    async function addNote(note: Note) {
        const response = await axios.post('http://localhost:3000/api/notes',
            { data: note },
            { params: { uid: user.uid } });
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

    return (
        <NotesContext.Provider
            value={{
                notes,
                addNote,
            }}
        >
            {children}
        </NotesContext.Provider>
    )
}

export function useNotes() {
    return useContext(NotesContext);
}