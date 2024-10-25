// data-source.js
import 'dotenv/config'; // Load environment variables from .env
import { DataSource } from "typeorm";
import { Project } from "./entity/Project.js";
import { User } from "./entity/User.js";

console.log('Connecting to database:', process.env.DB_NAME); // Test if .env is loaded

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: false,
  entities: [Project, User],
  migrations: ["src/migration/*.js"],
});