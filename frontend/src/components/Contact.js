import React from 'react';
import { PaperAirplaneIcon } from '@heroicons/react/24/solid'; // Importing a mail/paper plane icon

function Contact() {
  return (
    <section id="contact" className="bg-gray-100 dark:bg-gray-900 flex flex-col items-center justify-center py-16 p-10">
      {/* Paper Plane Icon */}
      <PaperAirplaneIcon className="h-12 w-12 text-tertiary-purple mb-6" />

      {/* Title */}
      <h2 className="text-[1.9rem] font-semibold text-gray-900 dark:text-white mb-4">
        Get in Touch
      </h2>

      {/* Contact Text */}
      <p className="text-[1rem] text-gray-900 dark:text-white text-center">
        Get in touch here 👉🏼 :{' '}
        <a
          href="mailto:danielmatt@hotmail.co.uk"
          className="text-tertiary-purple hover:underline"
        >
          danielmatt@hotmail.co.uk
        </a>
      </p>


      {/* CV Link */}
      <p className="text-[1rem] text-gray-900 dark:text-white text-center">
        My CV <span role="img" aria-label="document">📄</span>:{' '}
        <a
          href="https://OddFutureDaniel.github.io"
          target="_blank"
          rel="noopener noreferrer"
          className="text-tertiary-purple hover:underline"
        >
          https://OddFutureDaniel.github.io
        </a>
      </p>
    </section>
  );
}

export default Contact;