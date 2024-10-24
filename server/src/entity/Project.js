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
      type: "simple-array",  // Keywords stored as a comma-separated string
      nullable: true, // Make it nullable in case some projects don't have keywords
    },
    image: {
      type: String, // Store the image path or URL
      nullable: true, // Make it nullable in case some projects don't have images
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