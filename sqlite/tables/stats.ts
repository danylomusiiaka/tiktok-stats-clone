import { SQLTableColumn } from "interfaces/SQLite";

export const statsTableStructure: SQLTableColumn[] = [
  { name: "id", type: "ID" },
  { name: "picture", type: "TEXT" },
  { name: "video_duration", type: "TEXT" },
  { name: "publish_date", type: "TEXT" },
  { name: "views", type: "TEXT" },
  { name: "likes", type: "TEXT" },
  { name: "comments", type: "TEXT" },
  { name: "shares", type: "TEXT" },
  { name: "saved", type: "TEXT" },
  { name: "lastUpdated", type: "TEXT" },
];

export const statsInitial = {
  id: "",
  picture: "",
  video_duration: "",
  publish_date: "",
  views: "",
  likes: "",
  comments: "",
  shares: "",
  saved: "",
  lastUpdated: "",
};

export const statsLabelMapping: Record<string, string> = {
  recommend: "Рекомендуем",
  other: "Другое",
  personal_profile: "Личний профиль",
  sound: "Звук",
  search: "Поиск",
  subscribers: "Подписки",
};
