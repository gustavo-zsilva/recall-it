import { useEffect, useState } from "react";

import { useToast } from "@chakra-ui/react";
import { api } from "../services/api";

type HistoricNode = {
    answer: string,
    isCorrect: boolean,
}

type Note = {
    question: string;
    content: string;
    uuid: string;
    historic: HistoricNode[];
    schedule?: {
        seconds: number,
        nanoseconds: number,
    }
}

export function useNotes(firebaseNotes?: Note[]) {
    const [notes, setNotes] = useState(() => firebaseNotes);
    const toast = useToast()

    async function addNote(note: Note) {
        const response = await api.post('/notes', { data: note });
        setNotes([...notes ?? [], note]);

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

    async function reloadNotes() {
        const response = await api.get('/notes')
        const newNotes = response.data;
        setNotes(newNotes)

        toast({
            title: 'Reloaded your notes.',
            position: 'top',
            status: 'success',
        })
    }

    return { notes, addNote, reloadNotes }
}