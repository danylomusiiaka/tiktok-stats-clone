import { openDatabaseAsync } from "expo-sqlite";

const openDb = async () => {
  return await openDatabaseAsync("myDatabase.db");
};

export const createTable = async (tableName: string, columns: { name: string; type: string }[]) => {
  try {
    const db = await openDb();

    const existingTable = await db.getAllAsync(`SELECT name FROM sqlite_master WHERE type='table' and name='${tableName}'`);
    if (existingTable.length) {
      console.log("table exists:", existingTable);
      return;
    }

    const columnsDef = columns.map((col) => `${col.name} ${col.type}`).join(", ");
    const query = `CREATE TABLE ${tableName} (${columnsDef});`;
    await db.runAsync(query);
    console.log(`Table ${tableName} created successfully`);
  } catch (error) {
    console.error(error);
  }
};

export const getAllTables = async () => {
  const db = await openDb();
  const result = await db.getAllAsync(`SELECT name FROM sqlite_master WHERE type='table';`);
  console.log(result);
  return result;
};
