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
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-text">
            <BackIcon /> Усі блогери
          </Link>
        </div>

        <section className="container-x mt-6 grid gap-8 md:grid-cols-[minmax(0,22rem)_1fr] md:items-center md:gap-14">
          <div data-aos="fade-up">
            <Portrait
              blogger={blogger}
              priority
              sizes="(min-width: 768px) 22rem, 100vw"
              className="aspect-[4/5] w-full rounded-3xl border border-line"
            />
          </div>
          <div data-aos="fade-up" data-aos-delay="100">
            <p className="text-sm font-medium text-accent">{blogger.niche}</p>
            <h1 className="mt-3 text-4xl font-extrabold tracking-tight sm:text-5xl">{blogger.name}</h1>
            <p className="mt-1 text-muted">{blogger.handle}</p>
            <p className="mt-6 max-w-xl leading-relaxed text-text/90">{blogger.bio}</p>

            <dl className="mt-8 grid max-w-md grid-cols-2 gap-6 border-y border-line py-5">
              <div>
                <dt className="text-sm text-muted">Підписники</dt>
                <dd className="mt-1 text-2xl font-bold">{blogger.followers}</dd>
              </div>
              <div>
                <dt className="text-sm text-muted">Публікації</dt>
                <dd className="mt-1 text-2xl font-bold">{blogger.postsCount}</dd>
              </div>
            </dl>

            <p className="mt-5 text-sm text-muted">{blogger.topics.join("  ·  ")}</p>

            <div className="mt-8 hidden md:block">
              <TelegramButton />
            </div>
          </div>
        </section>

        <ProfileTabs blogger={blogger} />

        <section className="container-x mt-24">
          <h2 className="text-2xl font-bold tracking-tight">Інші блогери</h2>
          <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3">
            {others.map((b, i) => (
              <BloggerCard key={b.id} blogger={b} index={i} />
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
