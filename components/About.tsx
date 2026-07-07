export default function About() {
  return (
    <section className="bg-[#07111f] py-28">

      <div className="mx-auto max-w-7xl px-6">

        <div className="grid items-center gap-20 lg:grid-cols-2">

          <div>

            <p className="mb-4 uppercase tracking-[0.45em] text-emerald-400">
              PREMIER FOOTBALL AGENCY
            </p>

            <h2 className="text-5xl font-black leading-tight text-white">

              Мы строим карьеру
              <br />
              лучших футболистов
              <br />
              мира.

            </h2>

          </div>

          <div>

            <p className="text-lg leading-9 text-zinc-300">

              Premier Football Agency сопровождает профессиональных
              футболистов на всех этапах их карьеры.

              Мы занимаемся переговорами,
              международными трансферами,
              поиском клубов,
              заключением контрактов,
              юридическим сопровождением
              и развитием личного бренда игроков.

            </p>

          </div>

        </div>

        <div className="mt-24 grid gap-8 md:grid-cols-3">

          <div className="rounded-3xl border border-white/10 bg-[#0c1828] p-10 transition duration-500 hover:-translate-y-2 hover:border-emerald-500">

            <h3 className="mb-6 text-3xl font-bold text-white">

              Трансферы

            </h3>

            <p className="leading-8 text-zinc-400">

              Организация переходов игроков между клубами Европы,
              Азии и Ближнего Востока.

            </p>

          </div>

          <div className="rounded-3xl border border-white/10 bg-[#0c1828] p-10 transition duration-500 hover:-translate-y-2 hover:border-emerald-500">

            <h3 className="mb-6 text-3xl font-bold text-white">

              Контракты

            </h3>

            <p className="leading-8 text-zinc-400">

              Полное юридическое сопровождение
              и защита интересов спортсменов.

            </p>

          </div>

          <div className="rounded-3xl border border-white/10 bg-[#0c1828] p-10 transition duration-500 hover:-translate-y-2 hover:border-emerald-500">

            <h3 className="mb-6 text-3xl font-bold text-white">

              Карьера

            </h3>

            <p className="leading-8 text-zinc-400">

              Долгосрочное развитие игроков,
              персональный менеджмент
              и международное продвижение.

            </p>

          </div>

        </div>

      </div>

    </section>
  );
}
