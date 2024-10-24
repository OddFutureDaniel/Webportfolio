import React, { useState } from 'react';

function About() {
  // Function to generate a random color
  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  // State to hold the hover color for each skill
  const [hoverColor, setHoverColor] = useState({});

  // Handle hover to change the color of a skill item
  const handleHover = (index) => {
    const newColor = getRandomColor();
    setHoverColor((prev) => ({ ...prev, [index]: newColor }));
  };

  // Handle mouse leave to reset the color
  const handleLeave = (index) => {
    setHoverColor((prev) => ({ ...prev, [index]: '' }));
  };

  return (
    <section id="about" className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col items-center justify-center text-center p-10">
      {/* Heading */}
      <h2 className="text-4xl font-semibold text-gray-900 dark:text-white mb-12">
        A Little Bit About Me
      </h2>

      {/* Centered Profile Image */}
      <img
        src="/chivelly-profileimg.jpg"
        alt="Profile"
        className="w-56 h-56 rounded-full shadow-lg mb-8"
      />

      {/* Main Content Container */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-6xl w-full px-6 lg:px-0 lg:w-[90%] mx-auto">
        
        {/* Left Column: Body Text */}
        <div className="text-[0.9rem] text-gray-700 dark:text-gray-300 font-roboto-slab">
          <p className="mb-6">
            Hey! I’m Daniel, a web developer with a passion for front-end development and design. I graduated from Royal Holloway in 2023 with a degree in{' '}
            <a
              href="https://www.royalholloway.ac.uk/research-and-teaching/departments-and-schools/computer-science/"
              className="font-bold text-tertiary-purple hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Computer Science
            </a>
            , and have since been building and designing e-commerce sites for clients of various sizes.
          </p>
          <p className="mb-6">
            Additionally, I’ve been interning with a renowned multi-disciplined fashion designer, gaining hands-on 1:1 training while creating and managing their e-commerce site.
          </p>
          <p>
            I aspire to build a multi-faceted career that allows me to channel my creativity into crafting beautiful software, clothing, and engaging user experiences.
          </p>
        </div>

        {/* Right Column: Skills Section */}
        <div className="space-y-8">
          {/* Skills Heading */}
          <h3 className="text-3xl font-semibold text-gray-900 dark:text-white mb-4">
            Skills
          </h3>

          {/* Skills Grid - Single Row with 4 Columns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            
            {/* Languages */}
            <div>
              <h4 className="text-[1rem] font-semibold text-gray-900 dark:text-white mb-2">
                Languages
              </h4>
              <ul className="list-none ml-5 text-[0.9rem] text-gray-700 dark:text-gray-300">
                {['Javascript', 'Typescript', 'HTML', 'CSS','Liquid', 'SQL', 'Java'].map((skill, index) => (
                  <li
                    key={index}
                    className="transition duration-300 ease-in-out"
                    style={{ color: hoverColor[`language-${index}`] }}
                    onMouseEnter={() => handleHover(`language-${index}`)}
                    onMouseLeave={() => handleLeave(`language-${index}`)}
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </div>

            {/* Frameworks */}
            <div>
              <h4 className="text-[1rem] font-semibold text-gray-900 dark:text-white mb-2">
                Frameworks
              </h4>
              <ul className="list-none ml-5 text-[0.9rem] text-gray-700 dark:text-gray-300">
                {['React', 'Vue', 'Shopify', 'Webflow'].map((skill, index) => (
                  <li
                    key={index}
                    className="transition duration-300 ease-in-out"
                    style={{ color: hoverColor[`framework-${index}`] }}
                    onMouseEnter={() => handleHover(`framework-${index}`)}
                    onMouseLeave={() => handleLeave(`framework-${index}`)}
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </div>

            {/* Tools */}
            <div>
              <h4 className="text-[1rem] font-semibold text-gray-900 dark:text-white mb-2">
                Tools
              </h4>
              <ul className="list-none ml-5 text-[0.9rem] text-gray-700 dark:text-gray-300">
                {['Github', 'Postman', 'Firebase','Cloudinary'].map((skill, index) => (
                  <li
                    key={index}
                    className="transition duration-300 ease-in-out"
                    style={{ color: hoverColor[`tool-${index}`] }}
                    onMouseEnter={() => handleHover(`tool-${index}`)}
                    onMouseLeave={() => handleLeave(`tool-${index}`)}
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </div>

            {/* Design */}
            <div>
              <h4 className="text-[1rem] font-semibold text-gray-900 dark:text-white mb-2">
                Design
              </h4>
              <ul className="list-none ml-5 text-[0.9rem] text-gray-700 dark:text-gray-300">
                {['Figma', 'Prototyping', 'Wireframing', 'User Testing'].map((skill, index) => (
                  <li
                    key={index}
                    className="transition duration-300 ease-in-out"
                    style={{ color: hoverColor[`design-${index}`] }}
                    onMouseEnter={() => handleHover(`design-${index}`)}
                    onMouseLeave={() => handleLeave(`design-${index}`)}
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;