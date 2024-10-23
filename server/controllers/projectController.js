import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { AppDataSource } from '../src/data-source.js';
import { Project } from '../src/entity/Project.js';
import { User } from '../src/entity/User.js';  

const projectRepository = AppDataSource.getRepository(Project);
const userRepository = AppDataSource.getRepository(User);
const SECRET_KEY = 'your_secret_key';  // Use the same secret key as before

export const authMiddleware = (req, res, next) => {
  const authHeader = req.headers['authorization'];  // Check the authorization header
  if (!authHeader) {
    return res.status(401).json({ message: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];  // Extract token from "Bearer <token>"
  try {
    const decoded = jwt.verify(token, SECRET_KEY);  // Verify token using the secret key
    req.userId = decoded.id;  // Attach user ID to request
    next();  // Proceed to the next middleware or route handler
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

// Create Project
export const createProject = async (req, res) => {
  const { name, description, url, keywords } = req.body; // Get keywords from request

  if (!name || !description || !url || !keywords) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    // Assuming keywords is an array (from frontend)
    const newProject = projectRepository.create({ name, description, url, keywords });
    await projectRepository.save(newProject);
    res.status(201).json(newProject);
  } catch (error) {
    res.status(500).json({ message: "Error creating project", error });
  }
};


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

// Update Project
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
    project.keywords = keywords || project.keywords; // Update keywords if provided

    await projectRepository.save(project);
    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ message: "Error updating project", error });
  }
};

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

// Auth Controllers
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
  
      // Generate a JWT token
      const token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: '1h' });
  
      res.status(200).json({ token });  // Return the token to the client
    } catch (error) {
      res.status(500).json({ message: 'Error logging in', error: error.message });
    }
  };

  // Get User by ID
export const getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    // Find user by ID
    const user = await userRepository.findOneBy({ id: parseInt(id) });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);  // Return the user data
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving user', error: error.message });
  }
};

export const getUserByUsername = async (req, res) => {
  const { username } = req.params;
  
  console.log('Searching for user with username:', username); // Log the username for debugging
  
  try {
    const user = await userRepository.findOneBy({ username });
    if (!user) {
      return res.status(404).json({ message: `User with username "${username}" not found` });
    }
    res.status(200).json(user);  // Return the found user
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving user', error: error.message });
  }
};