import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Alert } from "react-native";

interface NoteFormProps {
    initialTitle?: string;
    initialContent?: string;
    onSubmit: (title: string, content: string) => void;
    onCancel: () => void;
    submitLabel: string;
}

export const NoteForm: React.FC<NoteFormProps> = ({
    initialTitle = "",
    initialContent = "",
    onSubmit,
    onCancel,
    submitLabel,
}) => {
    const [title, setTitle] = useState(initialTitle);
    const [content, setContent] = useState(initialContent);

    const handleSub = () => {
        if (title.trim() === "") {
            Alert.alert("Erreur", "Le titre ne peut pas être vide.");
            return;
        }
        onSubmit(title, content);
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.titleInput}
                placeholder="Titre de la note"
                value={title}
                onChangeText={setTitle}
                placeholderTextColor="#9ca3af"
            />
            <TextInput
                style={styles.contentInput}
                placeholder="Commencez à écrire..."
                value={content}
                onChangeText={setContent}
                multiline
                textAlignVertical="top"
                placeholderTextColor="#9ca3af"
            />

            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={[styles.button, styles.cancelButton]}
                    onPress={onCancel}
                >
                    <Text style={styles.cancelButtonText}>Annuler</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.button, styles.submitButton]}
                    onPress={handleSub}
                >
                    <Text style={styles.submitButtonText}>{submitLabel}</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    titleInput: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
        color: "#1f2937",
    },
    contentInput: {
        flex: 1,
        fontSize: 18,
        color: "#4b5563",
        lineHeight: 28,
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "flex-end",
        gap: 12,
        marginTop: 20,
        paddingBottom: 20,
    },
    button: {
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 12,
        alignItems: "center",
        justifyContent: "center",
    },
    cancelButton: {
        backgroundColor: "#f3f4f6",
    },
    cancelButtonText: {
        color: "#4b5563",
        fontWeight: "600",
    },
    submitButton: {
        backgroundColor: "#3b82f6",
    },
    submitButtonText: {
        color: "#ffffff",
        fontWeight: "600",
    },
});
