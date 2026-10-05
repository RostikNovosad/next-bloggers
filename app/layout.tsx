import type { Metadata, Viewport } from "next";
import { Onest, Unbounded } from "next/font/google";
import "aos/dist/aos.css";
import "./globals.css";
import AosInit from "@/components/AosInit";

const onest = Onest({ variable: "--font-onest", subsets: ["latin", "cyrillic"] });
const unbounded = Unbounded({ variable: "--font-unbounded", subsets: ["latin", "cyrillic"] });
export const metadata: Metadata = {
  title: "Persona — AI-вітрина блогерів",
  description: "Каталог віртуальних AI-блогерів: профілі, стрічка публікацій і діалог в одному місці.",
};

export const viewport: Viewport = { themeColor: "#edeff5" };

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="uk" className={`${onest.variable} ${unbounded.variable} h-full`}>
      <body className="min-h-full flex flex-col">
        <AosInit />
        {children}
      </body>
    </html>
  );
}
