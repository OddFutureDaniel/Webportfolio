import React from 'react';

function Projects() {
  // Example project data
  const projects = [
    {
      title: 'Web Portfolio V2',
      image: '/webportfoliov2.png',
      keywords: ['React', 'Tailwind','Postman','TypeORM'],
      link: '#'
    },
    {
      title: 'DJ Booking System',
      image: '/thechiqueeventspromo.png',
      keywords: ['Webflow', 'Booking Form', 'Javascript'],
      link: 'https://thechiqueevents.com'
      
    },
    {
      title: 'Skin Care Clinic',
      image: '/skynmapspromo.png',
      keywords: ['Shopify', 'E-commerce', 'GetTimely'],
      link: 'https://skynmaps.com'
    },
    {
      title: 'Fashion Designer Store',
      image: '/jaffasabapromo.png',
      keywords: ['Shopify', 'E-commerce', 'Liquid'],
      link: 'https://jaffasaba.com'
    },
    {
      title: 'Large E-Commerce Store',
      image: '/estiepromo.png',
      keywords: ['Shopify', 'Large-Scale', 'Liquid'],
      link: 'https://estiecouture.com/'
    },
    {
      title: 'Netflix Clone',
      image: '/netflixclonepromo.png',
      keywords: ['React', 'Axios', 'Postman', 'Firebase','Netflix API'],
      link: 'https://netflix-clone-5a6b8.web.app/'
    },
  ];

  return (
    <section id="projects" className="min-h-screen bg-gray-100 dark:bg-gray-900 py-12 px-5">
      {/* Title and Description */}
      <div className="text-center mb-12">
        <h2 className="text-4xl font-semibold text-gray-900 dark:text-white mb-4">
          What I've Done
        </h2>
        <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
          Below are some of the projects I’ve worked on, showcasing my skills and technologies I've used.
        </p>
      </div>

      {/* Project Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {projects.map((project, index) => (
          <a
            key={index}
            href={project.link}
            target="_blank"  // Opens link in a new tab
            rel="noopener noreferrer"  // Ensures security when opening a new tab
            className="block transform hover:scale-105 transition-transform duration-300 bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden"
          >
            {/* Project Image with increased height */}
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-48 object-cover"  
            />

            {/* Project Info with reduced space between image and title */}
            <div className="p-4">
              <h3 className="text-2xl font-medium text-gray-900 dark:text-white mb-2"> {/* Reduced margin to mb-2 */}
                {project.title}
              </h3>
              
              {/* Project Keywords on one line with flex */}
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