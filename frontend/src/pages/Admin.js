import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Admin() {
  const [projects, setProjects] = useState([]);
  const [newProject, setNewProject] = useState({ name: '', description: '', url: '', keywords: '', image: null });
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

  // Creating new project logic
  const handleCreateProject = async () => {
    const { name, description, url, keywords, image } = newProject;

    if (!name || !description || !url || !image) {
      setError('All fields including image are required.');
      return;
    }

    try {
      const token = sessionStorage.getItem('authToken');
      const formData = new FormData();
      formData.append('name', name);
      formData.append('description', description);
      formData.append('url', url);
      formData.append('keywords', keywords.split(',').map((keyword) => keyword.trim()));
      formData.append('image', image);

      const response = await axios.post('http://localhost:5050/api/projects', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log("Project created successfully:", response.data); // Log the response

      // Update the projects list with the newly created project
      setProjects([...projects, response.data]);  // Append the new project to the projects array
      setNewProject({ name: '', description: '', url: '', keywords: '', image: null });
      setError(null);
    } catch (err) {
      console.error("Error creating project:", err.response ? err.response.data : err.message); // Log the error
      setError('Failed to create project.');
    }
  };

  // Editing project logic
  const handleEditProject = (project) => {
    const keywordsString = Array.isArray(project.keywords)
      ? project.keywords.join(', ')
      : (project.keywords || '');  // Handle undefined or null

    setEditingProject(project);
    setNewProject({
      name: project.name,
      description: project.description,
      url: project.url,
      keywords: keywordsString,
      image: null, // Reset image when editing
    });
  };

  // Updating project logic
  const handleUpdateProject = async () => {
    if (!editingProject) return;

    const { name, description, url, keywords, image } = newProject;

    if (!name || !description || !url) {
      setError('All fields are required for updating.');
      return;
    }

    try {
      const token = sessionStorage.getItem('authToken');
      const formData = new FormData();

      formData.append('name', name);
      formData.append('description', description);
      formData.append('url', url);
      formData.append('keywords', keywords.split(',').map((keyword) => keyword.trim()));

      if (image) formData.append('image', image); // Append image only if updated

      const response = await axios.put(`http://localhost:5050/api/projects/${editingProject.id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data', // Ensure this is set
        },
      });

      const updatedProjects = projects.map((proj) =>
        proj.id === editingProject.id ? response.data : proj
      );

      setProjects(updatedProjects);
      setEditingProject(null);
      setNewProject({ name: '', description: '', url: '', keywords: '', image: null });
      setError(null);
    } catch (err) {
      // Log detailed error message
      console.error('Error updating project:', err.response ? err.response.data : err.message);
      setError('Failed to update project.');
    }
  };
  // Delete project logic
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

  // Rendering the project details including keywords and image
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
          <input
            type="file"
            onChange={(e) => setNewProject({ ...newProject, image: e.target.files[0] })}
            className="border border-gray-300 rounded-md p-2 w-full"
          />
          {editingProject ? (
            <button onClick={handleUpdateProject} className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-500">
              Update Project
            </button>
          ) : (
            <button onClick={handleCreateProject} className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-500">
              Create Project
            </button>
          )}
        </div>
      </div>

      {/* Display Existing Projects */}
      <div>
        <h3 className="text-xl mb-4">Existing Projects</h3>
        <div className="space-y-6">
          {projects.map((project) => (
            <div key={project.id} className="border border-gray-300 rounded-md p-4">
              <h3 className="text-lg font-semibold">{project.name}</h3>
              <p>{project.description}</p>
              <p><strong>Keywords:</strong> {
                Array.isArray(project.keywords)
                  ? project.keywords.join(', ')
                  : 'No keywords'  // Handle the case where keywords is not an array
              }</p>

              <img
                src={project.image}
                alt={project.name}
                className="w-32 h-32 object-cover"
              />
              <a href={project.url} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">
                Visit Project
              </a>
              <div className="mt-4 space-x-2">
                <button onClick={() => handleEditProject(project)} className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-400">
                  Edit
                </button>
                <button
                  onClick={() => {
                    setProjectToDelete(project); // Set the project to be deleted
                    setIsDeleteModalOpen(true);  // Open the confirmation modal
                  }}
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
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Confirm Deletion</h2>
            <p className="mb-4">Are you sure you want to delete <strong>{projectToDelete?.name}</strong>?</p>
            <div className="flex items-center justify-between">
              <button onClick={handleDeleteProject} className="bg-red-600 hover:bg-red-500 text-white font-semibold px-4 py-2 rounded-lg">
                Yes, Delete
              </button>
              <button onClick={() => setIsDeleteModalOpen(false)} className="text-gray-500 hover:text-gray-900">
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