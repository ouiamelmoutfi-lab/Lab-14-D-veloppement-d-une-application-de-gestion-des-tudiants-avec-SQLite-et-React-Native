import * as SQLite from 'expo-sqlite';

export const getDBConnection = async () => {
  const database = await SQLite.openDatabaseAsync('students_database.db');
  return database;
};

export const createTable = async (db) => {
  const query = `
    CREATE TABLE IF NOT EXISTS students (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nom TEXT NOT NULL,
      prenom TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      filiere TEXT NOT NULL,
      niveau TEXT NOT NULL
    );
  `;
  await db.execAsync(query);
};
