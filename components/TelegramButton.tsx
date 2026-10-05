import { TELEGRAM_URL } from "@/lib/bloggers";
import { TelegramIcon } from "./Icons";

const variants = {
  primary: "btn-primary",
  ghost: "btn-ghost",
  light: "btn-light",
} as const;

export default function TelegramButton({
  label = "Перейти в Telegram",
  variant = "primary",
  className = "",
}: {
  label?: string;
  variant?: keyof typeof variants;
  className?: string;
}) {
  return (
    <a href={TELEGRAM_URL} target="_blank" rel="noopener noreferrer" className={`btn ${variants[variant]} ${className}`}>
      <TelegramIcon />
      {label}
    </a>
  );
}
