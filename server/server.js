import dotenv from 'dotenv';
dotenv.config();

import express from "express";
import cors from "cors";
import projectRoutes from "./routes/projectRoutes.js";
import { AppDataSource } from "./src/data-source.js";
import helmet from 'helmet';
import morgan from 'morgan';

const PORT = process.env.PORT || 5050;

// Initialize the database
AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((error) => console.log("Error during Data Source initialization:", error));

const app = express();

// CORS Setup for Production
const allowedOrigins = ["https://webportfolio-sepia.vercel.app/"];
app.use(cors({ origin: allowedOrigins }));

// Logging
app.use(morgan('combined'));
console.log('Database name from .env:', process.env.DB_NAME);
// Security Headers
app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'"],
    scriptSrc: ["'self'", "'unsafe-inline'"],
    styleSrc: ["'self'", "'unsafe-inline'"],
    imgSrc: ["'self'", "https://res.cloudinary.com"],
    connectSrc: ["'self'", "https://qovkkkvbvvjouulaspvd.supabase.co"],
    objectSrc: ["'none'"],
  },
}));

app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Routes
app.use("/api", projectRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});