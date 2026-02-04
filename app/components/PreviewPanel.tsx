"use client";

import { useMemo } from "react";

type PreviewPanelProps = {
  svgMarkup: string;
  blur: number;
  contrast: number;
  noise: number;
  onBlurChange: (value: number) => void;
  onContrastChange: (value: number) => void;
  onNoiseChange: (value: number) => void;
};

export default function PreviewPanel({
  svgMarkup,
  blur,
  contrast,
  noise,
  onBlurChange,
  onContrastChange,
  onNoiseChange,
}: PreviewPanelProps) {
  const noiseStyle = useMemo(() => {
    if (noise <= 0) return "";
    return `linear-gradient(rgba(0,0,0,${noise / 100}), rgba(0,0,0,${
      noise / 100
    }))`;
  }, [noise]);

  return (
    <section className="rounded-none border border-zinc-200 bg-white/80 p-6 shadow-sm backdrop-blur dark:border-zinc-800 dark:bg-zinc-900/70">
      <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
        Preview
      </h2>
      <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
        Print safety simulation with blur, contrast, and noise.
      </p>

      <div className="mt-6 flex flex-col items-center gap-4">
        <div
          className="relative flex h-72 w-72 items-center justify-center rounded-none border border-dashed border-zinc-200 bg-white p-4 shadow-inner dark:border-zinc-700 dark:bg-zinc-950"
          style={{
            filter: `blur(${blur}px) contrast(${contrast}%)`,
          }}
        >
          <div
            className="absolute inset-0 rounded-none"
            style={{
              backgroundImage: noiseStyle,
              opacity: noise / 100,
              pointerEvents: "none",
            }}
          />
          <div
            className="qr-preview h-full w-full"
            dangerouslySetInnerHTML={{ __html: svgMarkup }}
          />
        </div>

        <div className="grid w-full gap-3 text-sm text-zinc-600 dark:text-zinc-300">
          <label className="grid gap-1">
            Blur (px)
            <input
              type="range"
              min={0}
              max={4}
              step={0.5}
              value={blur}
              onChange={(event) => onBlurChange(Number(event.target.value))}
            />
          </label>
          <label className="grid gap-1">
            Contrast (%)
            <input
              type="range"
              min={70}
              max={140}
              step={5}
              value={contrast}
              onChange={(event) => onContrastChange(Number(event.target.value))}
            />
          </label>
          <label className="grid gap-1">
            Noise (%)
            <input
              type="range"
              min={0}
              max={30}
              step={5}
              value={noise}
              onChange={(event) => onNoiseChange(Number(event.target.value))}
            />
          </label>
        </div>
      </div>
    </section>
  );
}
