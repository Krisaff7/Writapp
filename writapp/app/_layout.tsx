import { Stack } from "expo-router";
import { SQLiteProvider } from "expo-sqlite";
import { initDatabase } from "../src/db/database";
import "../src/styles/global.css";


export default function RootLayout() {
  return (
    <SQLiteProvider databaseName="writapp.db" onInit={initDatabase}>
      <Stack />
    </SQLiteProvider>
  );
}

