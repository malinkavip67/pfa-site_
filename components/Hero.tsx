import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative h-screen overflow-hidden">

      <Image
        src="/images/stadium-hero.jpg"
        alt="Premier Football Agency"
        fill
        priority
        className="object-cover"
      />

      <div className="absolute inset-0 bg-black/65" />

      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, rgba(5,10,18,.96) 0%, rgba(5,10,18,.82) 35%, rgba(5,10,18,.35) 70%, rgba(5,10,18,0) 100%)",
        }}
      />

      <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center px-6">

        <div className="max-w-3xl">

          <p className="mb-5 uppercase tracking-[0.5em] text-emerald-400">
            PREMIER FOOTBALL AGENCY
          </p>

        <h1 className="leading-[0.9]">

  <span className="block text-[56px] font-black uppercase tracking-tight text-white md:text-[96px] xl:text-[120px]">
    МЫ СОЗДАЁМ
  </span>

  <span className="block text-[64px] font-black uppercase tracking-tight text-emerald-400 md:text-[110px] xl:text-[140px]">
    ЧЕМПИОНОВ
  </span>

</h1>

          <p className="mt-8 max-w-2xl text-lg leading-8 text-zinc-200">

            Международное футбольное агентство,
            представляющее профессиональных футболистов
            по всему миру.

            Мы сопровождаем игроков,
            организуем трансферы,
            заключаем контракты,
            защищаем интересы спортсменов
            и строим карьеру мирового уровня.

          </p>

          <div className="mt-12 flex flex-wrap gap-5">

            <a
              href="/players"
              className="rounded-full bg-emerald-500 px-10 py-5 text-lg font-bold text-black transition duration-300 hover:scale-105 hover:bg-emerald-400"
            >
              Наши игроки
            </a>

            <a
              href="/contacts"
              className="rounded-full border border-white/20 bg-white/10 px-10 py-5 text-lg font-bold text-white backdrop-blur-lg transition duration-300 hover:bg-white/20"
            >
              Связаться
            </a>

          </div>

          <div className="mt-20 grid gap-6 md:grid-cols-3">

            <div className="rounded-3xl border border-white/10 bg-white/10 p-8 backdrop-blur-xl">

              <h2 className="text-5xl font-black text-emerald-400">
                120+
              </h2>

              <p className="mt-3 text-sm uppercase tracking-[0.25em] text-white">
                Игроков
              </p>

            </div>

            <div className="rounded-3xl border border-white/10 bg-white/10 p-8 backdrop-blur-xl">

              <h2 className="text-5xl font-black text-emerald-400">
                40+
              </h2>

              <p className="mt-3 text-sm uppercase tracking-[0.25em] text-white">
                Клубов
              </p>

            </div>

            <div className="rounded-3xl border border-white/10 bg-white/10 p-8 backdrop-blur-xl">

              <h2 className="text-5xl font-black text-emerald-400">
                18
              </h2>

              <p className="mt-3 text-sm uppercase tracking-[0.25em] text-white">
                Стран
              </p>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}
