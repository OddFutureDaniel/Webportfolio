import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Admin from './pages/Admin';
import Navigation from './components/Navigation';
import LoginModal from './components/LoginModal';
import Footer from './components/Footer';

function AppContent({ isDarkMode, toggleDarkMode, isLoginModalOpen, openLoginModal, closeLoginModal, handleLogin, token }) {
  const location = useLocation();

  return (
    <div className={`App ${isDarkMode ? 'dark' : ''}`}>
      {/* Render Navigation only if not on /admin */}
      {location.pathname !== '/admin' && (
        <Navigation
          isDarkMode={isDarkMode}
          toggleDarkMode={toggleDarkMode}
          openLoginModal={openLoginModal}
        />
      )}

      <Routes>
        <Route
          path="/"
          element={
            <>
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

        <Route
          path="/admin"
          element={token ? <Admin /> : <Navigate to="/" />}
        />
      </Routes>

      <Footer isDarkMode={isDarkMode} />
    </div>
  );
}

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [token, setToken] = useState(sessionStorage.getItem('authToken'));

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleLogin = (supabaseToken) => {
    setToken(supabaseToken);
    sessionStorage.setItem('authToken', supabaseToken);
  };

  const openLoginModal = () => {
    setIsLoginModalOpen(true);
  };

  const closeLoginModal = () => {
    setIsLoginModalOpen(false);
  };

  return (
    <Router>
      <AppContent
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
        isLoginModalOpen={isLoginModalOpen}
        openLoginModal={openLoginModal}
        closeLoginModal={closeLoginModal}
        handleLogin={handleLogin}
        token={token}
      />
    </Router>
  );
}

export default App;