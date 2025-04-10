import { SQLTableColumn } from "~/interfaces/SQLite";

export const viewersGenderAgeTableStructure: SQLTableColumn[] = [
  { name: "id", type: "ID" },
  { name: "men", type: "TEXT" },
  { name: "women", type: "TEXT" },
  { name: "other", type: "TEXT" },
  { name: "age_18_24", type: "TEXT" },
  { name: "age_25_34", type: "TEXT" },
  { name: "age_35_44", type: "TEXT" },
  { name: "age_45_54", type: "TEXT" },
  { name: "age_more_55", type: "TEXT" },
];

export const viewersGenderAgeInitial = {
  id: "",
  men: "",
  women: "",
  other: "",
  age_18_24: "",
  age_25_34: "",
  age_35_44: "",
  age_45_54: "",
  age_more_55: "",
};
