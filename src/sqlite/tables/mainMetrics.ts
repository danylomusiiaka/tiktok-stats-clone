import { SQLTableColumn } from "~/interfaces/SQLite";

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
