import { SQLTableColumn } from "~/interfaces/SQLite";

export const likesGraphTableStructure: SQLTableColumn[] = [
  { name: "id", type: "ID" },
  { name: "featured_time", type: "TEXT" },
  { name: "video_time", type: "TEXT" },
  { name: "points", type: "TEXT" },
];

export const likesGraphInitial = {
  id: "",
  featured_time: "",
  video_time: "",
  points: "",
};
