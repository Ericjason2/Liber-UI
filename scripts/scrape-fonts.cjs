const fs = require('fs');
const path = require('path');

const CATEGORY_URLS = [
  { url: 'https://www.dafont.com/top.php?fpp=100&l[]=10&l[]=1', defaultCategory: 'display' },
  { url: 'https://www.dafont.com/theme.php?cat=501&fpp=100&l[]=10&l[]=1', defaultCategory: 'sans' },
  { url: 'https://www.dafont.com/theme.php?cat=502&fpp=100&l[]=10&l[]=1', defaultCategory: 'serif' },
  { url: 'https://www.dafont.com/theme.php?cat=301&fpp=100&l[]=10&l[]=1', defaultCategory: 'display' }, // techno
  { url: 'https://www.dafont.com/theme.php?cat=601&fpp=100&l[]=10&l[]=1', defaultCategory: 'display' }, // script
  { url: 'https://www.dafont.com/theme.php?cat=401&fpp=100&l[]=10&l[]=1', defaultCategory: 'display' }, // gothic
  { url: 'https://www.dafont.com/theme.php?cat=701&fpp=100&l[]=10&l[]=1', defaultCategory: 'mono' },    // bitmap
];

function mapCategory(catName, fallback) {
  const c = (catName || '').toLowerCase();
  if (c.includes('sans') || c.includes('basic')) return 'sans';
  if (c.includes('serif')) return 'serif';
  if (c.includes('mono') || c.includes('bitmap') || c.includes('pixel') || c.includes('fixed')) return 'mono';
  return 'display';
}

function cleanText(str) {
  if (!str) return '';
  return str
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&eacute;/g, 'é')
    .replace(/&egrave;/g, 'è')
    .replace(/&agrave;/g, 'à')
    .replace(/[^\x20-\x7E\u00A0-\u00FF]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

async function scrapeCategory(url, defaultCategory) {
  console.log('Fetching', url, '...');
  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept-Language': 'en-US,en;q=0.9',
      }
    });
    if (!res.ok) {
      console.warn(`Failed to fetch ${url}: HTTP ${res.status}`);
      return [];
    }
    const html = await res.text();
    const sections = html.split('<div class="lv1left dfbg">');
    const fonts = [];

    for (let i = 1; i < sections.length; i++) {
      const sec = sections[i];
      const nameMatch = sec.match(/<a href="([^"]+)\.font[^"]*">(?:<strong>)?([^<]+)(?:<\/strong>)?<\/a>/i);
      const authorMatch = sec.match(/by\s+<a[^>]*>([^<]+)<\/a>/i) || sec.match(/par\s+<a[^>]*>([^<]+)<\/a>/i);
      const catMatch = sec.match(/<div class="lv1right dfbg">in\s+<a[^>]*>([^<]+)<\/a>(?:\s*&gt;\s*<a[^>]*>([^<]+)<\/a>)?/i);
      const licenseMatch = sec.match(/<a class="tdn help black"[^>]*>([^<]+)<\/a>/i);
      const dlMatch = sec.match(/\/\/dl\.dafont\.com\/dl\/\?f=([a-z0-9_-]+)/i);
      const previewMatch = sec.match(/background-image:url\(([^)]+)\)/i);

      if (nameMatch && dlMatch) {
        const rawSlug = dlMatch[1];
        const cleanSlug = rawSlug.toLowerCase().replace(/[^a-z0-9_-]/g, '-').replace(/_+/g, '-');
        const name = cleanText(nameMatch[2]);
        const author = authorMatch ? cleanText(authorMatch[1]) : 'Unknown';
        const rawCategory = catMatch ? (catMatch[2] || catMatch[1]).trim() : defaultCategory;
        const category = mapCategory(rawCategory, defaultCategory);
        const license = licenseMatch ? cleanText(licenseMatch[1]) : '100% Free';
        const previewImg = previewMatch ? 'https://www.dafont.com' + previewMatch[1] : undefined;

        fonts.push({
          slug: cleanSlug,
          kind: 'font',
          name,
          description: `Typographie originale créée par ${author}.`,
          author,
          category,
          license: '100% Free',
          weights: [400],
          variable: false,
          sampleText: 'The quick brown fox jumps over the lazy dog',
          downloadUrl: `https://dl.dafont.com/dl/?f=${rawSlug}`,
          previewImg,
        });
      }
    }
    return fonts;
  } catch (err) {
    console.error(`Error scraping ${url}:`, err);
    return [];
  }
}

async function main() {
  const allFontsMap = new Map();

  for (const item of CATEGORY_URLS) {
    const list = await scrapeCategory(item.url, item.defaultCategory);
    console.log(`  -> Got ${list.length} fonts from ${item.url}`);
    for (const f of list) {
      if (!allFontsMap.has(f.slug)) {
        allFontsMap.set(f.slug, f);
      }
    }
  }

  const scrapedFonts = Array.from(allFontsMap.values());
  console.log(`\nTotal unique 100% Free fonts scraped: ${scrapedFonts.length}`);

  // Save to JSON file
  const outPath = path.join(__dirname, '../apps/web/src/data/scraped-fonts.json');
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, JSON.stringify(scrapedFonts, null, 2) + '\n', 'utf8');
  console.log(`Saved scraped fonts to ${outPath}`);
}

main().catch(console.error);
