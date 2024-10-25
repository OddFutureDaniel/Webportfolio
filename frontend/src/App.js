import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Admin from './pages/Admin';
import Navigation from './components/Navigation';
import LoginModal from './components/LoginModal';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [token, setToken] = useState(sessionStorage.getItem('authToken')); // Fetch token from session storage

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Updated handleLogin function
  const handleLogin = (supabaseToken) => {
    setToken(supabaseToken); // Store token after login
    sessionStorage.setItem('authToken', supabaseToken); // Save in session storage
  };

  const openLoginModal = () => {
    setIsLoginModalOpen(true);
  };

  const closeLoginModal = () => {
    setIsLoginModalOpen(false);
  };

  return (
    <Router>
      <div className={`App ${isDarkMode ? 'dark' : ''}`}>
        <Routes>
          {/* Route for portfolio */}
          <Route
            path="/"
            element={
              <>
                <Navigation
                  isDarkMode={isDarkMode}
                  toggleDarkMode={toggleDarkMode}
                  openLoginModal={openLoginModal}
                />
                <div id="home"><Home /></div>
                <div id="about"><About /></div>
                <div id="projects"><Projects /></div>
                <div id="contact"><Contact /></div>
                {isLoginModalOpen && (
                  <LoginModal onClose={closeLoginModal} onLogin={handleLogin} />
                )}
              </>
            }
          />

          {/* Route for Admin page with token verification */}
          <Route
            path="/admin"
            element={token ? <Admin /> : <Navigate to="/" />} // Redirect if not authenticated
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;