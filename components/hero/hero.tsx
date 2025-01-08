"use client";

import { useState, useEffect, useRef } from "react";
import { GetInTouch } from "../form/contact";

export default function HeroImage() {
  const [, setScrollPosition] = useState(0);

  const handleScroll = () => {
    setScrollPosition(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const parallaxRef = useRef<HTMLDivElement | null>(null);

  const handleParallax = () => {
    if (parallaxRef.current) {
      const offset = window.scrollY;
      parallaxRef.current.style.backgroundPositionY = `${offset * 0.9}px`;
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleParallax);
    return () => window.removeEventListener("scroll", handleParallax);
  }, []);
  return (
    <section
      ref={parallaxRef}
      style={{ backgroundImage: "url(/cover.jpeg)" }}
      className="relative bg-cover  flex justify-center items-center bg-no-repeat  h-screen"
    >
      <div className="text-center text-white bg-transparent  w-full h-full mix-blend-difference flex flex-col justify-center gap-20 p-8 container">
        <h1
          className="relative  text-zinc-100 text-8xl font-serif font-extrabold hover:text-shadow-[0px_-5px_#ec2225,0px_5px_#00c2cb,-5px_0px_#ec2225,5px_0px_#00c2cb] before:content-[attr(data-text)] before:absolute before:top-0 before:left-0 before:text-[#25F4EE] before:z-[-1] hover:before:animate-glitch hover:before:z-[1] mix-blend-exclusion before:text-8xl"
          data-text="Mohamed MOUGHAMIR"
        >
          Mohamed MOUGHAMIR
        </h1>
        <h2 className="text-2xl mb-8  mix-blend-exclusion font-bold">
          Front-End Developer
        </h2>

        <GetInTouch />
      </div>
    </section>
  );
}
