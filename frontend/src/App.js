import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';
// import Admin from './Admin';
import Navigation from './components/Navigation';  // Import Navigation component

function App() {
  return (
    <>
      <Navigation />  {/* Use the Navigation component */}

      {/* Render the sections on the same page */}
      <Home />
      <About />
      <Projects />
      <Contact />

      {/* Admin route */}
      {/* <Routes>
        <Route path="/admin" element={<Admin />} />
      </Routes> */}
    </>
  );
}

export default App;