import { renderPwaIcon } from "@/lib/pwa-icon";

export async function GET() {
  return renderPwaIcon({ size: 192, labelSize: 22 });
}
