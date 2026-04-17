"use client";

/* eslint-disable @next/next/no-img-element */

import { PHO_GIA_COMPANY } from "@/lib/phogia";

export default function FloatingContact() {
  return (
    <div className="fixed bottom-6 right-4 z-40 flex flex-col items-end gap-3 md:right-6">
      <a
        href={PHO_GIA_COMPANY.zalo}
        target="_blank"
        rel="noreferrer"
        className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-[0_10px_25px_rgba(0,0,0,0.18)]"
        aria-label="Zalo"
      >
        <img src={PHO_GIA_COMPANY.zaloIcon} alt="Zalo" className="h-7 w-7" />
      </a>
      <a
        href="#consultation"
        className="flex h-16 w-16 items-center justify-center rounded-full border border-[#d9c9a5] bg-[#fffaf0] text-center text-[9px] font-semibold uppercase leading-tight text-[#6b95a2] shadow-[0_10px_25px_rgba(0,0,0,0.16)]"
      >
        KTS
        <br />
        tư vấn
      </a>
    </div>
  );
}
