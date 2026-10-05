import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BloggerCard from "@/components/BloggerCard";
import Stories from "@/components/Stories";
import PhoneChat from "@/components/PhoneChat";
import TelegramButton from "@/components/TelegramButton";
import { bloggers } from "@/lib/bloggers";
import { ArrowIcon, TelegramIcon } from "@/components/Icons";

const steps = [
  { title: "Оберіть блогера", text: "Чотири персонажі з різним стилем, темою та характером." },
  { title: "Вивчіть профіль", text: "Стрічка публікацій і короткий діалог покажуть, як звучить блогер." },
  { title: "Продовжте в Telegram", text: "Підписуйтеся на канал і спілкуйтеся з персонажем напряму." },
];

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="container-x grid items-center gap-10 pt-8 pb-4 sm:pt-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          <div>
            <h1 data-aos="fade-up" className="text-[clamp(2.25rem,6.5vw,4.5rem)] font-bold leading-[1.05]">
              Блогери, з якими можна <span className="text-accent">поговорити</span>
            </h1>
            <p data-aos="fade-up" data-aos-delay="80" className="mt-5 max-w-lg text-base leading-relaxed text-muted sm:text-lg">
              Дивіться історії та публікації, ставте питання в чаті й переходьте до Telegram, щоб продовжити розмову.
            </p>
            <div data-aos="fade-up" data-aos-delay="160" className="mt-8">
              <p className="mb-3 text-sm font-semibold text-muted">Історії</p>
              <Stories bloggers={bloggers} />
            </div>
            <div data-aos="fade-up" data-aos-delay="240" className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href="#bloggers" className="btn btn-dark">
                Обрати блогера
                <ArrowIcon className="size-4 rotate-90" />
              </a>
              <TelegramButton />
            </div>
          </div>
          <div data-aos="fade-up" data-aos-delay="200" className="hidden lg:block">
            <PhoneChat blogger={bloggers[0]} />
          </div>
        </section>

        <section id="bloggers" className="container-x mt-16 scroll-mt-20 sm:mt-24">
          <h2 className="mb-6 text-2xl font-bold sm:text-3xl">Блогери</h2>
          <div className="grid gap-5 md:grid-cols-2 md:gap-6">
            {bloggers.map((b) => (
              <BloggerCard key={b.id} blogger={b} />
            ))}
          </div>
        </section>

        <section id="how" className="container-x mt-24 scroll-mt-20">
          <h2 data-aos="fade-up" className="text-2xl font-bold sm:text-3xl">Як це працює</h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-3 sm:gap-4">
            {steps.map((s, i) => (
              <div key={s.title} data-aos="fade-up" data-aos-delay={i * 100} className="rounded-2xl border border-line bg-surface p-6">
                <span className="grid size-10 place-items-center rounded-full bg-accent font-bold text-white">{i + 1}</span>
                <h3 className="mt-5 text-lg font-bold">{s.title}</h3>
                <p className="mt-2 leading-relaxed text-muted">{s.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="container-x mt-16">
          <div data-aos="fade-up" className="rounded-3xl bg-accent px-6 py-12 text-center text-white sm:px-12 sm:py-16">
            <span className="mx-auto grid size-14 place-items-center rounded-full bg-white/20"><TelegramIcon className="size-7" /></span>
            <h2 className="mx-auto mt-6 max-w-2xl text-2xl font-bold leading-tight sm:text-4xl">
              Більше контенту та живе спілкування в Telegram
            </h2>
            <p className="mx-auto mt-4 max-w-md text-white/80">
              Ексклюзивні публікації та відповіді блогерів виходять у нашому каналі.
            </p>
            <TelegramButton variant="light" className="mt-8 w-full sm:w-auto" />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
