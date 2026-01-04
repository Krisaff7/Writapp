import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Note } from "../db/database";
import { Ionicons } from "@expo/vector-icons";

interface NoteItemProps {
    note: Note;
    onPress: (note: Note) => void;
    onDelete: (id: number) => void;
}

export const NoteItem: React.FC<NoteItemProps> = ({ note, onPress, onDelete }) => {
    return (
        <TouchableOpacity
            style={styles.container}
            onPress={() => onPress(note)}
            activeOpacity={0.7}
        >
            <View style={styles.content}>
                <Text style={styles.title} numberOfLines={1}>{note.title}</Text>
                <Text style={styles.preview} numberOfLines={2}>{note.content}</Text>
                <View style={styles.dateContainer}>
                    <Ionicons name="calendar-outline" size={14} color="#9ca3af" />
                    <Text style={styles.date}>
                        {new Date(note.created_at).toLocaleDateString('fr-FR', {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric'
                        })}
                    </Text>
                </View>
            </View>
            <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => onDelete(note.id)}
            >
                <Ionicons name="trash-outline" size={20} color="#ef4444" />
            </TouchableOpacity>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#ffffff",
        borderRadius: 16,
        padding: 16,
        marginBottom: 12,
        flexDirection: "row",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 3,
        elevation: 2,
    },
    content: {
        flex: 1,
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#1f2937",
        marginBottom: 4,
    },
    preview: {
        fontSize: 14,
        color: "#6b7280",
        marginBottom: 12,
    },
    dateContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
    },
    date: {
        fontSize: 12,
        color: "#9ca3af",
        fontWeight: "500",
    },
    deleteButton: {
        padding: 8,
        marginLeft: 8,
    },
});
