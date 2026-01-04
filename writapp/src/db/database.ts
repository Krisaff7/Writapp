import * as SQLite from 'expo-sqlite';

export interface Note {
    id: number;
    title: string;
    content: string;
    created_at: string;
}

export async function initDatabase(db: SQLite.SQLiteDatabase) {
    await db.execAsync(`
    PRAGMA journal_mode = WAL;
    CREATE TABLE IF NOT EXISTS notes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      content TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);
}


export async function getNotes(db: SQLite.SQLiteDatabase): Promise<Note[]> {
    return await db.getAllAsync<Note>('SELECT * FROM notes ORDER BY created_at DESC');
}

export async function addNote(db: SQLite.SQLiteDatabase, title: string, content: string) {
    await db.runAsync('INSERT INTO notes (title, content) VALUES (?, ?)', [title, content]);
}

export async function deleteNote(db: SQLite.SQLiteDatabase, id: number) {
    await db.runAsync('DELETE FROM notes WHERE id = ?', [id]);
}

export async function getNoteById(db: SQLite.SQLiteDatabase, id: number): Promise<Note | null> {
    return await db.getFirstAsync<Note>('SELECT * FROM notes WHERE id = ?', [id]);
}

export async function updateNote(db: SQLite.SQLiteDatabase, id: number, title: string, content: string) {
    await db.runAsync('UPDATE notes SET title = ?, content = ? WHERE id = ?', [title, content, id]);
}
