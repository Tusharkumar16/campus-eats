import { NextResponse } from "next/server";
import {
  advanceOrderStatus,
  getOrderById,
  isOrderStatus,
  updateOrderStatus,
} from "@/lib/order-store";

export const dynamic = "force-dynamic";

type RouteContext = {
  params: {
    id: string;
  };
};

export async function GET(_: Request, { params }: RouteContext) {
  const order = getOrderById(params.id);

  if (!order) {
    return NextResponse.json({ error: "Order not found" }, { status: 404 });
  }

  return NextResponse.json({ order });
}

export async function PATCH(request: Request, { params }: RouteContext) {
  const body = (await request.json().catch(() => ({}))) as {
    action?: string;
    status?: string;
  };

  let updated;

  if (body.action === "advance") {
    updated = advanceOrderStatus(params.id);
  } else if (body.status && isOrderStatus(body.status)) {
    updated = updateOrderStatus(params.id, body.status);
  } else {
    return NextResponse.json(
      { error: "Provide action=advance or a valid status" },
      { status: 400 },
    );
  }

  if (!updated) {
    return NextResponse.json({ error: "Order not found" }, { status: 404 });
  }

  return NextResponse.json({ order: updated });
}
