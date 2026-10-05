import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "aos/dist/aos.css";
import "./globals.css";
import AosInit from "@/components/AosInit";

const inter = Inter({ variable: "--font-inter", subsets: ["latin", "cyrillic"] });
export const metadata: Metadata = {
  title: "Persona — AI-вітрина блогерів",
  description: "Каталог віртуальних AI-блогерів: профілі, стрічка публікацій і діалог в одному місці.",
};

export const viewport: Viewport = { themeColor: "#f1f3f6" };

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="uk" className={`${inter.variable} h-full`}>
      <body className="flex min-h-full flex-col pt-[65px]">
        <AosInit />
        {children}
      </body>
    </html>
  );
}
