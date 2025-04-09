import { SQLTableColumn } from "interfaces/SQLite";

export const coefGraphTableStructure: SQLTableColumn[] = [
  { name: "id", type: "ID" },
  { name: "percent", type: "TEXT" },
  { name: "featured_time", type: "TEXT" },
  { name: "video_time", type: "TEXT" },
  { name: "points", type: "TEXT" },
];

export const coefGraphInitial = {
  id: "",
  percent: "",
  featured_time: "",
  video_time: "",
  points: "",
};
