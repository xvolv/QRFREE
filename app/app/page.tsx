"use client";

import { useEffect, useMemo, useState } from "react";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { jsPDF } from "jspdf";
import InputPanel from "@/app/components/InputPanel";
import PreviewPanel from "@/app/components/PreviewPanel";
import ExportPanel from "@/app/components/ExportPanel";
import ValidationPanel from "@/app/components/ValidationPanel";
import {
  buildPayload,
  generatePngDataUrl,
  generateSvg,
  type QRConfig,
} from "@/app/utils/qr";

const defaultConfig: QRConfig = {
  payloadType: "url",
  payload: "https://qrfree.dev",
  errorCorrection: "H",
  size: 1024,
  margin: 4,
};

type WifiConfig = {
  ssid: string;
  password: string;
  encryption: "WPA" | "WEP" | "nopass";
};

type VCardConfig = {
  name: string;
  org?: string;
  title?: string;
  phone?: string;
  email?: string;
  url?: string;
};

export default function AppPage() {
  const [config, setConfig] = useState<QRConfig>(defaultConfig);
  const [wifi, setWifi] = useState<WifiConfig>({
    ssid: "",
    password: "",
    encryption: "WPA",
  });
  const [vcard, setVcard] = useState<VCardConfig>({
    name: "",
    org: "",
    title: "",
    phone: "",
    email: "",
    url: "",
  });
  const [svgMarkup, setSvgMarkup] = useState<string>("");
  const [isBusy, setIsBusy] = useState(false);
  const [blur, setBlur] = useState(0);
  const [contrast, setContrast] = useState(100);
  const [noise, setNoise] = useState(0);

  const payload = useMemo(
    () => buildPayload(config.payloadType, config.payload, wifi, vcard),
    [config.payloadType, config.payload, wifi, vcard],
  );

  useEffect(() => {
    let mounted = true;
    generateSvg(payload, config).then((svg) => {
      if (mounted) setSvgMarkup(svg);
    });
    return () => {
      mounted = false;
    };
  }, [payload, config]);

  const downloadSvg = () => {
    const blob = new Blob([svgMarkup], { type: "image/svg+xml" });
    saveAs(blob, "qrfree.svg");
  };

  const downloadPng = async (size: number) => {
    setIsBusy(true);
    try {
      const pngUrl = await generatePngDataUrl(payload, config, size);
      const response = await fetch(pngUrl);
      const blob = await response.blob();
      saveAs(blob, `qrfree-${size}.png`);
    } finally {
      setIsBusy(false);
    }
  };

  const downloadPdf = async (format: "a4" | "a3" | "square") => {
    setIsBusy(true);
    try {
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "pt",
        format: format === "square" ? [1080, 1080] : format,
      });

      const pngUrl = await generatePngDataUrl(payload, config, 1024);
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const size = Math.min(pageWidth, pageHeight) * 0.6;
      const x = (pageWidth - size) / 2;
      const y = (pageHeight - size) / 2;

      pdf.addImage(pngUrl, "PNG", x, y, size, size);
      pdf.setFontSize(12);
      pdf.text("QRFREE", 32, 32);
      pdf.save(`qrfree-${format}.pdf`);
    } finally {
      setIsBusy(false);
    }
  };

  const downloadZip = async () => {
    setIsBusy(true);
    try {
      const zip = new JSZip();
      zip.file("qrfree.svg", svgMarkup);
      const png512 = await generatePngDataUrl(payload, config, 512);
      const png1024 = await generatePngDataUrl(payload, config, 1024);
      const png2048 = await generatePngDataUrl(payload, config, 2048);
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "pt",
        format: "a4",
      });
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const size = Math.min(pageWidth, pageHeight) * 0.6;
      pdf.addImage(
        png1024,
        "PNG",
        (pageWidth - size) / 2,
        (pageHeight - size) / 2,
        size,
        size,
      );
      const pdfBlob = pdf.output("blob");

      const pngBlobs = await Promise.all(
        [png512, png1024, png2048].map(async (url) => {
          const res = await fetch(url);
          return res.blob();
        }),
      );

      zip.file("qrfree-512.png", pngBlobs[0]);
      zip.file("qrfree-1024.png", pngBlobs[1]);
      zip.file("qrfree-2048.png", pngBlobs[2]);
      zip.file("qrfree-a4.pdf", pdfBlob);

      const content = await zip.generateAsync({ type: "blob" });
      saveAs(content, "qrfree-export.zip");
    } finally {
      setIsBusy(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 px-6 py-12 text-zinc-900 dark:bg-black dark:text-zinc-100">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8">
        <header className="flex flex-col gap-2">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
            QRFREE · Engineering Console
          </p>
          <h1 className="text-3xl font-semibold tracking-tight">
            QR codes without lock-in.
          </h1>
          <p className="max-w-2xl text-base text-zinc-600 dark:text-zinc-400">
            Generate standards-compliant QR codes, validate reliability, and
            export print-safe assets.
          </p>
        </header>

        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <InputPanel
            config={config}
            onConfigChange={setConfig}
            wifi={wifi}
            onWifiChange={setWifi}
            vcard={vcard}
            onVcardChange={setVcard}
          />
          <PreviewPanel
            svgMarkup={svgMarkup}
            blur={blur}
            contrast={contrast}
            noise={noise}
            onBlurChange={setBlur}
            onContrastChange={setContrast}
            onNoiseChange={setNoise}
          />
        </div>

        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <ExportPanel
            onDownloadSvg={downloadSvg}
            onDownloadPng={downloadPng}
            onDownloadPdf={downloadPdf}
            onDownloadZip={downloadZip}
            isBusy={isBusy}
          />
          <ValidationPanel
            payload={payload}
            errorCorrection={config.errorCorrection}
            margin={config.margin}
          />
        </div>
      </div>
    </div>
  );
}
