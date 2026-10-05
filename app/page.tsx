import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BloggerCard from "@/components/BloggerCard";
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
        <section className="container-x pt-14 pb-12 sm:pt-24 sm:pb-16">
          <p data-aos="fade-up" className="text-sm font-medium text-accent">
            AI-вітрина блогерів
          </p>
          <h1
            data-aos="fade-up"
            data-aos-delay="80"
            className="mt-4 max-w-3xl text-[2.5rem] font-extrabold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl"
          >
            Знайомтеся з цифровими блогерами нового покоління
          </h1>
          <p data-aos="fade-up" data-aos-delay="160" className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            Чотири персонажі, чотири образи. Оберіть того, хто вам ближчий, перегляньте стрічку та поспілкуйтеся з ним.
          </p>
          <div data-aos="fade-up" data-aos-delay="240" className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href="#bloggers" className="btn btn-ghost">
              Обрати блогера
              <ArrowIcon className="size-4 rotate-90" />
            </a>
            <TelegramButton />
          </div>
        </section>

        <section id="bloggers" className="container-x scroll-mt-20">
          <div className="mb-6 flex items-end justify-between sm:mb-8">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Блогери</h2>
            <span className="text-sm text-muted">{bloggers.length} персонажі</span>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
            {bloggers.map((b, i) => (
              <BloggerCard key={b.id} blogger={b} index={i} />
            ))}
          </div>
        </section>

        <section id="how" className="container-x mt-24 scroll-mt-20">
          <h2 data-aos="fade-up" className="text-2xl font-bold tracking-tight sm:text-3xl">
            Як це працює
          </h2>
          <div className="mt-8 grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-3">
            {steps.map((s, i) => (
              <div key={s.n} data-aos="fade-up" data-aos-delay={i * 100} className="bg-surface p-6 sm:p-8">
                <span className="text-sm font-semibold text-accent">{s.n}</span>
                <h3 className="mt-6 text-lg font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{s.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="container-x mt-24">
          <div
            data-aos="fade-up"
            className="rounded-3xl border border-line bg-gradient-to-br from-surface-2 to-surface px-6 py-12 text-center sm:px-12 sm:py-16"
          >
            <h2 className="mx-auto max-w-xl text-2xl font-bold tracking-tight sm:text-4xl">
              Більше контенту та живе спілкування в Telegram
            </h2>
            <p className="mx-auto mt-4 max-w-md text-muted">
              Ексклюзивні публікації та відповіді блогерів виходять у нашому каналі.
            </p>
            <TelegramButton className="mt-8 w-full sm:w-auto" />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
