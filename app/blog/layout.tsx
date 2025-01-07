export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex items-center bg-black text-zinc-200 justify-center min-h-screen px-6 gap-3">
      {children}
    </section>
  );
}
