import React from 'react';

function Home() {
  return (
    <div
      id="home"
      className="relative w-full h-screen bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url('/IMG_0115.jpg')`, // Set your image as the background
      }}
    >
      {/* Overlay to darken the background for better text readability */}
      <div className="absolute inset-0 bg-black opacity-40"></div>

      {/* Hero Content */}
      <div className="relative z-10 mx-auto max-w-2xl py-32 sm:py-48 lg:py-56 text-center">
        <h1 className="text-5xl font-semibold tracking-tight text-white sm:text-7xl">
          Welcome to My Portfolio
        </h1>
        <p className="mt-8 text-lg leading-8 mx-6 text-gray-300 sm:text-xl font-roboto-slab">
        A design-minded front-end developer focused on building beautiful interfaces & experiences 
        </p>

        {/* Call to Action Buttons */}
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <a
            href="#projects"
            className="rounded-md hover:bg-tertiary-purple px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm bg-indigo-500"
          >
            View Projects
          </a>
          <a href="#about" className="text-sm font-semibold leading-6 text-white">
            Learn more <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Home;