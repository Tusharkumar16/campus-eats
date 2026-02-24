import { renderPwaIcon } from "@/lib/pwa-icon";

export async function GET() {
  return renderPwaIcon({ size: 512, labelSize: 52 });
}
