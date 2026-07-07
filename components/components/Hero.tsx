import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">

      <div className="relative h-screen w-full">

        <Image
          src="/images/stadium-hero.jpg"
          alt="Premier Football Agency"
          fill
          priority
          className="object-cover object-center"
        />

        {/* Overlay */}

        <div className="absolute inset-0 bg-black/60" />

        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, rgba(4,8,15,.92) 0%, rgba(4,8,15,.75) 35%, rgba(4,8,15,.25) 70%, rgba(4,8,15,0) 100%)",
          }}
        />

        <div className="absolute inset-0">

          <div className="mx-auto flex h-full max-w-7xl items-center px-8">

            <div className="max-w-3xl">

              <p className="mb-5 text-sm font-semibold uppercase tracking-[0.55em] text-emerald-400">

                PREMIER FOOTBALL AGENCY

              </p>

              <h1 className="leading-none">

                <span className="block text-[68px] font-black uppercase tracking-tight text-white xl:text-[110px]">
                  WE BUILD
                </span>

                <span className="block text-[74px] font-black uppercase tracking-tight text-emerald-400 xl:text-[120px]">
                  CHAMPIONS
                </span>

              </h1>

              <p className="mt-8 max-w-2xl text-lg leading-8 text-zinc-200">

                Международное футбольное агентство нового поколения.
                Мы сопровождаем профессиональных игроков,
                организуем трансферы,
                заключаем контракты
                и строим карьеру мирового уровня.

              </p><div className="mt-12 flex flex-wrap gap-5">

  <a
    href="/players"
    className="rounded-full bg-emerald-500 px-10 py-5 text-lg font-bold text-black transition duration-300 hover:scale-105 hover:bg-emerald-400"
  >
    Наши игроки
  </a>

  <a
    href="/contacts"
    className="rounded-full border border-white/30 bg-white/10 px-10 py-5 text-lg font-bold text-white backdrop-blur-md transition duration-300 hover:bg-white/20"
  >
    Связаться
  </a>

</div>

<div className="mt-20 grid max-w-3xl grid-cols-3 gap-6">

  <div className="rounded-3xl border border-white/10 bg-white/10 p-8 backdrop-blur-xl">

    <h2 className="text-5xl font-black text-emerald-400">
      120+
    </h2>

    <p className="mt-2 text-sm uppercase tracking-widest text-white">
      Профессиональных игроков
    </p>

  </div>

  <div className="rounded-3xl border border-white/10 bg-white/10 p-8 backdrop-blur-xl">

    <h2 className="text-5xl font-black text-emerald-400">
      40+
    </h2>

    <p className="mt-2 text-sm uppercase tracking-widest text-white">
      Клубов-партнёров
    </p>

  </div>

  <div className="rounded-3xl border border-white/10 bg-white/10 p-8 backdrop-blur-xl">

    <h2 className="text-5xl font-black text-emerald-400">
      18
    </h2>

    <p className="mt-2 text-sm uppercase tracking-widest text-white">
      Стран мира
    </p>

  </div>

</div>
