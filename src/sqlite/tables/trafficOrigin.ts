import { SQLTableColumn } from "~/interfaces/SQLite";

export const trafficOriginTableStructure: SQLTableColumn[] = [
  { name: "id", type: "ID" },
  { name: "recommend", type: "TEXT" },
  { name: "other", type: "TEXT" },
  { name: "personal_profile", type: "TEXT" },
  { name: "sound", type: "TEXT" },
  { name: "search", type: "TEXT" },
  { name: "subscribers", type: "TEXT" },
];

export const trafficOriginInitial = {
  id: "",
  recommend: "",
  other: "",
  personal_profile: "",
  sound: "",
  search: "",
  subscribers: "",
};
