import React from 'react';

function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 py-4 px-6 text-center">
      <p className="text-sm leading-relaxed">
        Loosely designed in{' '}
        <a
          href="https://www.figma.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-indigo-600 dark:text-indigo-400 hover:text-tertiary-purple transition-colors duration-200"
        >
          Figma
        </a>{' '}
        and coded in{' '}
        <a
          href="https://code.visualstudio.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-indigo-600 dark:text-indigo-400 hover:text-tertiary-purple transition-colors duration-200"
        >
          Visual Studio Code
        </a>{' '}
        by yours truly. Built in{' '}
        <a
          href="https://reactjs.org/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-indigo-600 dark:text-indigo-400 hover:text-tertiary-purple transition-colors duration-200"
        >
          React
        </a>{' '}
        and{' '}
        <a
          href="https://tailwindcss.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-indigo-600 dark:text-indigo-400 hover:text-tertiary-purple transition-colors duration-200"
        >
          Tailwind CSS
        </a>
        , deployed with{' '}
        <a
          href="https://vercel.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-indigo-600 dark:text-indigo-400 hover:text-tertiary-purple transition-colors duration-200"
        >
          Vercel
        </a>
        , using{' '}
        <a
          href="https://supabase.io/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-indigo-600 dark:text-indigo-400 hover:text-tertiary-purple transition-colors duration-200"
        >
          Supabase
        </a>{' '}
        for the database.
      </p>
    </footer>
  );
}

export default Footer;