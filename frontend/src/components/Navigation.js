import React, { useState, useEffect } from 'react';
import { Dialog, DialogPanel } from '@headlessui/react';
import { Bars3Icon, XMarkIcon, SunIcon, MoonIcon } from '@heroicons/react/24/outline';
import LoginModal from './LoginModal';

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
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  useEffect(() => {
    let lastScrollTop = 0;
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      setIsVisible(currentScrollPos < lastScrollTop || currentScrollPos === 0);
      setIsPastHome(currentScrollPos >= document.getElementById('home').offsetHeight - 50);
      lastScrollTop = currentScrollPos <= 0 ? 0 : currentScrollPos;
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = () => {
    setMobileMenuOpen(false); // Close mobile menu when a link is clicked
  };

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-transform duration-300 ${isVisible ? 'translate-y-0' : '-translate-y-full'
          } ${isPastHome ? 'backdrop-blur-md bg-white/70 dark:bg-gray-900/70' : 'bg-transparent'}`}
      >
        <nav aria-label="Global" className="flex items-center justify-between p-6 lg:px-8">
          <span className={`text-black dark:text-white font-extralight tracking-wide uppercase ${mobileMenuOpen ? '' : 'lg:mr-48'}`} style={{ fontSize: '30px', letterSpacing: '1.5px' }}>
            Daniel Rogerson
          </span>

          <div className="lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="-m-2.5 inline-flex items-center p-2.5 text-gray-700 dark:text-gray-300"
            >
              <Bars3Icon aria-hidden="true" className="h-6 w-6" />
            </button>
          </div>

          <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map((item) => (
              <a key={item.name} href={item.href} className="text-sm font-semibold text-gray-900 dark:text-white">
                {item.name}
              </a>
            ))}
          </div>

          <div className="hidden lg:flex lg:items-center lg:gap-x-6">
            <button
              onClick={() => setIsLoginOpen(true)}
              className="text-sm font-semibold text-gray-900 dark:text-white"
            >
              Admin <span aria-hidden="true">&rarr;</span>
            </button>

            <button onClick={toggleDarkMode} className="p-2.5 text-gray-700 dark:text-gray-300">
              {isDarkMode ? <SunIcon className="h-6 w-6" /> : <MoonIcon className="h-6 w-6" />}
            </button>
          </div>
        </nav>

        <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
          <div className="fixed inset-0 z-50" />
          <DialogPanel className={`fixed inset-y-0 right-0 z-50 w-full sm:max-w-xs overflow-y-auto ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'} p-6 ring-1 ring-gray-900/10`}>
            <div className="flex items-center justify-between">
              <button onClick={() => setMobileMenuOpen(false)} className="-m-2.5 p-2.5 text-gray-700 dark:text-gray-300">
                <XMarkIcon aria-hidden="true" className="h-6 w-6" />
              </button>
            </div>
            <div className="mt-6">
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={handleLinkClick}  // Close menu on link click
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    {item.name}
                  </a>
                ))}
              </div>

              <div className="py-6">
                <button
                  onClick={() => { setIsLoginOpen(true); setMobileMenuOpen(false); }}
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  Admin
                </button>
              </div>

              {/* Dark Mode Toggle (stays open in mobile) */}
              <div className="flex justify-center py-6">
                <button
                  onClick={() => {
                    toggleDarkMode();
                  }}
                  className="p-2.5 text-gray-700 dark:text-gray-300"
                >
                  {isDarkMode ? <SunIcon className="h-6 w-6" /> : <MoonIcon className="h-6 w-6" />}
                </button>
              </div>
            </div>
          </DialogPanel>
        </Dialog>
      </header>

      {isLoginOpen && <LoginModal onClose={() => setIsLoginOpen(false)} onLogin={(token) => { sessionStorage.setItem('authToken', token); setIsLoginOpen(false); window.location.href = '/admin'; }} />}
    </>
  );
}

export default Navigation;