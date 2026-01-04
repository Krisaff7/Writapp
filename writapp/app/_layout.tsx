import { Stack } from "expo-router";
import { SQLiteProvider } from "expo-sqlite";
import { initDatabase } from "../src/db/database";
import "../src/styles/global.css";


export default function RootLayout() {
  return (
    <SQLiteProvider databaseName="writapp.db" onInit={initDatabase}>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: "#3b82f6",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          headerTitleAlign: "center",
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            title: "Writapp",
          }}
        />
        <Stack.Screen
          name="add"
          options={{
            title: "Nouvelle note",
          }}
        />
        <Stack.Screen
          name="edit/[id]"
          options={{
            title: "Modifier la note",
          }}
        />
      </Stack>
    </SQLiteProvider>
  );
}

