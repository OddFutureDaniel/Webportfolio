import express from 'express';
import {
  getProjects,
  createProject,
  getProjectById,  // Restore getProjectById
  updateProjectById,
  deleteProjectById,
  register,
  login,
  getUserById,
  getUserByUsername
} from '../controllers/projectController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';  // Import the middleware

const router = express.Router();

// Project Routes
router.get('/projects', getProjects);              // Public: Get all projects
router.get('/projects/:id', getProjectById);       // Public: Get project by ID (Restored)
router.get('/users/:id', getUserById);             // Add this route for fetching user by ID
router.get('/users/username/:username', getUserByUsername); // Add this route for fetching user by username

// Protected Routes (Require authentication via JWT)
router.post('/projects', authMiddleware, createProject);         // Protected: Create a project
router.put('/projects/:id', authMiddleware, updateProjectById);  // Protected: Update a project
router.delete('/projects/:id', authMiddleware, deleteProjectById); // Protected: Delete a project

// Authentication Routes
router.post('/auth/register', register);  // Public: Register a new user
router.post('/auth/login', login);        // Public: Login for existing user

export default router;