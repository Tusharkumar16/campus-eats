"use client";

import { useEffect, useState } from "react";
import {
  ORDER_STATUS_FLOW,
  type Order,
  type OrderStatus,
} from "@/lib/order-store";

export function VendorDashboardClient() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [busyOrderId, setBusyOrderId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const loadOrders = async () => {
    try {
      const response = await fetch("/api/orders", { cache: "no-store" });
      if (!response.ok) throw new Error("Unable to load active orders");
      const data = (await response.json()) as { orders: Order[] };
      setOrders(data.orders);
      setError(null);
    } catch (fetchError) {
      setError(
        fetchError instanceof Error
          ? fetchError.message
          : "Unable to load active orders",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadOrders();
    const interval = window.setInterval(() => {
      void loadOrders();
    }, 5000);

    return () => window.clearInterval(interval);
  }, []);

  const updateStatus = async (orderId: string, status?: OrderStatus) => {
    setBusyOrderId(orderId);
    try {
      const response = await fetch(`/api/orders/${orderId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(status ? { status } : { action: "advance" }),
      });

      if (!response.ok) throw new Error("Unable to update order");
      await loadOrders();
    } catch (updateError) {
      setError(
        updateError instanceof Error
          ? updateError.message
          : "Unable to update order",
      );
    } finally {
      setBusyOrderId(null);
    }
  };

  return (
    <div className="space-y-4">
      <header className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur sm:p-6">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-amber-200">
          Vendor Dashboard
        </p>
        <h1 className="mt-2 text-2xl font-semibold text-white sm:text-3xl">
          Active Orders
        </h1>
        <p className="mt-2 text-sm text-slate-300">
          Update statuses here. Student tracking pages refresh automatically
          every 5 seconds.
        </p>
      </header>

      {error ? (
        <div className="rounded-2xl border border-red-400/30 bg-red-500/10 p-4 text-sm text-red-200">
          {error}
        </div>
      ) : null}

      {loading ? (
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-300">
          Loading active orders...
        </div>
      ) : null}

      {!loading && orders.length === 0 ? (
        <div className="rounded-2xl border border-emerald-300/20 bg-emerald-400/10 p-5 text-sm text-emerald-100">
          No active orders. All caught up.
        </div>
      ) : null}

      <section className="grid gap-4">
        {orders.map((order) => (
          <article
            key={order.id}
            className="rounded-3xl border border-white/10 bg-slate-900/80 p-4 shadow-lg shadow-black/20"
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-xs text-slate-400">{order.restaurant}</p>
                <h2 className="text-lg font-semibold text-white">
                  #{order.id} • {order.customerName}
                </h2>
                <p className="mt-1 text-sm text-slate-300">
                  {order.items.join(", ")}
                </p>
              </div>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-slate-200">
                {order.status}
              </span>
            </div>

            <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
              <button
                type="button"
                disabled={busyOrderId === order.id}
                onClick={() => void updateStatus(order.id)}
                className="h-11 rounded-2xl bg-emerald-400 px-4 text-sm font-semibold text-slate-950 transition hover:bg-emerald-300 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {busyOrderId === order.id ? "Updating..." : "Advance Status"}
              </button>
              <div className="grid grid-cols-3 gap-2">
                {ORDER_STATUS_FLOW.map((status) => (
                  <button
                    key={status}
                    type="button"
                    disabled={busyOrderId === order.id || order.status === status}
                    onClick={() => void updateStatus(order.id, status)}
                    className={`h-11 rounded-2xl border px-2 text-xs font-semibold transition ${
                      order.status === status
                        ? "border-emerald-300/40 bg-emerald-400/15 text-emerald-100"
                        : "border-white/10 bg-white/5 text-slate-200 hover:bg-white/10"
                    } disabled:cursor-not-allowed disabled:opacity-70`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
