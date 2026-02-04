"use client";

import type { QRConfig, QRPayloadType } from "@/app/utils/qr";

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

type InputPanelProps = {
  config: QRConfig;
  onConfigChange: (config: QRConfig) => void;
  wifi: WifiConfig;
  onWifiChange: (wifi: WifiConfig) => void;
  vcard: VCardConfig;
  onVcardChange: (vcard: VCardConfig) => void;
};

const payloadTypes: { value: QRPayloadType; label: string }[] = [
  { value: "url", label: "URL" },
  { value: "text", label: "Plain text" },
  { value: "email", label: "Email" },
  { value: "phone", label: "Phone" },
  { value: "wifi", label: "WiFi" },
  { value: "vcard", label: "vCard" },
];

export default function InputPanel({
  config,
  onConfigChange,
  wifi,
  onWifiChange,
  vcard,
  onVcardChange,
}: InputPanelProps) {
  return (
    <section className="rounded-none border border-zinc-200 bg-white/80 p-6 shadow-sm backdrop-blur dark:border-zinc-800 dark:bg-zinc-900/70">
      <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
        Input
      </h2>
      <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
        Provide payload data and engineering options.
      </p>

      <div className="mt-6 grid gap-4">
        <label className="grid gap-2 text-sm font-medium text-zinc-700 dark:text-zinc-200">
          Payload type
          <select
            className="rounded-none border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:focus:ring-zinc-100"
            value={config.payloadType}
            onChange={(event) =>
              onConfigChange({
                ...config,
                payloadType: event.target.value as QRPayloadType,
              })
            }
          >
            {payloadTypes.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </label>

        <label className="grid gap-2 text-sm font-medium text-zinc-700 dark:text-zinc-200">
          Payload
          <textarea
            rows={3}
            className="rounded-none border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:focus:ring-zinc-100"
            placeholder="https://example.com"
            value={config.payload}
            onChange={(event) =>
              onConfigChange({ ...config, payload: event.target.value })
            }
          />
        </label>

        {config.payloadType === "wifi" && (
          <div className="grid gap-3 rounded-none border border-dashed border-zinc-200 p-3 text-sm text-zinc-600 dark:border-zinc-700 dark:text-zinc-300">
            <div className="grid gap-2">
              <label className="grid gap-1">
                SSID
                <input
                  className="rounded-none border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:focus:ring-zinc-100"
                  value={wifi.ssid}
                  onChange={(event) =>
                    onWifiChange({ ...wifi, ssid: event.target.value })
                  }
                />
              </label>
              <label className="grid gap-1">
                Password
                <input
                  className="rounded-none border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:focus:ring-zinc-100"
                  value={wifi.password}
                  onChange={(event) =>
                    onWifiChange({ ...wifi, password: event.target.value })
                  }
                />
              </label>
              <label className="grid gap-1">
                Encryption
                <select
                  className="rounded-none border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:focus:ring-zinc-100"
                  value={wifi.encryption}
                  onChange={(event) =>
                    onWifiChange({
                      ...wifi,
                      encryption: event.target
                        .value as WifiConfig["encryption"],
                    })
                  }
                >
                  <option value="WPA">WPA/WPA2</option>
                  <option value="WEP">WEP</option>
                  <option value="nopass">Open</option>
                </select>
              </label>
            </div>
          </div>
        )}

        {config.payloadType === "vcard" && (
          <div className="grid gap-3 rounded-none border border-dashed border-zinc-200 p-3 text-sm text-zinc-600 dark:border-zinc-700 dark:text-zinc-300">
            <div className="grid gap-2">
              <label className="grid gap-1">
                Name
                <input
                  className="rounded-none border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:focus:ring-zinc-100"
                  value={vcard.name}
                  onChange={(event) =>
                    onVcardChange({ ...vcard, name: event.target.value })
                  }
                />
              </label>
              <label className="grid gap-1">
                Organization
                <input
                  className="rounded-none border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:focus:ring-zinc-100"
                  value={vcard.org ?? ""}
                  onChange={(event) =>
                    onVcardChange({ ...vcard, org: event.target.value })
                  }
                />
              </label>
              <label className="grid gap-1">
                Title
                <input
                  className="rounded-none border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:focus:ring-zinc-100"
                  value={vcard.title ?? ""}
                  onChange={(event) =>
                    onVcardChange({ ...vcard, title: event.target.value })
                  }
                />
              </label>
              <label className="grid gap-1">
                Phone
                <input
                  className="rounded-none border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:focus:ring-zinc-100"
                  value={vcard.phone ?? ""}
                  onChange={(event) =>
                    onVcardChange({ ...vcard, phone: event.target.value })
                  }
                />
              </label>
              <label className="grid gap-1">
                Email
                <input
                  className="rounded-none border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:focus:ring-zinc-100"
                  value={vcard.email ?? ""}
                  onChange={(event) =>
                    onVcardChange({ ...vcard, email: event.target.value })
                  }
                />
              </label>
              <label className="grid gap-1">
                URL
                <input
                  className="rounded-none border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:focus:ring-zinc-100"
                  value={vcard.url ?? ""}
                  onChange={(event) =>
                    onVcardChange({ ...vcard, url: event.target.value })
                  }
                />
              </label>
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 gap-3">
          <label className="grid gap-2 text-sm font-medium text-zinc-700 dark:text-zinc-200">
            Error correction
            <select
              className="rounded-none border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:focus:ring-zinc-100"
              value={config.errorCorrection}
              onChange={(event) =>
                onConfigChange({
                  ...config,
                  errorCorrection: event.target
                    .value as QRConfig["errorCorrection"],
                })
              }
            >
              <option value="L">L</option>
              <option value="M">M</option>
              <option value="Q">Q</option>
              <option value="H">H (default)</option>
            </select>
          </label>
          <label className="grid gap-2 text-sm font-medium text-zinc-700 dark:text-zinc-200">
            Quiet zone (modules)
            <input
              type="number"
              min={2}
              max={10}
              className="rounded-none border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:focus:ring-zinc-100"
              value={config.margin}
              onChange={(event) =>
                onConfigChange({
                  ...config,
                  margin: Number(event.target.value),
                })
              }
            />
          </label>
        </div>

        <label className="grid gap-2 text-sm font-medium text-zinc-700 dark:text-zinc-200">
          Export size (px)
          <input
            type="number"
            min={256}
            step={32}
            className="rounded-none border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:focus:ring-zinc-100"
            value={config.size}
            onChange={(event) =>
              onConfigChange({ ...config, size: Number(event.target.value) })
            }
          />
        </label>
      </div>
    </section>
  );
}
