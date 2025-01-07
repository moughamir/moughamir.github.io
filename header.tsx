export default function eader() {
  return (
    <header className="bg-zinc-50 text-white p-4 mix-blend-exclusion z-20 ">
      <nav className="container mx-auto flex justify-between items-center">
        <div className="text-2xl font-bold mix-blend-exclusion">Mo²</div>
        <Navigation />
      </nav>
    </header>
  );
}
