import { SQLTableColumn } from "~/interfaces/SQLite";

export const searchQueriesTableStructure: SQLTableColumn[] = [
  { name: "id", type: "ID" },
  { name: "query_values", type: "TEXT" },
];

export const searchQueriesInitial = {
  id: "",
  query_values: [] as { name: string; value: string }[],
};
