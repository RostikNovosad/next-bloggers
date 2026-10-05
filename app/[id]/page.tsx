import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Portrait from "@/components/Portrait";
import ProfileTabs from "@/components/ProfileTabs";
import TelegramButton from "@/components/TelegramButton";
import BloggerCard from "@/components/BloggerCard";
import { BackIcon } from "@/components/Icons";
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

  const others = bloggers.filter((b) => b.id !== blogger.id);

  return (
    <>
      <Header />
      <main className="flex-1 pb-24 md:pb-0">
        <div className="container-x pt-6">
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-text">
            <BackIcon /> Усі блогери
          </Link>
        </div>

        <section className="container-x mt-5">
          <div
            className="grid gap-8 rounded-[2rem] p-3 sm:p-4 md:grid-cols-[minmax(0,24rem)_1fr] md:items-center md:gap-14 md:p-6"
            style={{ background: `hsl(${blogger.hue} 75% 93%)` }}
          >
            <div data-aos="fade-up">
              <Portrait
                blogger={blogger}
                priority
                sizes="(min-width: 768px) 24rem, 100vw"
                className="arch aspect-[4/5] w-full"
              />
            </div>
            <div data-aos="fade-up" data-aos-delay="100" className="px-2 pb-4 md:px-0 md:pb-0">
              <p className="text-xs text-muted">{blogger.niche}</p>
              <h1 className="mt-3 font-display text-3xl font-semibold leading-tight sm:text-5xl">
                {blogger.name}
              </h1>
              <p className="mt-2 text-sm text-muted">{blogger.handle}</p>
              <p className="mt-6 max-w-xl text-base leading-relaxed sm:text-lg">{blogger.bio}</p>

              <dl className="mt-8 flex max-w-md gap-12 border-y border-black/10 py-5">
                <div>
                  <dt className="text-sm text-muted">Підписники</dt>
                  <dd className="mt-1 font-display text-2xl font-semibold">{blogger.followers}</dd>
                </div>
                <div>
                  <dt className="text-sm text-muted">Публікації</dt>
                  <dd className="mt-1 font-display text-2xl font-semibold">{blogger.postsCount}</dd>
                </div>
              </dl>

              <p className="mt-5 text-sm text-muted">{blogger.topics.join("  ·  ")}</p>

              <div className="mt-8 hidden md:block">
                <TelegramButton />
              </div>
            </div>
          </div>
        </section>

        <ProfileTabs blogger={blogger} />

        <section className="container-x mt-24">
          <h2 className="font-display text-2xl font-semibold sm:text-3xl">Інші блогери</h2>
          <div className="mt-6 grid gap-5 md:grid-cols-3">
            {others.map((b, i) => (
              <BloggerCard key={b.id} blogger={b} index={i} wide={false} />
            ))}
          </div>
        </section>
      </main>

      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-bg/90 p-3 backdrop-blur-md md:hidden">
        <TelegramButton className="w-full" />
      </div>
      <Footer />
    </>
  );
}
