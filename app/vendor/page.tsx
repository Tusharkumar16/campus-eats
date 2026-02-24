import Link from "next/link";
import { VendorDashboardClient } from "@/components/vendor-dashboard-client";

export default function VendorPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-4 py-6 text-slate-100 sm:px-6">
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-4 pb-10">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-200 hover:bg-white/10"
          >
            ← Student Home
          </Link>
          <Link
            href="/order/CHK1906"
            className="inline-flex items-center gap-2 rounded-xl border border-emerald-300/30 bg-emerald-400/10 px-3 py-2 text-sm text-emerald-100 hover:bg-emerald-400/15"
          >
            Open Demo Order
          </Link>
        </div>
        <VendorDashboardClient />
      </div>
    </main>
  );
}
