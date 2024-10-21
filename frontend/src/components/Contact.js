import React from 'react';

function Contact() {
  return (
    <section id="contact" className="bg-white dark:bg-gray-900 p-10">
      <h2 className="text-3xl font-semibold text-gray-900 dark:text-white mb-4">Contact</h2>
      <p className="text-lg text-gray-700 dark:text-gray-300">
        Contact me at: <a href="mailto:myemail@example.com" className="text-indigo-600 dark:text-indigo-400">myemail@example.com</a>
      </p>
    </section>
  );
}

export default Contact;