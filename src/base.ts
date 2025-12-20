export type CollectionName = "work" | "articles" | "projects";

export type GlobalSite = {
    title: string;
    description: string;
    author: string;
    authorPhotoSrc: string;
    logo?: {
        darkThemeSrc?: string;
        lightThemeSrc?: string;
    }
}

export const GLOBAL: GlobalSite = {
    title: "Moughamir Mohamed",
    description: "The personal site of Moughamir Mohamed",
    author: "Moughamir Mohamed",
    authorPhotoSrc: "https://github.com/moughamir.png",
    logo: {
        darkThemeSrc: "https://github.com/moughamir.png",
        lightThemeSrc: "https://github.com/moughamir.png",
    }
}

type CollectionSite = {
    pageSize: number;
}

type HomeSite = {
    blogEntries?: number;
    projectEntries?: number;
    workEntries?: number;
}
export const HOME: HomeSite = {
    blogEntries: 3,
    projectEntries: 3,
    workEntries: 3
}

type BlogSite = CollectionSite & {
    license: {
        name: string;
        href: string;
    }
}


export const BLOG: