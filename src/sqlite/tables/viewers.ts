import { SQLTableColumn } from "~/interfaces/SQLite";

export const viewersTableStructure: SQLTableColumn[] = [
  { name: "id", type: "ID" },
  { name: "total", type: "TEXT" },
  { name: "compared_to", type: "TEXT" },
  { name: "new_viewers", type: "TEXT" },
  { name: "old_viewers", type: "TEXT" },
  { name: "subscribed", type: "TEXT" },
  { name: "not_subscribed", type: "TEXT" },
];

export const viewersInitial = {
  id: "",
  total: "",
  compared_to: "",
  new_viewers: "",
  old_viewers: "",
  subscribed: "",
  not_subscribed: "",
};
