import { DataSource } from "typeorm";
import { Project } from "./entity/Project.js";  // Project entity import
import { User } from "./entity/User.js";  // Import the User entity

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "portfolio_user",
  password: "DJdan60fifa",
  database: "portfolio_db",
  synchronize: true,  // Enable for development; disable in production
  logging: false,
  entities: [Project, User],  // Register both Project and User entities here
  migrations: ["src/migration/*.js"],
  subscribers: [],
});