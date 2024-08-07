import {
  sqliteTable,
  text,
  integer,
  uniqueIndex,
  AnySQLiteColumn,
} from "drizzle-orm/sqlite-core";

export const message = sqliteTable("countries", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name"),
  sender: integer("sender").references((): AnySQLiteColumn => user.id),
});

export const user = sqliteTable(
  "users",
  {
    id: integer("id").primaryKey(),
    name: text("name"),
  },
  (users) => ({
    nameIdx: uniqueIndex("nameIdx").on(users.name),
  }),
);
