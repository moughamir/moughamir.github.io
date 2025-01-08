import { GithubIcon, InstagramIcon, LinkedinIcon } from "lucide-react";
import { Separator } from "../ui/separator";
import Link from "next/link";

const socialLinks = [
  {
    link: "https://linkedIn.com/in/moughamir",
    about: "Moughamir's LinkedIn Profile",
    icon: <LinkedinIcon />,
  },
  {
    link: "https://github.com/moughamir",
    about: "Moughamir's GitHub Profile",
    icon: <GithubIcon />,
  },
  {
    link: "https://instagram.com/omnizya",
    about: "omnizya InstaGram Gallery",
    icon: <InstagramIcon />,
  },
];
export default function Footer() {
  const now = new Date();

  return (
    <footer className="bg-gray-900/50 text-white py-6 text-center  backdrop-blur-xl">
      <div className="container mx-auto flex flex-col items-center justify-center">
        <div className="flex justify-center gap-8">
          {socialLinks.map((target, index) => (
            <Link
              href={target.link}
              className="hover:text-red-400"
              about={target.about}
              key={index}
            >
              {target.icon}
            </Link>
          ))}
        </div>
        <Separator className="my-4" />
        <p className="text-gray-300 mb-4">
          Copyright © {now.getFullYear()} Mohamed Moughamir. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
}
