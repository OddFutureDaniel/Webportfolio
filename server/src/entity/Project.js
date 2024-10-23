import { EntitySchema } from "typeorm";

export const Project = new EntitySchema({
  name: "Project",
  tableName: "projects",
  columns: {
    id: {
      type: Number,
      primary: true,
      generated: true,
    },
    name: {
      type: String,
    },
    description: {
      type: String,
    },
    url: {
      type: String,
    },
    keywords: {
      type: "simple-array", // Store as a comma-separated array
      nullable: true,        // Allow null for existing projects
    },
    createdAt: {
      type: "timestamp",
      default: () => "CURRENT_TIMESTAMP",
    },
    updatedAt: {
      type: "timestamp",
      default: () => "CURRENT_TIMESTAMP",
    },
  },
});