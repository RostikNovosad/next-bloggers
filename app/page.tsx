import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageDecor from "@/components/PageDecor";
import BloggerCardTall from "@/components/BloggerCardTall";
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
      <main className="relative flex-1 overflow-x-clip">
        <PageDecor />
        <section className="container-x relative grid gap-y-8 pt-8 pb-4 sm:pt-12 lg:grid-cols-[1.1fr_0.9fr] lg:content-center lg:gap-x-16 lg:gap-y-0">
          <div className="lg:col-start-1 lg:row-start-1 lg:self-end">
            <h1 data-aos="fade-up" className="text-balance text-[clamp(2rem,5.2vw,3.5rem)] font-bold leading-[1.1]">
              Блогери, які <span className="text-story">відповідають</span>
            </h1>
            <p data-aos="fade-up" data-aos-delay="80" className="mt-4 max-w-md text-base leading-relaxed text-muted sm:text-lg">
              Дивіться історії, гортайте публікації й пишіть у чаті. Продовжити розмову можна в Telegram.
            </p>
          </div>
          <div className="relative py-2 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:self-center lg:py-0">
            <div aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 scale-[0.65] sm:scale-100">
              {[26, 36, 48].map((r, i) => (
                <span
                  key={r}
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border"
                  style={{ width: `${r}rem`, height: `${r}rem`, borderColor: `rgba(29, 138, 219, ${0.2 - i * 0.06})` }}
                />
              ))}
              <span className="float hidden lg:block absolute -left-[16rem] -top-[14rem] size-12 rounded-full" style={{ background: "hsl(215 85% 80%)" }} />
              <span className="float hidden lg:block absolute -right-[15rem] -top-[10rem] size-8 rounded-full" style={{ background: "hsl(335 80% 82%)", animationDelay: "-2s" }} />
              <span className="float hidden lg:block absolute -left-[14rem] top-[10rem] size-6 rounded-full" style={{ background: "hsl(160 60% 78%)", animationDelay: "-4s" }} />
              <span className="float hidden lg:block absolute -right-[16rem] top-[12rem] size-14 rounded-full" style={{ background: "hsl(28 90% 82%)", animationDelay: "-1s" }} />
            </div>
            <div data-aos="fade-up" data-aos-delay="200">
              <PhoneChat blogger={bloggers[0]} />
            </div>
          </div>
          <div className="lg:col-start-1 lg:row-start-2 lg:mt-7 lg:self-start">
            <div data-aos="fade-up" data-aos-delay="160" className="max-w-md rounded-2xl border border-line bg-surface p-4 sm:p-5">
              <div className="mb-4 flex items-baseline justify-between">
                <p className="text-sm font-bold">Історії</p>
                <p className="text-xs text-muted">Натисніть, щоб відкрити</p>
              </div>
              <Stories bloggers={bloggers} />
            </div>

            <div data-aos="fade-up" data-aos-delay="240" className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a href="#bloggers" className="btn btn-dark">
                Обрати блогера
                <ArrowIcon className="size-4 rotate-90" />
              </a>
              <TelegramButton />
            </div>
          </div>
        </section>

        <div className="relative mt-16 sm:mt-20">
          <section id="bloggers" className="container-x relative scroll-mt-20 pb-16">
            <div className="mx-auto max-w-4xl">
            <h2 className="text-2xl font-bold sm:text-3xl">Блогери</h2>
            <div className="mt-6 grid gap-5 sm:grid-cols-2 sm:gap-6">
              {bloggers.map((b, i) => (
                <BloggerCardTall key={b.id} blogger={b} index={i} />
              ))}
            </div>
            </div>
          </section>
        </div>

        <section id="how" className="container-x scroll-mt-20">
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
