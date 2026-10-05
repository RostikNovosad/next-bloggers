import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BloggerCard from "@/components/BloggerCard";
import HeroArches from "@/components/HeroArches";
import TelegramButton from "@/components/TelegramButton";
import { bloggers } from "@/lib/bloggers";
import { ArrowIcon } from "@/components/Icons";

const steps = [
  { n: "01", title: "Оберіть блогера", text: "Чотири персонажі з різним стилем, темою та характером." },
  { n: "02", title: "Вивчіть профіль", text: "Стрічка публікацій і короткий діалог покажуть, як звучить блогер." },
  { n: "03", title: "Продовжте в Telegram", text: "Підписуйтеся на канал і спілкуйтеся з персонажем напряму." },
];

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="container-x pt-10 pb-6 sm:pt-16 md:pb-20">
          <p data-aos="fade-up" className="text-xs text-muted sm:text-sm">
            AI-вітрина блогерів
          </p>
          <h1
            data-aos="fade-up"
            data-aos-delay="80"
            className="mt-5 max-w-5xl font-display text-[clamp(2rem,7.4vw,5.25rem)] font-semibold leading-[1.04]"
          >
            Чотири блогери, <span className="text-accent">яких не існує</span>
          </h1>
          <div className="mt-6 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <p data-aos="fade-up" data-aos-delay="160" className="max-w-md text-base leading-relaxed text-muted sm:text-lg">
              У кожного власний голос, стиль і стрічка. Відкрийте профіль, перегляньте публікації та поставте питання.
            </p>
            <div data-aos="fade-up" data-aos-delay="240" className="flex flex-col gap-3 sm:flex-row">
              <a href="#bloggers" className="btn btn-dark">
                Обрати блогера
                <ArrowIcon className="size-4 rotate-90" />
              </a>
              <TelegramButton />
            </div>
          </div>
          <div className="mt-12 md:mt-16">
            <HeroArches bloggers={bloggers} />
          </div>
        </section>

        <section id="bloggers" className="container-x scroll-mt-20 md:mt-4">
          <div className="mb-8">
            <h2 className="font-display text-2xl font-semibold sm:text-4xl">Блогери</h2>
          </div>
          <div className="flex flex-col gap-5 sm:gap-6">
            {bloggers.map((b, i) => (
              <BloggerCard key={b.id} blogger={b} index={i} />
            ))}
          </div>
        </section>

        <section id="how" className="container-x mt-28 scroll-mt-20">
          <h2 data-aos="fade-up" className="font-display text-2xl font-semibold sm:text-4xl">
            Як це працює
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {steps.map((s, i) => (
              <div key={s.n} data-aos="fade-up" data-aos-delay={i * 100} className="rounded-3xl bg-surface p-6 sm:p-8">
                <span className="text-sm text-accent">{s.n}</span>
                <h3 className="mt-8 font-display text-lg font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{s.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="container-x mt-24">
          <div
            data-aos="fade-up"
            className="rounded-[2rem] bg-accent px-6 py-14 text-center text-white sm:px-12 sm:py-20"
          >
            <h2 className="mx-auto max-w-2xl font-display text-2xl font-semibold leading-tight sm:text-4xl">
              Більше контенту та живе спілкування в Telegram
            </h2>
            <p className="mx-auto mt-5 max-w-md text-white/75">
              Ексклюзивні публікації та відповіді блогерів виходять у нашому каналі.
            </p>
            <TelegramButton variant="light" className="mt-9 w-full sm:w-auto" />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
