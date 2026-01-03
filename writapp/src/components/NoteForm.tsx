import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, Text } from "react-native";

interface NoteFormProps {
    onAddNote: (title: string, content: string) => void;
}

export function NoteForm({ onAddNote }: NoteFormProps) {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const handleSubmit = () => {
        if (title.trim() === "") return;
        onAddNote(title, content);
        setTitle("");
        setContent("");
    };

    return (
        <View className="bg-white p-4 rounded-2xl shadow-sm mb-6 border border-gray-100">
            <TextInput
                placeholder="Titre de la note"
                value={title}
                onChangeText={setTitle}
                className="text-xl font-semibold mb-2"
            />
            <TextInput
                placeholder="Contenu..."
                value={content}
                onChangeText={setContent}
                multiline
                className="text-gray-600 min-h-[80px] text-base"
                textAlignVertical="top"
            />
            <TouchableOpacity
                onPress={handleSubmit}
                className="bg-blue-600 p-3 rounded-xl mt-4 items-center"
            >
                <Text className="text-white font-bold text-lg">Ajouter une note</Text>
            </TouchableOpacity>
        </View>
    );
}
