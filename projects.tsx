export default function Projects() {
  return (
    <section id="projects" className="py-10">
      <h2 className="text-3xl font-bold text-center mb-6">Featured Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-xl font-bold mb-2">AE-Hub</h3>
          <p className="mb-4">
            Developed an MVP using React and a microservices architecture to
            provide a platform for auto-entrepreneurs.
          </p>
          <a
            href="https://github.com/moughamir/ae-hub"
            className="text-blue-500 hover:underline"
          >
            View Project
          </a>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-xl font-bold mb-2">MySTRY</h3>
          <p className="mb-4">
            Developed a Web Application Game to promote Quarya's services.
          </p>
          <a
            href="https://github.com/moughamir/mystry"
            className="text-blue-500 hover:underline"
          >
            View Project
          </a>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-xl font-bold mb-2">BlogFit</h3>
          <p className="mb-4">
            Created a WordPress-based health and fitness website with a mobile
            app using Cordova.
          </p>
          <a
            href="https://github.com/moughamir/blogfit"
            className="text-blue-500 hover:underline"
          >
            View Project
          </a>
        </div>
      </div>
    </section>
  );
}
