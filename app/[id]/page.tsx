import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProfileView from "@/components/ProfileView";
import ChatListItem from "@/components/ChatListItem";
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
      <main className="flex-1">
        <div className="container-x pt-5">
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-text">
            <BackIcon /> Усі блогери
          </Link>
        </div>

        <ProfileView blogger={blogger} />

        <section className="container-x mt-16">
          <h2 className="text-xl font-bold sm:text-2xl">Інші блогери</h2>
          <div className="mt-4 grid grid-cols-[minmax(0,1fr)] gap-2 md:grid-cols-3">
            {others.map((b) => (
              <ChatListItem key={b.id} blogger={b} />
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
