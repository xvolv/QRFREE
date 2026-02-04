import * as QRCode from "qrcode";

export type QRPayloadType =
  | "url"
  | "text"
  | "email"
  | "phone"
  | "wifi"
  | "vcard";

export type QRConfig = {
  payloadType: QRPayloadType;
  payload: string;
  errorCorrection: "L" | "M" | "Q" | "H";
  size: number;
  margin: number;
};

export const buildPayload = (
  type: QRPayloadType,
  raw: string,
  wifi?: {
    ssid: string;
    password: string;
    encryption: "WPA" | "WEP" | "nopass";
  },
  vcard?: {
    name: string;
    org?: string;
    title?: string;
    phone?: string;
    email?: string;
    url?: string;
  },
) => {
  switch (type) {
    case "email":
      return `mailto:${raw}`;
    case "phone":
      return `tel:${raw}`;
    case "wifi":
      if (!wifi) return raw;
      return `WIFI:T:${wifi.encryption};S:${wifi.ssid};P:${wifi.password};;`;
    case "vcard":
      if (!vcard) return raw;
      return [
        "BEGIN:VCARD",
        "VERSION:3.0",
        `N:${vcard.name}`,
        vcard.org ? `ORG:${vcard.org}` : "",
        vcard.title ? `TITLE:${vcard.title}` : "",
        vcard.phone ? `TEL:${vcard.phone}` : "",
        vcard.email ? `EMAIL:${vcard.email}` : "",
        vcard.url ? `URL:${vcard.url}` : "",
        "END:VCARD",
      ]
        .filter(Boolean)
        .join("\n");
    case "url":
    case "text":
    default:
      return raw;
  }
};

export const generateSvg = async (payload: string, config: QRConfig) => {
  return QRCode.toString(payload, {
    type: "svg",
    errorCorrectionLevel: config.errorCorrection,
    width: config.size,
    margin: config.margin,
  });
};

export const generatePngDataUrl = async (
  payload: string,
  config: QRConfig,
  size: number,
) => {
  return QRCode.toDataURL(payload, {
    errorCorrectionLevel: config.errorCorrection,
    width: size,
    margin: config.margin,
  });
};
