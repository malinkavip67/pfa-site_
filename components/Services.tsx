export default function Services() {
  const services = [
    {
      number: "01",
      title: "Трансферы",
      text: "Организация международных переходов игроков и переговоров с клубами.",
    },
    {
      number: "02",
      title: "Контракты",
      text: "Подготовка и сопровождение контрактов с полной юридической защитой.",
    },
    {
      number: "03",
      title: "Скаутинг",
      text: "Поиск перспективных футболистов и продвижение талантов.",
    },
    {
      number: "04",
      title: "Личный бренд",
      text: "Развитие медиа, социальных сетей и коммерческих контрактов игрока.",
    },
  ];

  return (
    <section className="bg-[#08111d] py-28">
      <div className="mx-auto max-w-7xl px-6">

        <div className="mb-20">

          <p className="mb-3 uppercase tracking-[0.45em] text-emerald-400">
            SERVICES
          </p>

          <h2 className="text-5xl font-black text-white">
            Что мы предлагаем
          </h2>

        </div>

        <div className="grid gap-8 md:grid-cols-2">

          {services.map((item) => (
            <div
              key={item.number}
              className="group rounded-3xl border border-white/10 bg-[#0c1726] p-10 transition duration-500 hover:border-emerald-500 hover:-translate-y-2"
            >
              <span className="text-6xl font-black text-emerald-500/30 transition group-hover:text-emerald-400">
                {item.number}
              </span>

              <h3 className="mt-6 text-3xl font-bold text-white">
                {item.title}
              </h3>

              <p className="mt-5 leading-8 text-zinc-400">
                {item.text}
              </p>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}
