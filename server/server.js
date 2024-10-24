import express from "express";
import cors from "cors";
import projectRoutes from "./routes/projectRoutes.js";
import { AppDataSource } from "./src/data-source.js";
import helmet from 'helmet';
import dotenv from 'dotenv';

// Initialize the database
AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((error) => console.log("Error during Data Source initialization:", error));

const app = express();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

app.use("/api", projectRoutes);

app.listen(5050, () => {
  console.log("Server is running on port 5050");
});

dotenv.config();

// Apply Content Security Policy (CSP)
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'"],  // Allow inline scripts
      styleSrc: ["'self'", "'unsafe-inline'"],   // Allow inline styles
      imgSrc: ["'self'", "data:"],  // Allow images from the same origin and data URIs
      connectSrc: ["'self'", "http://localhost:5050"],  // Allow API requests to your backend
      objectSrc: ["'none'"],  // Block embedding of objects
    },
  })
);