import { DataSource } from "typeorm";
import { Project } from "./entity/Project.js";  // Project entity
import { User } from "./entity/User.js";  // User entity

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "portfolio_user",
  password: "DJdan60fifa",
  database: "portfolio_db",
  synchronize: true,  // For development; disable in production
  logging: false,
  entities: [Project, User],  // Register both Project and User entities
  migrations: ["src/migration/*.js"],  // Ensure migration files exist, or remove this temporarily
  subscribers: [],
});