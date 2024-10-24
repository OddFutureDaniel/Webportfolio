import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { AppDataSource } from '../src/data-source.js';
import { Project } from '../src/entity/Project.js';
import { User } from '../src/entity/User.js';
import multer from 'multer';  // Multer for handling file uploads
import cloudinary from '../config/cloudinaryConfig.js';  // Adjust the path accordingly
import { CloudinaryStorage } from 'multer-storage-cloudinary';  // Multer storage engine for Cloudinary

const projectRepository = AppDataSource.getRepository(Project);
const userRepository = AppDataSource.getRepository(User);
const SECRET_KEY = process.env.JWT_SECRET;   // Use the same secret key as before

// Set up Cloudinary storage with Multer
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'portfolio', // Folder in Cloudinary where images will be stored
    format: async (req, file) => 'jpg',  // Ensure image format is JPG
    public_id: (req, file) => 'portfolio_' + Date.now(),  // Unique image ID
  },
});

export const upload = multer({ storage }).single('image');  // Middleware to handle image uploads

// Auth Middleware
export const authMiddleware = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    return res.status(401).json({ message: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.userId = decoded.id;
    next();
  } catch (error) {
    return res.status(403).json({ message: 'Invalid or expired token' });
  }
};

// Project Controllers

export const getProjects = async (req, res) => {
  try {
    const projects = await projectRepository.find();
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving projects", error });
  }
};

// Create Project (with image upload to Cloudinary)
// Create Project (with image upload)

// Create Project (with Cloudinary image upload)
export const createProject = async (req, res) => {
  const { name, description, url, keywords } = req.body;

  // Ensure all fields are provided
  if (!name || !description || !url || !keywords) {
    return res.status(400).json({ message: 'All fields including image are required' });
  }

  try {
    let imageUrl = null;
    if (req.file) {
      // Upload image to Cloudinary
      const result = await cloudinary.uploader.upload(req.file.path);
      imageUrl = result.secure_url;  // Get the secure Cloudinary URL
    }

    const keywordArray = Array.isArray(keywords) ? keywords : keywords.split(',').map(k => k.trim());

    const newProject = projectRepository.create({
      name,
      description,
      url,
      keywords: keywordArray,
      image: imageUrl  // Store the Cloudinary URL in the database
    });

    await projectRepository.save(newProject);
    res.status(201).json(newProject);
  } catch (error) {
    console.error("Error creating project:", error);
    res.status(500).json({ message: "Error creating project", error });
  }
};



// Get Project by ID
export const getProjectById = async (req, res) => {
  const { id } = req.params;

  try {
    const project = await projectRepository.findOneBy({ id: parseInt(id) });
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving project", error });
  }
};

// Update Project (with image handling)
// Update Project (with Cloudinary image upload)
export const updateProjectById = async (req, res) => {
  const { id } = req.params;
  const { name, description, url, keywords } = req.body;

  try {
    const project = await projectRepository.findOneBy({ id: parseInt(id) });
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    project.name = name || project.name;
    project.description = description || project.description;
    project.url = url || project.url;

    if (keywords) {
      project.keywords = Array.isArray(keywords) ? keywords : keywords.split(',').map(k => k.trim());
    }

    if (req.file) {
      // Upload new image to Cloudinary
      const result = await cloudinary.uploader.upload(req.file.path);
      project.image = result.secure_url;  // Update the image URL
    }

    await projectRepository.save(project);
    res.status(200).json(project);
  } catch (error) {
    console.error("Error updating project:", error);
    res.status(500).json({ message: "Error updating project", error });
  }
};
// Delete Project
export const deleteProjectById = async (req, res) => {
  const { id } = req.params;

  try {
    const project = await projectRepository.findOneBy({ id: parseInt(id) });
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    await projectRepository.remove(project);
    res.status(200).json({ message: "Project deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting project", error });
  }
};

// Auth Controllers (Retained)
export const register = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  try {
    const existingUser = await userRepository.findOneBy({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = userRepository.create({ username, password: hashedPassword });
    await userRepository.save(newUser);

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user', error: error.message });
  }
};

// Login function
export const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await userRepository.findOneBy({ username });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid password' });
    }

    const token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: '1h' });

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error: error.message });
  }
};

// Get User by ID (Retained)
export const getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await userRepository.findOneBy({ id: parseInt(id) });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving user', error: error.message });
  }
};

// Get User by Username (Retained)
export const getUserByUsername = async (req, res) => {
  const { username } = req.params;

  try {
    const user = await userRepository.findOneBy({ username });
    if (!user) {
      return res.status(404).json({ message: `User with username "${username}" not found` });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving user', error: error.message });
  }
};