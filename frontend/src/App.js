import React from 'react';
import Home from './components/Home';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Navigation from './components/Navigation';
// import Admin from './Admin';
// import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* <Navigation />  Use the Navigation component */}
      
      {/* Full-width layout for sections */}
      <div className="w-full">

        {/* Render the sections with padding and background styling */}
        <section id="home" className="w-full p-10 bg-white shadow-md rounded-lg mb-10">
          <Home />
        </section>

        <section id="about" className="w-full p-10 bg-white shadow-md rounded-lg mb-10">
          <About />
        </section>

        <section id="projects" className="w-full p-10 bg-white shadow-md rounded-lg mb-10">
          <Projects />
        </section>

        <section id="contact" className="w-full p-10 bg-white shadow-md rounded-lg mb-10">
          <Contact />
        </section>

      </div>
      
      {/* Admin route */}
      {/* <Routes>
        <Route path="/admin" element={<Admin />} />
      </Routes> */}
    </div>
  );
}

export default App;