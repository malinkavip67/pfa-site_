'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="fixed top-0 left-0 z-50 w-full border-b border-white/10 bg-black/40 backdrop-blur-xl">
      <div className="mx-auto flex h-24 max-w-7xl items-center justify-between px-6">

        {/* Logo */}

        <Link href="/" className="flex items-center gap-4">

          <Image
            src="/images/logo-white.png"
            alt="Premier Football Agency"
            width={70}
            height={70}
            priority
          />

          <div>
            <h2 className="text-xl font-bold tracking-[0.25em] text-white">
              PFA
            </h2>

            <p className="text-xs uppercase tracking-[0.3em] text-emerald-400">
              Premier Football Agency
            </p>
          </div>

        </Link>

        {/* Navigation */}

        <nav className="hidden items-center gap-10 lg:flex">

          <Link
            href="/"
            className="text-white transition duration-300 hover:text-emerald-400"
          >
            Главная
          </Link>

          <Link
            href="/players"
            className="text-white transition duration-300 hover:text-emerald-400"
          >
            Игроки
          </Link>

          <Link
            href="/services"
            className="text-white transition duration-300 hover:text-emerald-400"
          >
            Услуги
          </Link>

          <Link
            href="/news"
            className="text-white transition duration-300 hover:text-emerald-400"
          >
            Новости
          </Link>

          <Link
            href="/contacts"
            className="text-white transition duration-300 hover:text-emerald-400"
          >
            Контакты
          </Link>

        </nav>

        {/* Button */}

        <Link
          href="/contacts"
          className="rounded-full bg-emerald-500 px-7 py-3 text-sm font-semibold text-black transition duration-300 hover:scale-105 hover:bg-emerald-400"
        >
          Связаться
        </Link>

      </div>
    </header>
  );
}
