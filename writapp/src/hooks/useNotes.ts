import { useState, useEffect } from "react";
import { Alert } from "react-native";
import { useSQLiteContext } from "expo-sqlite";
import { Note, getNotes, addNote, deleteNote, updateNote } from "../db/database";

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

    const handleUpdateNote = async (id: number, title: string, content: string) => {
        if (title.trim() === "") return;
        await updateNote(db, id, title, content);
        await loadNotes();
    };

    const handleDeleteNote = async (id: number, onSuccess?: () => void) => {
        Alert.alert(
            "Supprimer la note",
            "Êtes-vous sûr de vouloir supprimer cette note ? Cette action est irréversible.",
            [
                { text: "Annuler", style: "cancel" },
                {
                    text: "Supprimer",
                    style: "destructive",
                    onPress: async () => {
                        await deleteNote(db, id);
                        await loadNotes();
                        if (onSuccess) onSuccess();
                    }
                }
            ]
        );
    };

    return {
        notes,
        isLoading,
        handleAddNote,
        handleUpdateNote,
        handleDeleteNote,
        refreshNotes: loadNotes,
    };
}
