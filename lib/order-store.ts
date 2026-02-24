export type OrderStatus = "Received" | "Preparing" | "Ready";

export interface Order {
  id: string;
  restaurant: string;
  customerName: string;
  items: string[];
  status: OrderStatus;
  createdAt: string;
  updatedAt: string;
}

const STATUS_FLOW: OrderStatus[] = ["Received", "Preparing", "Ready"];

type StoreShape = {
  orders: Map<string, Order>;
};

declare global {
  // eslint-disable-next-line no-var
  var __campusEatsStore__: StoreShape | undefined;
}

function nowIso() {
  return new Date().toISOString();
}

function seedStore(): StoreShape {
  const timestamp = nowIso();
  const seededOrders: Order[] = [
    {
      id: "CHK1906",
      restaurant: "UTK Kitchen",
      customerName: "Alex",
      items: ["Orange Chicken Bowl", "Iced Tea"],
      status: "Preparing",
      createdAt: timestamp,
      updatedAt: timestamp,
    },
    {
      id: "PND2042",
      restaurant: "Panda Express",
      customerName: "Jordan",
      items: ["Plate: Chow Mein + Beijing Beef"],
      status: "Received",
      createdAt: timestamp,
      updatedAt: timestamp,
    },
    {
      id: "SUB4418",
      restaurant: "Subway",
      customerName: "Taylor",
      items: ["Turkey Footlong", "Chips"],
      status: "Preparing",
      createdAt: timestamp,
      updatedAt: timestamp,
    },
    {
      id: "RUB7310",
      restaurant: "Rubios",
      customerName: "Casey",
      items: ["Fish Taco Trio"],
      status: "Received",
      createdAt: timestamp,
      updatedAt: timestamp,
    },
  ];

  return {
    orders: new Map(seededOrders.map((order) => [order.id, order])),
  };
}

function getStore(): StoreShape {
  if (!global.__campusEatsStore__) {
    global.__campusEatsStore__ = seedStore();
  }

  return global.__campusEatsStore__;
}

export function getOrderById(id: string): Order | undefined {
  return getStore().orders.get(id);
}

export function listActiveOrders(): Order[] {
  return Array.from(getStore().orders.values())
    .filter((order) => order.status !== "Ready")
    .sort((a, b) => a.createdAt.localeCompare(b.createdAt));
}

export function listAllOrders(): Order[] {
  return Array.from(getStore().orders.values()).sort((a, b) =>
    a.createdAt.localeCompare(b.createdAt),
  );
}

export function updateOrderStatus(
  id: string,
  nextStatus: OrderStatus,
): Order | undefined {
  const current = getStore().orders.get(id);

  if (!current) {
    return undefined;
  }

  const updated: Order = {
    ...current,
    status: nextStatus,
    updatedAt: nowIso(),
  };

  getStore().orders.set(id, updated);
  return updated;
}

export function advanceOrderStatus(id: string): Order | undefined {
  const current = getStore().orders.get(id);

  if (!current) {
    return undefined;
  }

  const currentIndex = STATUS_FLOW.indexOf(current.status);
  const nextStatus =
    currentIndex >= 0 && currentIndex < STATUS_FLOW.length - 1
      ? STATUS_FLOW[currentIndex + 1]
      : current.status;

  return updateOrderStatus(id, nextStatus);
}

export function isOrderStatus(value: string): value is OrderStatus {
  return STATUS_FLOW.includes(value as OrderStatus);
}

export const ORDER_STATUS_FLOW = STATUS_FLOW;
