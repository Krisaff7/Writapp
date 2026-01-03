import React from "react";
import { Text, View, FlatList, KeyboardAvoidingView, Platform } from "react-native";
import { useNotes } from "../src/hooks/useNotes";
import { NoteForm } from "../src/components/NoteForm";
import { NoteItem } from "../src/components/NoteItem";

export default function Index() {
  const { notes, handleAddNote, handleDeleteNote } = useNotes();

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-gray-50"
    >
      <View className="p-6 pt-12">
        <Text className="text-3xl font-bold text-gray-800 mb-6">Writapp</Text>

        <NoteForm onAddNote={handleAddNote} />

        <FlatList
          data={notes}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <NoteItem note={item} onDelete={handleDeleteNote} />
          )}
          contentContainerStyle={{ paddingBottom: 100 }}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={() => (
            <View className="items-center mt-10">
              <Text className="text-gray-400">Aucune note pour le moment.</Text>
            </View>
          )}
        />
      </View>
    </KeyboardAvoidingView>
  );
}
