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
  updated: "", //Обновлено
  views: "", //Посмотры_видео
  total_time_viewing: "", //Общая_продолжительность_просмотра
  average_time_viewing: "", //Среднее_время_просмотра
  full_video_checked: "", //Среднее_время_просмотра
  new_subscribers: "", //Новые_подписчики
};
