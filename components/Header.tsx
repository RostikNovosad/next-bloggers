import Link from "next/link";
import TelegramButton from "./TelegramButton";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg/80 backdrop-blur-md">
      <div className="container-x flex h-16 items-center justify-between">
        <Link href="/" className="text-lg font-bold tracking-tight">
          Persona<span className="text-accent">.</span>
        </Link>
        <nav className="flex items-center gap-6">
          <Link href="/#bloggers" className="hidden text-sm text-muted transition-colors hover:text-text sm:block">
            Блогери
          </Link>
          <Link href="/#how" className="hidden text-sm text-muted transition-colors hover:text-text sm:block">
            Як це працює
          </Link>
          <TelegramButton label="Telegram" className="!min-h-10 !px-4 !text-sm" />
        </nav>
      </div>
    </header>
  );
}
