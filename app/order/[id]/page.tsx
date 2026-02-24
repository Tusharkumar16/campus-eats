import Link from "next/link";
import { OrderTrackingClient } from "@/components/order-tracking-client";

type PageProps = {
  params: {
    id: string;
  };
};

export default function OrderPage({ params }: PageProps) {
  return (
    <main className="min-h-screen bg-slate-950 px-4 py-6 text-slate-100 sm:px-6">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-4 pb-10">
        <Link
          href="/"
          className="inline-flex w-fit items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-200 hover:bg-white/10"
        >
          ← Back to Home
        </Link>
        <OrderTrackingClient orderId={params.id} />
      </div>
    </main>
  );
}
