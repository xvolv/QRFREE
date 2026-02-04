"use client";

import { useState } from "react";
import { BrowserMultiFormatReader } from "@zxing/browser";

type ValidationPanelProps = {
  payload: string;
  errorCorrection: string;
  margin: number;
};

export default function ValidationPanel({
  payload,
  errorCorrection,
  margin,
}: ValidationPanelProps) {
  const [decoded, setDecoded] = useState<string>("");
  const [decodeError, setDecodeError] = useState<string>("");

  const runDecode = async (file: File) => {
    setDecodeError("");
    setDecoded("");

    const reader = new BrowserMultiFormatReader();
    const imageUrl = URL.createObjectURL(file);

    try {
      const result = await reader.decodeFromImageUrl(imageUrl);
      setDecoded(result.getText());
    } catch (error) {
      setDecodeError("Unable to decode the uploaded QR. Try a clearer image.");
    } finally {
      URL.revokeObjectURL(imageUrl);
    }
  };

  const warnings: string[] = [];
  if (margin < 2) {
    warnings.push("Quiet zone is below recommended minimum.");
  }
  if (errorCorrection !== "H") {
    warnings.push("Error correction is below H for maximum reliability.");
  }

  return (
    <section className="rounded-none border border-zinc-200 bg-white/80 p-6 shadow-sm backdrop-blur dark:border-zinc-800 dark:bg-zinc-900/70">
      <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
        Validation
      </h2>
      <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
        Decode existing QRs and review risk analysis.
      </p>

      <div className="mt-6 grid gap-4 text-sm text-zinc-600 dark:text-zinc-300">
        <label className="grid gap-2">
          Upload QR to decode
          <input
            type="file"
            accept="image/*"
            onChange={(event) => {
              const file = event.target.files?.[0];
              if (file) runDecode(file);
            }}
          />
        </label>
        {decoded && (
          <div className="rounded-none border border-zinc-200 bg-zinc-50 p-3 text-sm text-zinc-800 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100">
            Decoded payload: <span className="font-medium">{decoded}</span>
          </div>
        )}
        {decodeError && (
          <div className="rounded-none border border-red-200 bg-red-50 p-3 text-sm text-red-700 dark:border-red-900 dark:bg-red-950 dark:text-red-200">
            {decodeError}
          </div>
        )}

        <div className="grid gap-2">
          <h3 className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">
            Risk analysis
          </h3>
          {warnings.length === 0 ? (
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              No immediate risks detected for the current config.
            </p>
          ) : (
            <ul className="list-disc space-y-1 pl-5">
              {warnings.map((warning) => (
                <li key={warning}>{warning}</li>
              ))}
            </ul>
          )}
        </div>

        <div className="rounded-none border border-dashed border-zinc-200 p-3 text-xs text-zinc-500 dark:border-zinc-700 dark:text-zinc-400">
          Advanced checks (contrast, inversion, logo coverage) are planned for
          Phase 2.
        </div>
      </div>

      <div className="mt-6 rounded-none border border-zinc-200 bg-zinc-50 p-3 text-xs text-zinc-500 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-400">
        Current payload preview: <span className="font-medium">{payload}</span>
      </div>
    </section>
  );
}
