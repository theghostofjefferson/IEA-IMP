import { useEffect } from "react";

import { cn } from "@/lib/utils";

declare global {
  interface Window {
    Tally?: {
      loadEmbeds?: () => void;
    };
  }
}

const SCRIPT_ID = "tally-embed-script";

export function TallyDisclosureForm({
  src,
  title,
  className,
}: {
  src: string;
  title: string;
  className?: string;
}) {
  useEffect(() => {
    const globalWindow = window as Window & { Tally?: { loadEmbeds?: () => void } };

    const runEmbeds = () => {
      if (typeof globalWindow.Tally?.loadEmbeds === "function") {
        globalWindow.Tally.loadEmbeds();
      }
    };

    if (typeof globalWindow.Tally?.loadEmbeds === "function") {
      runEmbeds();
      return;
    }

    const existingScript = document.getElementById(SCRIPT_ID) as HTMLScriptElement | null;

    if (existingScript) {
      existingScript.addEventListener("load", runEmbeds, { once: true });
      return;
    }

    const script = document.createElement("script");
    script.id = SCRIPT_ID;
    script.src = "https://tally.so/widgets/embed.js";
    script.async = true;
    script.defer = true;
    script.dataset.tallyEmbedScript = "true";
    script.onload = runEmbeds;
    document.body.appendChild(script);
  }, []);

  return (
    <iframe
      data-tally-src={src}
      title={title}
      width="100%"
      loading="lazy"
      allowTransparency
      className={cn("block w-full border-0 bg-transparent", className)}
      style={{ minHeight: "720px", height: "100%" }}
    />
  );
}
