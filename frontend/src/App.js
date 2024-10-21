import React, { useState, useEffect } from 'react'
import Home from './components/Home'
import About from './components/About'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Navigation from './components/Navigation'

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false)

  // Load theme preference from localStorage and apply it on initial render
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme === 'dark') {
      setIsDarkMode(true)
      document.documentElement.classList.add('dark') // Add 'dark' class to <html>
    } else {
      setIsDarkMode(false)
      document.documentElement.classList.remove('dark') // Remove 'dark' class from <html>
    }
  }, [])

  // Toggle dark mode and save preference to localStorage
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
    if (!isDarkMode) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }

  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen">
      {/* Pass toggle function and current state to Navigation */}
      <Navigation isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />

      {/* Main content */}
      <main>
        <section id="home" className=" bg-white dark:bg-gray-900 shadow-md rounded-lg mb-10">
          <Home />
        </section>
        <section id="about" className="p-10 bg-white dark:bg-gray-900 shadow-md rounded-lg mb-10">
          <About />
        </section>
        <section id="projects" className="p-10 bg-white dark:bg-gray-900 shadow-md rounded-lg mb-10">
          <Projects />
        </section>
        <section id="contact" className="p-10 bg-white dark:bg-gray-900 shadow-md rounded-lg mb-10">
          <Contact />
        </section>
      </main>
    </div>
  )
}

export default App