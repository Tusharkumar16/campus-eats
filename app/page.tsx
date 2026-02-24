import Link from "next/link";
import { OrderQrCard } from "@/components/order-qr-card";

const restaurants = [
  "UTK Kitchen",
  "Panda Express",
  "Subway",
  "Rubios",
] as const;

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 px-4 py-6 text-slate-100 sm:px-6">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-6 pb-24 sm:gap-8">
        <header className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur sm:p-8">
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-emerald-300">
            Campus Eats
          </p>
          <h1 className="mt-3 text-2xl font-semibold leading-tight text-balance sm:text-4xl">
            Order food across campus and track pickup live.
          </h1>
          <p className="mt-3 max-w-xl text-sm leading-6 text-slate-300 sm:text-base">
            Mobile-first prototype for students and vendors. Browse restaurants,
            place campus orders, and track status from receipt to pickup.
          </p>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/order/CHK1906"
              className="h-12 rounded-2xl bg-emerald-400 px-5 text-sm font-semibold text-slate-950 transition hover:bg-emerald-300"
            >
              Track Demo Order
            </Link>
            <Link
              href="/vendor"
              className="h-12 rounded-2xl border border-white/15 bg-white/5 px-5 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Open Vendor Dashboard
            </Link>
          </div>
        </header>

        <section className="grid gap-4 sm:grid-cols-2">
          {restaurants.map((restaurant, index) => (
            <article
              key={restaurant}
              className="rounded-2xl border border-white/10 bg-slate-900/80 p-4 shadow-lg shadow-black/20"
            >
              <div className="flex items-start justify-between gap-3">
                <h2 className="text-base font-semibold">{restaurant}</h2>
                <span
                  className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                    index % 2 === 0
                      ? "bg-emerald-400/20 text-emerald-200"
                      : "bg-sky-400/20 text-sky-200"
                  }`}
                >
                  {index % 2 === 0 ? "Popular" : "Fast pickup"}
                </span>
              </div>
              <p className="mt-2 text-sm text-slate-300">
                {index === 0
                  ? "Campus kitchen favorites and daily specials."
                  : index === 1
                    ? "Quick bowls and combos for busy class days."
                    : index === 2
                      ? "Build-your-own sandwiches and wraps."
                      : "Baja-style tacos, bowls, and burritos."}
              </p>
              <div className="mt-4 flex items-center justify-between text-sm">
                <span className="text-slate-400">Open now</span>
                <span className="font-medium text-white">
                  {index === 0 ? "5-10 min" : "8-15 min"}
                </span>
              </div>
            </article>
          ))}
        </section>

        <OrderQrCard path="/order/CHK1906" />

        <section className="rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900 to-slate-800 p-5 sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-medium text-slate-200">Demo Flow</p>
              <h2 className="mt-1 text-xl font-semibold sm:text-2xl">
                Student + vendor live status sync
              </h2>
            </div>
            <Link
              href="/vendor"
              className="text-sm font-medium text-emerald-300 hover:text-emerald-200"
            >
              Manage orders
            </Link>
          </div>
          <div className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
            <div className="rounded-2xl bg-white/5 p-4">
              <p className="font-medium text-white">1. Open `/vendor`</p>
              <p className="mt-1 text-slate-300">
                Advance `CHK1906` through Received → Preparing → Ready.
              </p>
            </div>
            <div className="rounded-2xl bg-white/5 p-4">
              <p className="font-medium text-white">2. Track `/order/CHK1906`</p>
              <p className="mt-1 text-slate-300">
                Student page auto-refreshes every 5 seconds and shows a green
                banner when ready.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
