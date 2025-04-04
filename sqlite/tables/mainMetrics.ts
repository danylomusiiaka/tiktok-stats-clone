import { SQLTableColumn } from "interfaces/SQLite";

export const mainMetricsTableStructure: SQLTableColumn[] = [
  { name: "id", type: "ID" },
  { name: "updated", type: "TEXT" },
  { name: "views", type: "TEXT" },
  { name: "total_time_viewing", type: "TEXT" },
  { name: "average_time_viewing", type: "TEXT" },
  { name: "full_video_checked", type: "TEXT" },
  { name: "new_subscribers", type: "TEXT" },
];

export const mainMetricsInitial = {
  id: "",
  updated: "",
  views: "",
  total_time_viewing: "",
  average_time_viewing: "",
  full_video_checked: "",
  new_subscribers: "",
};

export const mainMetricsLabelMapping: Record<string, string> = {
  views: "Посмотры видео",
  total_time_viewing: "Общая продолжительность просмотра",
  average_time_viewing: "Среднее время просмотра",
  full_video_checked: "Среднее время просмотра",
  new_subscribers: "Новые подписчики",
};
