import express from 'express';
import {
  getProjects,
  createProject,
  getProjectById,
  updateProjectById,
  deleteProjectById,
  register,
  login,
  getUserById,
  getUserByUsername,
  upload // Import multer middleware for handling image uploads
} from '../controllers/projectController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

// Project Routes
router.get('/projects', getProjects);
router.get('/projects/:id', getProjectById);
router.get('/users/:id', getUserById);
router.get('/users/username/:username', getUserByUsername);

// Protected Routes (Require authentication via JWT)

router.put('/projects/:id', authMiddleware, upload, updateProjectById); 
router.delete('/projects/:id', authMiddleware, deleteProjectById);
router.post('/projects', upload, createProject);  // 'image' corresponds to the key in the form data

// Authentication Routes
router.post('/auth/register', register);
router.post('/auth/login', login);

export default router;