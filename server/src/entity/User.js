import { EntitySchema } from "typeorm";

export const User = new EntitySchema({
  name: "User",
  tableName: "users", // Optional: specify the table name
  columns: {
    id: {
      type: "int",
      primary: true,
      generated: true,
    },
    username: {
      type: "varchar",
      unique: true, // Ensure username is unique
    },
    password: {
      type: "varchar",
    },
  },
});