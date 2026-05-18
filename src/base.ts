export type CollectionName = "work" | "articles" | "projects";

export type GlobalSite = {
  title: string;
  description: string;
  author: string;
  authorPhotoSrc: string;
  logo?: {
    darkThemeSrc?: string;
    lightThemeSrc?: string;
  };
};

export const GLOBAL: GlobalSite = {
  title: "Mohamed Moughamir — Senior Full-Stack Developer",
  description:
    "Senior full-stack developer in Morocco building practical web products with React, TypeScript, Node.js, PHP, Python, and AI-assisted delivery.",
  author: "Mohamed Moughamir",
  authorPhotoSrc: "https://github.com/moughamir.png",
  logo: {
    darkThemeSrc: "https://github.com/moughamir.png",
    lightThemeSrc: "https://github.com/moughamir.png",
  },
};

type CollectionSite = {
  pageSize: number;
};

type HomeSite = {
  blogEntries?: number;
  projectEntries?: number;
  workEntries?: number;
};

export const HOME: HomeSite = {
  blogEntries: 3,
  projectEntries: 3,
  workEntries: 3,
};

type BlogSite = CollectionSite & {
  license: {
    name: string;
    href: string;
  };
};

export const BLOG: BlogSite = {
  pageSize: 10,
  license: {
    name: "CC BY 4.0",
    href: "https://creativecommons.org/licenses/by/4.0/",
  },
};
