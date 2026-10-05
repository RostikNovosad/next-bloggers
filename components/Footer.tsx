const links = ['Політика конфіденційності', 'Правила використання'];

export default function Footer() {
  return (
    <footer className="mt-10 border-t border-line">
      <div className="container-x flex flex-wrap items-center justify-between gap-x-6 gap-y-2 py-4 text-sm">
        <span className="font-bold text-text">Persona</span>
        <nav className="flex flex-wrap gap-x-6 gap-y-1">
          {links.map((label) => (
            <a
              key={label}
              href="#"
              className="font-medium text-[#3d4651] transition-colors hover:text-text"
            >
              {label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
