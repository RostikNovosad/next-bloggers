export type Post = {
  id: string;
  title: string;
  caption: string;
  likes: string;
  comments: number;
  date: string;
  /** Photo in /public; a tinted placeholder is shown until it exists */
  image?: string;
  /** CSS object-position for non-4:5 photos, e.g. "38% 50%" */
  imagePosition?: string;
};

export type Message = { from: "user" | "ai"; text: string };

export type Blogger = {
  id: string;
  name: string;
  handle: string;
  gender: "male" | "female";
  niche: string;
  tagline: string;
  bio: string;
  followers: string;
  postsCount: number;
  topics: string[];
  /** Accent hue used for the placeholder art and UI highlights */
  hue: number;
  /** Portrait path in /public; placeholder is rendered until the file exists */
  photo?: string;
  /** Face centre and zoom in the portrait, in % of the image; used to crop round avatars. */
  /** Square avatar in /public; falls back to a crop of the portrait */
  avatar?: string;
  face?: { x: number; y: number; zoom: number };
  posts: Post[];
  dialog: { greeting: string; quick: { q: string; a: string }[] };
};

export const TELEGRAM_URL = "https://t.me/";

export const bloggers: Blogger[] = [
  {
    id: "artem",
    name: "Артем Волков",
    handle: "@artem.volkov",
    gender: "male",
    niche: "Технології та бізнес",
    tagline: "Розбираю AI-продукти та стартапи без води",
    bio: "Засновник двох стартапів, щодня тестує нові AI-інструменти й ділиться висновками: що справді економить час, а що лише гарно виглядає в демо.",
    followers: "248K",
    postsCount: 312,
    topics: ["AI-інструменти", "Стартапи", "Продуктивність"],
    hue: 215,
    photo: "/images/artem.jpeg",
    avatar: "/images/artem-avatar.jpeg",
    face: { x: 48, y: 31, zoom: 1.9 },
    posts: [
      { id: "a1", title: "Мій стек на 2026", caption: "Сім інструментів, якими я користуюся щодня, і два, від яких відмовився.", likes: "12.4K", comments: 318, date: "2 дні тому", image: "/content/artem/1.jpeg" },
      { id: "a2", title: "Як запустити MVP за тиждень", caption: "Покроковий план без зайвих дзвінків і презентацій.", likes: "9.8K", comments: 204, date: "5 днів тому", image: "/content/artem/2.jpeg" },
      { id: "a3", title: "AI-агенти в робочих процесах", caption: "Де агенти вже приносять гроші, а де залишаються іграшкою.", likes: "15.1K", comments: 422, date: "тиждень тому", image: "/content/artem/3.jpeg", imagePosition: "38% 50%" },
      { id: "a4", title: "Робоче місце", caption: "Мінімалізм, один монітор і жодних сповіщень.", likes: "7.2K", comments: 96, date: "2 тижні тому", image: "/content/artem/4.jpeg" },
    ],
    dialog: {
      greeting: "Привіт! Я Артем. Питай про AI-інструменти, стартапи чи продуктивність.",
      quick: [
        { q: "З чого почати роботу з AI?", a: "Обери одну рутинну задачу, наприклад розбір листів, і автоматизуй її. Не став десять сервісів одразу: один робочий сценарій краще за будь-який стек." },
        { q: "Яким інструментом ти користуєшся найчастіше?", a: "Мовною моделлю для чернеток і аналізу. Вона не замінює рішення, але заощаджує мені близько двох годин на день." },
      ],
    },
  },
  {
    id: "maksim",
    name: "Максим Север",
    handle: "@maksim.sever",
    gender: "male",
    niche: "Спорт і подорожі",
    tagline: "Маршрути, тренування та місця, які варто побачити",
    bio: "Бігає гірські марафони й знімає подорожі на ходу. Показує маршрути, спорядження та чесні підсумки кожної поїздки.",
    followers: "186K",
    postsCount: 274,
    topics: ["Трейлраннінг", "Подорожі", "Спорядження"],
    hue: 28,
    photo: "/images/maksym.jpeg",
    avatar: "/images/maksym-avatar.jpeg",
    face: { x: 50, y: 35, zoom: 3.2 },
    posts: [
      { id: "m1", title: "Стежка над хмарами", caption: "Сорок кілометрів, три перевали та світанок на висоті 2800 метрів.", likes: "18.9K", comments: 540, date: "вчора" },
      { id: "m2", title: "Що в рюкзаку", caption: "Легкий набір на два дні в горах: вага та список.", likes: "11.3K", comments: 267, date: "4 дні тому" },
      { id: "m3", title: "Ранкове тренування", caption: "Двадцять хвилин, які замінюють годину в залі.", likes: "8.6K", comments: 131, date: "тиждень тому" },
      { id: "m4", title: "Тихі місця Європи", caption: "П'ять напрямків без натовпів туристів.", likes: "13.7K", comments: 389, date: "2 тижні тому" },
    ],
    dialog: {
      greeting: "Привіт! Я Максим. Можу підказати маршрут, підготовку до забігу чи список речей у поїздку.",
      quick: [
        { q: "Як підготуватися до першого трейлу?", a: "Три місяці: біг по пагорбах двічі на тиждень, довге тренування у вихідні та обов'язково відпрацювання харчування на ходу." },
        { q: "Куди поїхати в перший похід?", a: "Почни з маршруту на один-два дні зі зрозумілою стежкою та стоянками. Головне, щоб був запас часу, а не рекорд." },
      ],
    },
  },
  {
    id: "alisa",
    name: "Аліса Мерін",
    handle: "@alisa.merin",
    gender: "female",
    niche: "Мода та стиль",
    tagline: "Образи на щодень і капсульний гардероб",
    bio: "Стилістка й авторка капсульних гардеробів. Збирає образи з базових речей і показує, як виглядати дорого без зайвих витрат.",
    followers: "412K",
    postsCount: 486,
    topics: ["Капсульний гардероб", "Образи", "Б'юті"],
    hue: 335,
    photo: "/images/alisa.jpeg",
    avatar: "/images/alisa-avatar.jpeg",
    face: { x: 51, y: 27, zoom: 3.6 },
    posts: [
      { id: "l1", title: "Осінній капсульний гардероб", caption: "Дванадцять речей, з яких збирається тридцять образів.", likes: "24.6K", comments: 712, date: "сьогодні" },
      { id: "l2", title: "Базове пальто", caption: "Як вибрати модель, яка прослужить п'ять сезонів.", likes: "16.2K", comments: 358, date: "3 дні тому" },
      { id: "l3", title: "Образ на вечір", caption: "Одна сукня і три способи її носити.", likes: "19.4K", comments: 431, date: "тиждень тому" },
      { id: "l4", title: "Аксесуари", caption: "Дрібниці, що змінюють образ цілком.", likes: "10.8K", comments: 187, date: "2 тижні тому" },
    ],
    dialog: {
      greeting: "Привіт! Я Аліса. Допоможу скласти образ або розібрати гардероб.",
      quick: [
        { q: "З чого почати капсульний гардероб?", a: "Випиши, що носиш найчастіше, і обери один кольоровий орієнтир. Потім додавай речі, які поєднуються щонайменше з трьома іншими." },
        { q: "Як виглядати дорого без великих витрат?", a: "Стеж за посадкою та тканиною. Добре сидяча проста річ виграє в дорогої, але не за фігурою." },
      ],
    },
  },
  {
    id: "vera",
    name: "Віра Лансер",
    handle: "@vera.lancer",
    gender: "female",
    niche: "Лайфстайл і wellness",
    tagline: "Спокійний ритм, звички та гарні будні",
    bio: "Пише про звички, затишні простори й усвідомлений ритм життя. Показує, як вибудувати день так, щоб залишався час на себе.",
    followers: "329K",
    postsCount: 398,
    topics: ["Звички", "Дім і затишок", "Подорожі"],
    hue: 160,
    photo: "/images/vira.jpeg",
    avatar: "/images/vira-avatar.jpeg",
    face: { x: 47, y: 31, zoom: 2.1 },
    posts: [
      { id: "v1", title: "Ранок без поспіху", caption: "Мій розпорядок перших двох годин дня.", likes: "21.3K", comments: 603, date: "вчора" },
      { id: "v2", title: "Домашній куточок", caption: "Як за вихідні зробити місце для відпочинку.", likes: "14.5K", comments: 289, date: "3 дні тому" },
      { id: "v3", title: "Кав'ярні міста", caption: "Добірка місць, де добре працювати й думати.", likes: "12.1K", comments: 245, date: "тиждень тому" },
      { id: "v4", title: "Вечірній ритуал", caption: "Прості кроки, після яких легко засинати.", likes: "17.8K", comments: 394, date: "2 тижні тому" },
    ],
    dialog: {
      greeting: "Привіт! Я Віра. Розповім про звички, затишок і спокійний ритм.",
      quick: [
        { q: "Як почати вставати раніше?", a: "Зсувай підйом на п'ятнадцять хвилин кожні кілька днів і заздалегідь готуй увечері все на ранок. Різкі ривки не працюють." },
        { q: "Як знайти час на себе?", a: "Заблокуй у календарі одну годину як зустріч. Вона має бути такою ж обов'язковою, як робочий дзвінок." },
      ],
    },
  },
];

export const getBlogger = (id: string) => bloggers.find((b) => b.id === id);
