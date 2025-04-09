import { SQLTableColumn } from "interfaces/SQLite";

export const mainMetricsGraphTableStructure: SQLTableColumn[] = [
  { name: "id", type: "ID" },
  { name: "Ylabels", type: "TEXT" },
  { name: "XlabelLeft", type: "TEXT" },
  { name: "XlabelRight", type: "TEXT" },
  { name: "points", type: "TEXT" },
];

export const mainMetricsGraphInitial = {
  id: "",
  Ylabels: "",
  XlabelLeft: "",
  XlabelRight: "",
  points: "",
};
