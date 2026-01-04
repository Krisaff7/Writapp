import React, { useEffect, useState } from "react";
import { View, StyleSheet, ActivityIndicator, TouchableOpacity } from "react-native";
import { useRouter, useLocalSearchParams, useNavigation } from "expo-router";
import { NoteForm } from "../../src/components/NoteForm";
import { useNotes } from "../../src/hooks/useNotes";
import { useSQLiteContext } from "expo-sqlite";
import { getNoteById, Note } from "../../src/db/database";
import { Ionicons } from "@expo/vector-icons";

export default function EditNote() {
    const router = useRouter();
    const navigation = useNavigation();
    const { id } = useLocalSearchParams();
    const db = useSQLiteContext();
    const { handleUpdateNote, handleDeleteNote } = useNotes();
    const [note, setNote] = useState<Note | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchNote() {
            if (id) {
                const data = await getNoteById(db, parseInt(id as string));
                setNote(data);
                setLoading(false);
            }
        }
        fetchNote();
    }, [id, db]);

    useEffect(() => {
        if (note) {
            navigation.setOptions({
                headerRight: () => (
                    <TouchableOpacity
                        onPress={() => handleDeleteNote(note.id, () => router.back())}
                        style={{ marginRight: 15 }}
                    >
                        <Ionicons name="trash-outline" size={24} color="#fff" />
                    </TouchableOpacity>
                ),
            });
        }
    }, [note, navigation]);

    const handleSubmit = async (title: string, content: string) => {
        if (title.trim() && note) {
            await handleUpdateNote(note.id, title, content);
            router.back();
        }
    };

    if (loading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color="#3b82f6" />
            </View>
        );
    }

    if (!note) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color="#3b82f6" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <NoteForm
                initialTitle={note.title}
                initialContent={note.content}
                onSubmit={handleSubmit}
                onCancel={() => router.back()}
                submitLabel="Mettre à jour"
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    centered: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});
