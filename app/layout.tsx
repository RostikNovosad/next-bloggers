import type { Metadata, Viewport } from "next";
import { Manrope } from "next/font/google";
import "aos/dist/aos.css";
import "./globals.css";
import AosInit from "@/components/AosInit";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin", "cyrillic"],
});

export const metadata: Metadata = {
  title: "Persona — AI-вітрина блогерів",
  description: "Каталог віртуальних AI-блогерів: профілі, стрічка публікацій і діалог в одному місці.",
};

export const viewport: Viewport = { themeColor: "#0b0c10" };

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="uk" className={`${manrope.variable} h-full`}>
      <body className="min-h-full flex flex-col">
        <AosInit />
        {children}
      </body>
    </html>
  );
}
