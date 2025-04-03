type SQLColumnType = "ID" | "TEXT";

export interface SQLTableColumn {
  name: string;
  type: SQLColumnType;
}
