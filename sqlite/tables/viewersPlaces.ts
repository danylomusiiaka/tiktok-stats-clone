import { SQLTableColumn } from "interfaces/SQLite";

export const viewersPlacesTableStructure: SQLTableColumn[] = [
  { name: "id", type: "ID" },
  { name: "query_values", type: "TEXT" }, 
];

export const viewersPlacesInitial = {
  id: "",
  query_values: [] as { name: string; value: string }[],
};
