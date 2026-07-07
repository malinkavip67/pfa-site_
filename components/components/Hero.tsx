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

              </p>
