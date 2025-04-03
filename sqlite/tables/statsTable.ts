import { SQLTableColumn } from "interfaces/SQLite";

export const statsTableStructure: SQLTableColumn[] = [
  { name: "id", type: "ID" },
  { name: "video_duration", type: "TEXT" },
  { name: "publish_date", type: "TEXT" },
  { name: "views", type: "TEXT" },
  { name: "likes", type: "TEXT" },
  { name: "comments", type: "TEXT" },
  { name: "shares", type: "TEXT" },
  { name: "saved", type: "TEXT" },
];

export const statsInitial = {
  id: "",
  video_duration: "",
  publish_date: "",
  views: "",
  likes: "",
  comments: "",
  shares: "",
  saved: "",
};
