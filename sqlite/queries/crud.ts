import { openDatabaseAsync } from "expo-sqlite";
import { getAllTables } from "./table_crud";

const openDb = async () => {
  return await openDatabaseAsync("myDatabase.db");
};

export const insertInto = async (tableName: string, obj: Record<string, string>) => {
  const db = await openDb();
  const id = obj.id;

  if (!id) {
    throw new Error("The object must contain an 'id' field.");
  }

  // Check if the row with the given id exists
  const existingRow = await db.getFirstAsync(`SELECT * FROM ${tableName} WHERE id = '${id}'`);

  if (existingRow) {
    // Update the existing row
    const updateFields = Object.keys(obj)
      .filter((key) => key !== "id")
      .map((key) => `${key} = ?`)
      .join(", ");
    const updateValues = Object.keys(obj)
      .filter((key) => key !== "id")
      .map((key) => obj[key]);

    await db.runAsync(`UPDATE ${tableName} SET ${updateFields} WHERE id = '${id}'`, [...updateValues]);
  } else {
    // Insert a new row
    const nameOfValues = Object.keys(obj).join(", ");
    const countInsertions = Object.keys(obj)
      .map(() => "?")
      .join(", ");
    const paramsOfValues = Object.values(obj);
    await db.runAsync(`INSERT INTO ${tableName} (${nameOfValues}) VALUES (${countInsertions})`, paramsOfValues);
  }
};

export const getRowById = async (tableName: string, id: string) => {
  const db = await openDb();
  const specificRow = await db.getFirstAsync(`SELECT * FROM ${tableName} WHERE id = '${id}'`);
  return specificRow;
};

export const getAllRows = async (tableName: string) => {
  const db = await openDb();
  const allRows = await db.getAllAsync(`SELECT * FROM ${tableName}`);
  if (allRows.length == 0) console.log("no data!");
  // for (const row of allRows) {
  //   console.log(row);
  // }
  return allRows;
};

export const deleteAllRows = async (tableName: string) => {
  const db = await openDb();
  await db.runAsync(`DROP TABLE ${tableName}`);
};

export const deleteRowById = async (id: string) => {
  try {
    const db = await openDb();
    const tables = (await getAllTables()) as Record<string, string>[];
    for (const table of tables) {
      await db.runAsync(`DELETE FROM ${table.name} WHERE id = '${id}'`);
    }
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};
