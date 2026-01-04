import React from "react";
import { View, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { NoteForm } from "../src/components/NoteForm";
import { useNotes } from "../src/hooks/useNotes";

export default function AddNote() {
    const router = useRouter();
    const { handleAddNote } = useNotes();

    const handleSubmit = async (title: string, content: string) => {
        if (title.trim()) {
            await handleAddNote(title, content);
            router.back();
        }
    };

    return (
        <View style={styles.container}>
            <NoteForm
                onSubmit={handleSubmit}
                onCancel={() => router.back()}
                submitLabel="Enregistrer"
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffffff",
    },
});
