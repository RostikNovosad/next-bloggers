import Link from "next/link";
import TelegramButton from "./TelegramButton";
import { ChatIcon } from "./Icons";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-surface/90 backdrop-blur-md">
      <div className="container-x flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-lg font-bold">
          <span className="grid size-8 place-items-center rounded-lg bg-accent text-white">
            <ChatIcon className="size-4" />
          </span>
          Persona
        </Link>
        <nav className="flex items-center gap-6">
          <Link href="/#bloggers" className="hidden text-sm font-medium text-muted transition-colors hover:text-text sm:block">
            Блогери
          </Link>
          <Link href="/#how" className="hidden text-sm font-medium text-muted transition-colors hover:text-text sm:block">
            Як це працює
          </Link>
          <TelegramButton label="Telegram" className="!min-h-10 !px-4 !text-sm" />
        </nav>
      </div>
    </header>
  );
}
