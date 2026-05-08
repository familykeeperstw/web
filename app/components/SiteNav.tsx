"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import LoginZone from "./LoginZone";

const navItems = [
  { name: "婚前預備", href: "/pre-marital" },
  { name: "婚姻成長", href: "/marriage" },
  { name: "親職陪伴", href: "/parenting" },
  { name: "輔導協談", href: "/counseling" },
  { name: "學習資源", href: "/resources" },
  { name: "策略夥伴", href: "/partnership" },
  { name: "認識真愛", href: "/about" },
  { name: "支持我們", href: "/support" },
];

export default function SiteNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav className="fixed left-0 right-0 top-0 z-[1000] flex h-20 items-center border-b border-[#D1739C]/10 bg-white shadow-sm">
      <div className="mx-auto flex w-full max-w-[1440px] items-center justify-between px-6">
        <Link href="/" onClick={() => setOpen(false)} className="flex items-center transition-transform hover:scale-[1.01]">
          <div className="rounded-lg border border-[#D1739C]/10 bg-white p-1">
            <img src="/FK_logo.jpg" alt="Logo" className="h-10 w-auto object-contain md:h-11" />
          </div>
        </Link>

        <div className="hidden items-center gap-5 xl:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`whitespace-nowrap text-[13px] font-bold transition-colors ${
                pathname === item.href ? "text-[#B5548A]" : "text-[#B5548A]/60 hover:text-[#B5548A]"
              }`}
            >
              {item.name}
            </Link>
          ))}
          <LoginZone />
        </div>

        <button
          type="button"
          aria-label={open ? "關閉選單" : "開啟選單"}
          aria-expanded={open}
          onClick={() => setOpen((current) => !current)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#FCF8F5] text-[#B5548A] shadow-sm xl:hidden"
        >
          <span className="material-symbols-outlined text-3xl">{open ? "close" : "menu"}</span>
        </button>
      </div>

      <div
        className={`fixed inset-x-0 top-20 z-[999] border-b border-[#D1739C]/10 bg-[linear-gradient(145deg,#FCF8F5_0%,#FFFFFF_100%)] px-6 py-6 shadow-2xl transition-[opacity,transform,visibility] duration-300 xl:hidden ${
          open ? "visible pointer-events-auto translate-y-0 opacity-100" : "invisible pointer-events-none -translate-y-3 opacity-0"
        }`}
      >
        <div className="mx-auto grid max-w-xl gap-3">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={`rounded-2xl px-5 py-4 text-lg font-black transition ${
                pathname === item.href ? "bg-[#B5548A] text-white" : "bg-white/75 text-[#B5548A]"
              }`}
            >
              {item.name}
            </Link>
          ))}
          <div className="mt-2 rounded-2xl bg-white/75 p-4">
            <LoginZone />
          </div>
        </div>
      </div>
    </nav>
  );
}
