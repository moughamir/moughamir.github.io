
export interface Project {
    title: string;
    description: string;
    technologies: string[];
    imageUrl: string;
}

const projects: Project[] = [
    {
        title: "E-commerce Platform",
        description:
            "A full-stack e-commerce solution with user authentication and product management.",
        technologies: ["React", "Node.js", "MongoDB"],
        imageUrl: "https://placehold.co/400x300",
    },
    {
        title: "Personal Blog",
        description:
            "A blogging platform where users can create and share content.",
        technologies: ["Next.js", "Firebase"],
        imageUrl: "https://placehold.co/400x300",
    },
    {
        title: "Portfolio Website",
        description:
            "A modern, responsive portfolio website showcasing my projects and skills.",
        technologies: ["React", "TailwindCSS"],
        imageUrl: "https://placehold.co/400x300",
    },
];
export const userData = {
    logo: 'Mo²',
    name: "Mohamed Moughamir",
    introduction: `Highly motivated and results-oriented front-end developer
                    with 9+ years of experience building and maintaining responsive,
                    user-friendly web applications.`,
    skills: [
        'html5', 'css3', 'JavaScript',
        'ES6+', 'TypeScript',
    ],
    projects: projects,
    experience: [],
    contact: []
}

export { projects };
