import { projects } from "@/lib/data";
import Image from "next/image";

export default function ProjectsShowcase() {
  return (
    <section
      id="projects"
      className="container mx-auto px-4 py-12 bg-zinc-50/50 backdrop-blur-sm backdrop-brightness-75 backdrop-grayscale rounded-md  "
    >
      <div className="text-center mb-12">
        <h2 className="text-9xl font-bold mb-4">Projects</h2>
        <p className="text-xl text-gray-700 dark:text-gray-300">
          A selection of my recent projects that showcase my skills and
          creativity.
        </p>
      </div>
      <div className="grid grid-cols-1  gap-2">
        {projects.map((project, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg"
          >
            <Image
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
  );
}
