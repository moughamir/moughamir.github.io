import About from "@/components/about/about";
import Footer from "@/components/footer/footer";

import HeroImage from "@/components/hero/hero";
import Projects from "@/components/projects/projects";

export default function Home() {
  return (
    <div>
      <main className="bg-gray-900 bg-hero bg-no-repeat bg-cover bg-fixed flex-col gap-8 flex">
        <HeroImage />

        <About />

        <Projects />

        <Footer />
      </main>
    </div>
  );
}
