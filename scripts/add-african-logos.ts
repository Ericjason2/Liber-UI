import { mkdir, writeFile } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const CONTENT_LOGOS = join(__dirname, "../content/logos");

interface AfricanLogoSpec {
  slug: string;
  name: string;
  description: string;
  aliases: string[];
  tags: string[];
  author: string;
  website: string;
  brandGuidelinesUrl: string;
  sourceUrl: string;
  hex: string;
  colorSvg: string;
  monoSvg: string;
}

const AFRICAN_LOGOS: AfricanLogoSpec[] = [
  // 1. WAVE
  {
    slug: "wave",
    name: "Wave",
    description: "Plateforme de mobile money et transferts d'argent sans frais en Afrique (Sénégal, Côte d'Ivoire, Mali...).",
    aliases: ["wave mobile money", "wave senegal", "wave ci"],
    tags: ["fintech", "mobile-money", "payments", "africa", "senegal", "ivory-coast"],
    author: "Wave Mobile Money Inc.",
    website: "https://www.wave.com",
    brandGuidelinesUrl: "https://www.wave.com/en/press",
    sourceUrl: "https://www.wave.com",
    hex: "#1DC3FF",
    colorSvg: `<svg role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128"><title>Wave</title><rect width="128" height="128" rx="28" fill="#1DC3FF"/><path d="M64 24c-17.673 0-32 14.327-32 32 0 11.235 5.807 21.12 14.58 26.812l-2.58 13.188 14.28-7.14C60.28 89.62 62.1 89.73 64 89.73c17.673 0 32-14.327 32-32s-14.327-32-32-32zm-6 20a6 6 0 1 1 0 12 6 6 0 0 1 0-12zm18 0a6 6 0 1 1 0 12 6 6 0 0 1 0-12zm-22 28.5c2.5 4.5 7.5 7.5 13 7.5s10.5-3 13-7.5l4 3c-3.5 6-10 10-17 10s-13.5-4-17-10l4-3z" fill="#FFFFFF"/></svg>`,
    monoSvg: `<svg role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128"><title>Wave (monochrome)</title><rect width="128" height="128" rx="28" fill="none" stroke="currentColor" stroke-width="8"/><path d="M64 24c-17.673 0-32 14.327-32 32 0 11.235 5.807 21.12 14.58 26.812l-2.58 13.188 14.28-7.14C60.28 89.62 62.1 89.73 64 89.73c17.673 0 32-14.327 32-32s-14.327-32-32-32zm-6 20a6 6 0 1 1 0 12 6 6 0 0 1 0-12zm18 0a6 6 0 1 1 0 12 6 6 0 0 1 0-12zm-22 28.5c2.5 4.5 7.5 7.5 13 7.5s10.5-3 13-7.5l4 3c-3.5 6-10 10-17 10s-13.5-4-17-10l4-3z" fill="currentColor"/></svg>`,
  },

  // 2. ORANGE MONEY
  {
    slug: "orange-money",
    name: "Orange Money",
    description: "Solution de transfert d'argent et portefeuille mobile du groupe Orange en Afrique.",
    aliases: ["om", "orange mobile money", "orange"],
    tags: ["fintech", "mobile-money", "orange", "telecom", "africa"],
    author: "Orange S.A.",
    website: "https://www.orange.com",
    brandGuidelinesUrl: "https://brand.orange.com",
    sourceUrl: "https://brand.orange.com",
    hex: "#FF7900",
    colorSvg: `<svg role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128"><title>Orange Money</title><rect width="128" height="128" rx="24" fill="#FF7900"/><circle cx="64" cy="64" r="38" fill="#FFFFFF"/><circle cx="64" cy="64" r="26" fill="#000000"/><circle cx="64" cy="64" r="14" fill="#FF7900"/></svg>`,
    monoSvg: `<svg role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128"><title>Orange Money (monochrome)</title><rect width="128" height="128" rx="24" fill="none" stroke="currentColor" stroke-width="8"/><circle cx="64" cy="64" r="38" fill="none" stroke="currentColor" stroke-width="6"/><circle cx="64" cy="64" r="22" fill="currentColor"/></svg>`,
  },

  // 3. MTN MOMO
  {
    slug: "mtn-momo",
    name: "MTN MoMo",
    description: "Service de finance mobile et paiements de MTN Group déployé à travers l'Afrique.",
    aliases: ["momo", "mtn mobile money", "mtn"],
    tags: ["fintech", "mobile-money", "mtn", "africa", "payments"],
    author: "MTN Group Limited",
    website: "https://www.momo.mtn.com",
    brandGuidelinesUrl: "https://www.mtn.com",
    sourceUrl: "https://www.mtn.com",
    hex: "#FFCC00",
    colorSvg: `<svg role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128"><title>MTN MoMo</title><rect width="128" height="128" rx="28" fill="#FFCC00"/><ellipse cx="64" cy="64" rx="46" ry="32" fill="#004F71"/><text x="64" y="73" fill="#FFCC00" font-family="system-ui, -apple-system, sans-serif" font-weight="900" font-size="28" text-anchor="middle" letter-spacing="-1">MoMo</text></svg>`,
    monoSvg: `<svg role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128"><title>MTN MoMo (monochrome)</title><ellipse cx="64" cy="64" rx="54" ry="38" fill="none" stroke="currentColor" stroke-width="8"/><text x="64" y="73" fill="currentColor" font-family="system-ui, -apple-system, sans-serif" font-weight="900" font-size="28" text-anchor="middle" letter-spacing="-1">MoMo</text></svg>`,
  },

  // 4. MOOV MONEY
  {
    slug: "moov-money",
    name: "Moov Money",
    description: "Plateforme de paiement mobile et de transfert d'argent de Moov Africa.",
    aliases: ["moov", "moov africa", "moov money flooz"],
    tags: ["fintech", "mobile-money", "moov", "africa"],
    author: "Maroc Telecom / Moov Africa",
    website: "https://www.moov-africa.com",
    brandGuidelinesUrl: "https://www.moov-africa.com",
    sourceUrl: "https://www.moov-africa.com",
    hex: "#004B97",
    colorSvg: `<svg role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128"><title>Moov Money</title><rect width="128" height="128" rx="28" fill="#004B97"/><path d="M34 76c0-16.569 13.431-30 30-30s30 13.431 30 30" stroke="#F37023" stroke-width="12" stroke-linecap="round" fill="none"/><path d="M46 76c0-9.941 8.059-18 18-18s18 8.059 18 18" stroke="#FFFFFF" stroke-width="8" stroke-linecap="round" fill="none"/><circle cx="64" cy="30" r="10" fill="#F37023"/></svg>`,
    monoSvg: `<svg role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128"><title>Moov Money (monochrome)</title><path d="M34 82c0-16.569 13.431-30 30-30s30 13.431 30 30" stroke="currentColor" stroke-width="12" stroke-linecap="round" fill="none"/><path d="M48 82c0-8.837 7.163-16 16-16s16 7.163 16 16" stroke="currentColor" stroke-width="8" stroke-linecap="round" fill="none"/><circle cx="64" cy="34" r="10" fill="currentColor"/></svg>`,
  },

  // 5. FLUTTERWAVE
  {
    slug: "flutterwave",
    name: "Flutterwave",
    description: "Infrastructure de paiement et passerelle API pour l'Afrique et l'international.",
    aliases: ["rave", "flutter wave", "flw"],
    tags: ["fintech", "payments", "api", "nigeria", "africa", "gateway"],
    author: "Flutterwave Inc.",
    website: "https://flutterwave.com",
    brandGuidelinesUrl: "https://flutterwave.com/us/brand",
    sourceUrl: "https://flutterwave.com",
    hex: "#FB6340",
    colorSvg: `<svg role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128"><title>Flutterwave</title><rect width="128" height="128" rx="28" fill="#0A0E27"/><path d="M32 40c0-6.627 5.373-12 12-12h18c18.778 0 34 15.222 34 34s-15.222 34-34 34h-6c-6.627 0-12-5.373-12-12V40z" fill="#FB6340"/><path d="M44 54c0-4.418 3.582-8 8-8h10c11.046 0 20 8.954 20 20s-8.954 20-20 20h-10c-4.418 0-8-3.582-8-8V54z" fill="#0ACF83"/><path d="M54 66c0-2.209 1.791-4 4-4h4c5.523 0 10 4.477 10 10s-4.477 10-10 10h-4c-2.209 0-4-1.791-4-4V66z" fill="#F04438"/></svg>`,
    monoSvg: `<svg role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128"><title>Flutterwave (monochrome)</title><path d="M32 40c0-6.627 5.373-12 12-12h18c18.778 0 34 15.222 34 34s-15.222 34-34 34h-6c-6.627 0-12-5.373-12-12V40z" fill="none" stroke="currentColor" stroke-width="8"/><path d="M44 54c0-4.418 3.582-8 8-8h10c11.046 0 20 8.954 20 20s-8.954 20-20 20h-10c-4.418 0-8-3.582-8-8V54z" fill="currentColor"/></svg>`,
  },

  // 6. PAYSTACK
  {
    slug: "paystack",
    name: "Paystack",
    description: "Passerelle de paiement en ligne moderne pour les entreprises en Afrique (Stripe group).",
    aliases: ["pay stack", "paystack stripe"],
    tags: ["fintech", "payments", "stripe", "nigeria", "ghana", "south-africa"],
    author: "Paystack Payments Limited",
    website: "https://paystack.com",
    brandGuidelinesUrl: "https://paystack.com/brand",
    sourceUrl: "https://paystack.com",
    hex: "#00C3F7",
    colorSvg: `<svg role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128"><title>Paystack</title><rect width="128" height="128" rx="28" fill="#09203F"/><rect x="28" y="28" width="72" height="14" rx="7" fill="#00C3F7"/><rect x="28" y="50" width="48" height="14" rx="7" fill="#00C3F7"/><rect x="28" y="72" width="72" height="14" rx="7" fill="#00C3F7"/><rect x="28" y="94" width="48" height="14" rx="7" fill="#00C3F7"/></svg>`,
    monoSvg: `<svg role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128"><title>Paystack (monochrome)</title><rect x="28" y="28" width="72" height="14" rx="7" fill="currentColor"/><rect x="28" y="50" width="48" height="14" rx="7" fill="currentColor"/><rect x="28" y="72" width="72" height="14" rx="7" fill="currentColor"/><rect x="28" y="94" width="48" height="14" rx="7" fill="currentColor"/></svg>`,
  },

  // 7. M-PESA
  {
    slug: "m-pesa",
    name: "M-Pesa",
    description: "Pionnier du mobile money en Afrique lancé par Safaricom et Vodafone en Afrique de l'Est.",
    aliases: ["mpesa", "safaricom m-pesa", "vodafone mpesa"],
    tags: ["fintech", "mobile-money", "safaricom", "kenya", "tanzania", "africa"],
    author: "Safaricom PLC / Vodafone",
    website: "https://www.safaricom.co.ke",
    brandGuidelinesUrl: "https://www.safaricom.co.ke/about/brand",
    sourceUrl: "https://www.safaricom.co.ke",
    hex: "#009A44",
    colorSvg: `<svg role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128"><title>M-Pesa</title><rect width="128" height="128" rx="28" fill="#FFFFFF"/><path d="M64 20a44 44 0 1 0 44 44A44 44 0 0 0 64 20zm0 76a32 32 0 1 1 32-32 32 32 0 0 1-32 32z" fill="#009A44"/><path d="M48 48h14l10 18 10-18h14v36h-12V64l-9 16h-6l-9-16v20H48z" fill="#E20613"/></svg>`,
    monoSvg: `<svg role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128"><title>M-Pesa (monochrome)</title><circle cx="64" cy="64" r="48" fill="none" stroke="currentColor" stroke-width="8"/><path d="M48 48h14l10 18 10-18h14v36h-12V64l-9 16h-6l-9-16v20H48z" fill="currentColor"/></svg>`,
  },

  // 8. CHIPPER CASH
  {
    slug: "chipper-cash",
    name: "Chipper Cash",
    description: "Application de transfert d'argent transfrontalier instantané et paiements en Afrique.",
    aliases: ["chipper", "chippercash"],
    tags: ["fintech", "cross-border", "payments", "africa", "remittance"],
    author: "Critical Ideas, Inc.",
    website: "https://chippercash.com",
    brandGuidelinesUrl: "https://chippercash.com/press",
    sourceUrl: "https://chippercash.com",
    hex: "#7A28FF",
    colorSvg: `<svg role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128"><title>Chipper Cash</title><rect width="128" height="128" rx="28" fill="#7A28FF"/><path d="M78 36H50c-7.732 0-14 6.268-14 14v28c0 7.732 6.268 14 14 14h28c7.732 0 14-6.268 14-14V70H76v8H52V50h40V50c0-7.732-6.268-14-14-14z" fill="#FFFFFF"/></svg>`,
    monoSvg: `<svg role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128"><title>Chipper Cash (monochrome)</title><rect width="128" height="128" rx="28" fill="none" stroke="currentColor" stroke-width="8"/><path d="M78 36H50c-7.732 0-14 6.268-14 14v28c0 7.732 6.268 14 14 14h28c7.732 0 14-6.268 14-14V70H76v8H52V50h40V50c0-7.732-6.268-14-14-14z" fill="currentColor"/></svg>`,
  },

  // 9. KUDA BANK
  {
    slug: "kuda",
    name: "Kuda Bank",
    description: "Banque digitale sans frais (The Bank of the Free) pour les particuliers et professionnels.",
    aliases: ["kuda", "kuda bank", "kudabank"],
    tags: ["fintech", "neobank", "banking", "nigeria", "africa"],
    author: "Kuda Technologies Ltd",
    website: "https://kuda.com",
    brandGuidelinesUrl: "https://kuda.com/about",
    sourceUrl: "https://kuda.com",
    hex: "#40196D",
    colorSvg: `<svg role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128"><title>Kuda</title><rect width="128" height="128" rx="28" fill="#40196D"/><path d="M38 32h14v64H38z" fill="#FFFFFF"/><path d="M52 64l28-32h18L68 64l30 32H80z" fill="#00D09C"/></svg>`,
    monoSvg: `<svg role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128"><title>Kuda (monochrome)</title><path d="M38 32h14v64H38z" fill="currentColor"/><path d="M52 64l28-32h18L68 64l30 32H80z" fill="currentColor"/></svg>`,
  },

  // 10. AIRTEL MONEY
  {
    slug: "airtel-money",
    name: "Airtel Money",
    description: "Portefeuille électronique et plateforme de paiement d'Airtel Africa dans 14 pays.",
    aliases: ["airtel", "airtel africa"],
    tags: ["fintech", "mobile-money", "airtel", "africa"],
    author: "Airtel Africa PLC",
    website: "https://airtel.africa",
    brandGuidelinesUrl: "https://airtel.africa/about-us",
    sourceUrl: "https://airtel.africa",
    hex: "#ED1C24",
    colorSvg: `<svg role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128"><title>Airtel Money</title><rect width="128" height="128" rx="28" fill="#ED1C24"/><path d="M64 30c-18.778 0-34 15.222-34 34 0 14.887 9.553 27.545 22.848 32.064l4.152-11.456C47.88 81.72 42 73.57 42 64c0-12.15 9.85-22 22-22s22 9.85 22 22c0 5.12-1.76 9.84-4.72 13.57-2.61 3.28-4.28 4.43-4.28 6.43 0 2.21 1.79 4 4 4 1.83 0 3.33-1.22 3.82-2.88C90.35 79.5 96 72.39 96 64c0-18.778-15.222-34-34-34z" fill="#FFFFFF"/></svg>`,
    monoSvg: `<svg role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128"><title>Airtel Money (monochrome)</title><path d="M64 30c-18.778 0-34 15.222-34 34 0 14.887 9.553 27.545 22.848 32.064l4.152-11.456C47.88 81.72 42 73.57 42 64c0-12.15 9.85-22 22-22s22 9.85 22 22c0 5.12-1.76 9.84-4.72 13.57-2.61 3.28-4.28 4.43-4.28 6.43 0 2.21 1.79 4 4 4 1.83 0 3.33-1.22 3.82-2.88C90.35 79.5 96 72.39 96 64c0-18.778-15.222-34-34-34z" fill="currentColor"/></svg>`,
  },

  // 11. OPAY
  {
    slug: "opay",
    name: "OPay",
    description: "Fintech de paiement mobile, cartes et transactions financières quotidiennes en Afrique.",
    aliases: ["o-pay", "opay digital services"],
    tags: ["fintech", "payments", "mobile-money", "nigeria", "egypt"],
    author: "OPay Digital Services Limited",
    website: "https://opayweb.com",
    brandGuidelinesUrl: "https://opayweb.com/about",
    sourceUrl: "https://opayweb.com",
    hex: "#17B890",
    colorSvg: `<svg role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128"><title>OPay</title><rect width="128" height="128" rx="28" fill="#17B890"/><circle cx="64" cy="64" r="34" fill="none" stroke="#FFFFFF" stroke-width="16"/><path d="M64 30v20" stroke="#17B890" stroke-width="8" stroke-linecap="round"/><circle cx="64" cy="64" r="12" fill="#FFFFFF"/></svg>`,
    monoSvg: `<svg role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128"><title>OPay (monochrome)</title><circle cx="64" cy="64" r="34" fill="none" stroke="currentColor" stroke-width="16"/><circle cx="64" cy="64" r="12" fill="currentColor"/></svg>`,
  },

  // 12. MONIEPOINT
  {
    slug: "moniepoint",
    name: "Moniepoint",
    description: "Plateforme bancaire commerciale et terminaux de paiement tout-en-un pour entreprises africaines.",
    aliases: ["monie point", "teamapt"],
    tags: ["fintech", "banking", "pos", "nigeria", "africa"],
    author: "Moniepoint Inc.",
    website: "https://moniepoint.com",
    brandGuidelinesUrl: "https://moniepoint.com/ng/brand",
    sourceUrl: "https://moniepoint.com",
    hex: "#003366",
    colorSvg: `<svg role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128"><title>Moniepoint</title><rect width="128" height="128" rx="28" fill="#003366"/><path d="M30 40l34 30 34-30v26l-34 30-34-30V40z" fill="#0088FF"/><path d="M42 40l22 20 22-20v14l-22 20-22-20V40z" fill="#FFFFFF"/></svg>`,
    monoSvg: `<svg role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128"><title>Moniepoint (monochrome)</title><path d="M30 40l34 30 34-30v26l-34 30-34-30V40z" fill="currentColor"/></svg>`,
  },

  // 13. YOCO
  {
    slug: "yoco",
    name: "Yoco",
    description: "Technologie de paiement par carte et terminaux mobiles pour commerçants en Afrique du Sud.",
    aliases: ["yoco payments", "yoco pos"],
    tags: ["fintech", "payments", "pos", "south-africa", "africa"],
    author: "Yoco Technologies",
    website: "https://www.yoco.com",
    brandGuidelinesUrl: "https://www.yoco.com/za/about-us",
    sourceUrl: "https://www.yoco.com",
    hex: "#00B2FE",
    colorSvg: `<svg role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128"><title>Yoco</title><rect width="128" height="128" rx="28" fill="#00B2FE"/><path d="M34 32h18l12 24 12-24h18L72 74v22H56V74L34 32z" fill="#FFFFFF"/></svg>`,
    monoSvg: `<svg role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128"><title>Yoco (monochrome)</title><path d="M34 32h18l12 24 12-24h18L72 74v22H56V74L34 32z" fill="currentColor"/></svg>`,
  },

  // 14. PIGGYVEST
  {
    slug: "piggyvest",
    name: "PiggyVest",
    description: "Première plateforme d'épargne en ligne et de micro-investissement automatisé en Afrique.",
    aliases: ["piggybank.ng", "piggy vest"],
    tags: ["fintech", "savings", "investment", "nigeria", "africa"],
    author: "PiggyTech Global Limited",
    website: "https://www.piggyvest.com",
    brandGuidelinesUrl: "https://www.piggyvest.com/about",
    sourceUrl: "https://www.piggyvest.com",
    hex: "#083E9E",
    colorSvg: `<svg role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128"><title>PiggyVest</title><rect width="128" height="128" rx="28" fill="#083E9E"/><circle cx="64" cy="64" r="36" fill="none" stroke="#22C55E" stroke-width="10"/><path d="M52 64l8 8 16-16" stroke="#FFFFFF" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" fill="none"/></svg>`,
    monoSvg: `<svg role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128"><title>PiggyVest (monochrome)</title><circle cx="64" cy="64" r="36" fill="none" stroke="currentColor" stroke-width="10"/><path d="M52 64l8 8 16-16" stroke="currentColor" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" fill="none"/></svg>`,
  },

  // 15. DJAMO
  {
    slug: "djamo",
    name: "Djamo",
    description: "Application financière et carte Visa internationale pour la zone franc CFA / UEMOA.",
    aliases: ["djamo ci", "djamo app"],
    tags: ["fintech", "visa", "banking", "ivory-coast", "senegal", "uemoa"],
    author: "Djamo Inc.",
    website: "https://www.djamo.com",
    brandGuidelinesUrl: "https://www.djamo.com/a-propos",
    sourceUrl: "https://www.djamo.com",
    hex: "#2764FF",
    colorSvg: `<svg role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128"><title>Djamo</title><rect width="128" height="128" rx="28" fill="#2764FF"/><path d="M38 34h26c18.778 0 34 13.431 34 30s-15.222 30-34 30H38V34zm16 14v32h10c9.941 0 18-7.163 18-16s-8.059-16-18-16H54z" fill="#FFFFFF"/></svg>`,
    monoSvg: `<svg role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128"><title>Djamo (monochrome)</title><path d="M38 34h26c18.778 0 34 13.431 34 30s-15.222 30-34 30H38V34zm16 14v32h10c9.941 0 18-7.163 18-16s-8.059-16-18-16H54z" fill="currentColor"/></svg>`,
  },
];

