import React from "react";
import { View, KeyboardAvoidingView, Platform, Text, TouchableOpacity, FlatList, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, useNavigation } from "expo-router";
import { useNotes } from "../src/hooks/useNotes";
import { NoteItem } from "../src/components/NoteItem";

export default function Index() {
  const router = useRouter();
  const navigation = useNavigation();
  const { notes, handleDeleteNote, refreshNotes } = useNotes();
  const [searchQuery, setSearchQuery] = React.useState("");

  // Refresh notes when screen comes into focus
  React.useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      refreshNotes();
    });
    return unsubscribe;
  }, [navigation]);

  const filteredNotes = notes.filter((note) => {
    const title = note.title || "";
    const content = note.content || "";

    const formattedDate = new Date(note.created_at).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });

    const query = searchQuery.toLowerCase();
    return (
      title.toLowerCase().includes(query) ||
      content.toLowerCase().includes(query) ||
      formattedDate.includes(searchQuery)
    );
  });

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-gray-50"
    >
      <View className="px-5 pt-4 pb-2">
        <View className="flex-row items-center bg-white rounded-2xl px-4 py-3 shadow-sm border border-gray-100">
          <Ionicons name="search-outline" size={20} color="#9ca3af" />
          <TextInput
            className="flex-1 ml-3 text-gray-700 text-base"
            placeholder="Rechercher une note..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#9ca3af"
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery("")}>
              <Ionicons name="close-circle" size={20} color="#9ca3af" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <FlatList
        data={filteredNotes}
        keyExtractor={(item) => item.id.toString()}
        keyboardShouldPersistTaps="handled"
        onScrollBeginDrag={() => { }}
        renderItem={({ item }) => (
          <NoteItem
            note={item}
            onPress={(note) => router.push({ pathname: "/edit/[id]", params: { id: note.id } })}
            onDelete={handleDeleteNote}
          />
        )}
        contentContainerStyle={{ padding: 20, paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <View className="items-center mt-20">
            <Ionicons
              name={searchQuery ? "search-outline" : "document-text-outline"}
              size={64}
              color="#d1d5db"
            />
            <Text className="text-gray-400 mt-4 text-lg italic text-center px-10">
              {searchQuery
                ? `Aucun résultat pour "${searchQuery}"`
                : "Aucune note pour le moment."}
            </Text>
          </View>
        )}
      />

      {/* Floating Action Button */}
      <TouchableOpacity
        className="absolute bottom-10 right-8 w-16 h-16 bg-blue-500 rounded-full items-center justify-center shadow-xl"
        style={{
          elevation: 5,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.3,
          shadowRadius: 4.65,
        }}
        activeOpacity={0.7}
        onPress={() => router.push("/add")}
      >
        <Ionicons name="add" size={36} color="white" />
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}
