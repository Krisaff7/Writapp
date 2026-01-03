import { useState, useEffect } from "react";
import { useSQLiteContext } from "expo-sqlite";
import { Note, getNotes, addNote, deleteNote } from "../db/database";

export function useNotes() {
    const db = useSQLiteContext();
    const [notes, setNotes] = useState<Note[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const loadNotes = async () => {
        setIsLoading(true);
        try {
            const data = await getNotes(db);
            setNotes(data);
        } catch (error) {
            console.error("Failed to load notes:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadNotes();
    }, [db]);

    const handleAddNote = async (title: string, content: string) => {
        if (title.trim() === "") return;
        await addNote(db, title, content);
        await loadNotes();
    };

    const handleDeleteNote = async (id: number) => {
        await deleteNote(db, id);
        await loadNotes();
    };

    return {
        notes,
        isLoading,
        handleAddNote,
        handleDeleteNote,
        refreshNotes: loadNotes,
    };
}
