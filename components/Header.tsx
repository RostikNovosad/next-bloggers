import Link from "next/link";
import TelegramButton from "./TelegramButton";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 bg-gradient-to-r from-[hsl(215_90%_96%)]/85 via-[hsl(335_90%_96%)]/85 to-[hsl(28_95%_95%)]/85 backdrop-blur-md">
      <div className="container-x flex h-16 items-center justify-between">
        <Link href="/" className="text-story text-xl font-bold">
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
      <span aria-hidden className="story-ring absolute inset-x-0 bottom-0 h-px opacity-40" />
    </header>
  );
}
