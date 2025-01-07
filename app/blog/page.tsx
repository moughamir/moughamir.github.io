import Link from "next/link";

export interface PostI {
  id: number;
  title: string;
  content: string;
  author: string;
  date: string;
  category: string;
}

export default async function Page() {
  const data = await fetch("https://api.vercel.app/blog");
  const posts = await data.json();
  return (
    <ul className="flex flex-col gap-8 p-4">
      {posts.map((post: PostI) => (
        <li key={post.id} className="text-2xl hover:text-red-400">
          <Link href={`/blog/${post.id}`}>{post.title}</Link>
        </li>
      ))}
    </ul>
  );
}
