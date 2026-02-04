import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-50 px-6 py-16 text-zinc-900 dark:bg-black dark:text-zinc-100">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-12">
        <header className="flex flex-col gap-4">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-zinc-500 dark:text-zinc-400">
            QRFREE
            <span className="animated-snake mx-5">
              <Link
                className="relative inline-flex items-center justify-center rounded-none bg-white px-7 py-2 text-xs font-semibold text-zinc-900 shadow-[0_8px_18px_rgba(15,23,42,0.14)] transition hover:shadow-[0_10px_22px_rgba(15,23,42,0.18)]"
                href="/app"
              >
                try it now
              </Link>
            </span>
          </p>
          <h1 className="text-4xl font-semibold tracking-tight">
            QR engineering without lock-in.
          </h1>
          <p className="max-w-2xl text-lg text-zinc-600 dark:text-zinc-400">
            A privacy-respecting QR toolkit for developers and designers who
            care about standards compliance, print safety, and long-term
            reliability.
          </p>
        </header>

        <section className="grid gap-6 lg:grid-cols-3">
          {[
            {
              title: "Standards-first output",
              body: "Generate ISO/IEC 18004 compliant QR codes with enforced quiet zones and configurable error correction.",
            },
            {
              title: "Print-safe exports",
              body: "Export SVG, PNG, and PDF assets ready for digital and large-format print workflows.",
            },
            {
              title: "Transparent by design",
              body: "No cookies, no profiling, and an escape hatch for self-hosted redirects.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-none border border-zinc-200 bg-white/80 p-6 text-sm text-zinc-600 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/70 dark:text-zinc-300"
            >
              <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
                {item.title}
              </h3>
              <p className="mt-2">{item.body}</p>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}
