import React, { useState, useEffect } from 'react';
import { Dialog, DialogPanel } from '@headlessui/react';
import { Bars3Icon, XMarkIcon, SunIcon, MoonIcon } from '@heroicons/react/24/outline';
import LoginModal from './LoginModal';  // Import LoginModal component

const navigation = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Projects', href: '#projects' },
  { name: 'Contact', href: '#contact' },
];

function Navigation({ isDarkMode, toggleDarkMode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isPastHome, setIsPastHome] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false); // State for login modal

  // Track scroll direction and current section (to hide/show navbar)
  useEffect(() => {
    let lastScrollTop = 0;
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;

      // If scrolling down, hide the header, if scrolling up, show it
      if (currentScrollPos > lastScrollTop) {
        setIsVisible(false); // Scrolling down
      } else {
        setIsVisible(true); // Scrolling up
      }

      // Detect if the scroll is past the Home section
      const homeSectionHeight = document.getElementById('home').offsetHeight;
      const offset = 50; // Offset to trigger the blur earlier
      if (currentScrollPos >= homeSectionHeight - offset) {
        setIsPastHome(true); // Scrolled past (with offset)
      } else {
        setIsPastHome(false); // Still in the home section
      }

      lastScrollTop = currentScrollPos <= 0 ? 0 : currentScrollPos; // Ensure it never goes negative
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleLogin = (token) => {
    sessionStorage.setItem('authToken', token);  // Store the JWT token in session storage instead of local storage
    setIsLoginOpen(false);  // Close login modal after successful login
    window.location.href = '/admin';  // Redirect to admin page
  };

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-transform duration-300 ${isVisible ? 'translate-y-0' : '-translate-y-full'
          } ${isPastHome ? 'backdrop-blur-md bg-white/70 dark:bg-gray-900/70' : 'bg-transparent'}`} // Transparent over hero section
      >
        <nav aria-label="Global" className="flex items-center justify-between p-6 lg:px-8">
          {/* Your Name */}
          <span className="text-black dark:text-white font-extralight tracking-wide uppercase mr-48" style={{ fontSize: '30px', letterSpacing: '1.5px' }}>
            Daniel Rogerson
          </span>


          {/* Mobile Menu Button */}
          <div className="flex lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700 dark:text-gray-300"
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="h-6 w-6" />
            </button>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map((item) => (
              <a key={item.name} href={item.href} className="text-sm font-semibold leading-6 text-gray-900 dark:text-white">
                {item.name}
              </a>
            ))}
          </div>

          {/* Admin Link and Dark Mode Toggle on the Right */}
          <div className="hidden lg:flex lg:flex-1 lg:justify-end items-center gap-x-6">
            {/* Admin Link */}
            <button
              onClick={() => setIsLoginOpen(true)}  // Show login modal on click
              className="text-sm font-semibold leading-6 text-gray-900 dark:text-white"
            >
              Admin <span aria-hidden="true">&rarr;</span>
            </button>

            {/* Dark/Light Mode Toggle */}
            <button onClick={toggleDarkMode} className="flex items-center justify-center rounded-md p-2.5 text-gray-700 dark:text-gray-300">
              {isDarkMode ? (
                <SunIcon className="h-6 w-6" aria-hidden="true" />
              ) : (
                <MoonIcon className="h-6 w-6" aria-hidden="true" />
              )}
              <span className="sr-only">Toggle dark mode</span>
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
          <div className="fixed inset-0 z-50" />
          <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white dark:bg-gray-900 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="-m-2.5 rounded-md p-2.5 text-gray-700 dark:text-gray-300"
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon aria-hidden="true" className="h-6 w-6" />
              </button>
            </div>

            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10 dark:divide-gray-700">
                {/* Mobile Navigation Links */}
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>

                {/* Admin Link in Mobile View */}
                <div className="py-6">
                  <button
                    onClick={() => setIsLoginOpen(true)}  // Show login modal on click
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    Admin
                  </button>
                </div>

                {/* Centered Dark/Light Mode Toggle in Mobile View */}
                <div className="flex justify-center py-6">
                  <button
                    onClick={toggleDarkMode}
                    className="flex items-center justify-center rounded-md p-2.5 text-gray-700 dark:text-gray-300"
                  >
                    {isDarkMode ? (
                      <SunIcon className="h-6 w-6" aria-hidden="true" />
                    ) : (
                      <MoonIcon className="h-6 w-6" aria-hidden="true" />
                    )}
                    <span className="sr-only">Toggle dark mode</span>
                  </button>
                </div>
              </div>
            </div>
          </DialogPanel>
        </Dialog>
      </header>

      {/* Render the LoginModal only when isLoginOpen is true */}
      {isLoginOpen && <LoginModal onClose={() => setIsLoginOpen(false)} onLogin={handleLogin} />}
    </>
  );
}

export default Navigation;