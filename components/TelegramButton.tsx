import { TELEGRAM_URL } from "@/lib/bloggers";
import { TelegramIcon } from "./Icons";

export default function TelegramButton({
  label = "Перейти в Telegram",
  variant = "primary",
  className = "",
}: {
  label?: string;
  variant?: "primary" | "ghost";
  className?: string;
}) {
  return (
    <a
      href={TELEGRAM_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`btn ${variant === "primary" ? "btn-primary" : "btn-ghost"} ${className}`}
    >
      <TelegramIcon />
      {label}
    </a>
  );
}
