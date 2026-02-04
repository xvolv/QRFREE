# QRFREE

QRFREE is a privacy-respecting QR engineering console designed for reliable, print-safe QR code output without accounts, tracking, or lock-in.

## Features

- Standards-compliant QR generation with configurable error correction
- SVG and PNG exports with safe quiet zones
- PDF exports for A4, A3, and poster layouts
- Batch export as ZIP
- QR decoding and risk analysis warnings

## Development

Run the development server:

```
npm run dev
```

Then open http://localhost:3000 in your browser.

## Project Structure

- app/page.tsx: Landing page
- app/app/page.tsx: QR console
- app/components: UI panels
- app/utils/qr.ts: QR generation helpers

## Notes

- EPS export and advanced validation checks are planned for a later phase.
