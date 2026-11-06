const https = require('https');
const fs = require('fs');
const path = require('path');

// WCAG Luminance & Contrast helpers
function hexToRgb(hex) {
  const clean = hex.replace('#', '');
  const r = parseInt(clean.substring(0, 2), 16) || 0;
  const g = parseInt(clean.substring(2, 4), 16) || 0;
  const b = parseInt(clean.substring(4, 6), 16) || 0;
  return [r, g, b];
}

function srgbToLinear(c) {
  const v = c / 255;
  return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
}

function relativeLuminance(hex) {
  const [r, g, b] = hexToRgb(hex);
  return 0.2126 * srgbToLinear(r) + 0.7152 * srgbToLinear(g) + 0.0722 * srgbToLinear(b);
}

function calculateMaxContrast(swatches) {
  const lums = swatches.map(relativeLuminance);
  const maxL = Math.max(...lums);
  const minL = Math.min(...lums);
  const ratio = (maxL + 0.05) / (minL + 0.05);
  const ratioFormatted = `${ratio.toFixed(1)}:1`;
  const wcagLevel = ratio >= 7 ? 'AAA' : ratio >= 4.5 ? 'AA' : 'AA';
  return { ratioFormatted, wcagLevel };
}

// Color naming helpers
const COLOR_NAMES = [
  { name: 'Slate', r: 100, g: 116, b: 139 },
  { name: 'Emerald', r: 16, g: 185, b: 129 },
  { name: 'Sky', r: 14, g: 165, b: 233 },
  { name: 'Indigo', r: 99, g: 102, b: 241 },
  { name: 'Violet', r: 139, g: 92, b: 246 },
  { name: 'Rose', r: 244, g: 63, b: 94 },
  { name: 'Amber', r: 245, g: 158, b: 11 },
  { name: 'Teal', r: 20, g: 184, b: 166 },
  { name: 'Cyan', r: 6, g: 182, b: 212 },
  { name: 'Fuchsia', r: 217, g: 70, b: 239 },
  { name: 'Coral', r: 255, g: 127, b: 80 },
  { name: 'Sand', r: 210, g: 180, b: 140 },
  { name: 'Sage', r: 158, g: 169, b: 150 },
  { name: 'Mint', r: 152, g: 251, b: 152 },
  { name: 'Gold', r: 255, g: 215, b: 0 },
  { name: 'Ocean', r: 0, g: 119, b: 182 },
  { name: 'Midnight', r: 25, g: 25, b: 112 },
  { name: 'Berry', r: 138, g: 43, b: 226 },
  { name: 'Mocha', r: 111, g: 78, b: 55 },
  { name: 'Lavender', r: 230, g: 230, b: 250 },
  { name: 'Crimson', r: 220, g: 20, b: 60 },
  { name: 'Forest', r: 34, g: 139, b: 34 },
  { name: 'Charcoal', r: 54, g: 69, b: 79 },
  { name: 'Ivory', r: 255, g: 255, b: 240 },
  { name: 'Dusk', r: 74, g: 78, b: 105 },
  { name: 'Sunset', r: 247, g: 127, b: 0 },
  { name: 'Dawn', r: 252, g: 191, b: 73 },
  { name: 'Nordic', r: 92, g: 118, b: 141 },
];

function getClosestColorName(hex) {
  const [r, g, b] = hexToRgb(hex);
  let best = COLOR_NAMES[0];
  let minDiff = Infinity;
  for (const c of COLOR_NAMES) {
    const diff = Math.hypot(r - c.r, g - c.g, b - c.b);
    if (diff < minDiff) {
      minDiff = diff;
      best = c;
    }
  }
  return best.name;
}

function generatePaletteName(swatches, category, index) {
  const primaryName = getClosestColorName(swatches[0]);
  const accentName = getClosestColorName(swatches[swatches.length - 1]);
  const catCap = category.charAt(0).toUpperCase() + category.slice(1);
  
  const patterns = [
    `${primaryName} ${accentName}`,
    `${catCap} ${primaryName}`,
    `${primaryName} Breeze`,
    `${accentName} Aura`,
    `${catCap} Harmony`,
    `${primaryName} Velvet`,
    `${accentName} Glow`,
    `${catCap} ${accentName}`,
  ];

  const chosenPattern = patterns[index % patterns.length];
  return chosenPattern;
}

