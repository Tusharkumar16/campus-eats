"use client";

import { useEffect, useState } from "react";
import { ORDER_STATUS_FLOW, type Order } from "@/lib/order-store";

type Props = {
  orderId: string;
};

export function OrderTrackingClient({ orderId }: Props) {
  const [order, setOrder] = useState<Order | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    const fetchOrder = async () => {
      try {
        const response = await fetch(`/api/orders/${orderId}`, {
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error("Unable to load order");
        }

        const data = (await response.json()) as { order: Order };
        if (!active) return;
        setOrder(data.order);
        setError(null);
      } catch (fetchError) {
        if (!active) return;
        setError(
          fetchError instanceof Error
            ? fetchError.message
            : "Unable to load order",
        );
      } finally {
        if (active) setLoading(false);
      }
    };

    void fetchOrder();
    const interval = window.setInterval(() => {
      void fetchOrder();
    }, 5000);

    return () => {
      active = false;
      window.clearInterval(interval);
    };
  }, [orderId]);

  if (loading) {
    return (
      <div className="rounded-3xl border border-white/10 bg-white/5 p-5 text-sm text-slate-300">
        Loading order...
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="rounded-3xl border border-red-400/30 bg-red-500/10 p-5 text-sm text-red-200">
        {error ?? "Order not found"}
      </div>
    );
  }

  const ready = order.status === "Ready";
  const updatedLabel = new Date(order.updatedAt).toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
  });

  return (
    <div className="space-y-4">
      {ready ? (
        <div className="rounded-2xl border border-emerald-300/30 bg-emerald-400/20 p-4 text-emerald-100">
          <p className="text-xs font-semibold uppercase tracking-[0.2em]">
            Order Ready
          </p>
          <p className="mt-1 text-lg font-semibold">
            Your order is ready for pickup.
          </p>
        </div>
      ) : null}

      <section className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur sm:p-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-slate-300">
              Order Tracking
            </p>
            <h1 className="mt-2 text-2xl font-semibold text-white">
              Order #{order.id}
            </h1>
            <p className="mt-1 text-sm text-slate-300">{order.restaurant}</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-right">
            <p className="text-xs text-slate-400">Last refreshed</p>
            <p className="text-sm font-medium text-white">{updatedLabel}</p>
          </div>
        </div>

        <div className="mt-5 rounded-2xl border border-white/10 bg-slate-900/70 p-4">
          <p className="text-sm text-slate-300">Items</p>
          <ul className="mt-2 space-y-1 text-sm text-white">
            {order.items.map((item) => (
              <li key={item}>• {item}</li>
            ))}
          </ul>
        </div>

        <div className="mt-6 space-y-4">
          {ORDER_STATUS_FLOW.map((status, index) => {
            const orderIndex = ORDER_STATUS_FLOW.indexOf(order.status);
            const isComplete = index <= orderIndex;
            const isCurrent = status === order.status;

            return (
              <div key={status} className="flex items-start gap-3">
                <div className="mt-0.5 flex flex-col items-center">
                  <div
                    className={`h-4 w-4 rounded-full border-2 ${
                      isComplete
                        ? "border-emerald-300 bg-emerald-300"
                        : "border-white/20 bg-transparent"
                    }`}
                  />
                  {index < ORDER_STATUS_FLOW.length - 1 ? (
                    <div
                      className={`mt-1 h-10 w-0.5 ${
                        isComplete ? "bg-emerald-300/70" : "bg-white/10"
                      }`}
                    />
                  ) : null}
                </div>
                <div className="pb-3">
                  <p
                    className={`text-sm font-semibold ${
                      isCurrent ? "text-white" : "text-slate-300"
                    }`}
                  >
                    {status}
                  </p>
                  <p className="text-xs text-slate-400">
                    {isCurrent
                      ? "Current status"
                      : isComplete
                        ? "Completed"
                        : "Waiting"}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <p className="mt-2 text-xs text-slate-400">
          Auto-refreshing every 5 seconds.
        </p>
      </section>
    </div>
  );
}