async function main() {
  console.log(`Adding ${AFRICAN_LOGOS.length} African Tech & Fintech Logos...`);

  for (const logo of AFRICAN_LOGOS) {
    const dir = join(CONTENT_LOGOS, logo.slug);
    await mkdir(dir, { recursive: true });

    const meta = {
      slug: logo.slug,
      kind: "logo",
      name: logo.name,
      description: logo.description,
      aliases: logo.aliases,
      category: "africa",
      tags: logo.tags,
      license: "trademark",
      author: logo.author,
      website: logo.website,
      brandGuidelinesUrl: logo.brandGuidelinesUrl,
      source: {
        url: logo.sourceUrl,
        retrievedAt: "2026-11-01",
      },
      variants: {
        color: {
          file: "color.svg",
          hex: logo.hex,
        },
        mono: {
          file: "mono.svg",
        },
      },
    };

    await writeFile(join(dir, "meta.json"), JSON.stringify(meta, null, 2) + "\n", "utf8");
    await writeFile(join(dir, "color.svg"), logo.colorSvg.trim() + "\n", "utf8");
    await writeFile(join(dir, "mono.svg"), logo.monoSvg.trim() + "\n", "utf8");

    console.log(`  [+] Created content/logos/${logo.slug}/ (meta.json, color.svg, mono.svg)`);
  }

  console.log(`\nAll ${AFRICAN_LOGOS.length} African tech logos created successfully!`);
}

main().catch((err) => {
  console.error("Failed to add African logos:", err);
  process.exit(1);
});
