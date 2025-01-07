import React, { useState, useRef, useEffect } from "react";

const App: React.FC = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleScroll = () => {
    setScrollPosition(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode);
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  const parallaxRef = useRef<HTMLDivElement | null>(null);

  const handleParallax = () => {
    if (parallaxRef.current) {
      const offset = window.scrollY;
      parallaxRef.current.style.backgroundPositionY = `${offset * 0.7}px`;
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleParallax);
    return () => window.removeEventListener("scroll", handleParallax);
  }, []);

  return (
    <div className="min- bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100">
      <header className="fixed top-0 left-0 w-full bg-white dark:bg-gray-900 z-50">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Mohamed Moughamir</h1>
          <div className="flex items-center">
            <button
              className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
              onClick={toggleDarkMode}
            >
              {isDarkMode ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 3v1m0 16v1m9 1v1a2 2 0 01-2 2H5a2 2 0 01-2-2V4h14M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.005 9.005 0 003 12h18a9.005 9.005 0 00-4.646-8.646z"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </header>

      <section
        ref={parallaxRef}
        className="relative  bg-center bg-cover flex justify-center items-center"
        style={{ backgroundImage: "url(https://placehold.co/1920x1080)" }}
      >
        <div className="text-center text-white">
          <h1 className="text-5xl font-bold mb-4">Mohamed Moughamir</h1>
          <h2 className="text-2xl mb-8">Front-End Developer</h2>
          <a
            href="#about"
            className="bg-white text-gray-900 dark:text-gray-100 px-6 py-3 rounded-full shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-300"
          >
            About Me
          </a>
        </div>
      </section>

      <section id="about" className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">About Me</h2>
          <p className="text-xl text-gray-700 dark:text-gray-300">
            Passionate front-end developer with expertise in crafting modern,
            responsive, and engaging web experiences. Specializing in React,
            TypeScript, and TailwindCSS, I bring a creative and technical
            approach to every project.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white dark:bg-gray-700 p-8 rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold mb-4">Skills</h3>
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300">
              <li>HTML5 & CSS3</li>
              <li>JavaScript & TypeScript</li>
              <li>React & Next.js</li>
              <li>TailwindCSS</li>
              <li>WebGL</li>
            </ul>
          </div>
          <div className="bg-white dark:bg-gray-700 p-8 rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold mb-4">Experience</h3>
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300">
              <li>Front-End Developer at XYZ Corp (2020 - Present)</li>
              <li>Web Developer at ABC Inc (2018 - 2020)</li>
            </ul>
          </div>
          <div className="bg-white dark:bg-gray-700 p-8 rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold mb-4">Education</h3>
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300">
              <li>Bachelor of Science in Computer Science</li>
              <li>University of Technology</li>
            </ul>
          </div>
        </div>
      </section>

      <section
        id="projects"
        className="container mx-auto px-4 py-12 bg-gray-100 dark:bg-gray-700"
      >
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Projects</h2>
          <p className="text-xl text-gray-700 dark:text-gray-300">
            A selection of my recent projects that showcase my skills and
            creativity.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg"
            >
              <img
                src={project.imageUrl}
                alt={project.title}
                className="w-full h-auto mb-4 rounded-lg"
              />
              <h3 className="text-2xl font-bold mb-4">{project.title}</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.technologies.map((tech, techIndex) => (
                  <span
                    key={techIndex}
                    className="bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 px-3 py-1 rounded-full text-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <a
                href="#"
                className="bg-blue-500 text-white px-6 py-3 rounded-full shadow-lg hover:bg-blue-600 transition-colors duration-300"
              >
                View Project
              </a>
            </div>
          ))}
        </div>
      </section>

      <footer className="bg-gray-900 text-white py-6 text-center">
        <div className="container mx-auto px-4">
          <p className="text-gray-300 mb-4">
            Copyright © 2023 Mohamed Moughamir. All rights reserved.
          </p>
          <div className="flex justify-center gap-6">
            <a
              href="#"
              className="text-gray-300 hover:text-gray-100 transition-colors duration-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M24 4.557c-.883.392-1.832.656-2.828.777l.044-.03c1.984-1.294 3.243-3.114 3.243-5.155 0-3.867-3.134-7-7-7s-7 3.133-7 7c0 2.041 1.259 3.861 3.243 5.154l-.044.03c-.996-.129-1.945-.393-2.828-.777L0 17.24V24l8.529-2.814C7.095 21.756 5.137 19.799 5.122 17.672 5.122 15.546 7.042 13.626 9.185 12.629c2.142-.996 4.329-1.562 6.697-1.562 2.368 0 4.555.566 6.697 1.562 2.143 1.004 4.062 2.924 4.062 5.051 0 1.654-.939 3.088-2.34 4.088l-.183-.016a5.144 5.144 0 00-2.208-.624l-.152-.08c-1.681-1.022-2.343-2.484-2.343-4.088 0-1.466.659-2.814 1.843-3.718L24 4.557z" />
              </svg>
            </a>
            <a
              href="#"
              className="text-gray-300 hover:text-gray-100 transition-colors duration-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M8.707 14.802a3.75 3.75 0 011.59-2.602h-.008a5.25 5.25 0 00-5.232 4.302A5.25 5.25 0 013 10.75h-.008a3.75 3.75 0 017.5 0c0 1.237-.37 2.368-.997 3.202zm6.75-1.507a3.75 3.75 0 00-1.59 2.602h.008a5.25 5.25 0 015.233-4.302 5.25 5.25 0 005.233 4.302 3.75 3.75 0 01-7.5 0h.008zm-6.364 1.328A2.917 2.917 0 018.1 10.75a2.917 2.917 0 012.916-2.916h.008a2.917 2.917 0 012.914 2.916 2.917 2.917 0 01-2.914 2.916h-.008a2.917 2.917 0 01-2.914-2.916zM8.1 17.25a2.917 2.917 0 002.916 2.916h.008a2.917 2.917 0 002.914-2.916 2.917 2.917 0 00-2.914-2.916h-.008A2.917 2.917 0 008.1 17.25zm8.775 0a2.917 2.917 0 002.916 2.916h.008a2.917 2.917 0 002.914-2.916 2.917 2.917 0 00-2.914-2.916h-.008A2.917 2.917 0 0016.875 17.25z" />
              </svg>
            </a>
            <a
              href="#"
              className="text-gray-300 hover:text-gray-100 transition-colors duration-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M24 4.557c-.883.392-1.832.656-2.828.777l.044-.03c1.984-1.294 3.243-3.114 3.243-5.155 0-3.867-3.134-7-7-7s-7 3.133-7 7c0 2.041 1.259 3.861 3.243 5.154l-.044.03c-.996-.129-1.945-.393-2.828-.777L0 17.24V24l8.529-2.814C7.095 21.756 5.137 19.799 5.122 17.672 5.122 15.546 7.042 13.626 9.185 12.629c2.142-.996 4.329-1.562 6.697-1.562 2.368 0 4.555.566 6.697 1.562 2.143 1.004 4.062 2.924 4.062 5.051 0 1.654-.939 3.088-2.34 4.088l-.183-.016a5.144 5.144 0 00-2.208-.624l-.152-.08c-1.681-1.022-2.343-2.484-2.343-4.088 0-1.466.659-2.814 1.843-3.718L24 4.557z" />
              </svg>
            </a>
            <a
              href="#"
              className="text-gray-300 hover:text-gray-100 transition-colors duration-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 22c-5.514 0-10-4.486-10-10s4.486-10 10-10 10 4.486 10 10-4.486 10-10 10zm0-2c4.411 0 8-3.589 8-8s-3.589-8-8-8-8 3.589-8 8 3.589 8 8 8zm-1-11h2v2h-2v-2zm0 4h2v4h-2v-4z" />
              </svg>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
