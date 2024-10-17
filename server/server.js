import express from "express";
import cors from "cors";
import projectRoutes from "./routes/projectRoutes.js";
import { AppDataSource } from "./src/data-source.js";

// Initialize the database
AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((error) => console.log("Error during Data Source initialization:", error));

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", projectRoutes);

app.listen(5050, () => {
  console.log("Server is running on port 5050");
});