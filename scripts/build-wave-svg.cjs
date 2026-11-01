const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputPath = 'C:/Users/Eric/.gemini/antigravity-ide/brain/ee3a8bac-e38a-46d3-8d1e-75531d1381f4/scratch/wave-nav-logo.png';

async function generateWaveSvgs() {
  const image = sharp(inputPath);
  const { data, info } = await image.raw().toBuffer({ resolveWithObject: true });
  const { width, height } = info;

  // Let's create SVG paths for:
  // 1. Cyan background rounded box (rx = 22, 101x101)
  // 2. Penguin black body
  // 3. Penguin white belly & eyes
  // 4. Penguin orange beak & feet
  // 5. Wave wordmark (text letters w, a, v, e)

  // Color SVG (Icon): centered in 128x128 viewBox
  // The 101x101 box maps with offset (13.5, 13.5) into 128x128
  
  // Let's trace connected horizontal spans for each color group in the 101x101 icon
  function getSpans(filterFn, minX = 0, maxX = width - 1, minY = 0, maxY = height - 1) {
    const rects = [];
    for (let y = minY; y <= maxY; y++) {
      let inSpan = false;
      let spanStart = 0;
      for (let x = minX; x <= maxX; x++) {
        const i = (y * width + x) * 4;
        const r = data[i], g = data[i+1], b = data[i+2], a = data[i+3];
        const match = filterFn(r, g, b, a, x, y);
        if (match && !inSpan) {
          inSpan = true;
          spanStart = x;
        } else if (!match && inSpan) {
          inSpan = false;
          rects.push({ x: spanStart, y, w: x - spanStart, h: 1 });
        }
      }
      if (inSpan) {
        rects.push({ x: spanStart, y, w: maxX - spanStart + 1, h: 1 });
      }
    }
    return rects;
  }

  // Convert spans to SVG path string M x y h w v 1 h -w z
  function spansToPath(spans, offsetX = 0, offsetY = 0, scale = 1) {
    return spans.map(s => `M${(s.x * scale + offsetX).toFixed(1)} ${(s.y * scale + offsetY).toFixed(1)}h${(s.w * scale).toFixed(1)}v${(scale).toFixed(1)}h-${(s.w * scale).toFixed(1)}z`).join('');
  }

  // Filter functions for the penguin features in the icon (0 <= x <= 100)
  const isBlackPenguin = (r, g, b, a, x, y) => x <= 100 && a > 120 && r < 40 && g < 40 && b < 40;
  const isWhitePenguin = (r, g, b, a, x, y) => x <= 100 && a > 120 && r > 220 && g > 220 && b > 220;
  const isOrangePenguin = (r, g, b, a, x, y) => x <= 100 && a > 120 && r > 200 && g > 80 && b < 50;

  // Filter for the wordmark text (x > 100)
  const isTextBlack = (r, g, b, a, x, y) => x > 100 && a > 100 && r < 60 && g < 60 && b < 60;

  const blackSpans = getSpans(isBlackPenguin, 0, 100, 0, 100);
  const whiteSpans = getSpans(isWhitePenguin, 0, 100, 0, 100);
  const orangeSpans = getSpans(isOrangePenguin, 0, 100, 0, 100);
  const textSpans = getSpans(isTextBlack, 101, width - 1, 0, height - 1);

  console.log(`Penguin spans: black=${blackSpans.length}, white=${whiteSpans.length}, orange=${orangeSpans.length}`);
  console.log(`Text spans: ${textSpans.length}`);

  // Scale 101x101 into 128x128 viewBox:
  // scale = 128 / 101 = 1.267326
  const scale = 128 / 101;
  const blackPath = spansToPath(blackSpans, 0, 0, scale);
  const whitePath = spansToPath(whiteSpans, 0, 0, scale);
  const orangePath = spansToPath(orangeSpans, 0, 0, scale);

  const colorSvg = `<svg role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128">
  <title>Wave</title>
  <rect width="128" height="128" rx="28" fill="#1DC4FF"/>
  <path d="${blackPath}" fill="#010202"/>
  <path d="${whitePath}" fill="#FFFFFF"/>
  <path d="${orangePath}" fill="#F67900"/>
</svg>`;

  const monoSvg = `<svg role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128">
  <title>Wave (monochrome)</title>
  <rect width="128" height="128" rx="28" fill="none" stroke="currentColor" stroke-width="8"/>
  <path d="${blackPath}" fill="currentColor"/>
  <path d="${orangePath}" fill="currentColor"/>
</svg>`;

  // Wordmark SVG: viewBox 0 0 240 104
  // Icon placed at (0, 1.5), text placed starting at x=112
  const iconScaleW = 1.0;
  const blackWordmarkPenguin = spansToPath(blackSpans, 0, 1.5, 1);
  const whiteWordmarkPenguin = spansToPath(whiteSpans, 0, 1.5, 1);
  const orangeWordmarkPenguin = spansToPath(orangeSpans, 0, 1.5, 1);
  const textPath = spansToPath(textSpans, 0, 1.5, 1);

  const wordmarkSvg = `<svg role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 104">
  <title>Wave Wordmark</title>
  <rect x="0" y="1.5" width="101" height="101" rx="22" fill="#1DC4FF"/>
  <path d="${blackWordmarkPenguin}" fill="#010202"/>
  <path d="${whiteWordmarkPenguin}" fill="#FFFFFF"/>
  <path d="${orangeWordmarkPenguin}" fill="#F67900"/>
  <path d="${textPath}" fill="#010202"/>
</svg>`;

  const targetDir = 'C:/Users/Eric/Downloads/One UI/liber/content/logos/wave';
  fs.writeFileSync(path.join(targetDir, 'color.svg'), colorSvg.trim() + '\n', 'utf8');
  fs.writeFileSync(path.join(targetDir, 'mono.svg'), monoSvg.trim() + '\n', 'utf8');
  fs.writeFileSync(path.join(targetDir, 'wordmark.svg'), wordmarkSvg.trim() + '\n', 'utf8');

  // Update meta.json
  const meta = {
    slug: "wave",
    kind: "logo",
    name: "Wave",
    description: "Plateforme de mobile money et transferts d'argent sans frais en Afrique (Sénégal, Côte d'Ivoire, Mali...).",
    aliases: [
      "wave mobile money",
      "wave senegal",
      "wave ci",
      "wave money"
    ],
    category: "africa",
    tags: [
      "fintech",
      "mobile-money",
      "payments",
      "africa",
      "senegal",
      "ivory-coast"
    ],
    license: "trademark",
    author: "Wave Mobile Money Inc.",
    website: "https://www.wave.com",
    brandGuidelinesUrl: "https://www.wave.com/en/press",
    source: {
      url: "https://www.wave.com/img/nav-logo.png",
      retrievedAt: "2026-11-01"
    },
    variants: {
      color: {
        file: "color.svg",
        hex: "#1DC4FF"
      },
      mono: {
        file: "mono.svg"
      },
      wordmark: {
        file: "wordmark.svg"
      }
    }
  };

  fs.writeFileSync(path.join(targetDir, 'meta.json'), JSON.stringify(meta, null, 2) + '\n', 'utf8');
  console.log('Successfully generated Wave color.svg, mono.svg, wordmark.svg and meta.json!');
}

generateWaveSvgs().catch(console.error);
