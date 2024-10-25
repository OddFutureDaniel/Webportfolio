import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { InformationCircleIcon } from '@heroicons/react/24/solid';

// Configure Supabase client
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;
if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Supabase URL or Anon Key is missing!");
}
const supabase = createClient(supabaseUrl, supabaseAnonKey);

function Projects() {
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState(null);
  const [showTooltip, setShowTooltip] = useState(false);

  // Fetch projects from Supabase on component mount
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data, error } = await supabase.from('projects').select('*');
        if (error) throw error;
        console.log("Projects data:", data); // Log projects data
        setProjects(data);
      } catch (err) {
        console.error("Error fetching projects:", err);
        setError('Failed to load projects.');
      }
    };

    fetchProjects();
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
            <InformationCircleIcon className="h-6 w-6 text-gray-600 hover:text-black" />

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

      {error && <p className="text-center text-red-500">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {projects.map((project, index) => (
          <a
            key={index}
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block transform hover:scale-105 transition-transform duration-300 bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden"
          >
            <img
              src={project.image}  // Ensure 'image' field is correctly stored in Supabase
              alt={project.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-2xl font-medium text-gray-900 dark:text-white mb-2">
                {project.name}
              </h3>
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {Array.isArray(project.keywords) && project.keywords.length > 0 ? (
                  project.keywords.map((keyword, idx) => (
                    <span
                      key={idx}
                      className="text-red-500 text-[0.75rem] border border-red-500 px-2 py-1 rounded-full"
                    >
                      {keyword}
                    </span>
                  ))
                ) : (
                  <span className="text-gray-500 italic">No keywords available</span>
                )}
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

export default Projects;