import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Note } from "../db/database";

interface NoteItemProps {
    note: Note;
    onDelete: (id: number) => void;
}

export function NoteItem({ note, onDelete }: NoteItemProps) {
    return (
        <View className="bg-white p-4 rounded-xl mb-3 shadow-sm border border-gray-100 flex-row justify-between items-center">
            <View className="flex-1">
                <Text className="text-lg font-bold text-gray-800">{note.title}</Text>
                {note.content ? <Text className="text-gray-500 mt-1">{note.content}</Text> : null}
                <Text className="text-gray-400 text-xs mt-2">
                    {new Date(note.created_at).toLocaleDateString()}
                </Text>
            </View>
            <TouchableOpacity
                onPress={() => onDelete(note.id)}
                className="bg-red-50 p-2 rounded-lg"
            >
                <Text className="text-red-500 font-medium">Supprimer</Text>
            </TouchableOpacity>
        </View>
    );
}
