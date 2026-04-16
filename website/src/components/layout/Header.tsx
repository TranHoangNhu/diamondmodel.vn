"use client";

/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import { useEffect, useState } from "react";
import { PHO_GIA_COMPANY, PHO_GIA_NAV } from "@/lib/phogia";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    if (mobileOpen || searchOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen, searchOpen]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#7398a4] shadow-[0_6px_24px_rgba(0,0,0,0.14)]">
        <div className="mx-auto flex h-[54px] max-w-[1180px] items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="shrink-0">
            <img src={PHO_GIA_COMPANY.logo} alt="Phố Gia" className="h-7 w-auto md:h-8" />
          </Link>

          <nav className="hidden items-center gap-6 lg:flex">
            {PHO_GIA_NAV.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-[11px] font-semibold uppercase tracking-[0.08em] text-white transition hover:text-[#f1cd8a]"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <a
              href={`tel:${PHO_GIA_COMPANY.phoneHref}`}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-[#efbf73] text-lg text-white transition hover:scale-105"
              aria-label="Gọi điện"
            >
              ☎
            </a>
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="text-xl text-white transition hover:text-[#f1cd8a]"
              aria-label="Mở tìm kiếm"
            >
              ⌕
            </button>
          </div>

          <button
            type="button"
            onClick={() => setMobileOpen((value) => !value)}
            className="flex h-10 w-10 items-center justify-center text-white lg:hidden"
            aria-label="Mở menu"
          >
            <span className="space-y-1.5">
              <span className="block h-0.5 w-5 bg-current" />
              <span className="block h-0.5 w-5 bg-current" />
              <span className="block h-0.5 w-5 bg-current" />
            </span>
          </button>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm transition ${
          searchOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <div className="mx-auto mt-24 max-w-[760px] px-4">
          <div className="rounded-[8px] bg-white p-6 shadow-2xl">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-heading text-3xl uppercase text-[#4f4b46]">Tìm kiếm</h2>
              <button
                type="button"
                onClick={() => setSearchOpen(false)}
                className="text-2xl text-[#6b95a2]"
                aria-label="Đóng"
              >
                ×
              </button>
            </div>
            <input
              type="text"
              placeholder="Nhập thông tin tìm kiếm"
              className="w-full rounded-[8px] border border-[#d8d2c8] px-4 py-3 text-[15px] outline-none placeholder:text-[#9d968d] focus:border-[#6b95a2]"
            />
          </div>
        </div>
      </div>

      <div
        className={`fixed inset-0 z-[55] bg-[rgba(76,105,114,0.96)] px-6 pb-10 pt-20 text-white transition lg:hidden ${
          mobileOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <button
          type="button"
          onClick={() => setMobileOpen(false)}
          className="absolute right-5 top-4 text-3xl"
          aria-label="Đóng menu"
        >
          ×
        </button>
        <div className="flex flex-col gap-5">
          {PHO_GIA_NAV.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className="font-heading text-3xl uppercase leading-none"
            >
              {item.label}
            </a>
          ))}
          <a href={`tel:${PHO_GIA_COMPANY.phoneHref}`} className="mt-4 text-lg font-semibold text-[#f1cd8a]">
            {PHO_GIA_COMPANY.phone}
          </a>
        </div>
      </div>
    </>
  );
}
