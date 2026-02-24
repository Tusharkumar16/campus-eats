"use client";

import { useEffect, useState } from "react";

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
};

const DISMISS_KEY = "campus-eats-pwa-banner-dismissed";

export function PwaInstallBanner() {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [dismissed, setDismissed] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const standalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window.navigator as any).standalone === true;

    const mobile = window.matchMedia("(max-width: 768px)").matches;
    setIsMobile(mobile);

    const wasDismissed = window.localStorage.getItem(DISMISS_KEY) === "1";
    setDismissed(wasDismissed || standalone);

    const onBeforeInstallPrompt = (event: Event) => {
      event.preventDefault();
      setDeferredPrompt(event as BeforeInstallPromptEvent);
      setDismissed(false);
    };

    window.addEventListener("beforeinstallprompt", onBeforeInstallPrompt);

    return () => {
      window.removeEventListener("beforeinstallprompt", onBeforeInstallPrompt);
    };
  }, []);

  if (!isMobile || dismissed || !deferredPrompt) {
    return null;
  }

  const handleDismiss = () => {
    window.localStorage.setItem(DISMISS_KEY, "1");
    setDismissed(true);
  };

  const handleInstall = async () => {
    await deferredPrompt.prompt();
    const choice = await deferredPrompt.userChoice;
    if (choice.outcome === "accepted") {
      setDeferredPrompt(null);
      setDismissed(true);
      return;
    }

    handleDismiss();
  };

  return (
    <div className="fixed inset-x-3 bottom-4 z-50 rounded-2xl border border-emerald-300/20 bg-slate-900/95 p-3 shadow-2xl shadow-black/40 backdrop-blur sm:hidden">
      <div className="flex items-start gap-3">
        <div className="mt-0.5 h-9 w-9 shrink-0 rounded-xl bg-emerald-400/20 text-center text-lg leading-9 text-emerald-200">
          +
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-white">Add to Home Screen</p>
          <p className="mt-1 text-xs leading-5 text-slate-300">
            Install Campus Eats for faster access and an app-like experience.
          </p>
          <div className="mt-3 flex gap-2">
            <button
              type="button"
              onClick={() => void handleInstall()}
              className="h-9 rounded-xl bg-emerald-400 px-3 text-xs font-semibold text-slate-950"
            >
              Install
            </button>
            <button
              type="button"
              onClick={handleDismiss}
              className="h-9 rounded-xl border border-white/10 bg-white/5 px-3 text-xs font-semibold text-slate-200"
            >
              Dismiss
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
