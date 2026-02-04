"use client";

type ExportPanelProps = {
  onDownloadSvg: () => void;
  onDownloadPng: (size: number) => void;
  onDownloadPdf: (format: "a4" | "a3" | "square") => void;
  onDownloadZip: () => void;
  isBusy: boolean;
};

export default function ExportPanel({
  onDownloadSvg,
  onDownloadPng,
  onDownloadPdf,
  onDownloadZip,
  isBusy,
}: ExportPanelProps) {
  return (
    <section className="rounded-none border border-zinc-200 bg-white/80 p-6 shadow-sm backdrop-blur dark:border-zinc-800 dark:bg-zinc-900/70">
      <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
        Export
      </h2>
      <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
        Export print-safe assets in multiple formats.
      </p>

      <div className="mt-6 grid gap-3">
        <button
          className="rounded-none bg-zinc-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-60"
          onClick={onDownloadZip}
          disabled={isBusy}
        >
          Export all (ZIP)
        </button>
        <div className="grid grid-cols-2 gap-3">
          <button
            className="rounded-none border border-zinc-200 px-4 py-2 text-sm font-medium text-zinc-800 transition hover:border-zinc-300 hover:bg-zinc-100 disabled:cursor-not-allowed disabled:opacity-60 dark:border-zinc-700 dark:text-zinc-100 dark:hover:bg-zinc-800"
            onClick={onDownloadSvg}
            disabled={isBusy}
          >
            Download SVG
          </button>
          <button
            className="rounded-none border border-zinc-200 px-4 py-2 text-sm font-medium text-zinc-800 transition hover:border-zinc-300 hover:bg-zinc-100 disabled:cursor-not-allowed disabled:opacity-60 dark:border-zinc-700 dark:text-zinc-100 dark:hover:bg-zinc-800"
            onClick={() => onDownloadPng(1024)}
            disabled={isBusy}
          >
            PNG 1024px
          </button>
          <button
            className="rounded-none border border-zinc-200 px-4 py-2 text-sm font-medium text-zinc-800 transition hover:border-zinc-300 hover:bg-zinc-100 disabled:cursor-not-allowed disabled:opacity-60 dark:border-zinc-700 dark:text-zinc-100 dark:hover:bg-zinc-800"
            onClick={() => onDownloadPng(512)}
            disabled={isBusy}
          >
            PNG 512px
          </button>
          <button
            className="rounded-none border border-zinc-200 px-4 py-2 text-sm font-medium text-zinc-800 transition hover:border-zinc-300 hover:bg-zinc-100 disabled:cursor-not-allowed disabled:opacity-60 dark:border-zinc-700 dark:text-zinc-100 dark:hover:bg-zinc-800"
            onClick={() => onDownloadPng(2048)}
            disabled={isBusy}
          >
            PNG 2048px
          </button>
        </div>
        <div className="grid grid-cols-3 gap-3">
          <button
            className="rounded-none border border-zinc-200 px-3 py-2 text-xs font-medium text-zinc-800 transition hover:border-zinc-300 hover:bg-zinc-100 disabled:cursor-not-allowed disabled:opacity-60 dark:border-zinc-700 dark:text-zinc-100 dark:hover:bg-zinc-800"
            onClick={() => onDownloadPdf("a4")}
            disabled={isBusy}
          >
            PDF A4
          </button>
          <button
            className="rounded-none border border-zinc-200 px-3 py-2 text-xs font-medium text-zinc-800 transition hover:border-zinc-300 hover:bg-zinc-100 disabled:cursor-not-allowed disabled:opacity-60 dark:border-zinc-700 dark:text-zinc-100 dark:hover:bg-zinc-800"
            onClick={() => onDownloadPdf("a3")}
            disabled={isBusy}
          >
            PDF A3
          </button>
          <button
            className="rounded-none border border-zinc-200 px-3 py-2 text-xs font-medium text-zinc-800 transition hover:border-zinc-300 hover:bg-zinc-100 disabled:cursor-not-allowed disabled:opacity-60 dark:border-zinc-700 dark:text-zinc-100 dark:hover:bg-zinc-800"
            onClick={() => onDownloadPdf("square")}
            disabled={isBusy}
          >
            PDF Poster
          </button>
        </div>
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          EPS export is optional and currently not enabled.
        </p>
      </div>
    </section>
  );
}