function fetchFeed(tags = '', sort = '', step = 0) {
  return new Promise((resolve) => {
    const postData = new URLSearchParams({
      step: String(step),
      sort: sort,
      tags: tags,
      timeframe: '30'
    }).toString();

    const options = {
      hostname: 'colorhunt.co',
      port: 443,
      path: '/php/feed.php',
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(postData),
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Referer': 'https://colorhunt.co/',
        'X-Requested-With': 'XMLHttpRequest'
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          resolve(Array.isArray(json) ? json : []);
        } catch {
          resolve([]);
        }
      });
    });

    req.on('error', () => resolve([]));
    req.write(postData);
    req.end();
  });
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function main() {
  console.log('--- Scraping Color Hunt Palettes ---');
  
  const sources = [
    { sort: 'popular', tags: '', steps: [0, 1, 2], cat: 'popular' },
    { sort: 'trendy', tags: '', steps: [0, 1], cat: 'trendy' },
    { sort: '', tags: 'pastel', steps: [0, 1], cat: 'pastel' },
    { sort: '', tags: 'vintage', steps: [0, 1], cat: 'vintage' },
    { sort: '', tags: 'retro', steps: [0, 1], cat: 'retro' },
    { sort: '', tags: 'neon', steps: [0, 1], cat: 'neon' },
    { sort: '', tags: 'warm', steps: [0, 1], cat: 'warm' },
    { sort: '', tags: 'cold', steps: [0, 1], cat: 'cold' },
    { sort: '', tags: 'nature', steps: [0, 1], cat: 'nature' },
    { sort: '', tags: 'dark', steps: [0, 1], cat: 'dark' },
    { sort: '', tags: 'light', steps: [0, 1], cat: 'light' },
    { sort: '', tags: 'gold', steps: [0, 1], cat: 'gold' },
    { sort: '', tags: 'summer', steps: [0], cat: 'summer' },
    { sort: '', tags: 'fall', steps: [0], cat: 'fall' },
    { sort: '', tags: 'winter', steps: [0], cat: 'winter' },
    { sort: '', tags: 'spring', steps: [0], cat: 'spring' },
  ];

  const seenCodes = new Set();
  const allThemes = [];

  for (const src of sources) {
    for (const step of src.steps) {
      const items = await fetchFeed(src.tags, src.sort, step);
      console.log(`Fetched ${items.length} items for ${src.cat || src.sort} (step ${step})`);
      
      for (const item of items) {
        const code = (item.code || '').toLowerCase().trim();
        if (code.length !== 24 || seenCodes.has(code)) continue;
        seenCodes.add(code);

        const swatches = [
          '#' + code.substring(0, 6).toUpperCase(),
          '#' + code.substring(6, 12).toUpperCase(),
          '#' + code.substring(12, 18).toUpperCase(),
          '#' + code.substring(18, 24).toUpperCase(),
        ];

        const { ratioFormatted, wcagLevel } = calculateMaxContrast(swatches);
        const name = generatePaletteName(swatches, src.cat, allThemes.length);
        const slug = `ch-${code}`;

        const themeItem = {
          slug,
          kind: 'theme',
          name,
          description: `Curated ${src.cat} palette with ${swatches.join(', ')} from Color Hunt (${item.likes || 0} likes).`,
          category: src.cat,
          contrastRatio: ratioFormatted,
          wcagLevel: wcagLevel,
          license: 'MIT',
          author: 'colorhunt.co',
          swatches,
          tokens: {
            background: swatches[0],
            foreground: swatches[swatches.length - 1],
            primary: swatches[1],
            muted: swatches[2],
            accent: swatches[3],
            card: swatches[0],
            border: swatches[2],
          },
          tags: [src.cat, 'colorhunt', src.tags].filter(Boolean),
        };

        allThemes.push(themeItem);
      }
      await sleep(250);
    }
  }

  console.log(`Total unique Color Hunt palettes extracted: ${allThemes.length}`);

  const outputPath = path.resolve(__dirname, '../apps/web/src/data/colorhunt-themes.json');
  fs.writeFileSync(outputPath, JSON.stringify(allThemes, null, 2), 'utf8');
  console.log(`Saved palettes to ${outputPath}`);
}

main().catch(console.error);
