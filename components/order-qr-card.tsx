"use client";

import Link from "next/link";
import { QRCodeSVG } from "qrcode.react";

type Props = {
  path: string;
};

export function OrderQrCard({ path }: Props) {
  return (
    <section className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur">
      <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:items-center sm:text-left">
        <div className="rounded-2xl bg-white p-3 shadow-xl shadow-black/20">
          <QRCodeSVG value={path} size={144} includeMargin />
        </div>
        <div className="flex-1">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-emerald-300">
            Quick Check-In
          </p>
          <h2 className="mt-2 text-lg font-semibold text-white sm:text-xl">
            Track sample order `CHK1906`
          </h2>
          <p className="mt-2 text-sm leading-6 text-slate-300">
            Scan this QR code to open the live tracking page and watch status
            changes from the vendor dashboard.
          </p>
          <Link
            href={path}
            className="mt-4 inline-flex h-11 items-center justify-center rounded-2xl bg-emerald-400 px-4 text-sm font-semibold text-slate-950 transition hover:bg-emerald-300"
          >
            Open Tracking Page
          </Link>
        </div>
      </div>
    </section>
  );
}
