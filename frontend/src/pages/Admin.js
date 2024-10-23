import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Admin() {
  const [projects, setProjects] = useState([]);
  const [newProject, setNewProject] = useState({ name: '', description: '', url: '', keywords: '' });
  const [editingProject, setEditingProject] = useState(null);
  const [error, setError] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const token = sessionStorage.getItem('authToken');
        if (!token) {
          throw new Error('No token found');
        }

        const response = await axios.get('http://localhost:5050/api/projects', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProjects(response.data);
      } catch (err) {
        setError('Failed to fetch projects.');
        console.error(err.response ? err.response.data : err.message);
      }
    };

    fetchProjects();
  }, []);

  const handleCreateProject = async () => {
    const { name, description, url, keywords } = newProject;

    if (!name || !description || !url) {
      setError('All fields are required.');
      return;
    }

    try {
      const token = sessionStorage.getItem('authToken');
      const keywordArray = keywords.split(',').map((keyword) => keyword.trim());

      const response = await axios.post('http://localhost:5050/api/projects', 
        { name, description, url, keywords: keywordArray }, 
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setNewProject({ name: '', description: '', url: '', keywords: '' });
      setProjects([...projects, response.data]);
      setError(null);
    } catch (err) {
      setError('Failed to create project.');
      console.error(err.response ? err.response.data : err.message);
    }
  };

  const handleEditProject = (project) => {
    setEditingProject(project);

    // Handle case where keywords are null or undefined
    const keywordsString = project.keywords ? project.keywords.join(', ') : '';

    setNewProject({ 
      name: project.name, 
      description: project.description, 
      url: project.url,
      keywords: keywordsString // Use empty string if no keywords
    });
  };

  const handleUpdateProject = async () => {
    if (!editingProject) return;

    const { name, description, url, keywords } = newProject;
    if (!name || !description || !url) {
      setError('All fields are required for updating.');
      return;
    }

    try {
      const token = sessionStorage.getItem('authToken');
      const keywordArray = keywords.split(',').map((keyword) => keyword.trim());

      const response = await axios.put(`http://localhost:5050/api/projects/${editingProject.id}`, {
        name,
        description,
        url,
        keywords: keywordArray,
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const updatedProjects = projects.map((proj) =>
        proj.id === editingProject.id ? response.data : proj
      );
      setProjects(updatedProjects);
      setEditingProject(null);
      setNewProject({ name: '', description: '', url: '', keywords: '' });
      setError(null);
    } catch (err) {
      setError('Failed to update project.');
      console.error(err.response ? err.response.data : err.message);
    }
  };

  const handleDeleteClick = (project) => {
    setProjectToDelete(project);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteProject = async () => {
    if (!projectToDelete) return;

    try {
      const token = sessionStorage.getItem('authToken');
      await axios.delete(`http://localhost:5050/api/projects/${projectToDelete.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setProjects(projects.filter((project) => project.id !== projectToDelete.id));
      setIsDeleteModalOpen(false);
      setProjectToDelete(null);
    } catch (err) {
      setError('Failed to delete project.');
      console.error(err.response ? err.response.data : err.message);
    }
  };

  return (
    <div className="p-10">
      <h2 className="text-3xl mb-6">Admin Dashboard</h2>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <div className="mb-8">
        <h3 className="text-xl mb-4">{editingProject ? 'Edit Project' : 'Create a New Project'}</h3>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Project Name"
            value={newProject.name}
            onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
            className="border border-gray-300 rounded-md p-2 w-full"
          />
          <input
            type="text"
            placeholder="Description"
            value={newProject.description}
            onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
            className="border border-gray-300 rounded-md p-2 w-full"
          />
          <input
            type="url"
            placeholder="Project URL"
            value={newProject.url}
            onChange={(e) => setNewProject({ ...newProject, url: e.target.value })}
            className="border border-gray-300 rounded-md p-2 w-full"
          />
          <input
            type="text"
            placeholder="Keywords (comma separated)"
            value={newProject.keywords}
            onChange={(e) => setNewProject({ ...newProject, keywords: e.target.value })}
            className="border border-gray-300 rounded-md p-2 w-full"
          />
          {editingProject ? (
            <button
              onClick={handleUpdateProject}
              className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-500"
            >
              Update Project
            </button>
          ) : (
            <button
              onClick={handleCreateProject}
              className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-500"
            >
              Create Project
            </button>
          )}
        </div>
      </div>

      <div>
        <h3 className="text-xl mb-4">Existing Projects</h3>
        <div className="space-y-6">
          {projects.map((project) => (
            <div key={project.id} className="border border-gray-300 rounded-md p-4">
              <h3 className="text-lg font-semibold">{project.name}</h3>
              <p>{project.description}</p>
              <p><strong>Keywords:</strong> {project.keywords ? project.keywords.join(', ') : 'No keywords'}</p> {/* Check for null/undefined */}
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600 hover:underline"
              >
                Visit Project
              </a>
              <div className="mt-4 space-x-2">
                <button
                  onClick={() => handleEditProject(project)}
                  className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-400"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteClick(project)}
                  className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-500"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {isDeleteModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Confirm Deletion</h2>
            <p className="mb-4">Are you sure you want to delete <strong>{projectToDelete?.name}</strong>?</p>
            <div className="flex items-center justify-between">
              <button
                onClick={handleDeleteProject}
                className="bg-red-600 hover:bg-red-500 text-white font-semibold px-4 py-2 rounded-lg"
              >
                Yes, Delete
              </button>
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Admin;