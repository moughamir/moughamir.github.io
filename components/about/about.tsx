import { Separator } from "../ui/separator";

export default function About() {
  return (
    <section
      id="about"
      className="container mx-auto px-4 py-12  rounded-t-3xl  z-10   relative  backdrop-brightness-50  backdrop-blur-xl bg-zinc-950/25 border border-purple-400 drop-shadow-lg "
    >
      <div className="text-center mb-12   border drop-shadow-xl shadow shadow-slate-100 backdrop-blur-md p-8 mix-blend-difference rounded-t-xl rounded-b-sm">
        <h2 className="text-6xl font-bold mb-4 text-white ">About Me</h2>
        <Separator />
        <p className="text-2xl  max-w-prose  p-8 text-white">
          Welcome to my corner of the web!
          <br /> I&apos;m <strong>Mohamed Moughamir</strong>, a passionate
          front-end developer with over 9 years of experience in crafting
          responsive and user-friendly web applications.
          <br />
          Whether you&apos;re looking to collaborate on a project, need expert
          advice, or simply want to connect, I&apos;m here to help.
          <br /> Specializing in React, TypeScript, and TailwindCSS, I bring a
          creative and technical approach to every project.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="bg-white/10 backdrop-blur-sm dark:bg-gray-700 p-8 rounded-lg shadow-lg border mix-blend-difference hover:scale-105 transform-cpu transition-all ease-linear">
          <h3 className="text-2xl font-bold mb-4 text-gray-50">Skills</h3>
          <Separator />
          <ul className="list-disc pl-6 text-gray-50 dark:text-gray-300 p-2">
            <li>HTML5 & CSS3</li>
            <li>JavaScript & TypeScript</li>
            <li>React & Next.js</li>
            <li>TailwindCSS</li>
            <li>WebGL</li>
          </ul>
        </div>
        <div className="bg-white/10 backdrop-blur-sm dark:bg-gray-700 p-8 rounded-lg shadow-lg border mix-blend-difference hover:scale-105 transform-cpu transition-all ease-linear">
          <h3 className="text-2xl font-bold mb-4 text-gray-50">Experience</h3>
          <ul className="list-disc pl-6  text-gray-50 dark:text-gray-300 p-2">
            <li>Senior Front-End Developer at SpotBills (2021 - Present)</li>
            <li>Web Developer at Anteco Systems (2020 - 2021)</li>
            <li>Front-End Team Lead at Alphorm (2018 - 2020)</li>
            <li>Front-End Developer at MyAstro.fr (2016 - 2028)</li>
          </ul>
        </div>
        <div className="bg-white/10 backdrop-blur-sm dark:bg-gray-700 p-8 rounded-lg shadow-lg border mix-blend-difference hover:scale-105 transform-cpu transition-all ease-linear">
          <h3 className="text-2xl font-bold mb-4 text-gray-50">Education</h3>
          <ul className="list-disc pl-6 text-gray-50 dark:text-gray-300 p-2">
            <li>Bachelor of Science in Computer Science</li>
            <li>University of Technology</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
