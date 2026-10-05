import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageDecor from "@/components/PageDecor";
import ProfileView from "@/components/ProfileView";
import BloggerCardTall from "@/components/BloggerCardTall";
import TelegramButton from "@/components/TelegramButton";
import { TelegramIcon } from "@/components/Icons";
import { bloggers, getBlogger } from "@/lib/bloggers";

export function generateStaticParams() {
  return bloggers.map((b) => ({ id: b.id }));
}

export async function generateMetadata({ params }: PageProps<"/[id]">): Promise<Metadata> {
  const { id } = await params;
  const b = getBlogger(id);
  return b ? { title: `${b.name} — Persona`, description: b.tagline } : {};
}

export default async function BloggerPage({ params }: PageProps<"/[id]">) {
  const { id } = await params;
  const blogger = getBlogger(id);
  if (!blogger) notFound();

  const index = bloggers.findIndex((b) => b.id === blogger.id);
  const prev = bloggers[(index + bloggers.length - 1) % bloggers.length];
  const next = bloggers[(index + 1) % bloggers.length];
  const others = bloggers.filter((b) => b.id !== blogger.id);
  const firstName = blogger.name.split(" ")[0];

  // The page takes on the blogger's own colour.
  const tone = {
    "--tone": `hsl(${blogger.hue} 70% 38%)`,
    "--tone-soft": `hsl(${blogger.hue} 80% 93%)`,
  } as CSSProperties;

  return (
    <>
      <Header />
      <main className="relative flex-1 overflow-x-clip pb-16" style={tone}>
        <PageDecor hue={blogger.hue} />

        <nav aria-label="Навігація" className="container-x relative pt-5">
          <ol className="flex items-center gap-2 text-sm text-muted">
            <li>
              <Link href="/#bloggers" className="transition-colors hover:text-text">
                Блогери
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li aria-current="page" className="font-medium text-text">
              {blogger.name}
            </li>
          </ol>
        </nav>

        <ProfileView blogger={blogger} prev={prev} next={next} />

        <section className="container-x relative mt-16">
          <div
            data-aos="fade-up"
            className="rounded-3xl bg-accent px-6 py-12 text-center text-white sm:px-12 sm:py-14"
          >
            <span className="mx-auto grid size-14 place-items-center rounded-full bg-white/20">
              <TelegramIcon className="size-7" />
            </span>
            <h2 className="mx-auto mt-6 max-w-2xl text-2xl font-bold leading-tight sm:text-3xl">
              {firstName} відповідає в Telegram
            </h2>
            <p className="mx-auto mt-4 max-w-md text-white/80">
              Ексклюзивні публікації та живі відповіді виходять у каналі.
            </p>
            <TelegramButton variant="light" className="mt-8 w-full sm:w-auto" />
          </div>
        </section>

        <section className="container-x relative mt-16">
          <h2 data-aos="fade-up" className="text-2xl font-bold">
            Інші блогери
          </h2>
          <div className="-mx-4 mt-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 sm:-mx-6 sm:px-6 md:mx-0 md:grid md:grid-cols-3 md:gap-6 md:overflow-visible md:px-0">
            {others.map((b, i) => (
              <div key={b.id} className="w-[78%] shrink-0 snap-start sm:w-[45%] md:w-auto">
                <BloggerCardTall blogger={b} index={i} />
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
