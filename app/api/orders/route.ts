import { NextResponse } from "next/server";
import { listActiveOrders, listAllOrders } from "@/lib/order-store";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const includeAll = searchParams.get("all") === "1";

  return NextResponse.json({
    orders: includeAll ? listAllOrders() : listActiveOrders(),
  });
}
