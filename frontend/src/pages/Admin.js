import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';

function Admin() {
  const [projects, setProjects] = useState([]);
  const [newProject, setNewProject] = useState({ name: '', description: '', url: '', keywords: '', image: null });
  const [editingProject, setEditingProject] = useState(null);
  const [error, setError] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState(null);

  const navigate = useNavigate();

  // Fetch projects from Supabase
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data, error } = await supabase.from('projects').select('*');

        if (error) throw error;

        // Parse keywords as an array if stored as JSON strings
        const parsedProjects = data.map((project) => ({
          ...project,
          keywords: Array.isArray(project.keywords)
            ? project.keywords
            : JSON.parse(project.keywords || '[]'),
        }));
        
        setProjects(parsedProjects);
      } catch (err) {
        setError('Failed to fetch projects.');
        console.error(err.message);
      }
    };

    fetchProjects();
  }, []);

  // Handle project creation
  const handleCreateProject = async () => {
    const { name, description, url, keywords, image } = newProject;

    if (!name || !description || !url || !image) {
      setError('All fields including image are required.');
      return;
    }

    const formattedKeywords = keywords.split(',').map((keyword) => keyword.trim());

    try {
      let imageUrl;
      if (image) {
        const { data, error: uploadError } = await supabase.storage
          .from('project-images')
          .upload(`public/${Date.now()}_${image.name}`, image);

        if (uploadError) throw uploadError;
        imageUrl = `${process.env.REACT_APP_SUPABASE_URL}/storage/v1/object/public/project-images/${data.path}`;
      }

      const { data, error } = await supabase.from('projects').insert([
        {
          name,
          description,
          url,
          keywords: formattedKeywords,
          image: imageUrl,
        },
      ]);

      if (error) throw error;

      setProjects([...projects, data[0]]);
      setNewProject({ name: '', description: '', url: '', keywords: '', image: null });
      setError(null);
    } catch (err) {
      console.error("Error creating project:", err.message);
      setError('Failed to create project.');
    }
  };

  const handleEditProject = (project) => {
    const keywordsString = Array.isArray(project.keywords)
      ? project.keywords.join(', ')
      : '';

    setEditingProject(project);
    setNewProject({
      name: project.name,
      description: project.description,
      url: project.url,
      keywords: keywordsString,
      image: null,
    });
  };

  const handleUpdateProject = async () => {
    if (!editingProject) return;

    const { name, description, url, keywords, image } = newProject;

    if (!name || !description || !url) {
      setError('All fields are required for updating.');
      return;
    }

    try {
      let imageUrl = editingProject.image;
      if (image) {
        const { data: imageData, error: uploadError } = await supabase.storage
          .from('project-images')
          .upload(`public/${Date.now()}_${image.name}`, image);

        if (uploadError) throw uploadError;
        imageUrl = `${process.env.REACT_APP_SUPABASE_URL}/storage/v1/object/public/project-images/${imageData.path}`;
      }

      const keywordArray = keywords.split(',').map((keyword) => keyword.trim());

      const { data, error } = await supabase
        .from('projects')
        .update({ name, description, url, keywords: keywordArray, image: imageUrl })
        .eq('id', editingProject.id)
        .select();

      if (error) throw error;

      if (!data || data.length === 0) {
        console.error('Project update response data is null or empty.');
        setError('Failed to update project.');
        return;
      }

      setProjects(projects.map((proj) => (proj.id === editingProject.id ? data[0] : proj)));
      setEditingProject(null);
      setNewProject({ name: '', description: '', url: '', keywords: '', image: null });
      setError(null);
    } catch (err) {
      console.error("Error updating project:", err.message);
      setError('Failed to update project.');
    }
  };

  const handleDeleteProject = async () => {
    if (!projectToDelete) return;

    try {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', projectToDelete.id);

      if (error) throw error;

      setProjects(projects.filter((project) => project.id !== projectToDelete.id));
      setIsDeleteModalOpen(false);
      setProjectToDelete(null);
    } catch (err) {
      setError('Failed to delete project.');
      console.error(err.message);
    }
  };

  const handleBackClick = () => {
    navigate('/');
  };

  return (
    <div className="p-10">
      <div className="flex items-center justify-between mb-6">
        <button 
          onClick={handleBackClick} 
          className="text-black hover:underline flex items-center space-x-2"
        >
          <span className="text-2xl">←</span>
          <span>Back</span>
        </button>

        <h2 className="text-3xl text-center flex-1">Admin Dashboard</h2>
      </div>

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
                  : 'No keywords'
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
                    setProjectToDelete(project);
                    setIsDeleteModalOpen(true);
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