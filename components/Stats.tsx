export default function Stats() {
  return (
    <section className="bg-[#050B14] py-24">

      <div className="mx-auto max-w-7xl px-6">

        <div className="mb-16 text-center">

          <p className="mb-4 uppercase tracking-[0.45em] text-emerald-400">
            PREMIER FOOTBALL AGENCY
          </p>

          <h2 className="text-5xl font-black text-white">
            Наши результаты
          </h2>

        </div>

        <div className="grid gap-8 md:grid-cols-4">

          <div className="rounded-3xl border border-white/10 bg-[#0B1523] p-10 text-center transition duration-500 hover:-translate-y-2 hover:border-emerald-500">

            <h3 className="text-6xl font-black text-emerald-400">
              120+
            </h3>

            <p className="mt-4 text-zinc-300">
              Профессиональных игроков
            </p>

          </div>

          <div className="rounded-3xl border border-white/10 bg-[#0B1523] p-10 text-center transition duration-500 hover:-translate-y-2 hover:border-emerald-500">

            <h3 className="text-6xl font-black text-emerald-400">
              40+
            </h3>

            <p className="mt-4 text-zinc-300">
              Клубов-партнёров
            </p>

          </div>

          <div className="rounded-3xl border border-white/10 bg-[#0B1523] p-10 text-center transition duration-500 hover:-translate-y-2 hover:border-emerald-500">

            <h3 className="text-6xl font-black text-emerald-400">
              18
            </h3>

            <p className="mt-4 text-zinc-300">
              Стран
            </p>

          </div>

          <div className="rounded-3xl border border-white/10 bg-[#0B1523] p-10 text-center transition duration-500 hover:-translate-y-2 hover:border-emerald-500">

            <h3 className="text-6xl font-black text-emerald-400">
              15
            </h3>

            <p className="mt-4 text-zinc-300">
              Лет опыта
            </p>

          </div>

        </div>

      </div>

    </section>
  );
}
