import { SQLTableColumn } from "interfaces/SQLite";

export const frequentWordsTableStructure: SQLTableColumn[] = [
  { name: "id", type: "ID" },
  { name: "query_values", type: "TEXT" }, 
];

export const frequentWordsInitial = {
  id: "",
  query_values: [] as { name: string; value: string }[],
};
