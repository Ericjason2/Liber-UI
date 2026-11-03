const fs = require('fs');
const path = require('path');

const ALL_CATEGORY_IDS = [
  // Fancy (101-118)
  101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118,
  // Foreign look (201-206)
  201, 202, 203, 204, 205, 206,
  // Techno (301-305)
  301, 302, 303, 304, 305,
  // Gothic (401-405)
  401, 402, 403, 404, 405,
  // Basic (501-503)
  501, 502, 503,
  // Script (601-608)
  601, 602, 603, 604, 605, 606, 607, 608,
  // Bitmap (701)
  701,
  // Holiday (801-805)
  801, 802, 803, 804, 805,
];

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

function mapNormalizedCategory(theme, subtheme) {
  const t = (theme || '').toLowerCase();
  const st = (subtheme || '').toLowerCase();
  if (st.includes('sans')) return 'sans';
  if (st.includes('serif')) return 'serif';
  if (st.includes('fixed') || st.includes('pixel') || t.includes('bitmap')) return 'mono';
  if (t.includes('script') || st.includes('calligraph') || st.includes('handwrit')) return 'script';
  if (t.includes('techno') || st.includes('sci-fi') || st.includes('lcd')) return 'techno';
  if (t.includes('gothic') || st.includes('medieval')) return 'gothic';
  if (t.includes('bitmap')) return 'bitmap';
  return 'fancy';
}

async function fetchPage(url) {
  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept-Language': 'en-US,en;q=0.9',
      }
    });
    if (!res.ok) return null;
    return await res.text();
  } catch {
    return null;
  }
}

function parseFontsFromHtml(html, fallbackTheme = 'Fancy', fallbackSubtheme = 'Various') {
  if (!html) return [];
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
      const rawTheme = catMatch ? cleanText(catMatch[1]) : fallbackTheme;
      const rawSubtheme = catMatch && catMatch[2] ? cleanText(catMatch[2]) : fallbackSubtheme;
      const theme = rawTheme || fallbackTheme;
      const subtheme = rawSubtheme || fallbackSubtheme;
      const category = mapNormalizedCategory(theme, subtheme);
      const license = licenseMatch ? cleanText(licenseMatch[1]) : '100% Free';
      const previewImg = previewMatch ? 'https://www.dafont.com' + previewMatch[1] : undefined;

      fonts.push({
        slug: cleanSlug,
        kind: 'font',
        name,
        description: `Typographie originale créée par ${author}.`,
        author,
        theme,
        subtheme,
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
}

async function scrapeBatch(tasks, concurrency = 6) {
  const results = [];
  for (let i = 0; i < tasks.length; i += concurrency) {
    const batch = tasks.slice(i, i + concurrency);
    const batchResults = await Promise.all(
      batch.map(async (task) => {
        const html = await fetchPage(task.url);
        return parseFontsFromHtml(html, task.defaultTheme, task.defaultSubtheme);
      })
    );
    for (const list of batchResults) {
      results.push(...list);
    }
    process.stdout.write(`\rProgress: ${Math.min(i + concurrency, tasks.length)} / ${tasks.length} pages processed (${results.length} fonts found)...`);
  }
  console.log('');
  return results;
}

async function main() {
  console.log('Building tasks for dafont 100% free / public domain catalog...');
  const tasks = [];

  // Top popular: pages 1 to 5
  for (let page = 1; page <= 5; page++) {
    tasks.push({
      url: `https://www.dafont.com/top.php?page=${page}&fpp=100&l[]=10&l[]=1`,
      defaultTheme: 'Fancy',
      defaultSubtheme: 'Popular',
    });
  }

  // All 51 categories: pages 1 to 3
  for (const catId of ALL_CATEGORY_IDS) {
    for (let page = 1; page <= 3; page++) {
      tasks.push({
        url: `https://www.dafont.com/theme.php?cat=${catId}&page=${page}&fpp=100&l[]=10&l[]=1`,
        defaultTheme: 'Basic',
        defaultSubtheme: 'Various',
      });
    }
  }

  console.log(`Starting extraction of ${tasks.length} pages with concurrency 6...`);
  const allParsed = await scrapeBatch(tasks, 6);

  // Deduplicate by slug
  const allFontsMap = new Map();
  // Preserve existing high quality data if any
  const existingPath = path.join(__dirname, '../apps/web/src/data/scraped-fonts.json');
  if (fs.existsSync(existingPath)) {
    try {
      const existing = JSON.parse(fs.readFileSync(existingPath, 'utf8'));
      for (const f of existing) {
        allFontsMap.set(f.slug, f);
      }
    } catch {
      // ignore
    }
  }

  for (const f of allParsed) {
    if (!allFontsMap.has(f.slug)) {
      allFontsMap.set(f.slug, f);
    }
  }

  const finalFonts = Array.from(allFontsMap.values());
  // Sort alphabetically by name
  finalFonts.sort((a, b) => a.name.localeCompare(b.name));

  console.log(`\nTotal unique 100% Free fonts in catalog: ${finalFonts.length}`);

  const themeCounts = {};
  for (const f of finalFonts) {
    themeCounts[f.theme] = (themeCounts[f.theme] || 0) + 1;
  }
  console.log('Breakdown by theme:', themeCounts);

  fs.mkdirSync(path.dirname(existingPath), { recursive: true });
  fs.writeFileSync(existingPath, JSON.stringify(finalFonts, null, 2) + '\n', 'utf8');
  console.log(`Saved updated fonts catalog to ${existingPath}`);
}

main().catch(console.error);
