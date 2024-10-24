import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { InformationCircleIcon } from '@heroicons/react/24/solid'; // Correct import path for Heroicons v2

function Projects() {
  // State to store fetched projects
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState(null);
  const [showTooltip, setShowTooltip] = useState(false);  // State to handle tooltip visibility

  // Fetch projects from the API when the component mounts
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get('http://localhost:5050/api/projects');
        setProjects(response.data); // Set the projects data from the API response
      } catch (err) {
        console.error("Error fetching projects:", err);
        setError('Failed to load projects.');
      }
    };

    fetchProjects(); // Trigger the fetch on component mount
  }, []);

  return (
    <section id="projects" className="min-h-screen bg-gray-100 dark:bg-gray-900 py-12 px-5">
      {/* Title and Description */}
      <div className="text-center mb-12 relative">
        <div className="flex justify-center items-center space-x-2">
          <h2 className="text-4xl font-semibold text-gray-900 dark:text-white mb-4">
            Projects Showcase
          </h2>
          <span
            className="relative cursor-pointer"
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
          >
            {/* Heroicon Information Icon */}
            <InformationCircleIcon className="h-6 w-6 text-gray-600 hover:text-black" />

            {/* Tooltip */}
            {showTooltip && (
              <div className="absolute -right-8 mt-2 bg-black text-white text-sm rounded p-2 w-64 z-10">
                💡 Fun Fact: The projects you see here aren’t hardcoded!
                 They’re dynamically pulled from a database through an admin dashboard I built,
                  allowing me to easily manage and update them in real-time. 
              </div>
            )}
          </span>
        </div>

        <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto mt-4">
          Here’s a selection of projects that highlight my skills, creativity, and the technologies I’ve mastered.
        </p>
      </div>

      {/* Error message if data loading fails */}
      {error && <p className="text-center text-red-500">{error}</p>}

      {/* Project Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {projects.map((project, index) => (
          <a
            key={index}
            href={project.url}  // Use 'url' from the project API response
            target="_blank"  // Opens link in a new tab
            rel="noopener noreferrer"  // Ensures security when opening a new tab
            className="block transform hover:scale-105 transition-transform duration-300 bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden"
          >
            {/* Project Image */}
            <img
              src={project.image}  // Use 'image' field from the project data
              alt={project.name}  // Use 'name' for the alt attribute
              className="w-full h-48 object-cover"
            />

            {/* Project Info */}
            <div className="p-4">
              <h3 className="text-2xl font-medium text-gray-900 dark:text-white mb-2">
                {project.name}  {/* Display project title */}
              </h3>

              {/* Project Description */}
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                {project.description}  {/* Display project description */}
              </p>

              {/* Project Keywords */}
              <div className="flex flex-wrap gap-2">
                {project.keywords.map((keyword, idx) => (
                  <span
                    key={idx}
                    className="text-red-500 text-[0.75rem] border border-red-500 px-2 py-1 rounded-full"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

export default Projects;