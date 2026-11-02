const fs = require('fs');
const path = require('path');

const CATEGORY_URLS = [
  // Top Popular
  { url: 'https://www.dafont.com/top.php?fpp=100&l[]=10&l[]=1', defaultTheme: 'Fancy', defaultSubtheme: 'Popular' },

  // Fancy (Fantaisie)
  { url: 'https://www.dafont.com/theme.php?cat=101&fpp=100&l[]=10&l[]=1', defaultTheme: 'Fancy', defaultSubtheme: 'Cartoon' },
  { url: 'https://www.dafont.com/theme.php?cat=102&fpp=100&l[]=10&l[]=1', defaultTheme: 'Fancy', defaultSubtheme: 'Comic' },
  { url: 'https://www.dafont.com/theme.php?cat=103&fpp=100&l[]=10&l[]=1', defaultTheme: 'Fancy', defaultSubtheme: 'Groovy' },
  { url: 'https://www.dafont.com/theme.php?cat=104&fpp=100&l[]=10&l[]=1', defaultTheme: 'Fancy', defaultSubtheme: 'Old School' },
  { url: 'https://www.dafont.com/theme.php?cat=106&fpp=100&l[]=10&l[]=1', defaultTheme: 'Fancy', defaultSubtheme: 'Western' },
  { url: 'https://www.dafont.com/theme.php?cat=110&fpp=100&l[]=10&l[]=1', defaultTheme: 'Fancy', defaultSubtheme: 'Horror' },
  { url: 'https://www.dafont.com/theme.php?cat=115&fpp=100&l[]=10&l[]=1', defaultTheme: 'Fancy', defaultSubtheme: 'Retro' },

  // Basic (Basique)
  { url: 'https://www.dafont.com/theme.php?cat=501&fpp=100&l[]=10&l[]=1', defaultTheme: 'Basic', defaultSubtheme: 'Sans serif' },
  { url: 'https://www.dafont.com/theme.php?cat=502&fpp=100&l[]=10&l[]=1', defaultTheme: 'Basic', defaultSubtheme: 'Serif' },
  { url: 'https://www.dafont.com/theme.php?cat=503&fpp=100&l[]=10&l[]=1', defaultTheme: 'Basic', defaultSubtheme: 'Fixed width' },

  // Script (Manuscrit / Calligraphie)
  { url: 'https://www.dafont.com/theme.php?cat=601&fpp=100&l[]=10&l[]=1', defaultTheme: 'Script', defaultSubtheme: 'Calligraphy' },
  { url: 'https://www.dafont.com/theme.php?cat=603&fpp=100&l[]=10&l[]=1', defaultTheme: 'Script', defaultSubtheme: 'Handwritten' },
  { url: 'https://www.dafont.com/theme.php?cat=604&fpp=100&l[]=10&l[]=1', defaultTheme: 'Script', defaultSubtheme: 'Brush' },
  { url: 'https://www.dafont.com/theme.php?cat=606&fpp=100&l[]=10&l[]=1', defaultTheme: 'Script', defaultSubtheme: 'Graffiti' },

  // Techno (Futuriste / Sci-Fi)
  { url: 'https://www.dafont.com/theme.php?cat=301&fpp=100&l[]=10&l[]=1', defaultTheme: 'Techno', defaultSubtheme: 'Sci-fi' },
  { url: 'https://www.dafont.com/theme.php?cat=302&fpp=100&l[]=10&l[]=1', defaultTheme: 'Techno', defaultSubtheme: '3D' },
  { url: 'https://www.dafont.com/theme.php?cat=303&fpp=100&l[]=10&l[]=1', defaultTheme: 'Techno', defaultSubtheme: 'Square' },
  { url: 'https://www.dafont.com/theme.php?cat=304&fpp=100&l[]=10&l[]=1', defaultTheme: 'Techno', defaultSubtheme: 'LCD' },

  // Gothic (Gothique / Médiéval)
  { url: 'https://www.dafont.com/theme.php?cat=401&fpp=100&l[]=10&l[]=1', defaultTheme: 'Gothic', defaultSubtheme: 'Medieval' },
  { url: 'https://www.dafont.com/theme.php?cat=402&fpp=100&l[]=10&l[]=1', defaultTheme: 'Gothic', defaultSubtheme: 'Modern' },
  { url: 'https://www.dafont.com/theme.php?cat=403&fpp=100&l[]=10&l[]=1', defaultTheme: 'Gothic', defaultSubtheme: 'Celtic' },

  // Bitmap (Pixel / Rétro)
  { url: 'https://www.dafont.com/theme.php?cat=701&fpp=100&l[]=10&l[]=1', defaultTheme: 'Bitmap', defaultSubtheme: 'Pixel' },
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

async function scrapeCategory(url, defaultTheme, defaultSubtheme) {
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
        const rawTheme = catMatch ? cleanText(catMatch[1]) : defaultTheme;
        const rawSubtheme = catMatch && catMatch[2] ? cleanText(catMatch[2]) : defaultSubtheme;
        const theme = rawTheme || defaultTheme;
        const subtheme = rawSubtheme || defaultSubtheme;
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
  } catch (err) {
    console.error(`Error scraping ${url}:`, err);
    return [];
  }
}

async function main() {
  const allFontsMap = new Map();

  for (const item of CATEGORY_URLS) {
    const list = await scrapeCategory(item.url, item.defaultTheme, item.defaultSubtheme);
    console.log(`  -> Got ${list.length} fonts from ${item.url}`);
    for (const f of list) {
      if (!allFontsMap.has(f.slug)) {
        allFontsMap.set(f.slug, f);
      }
    }
  }

  const scrapedFonts = Array.from(allFontsMap.values());
  console.log(`\nTotal unique 100% Free fonts scraped across themes: ${scrapedFonts.length}`);

  // Summary by theme
  const themeCounts = {};
  for (const f of scrapedFonts) {
    themeCounts[f.theme] = (themeCounts[f.theme] || 0) + 1;
  }
  console.log('Breakdown by theme:', themeCounts);

  // Save to JSON file
  const outPath = path.join(__dirname, '../apps/web/src/data/scraped-fonts.json');
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, JSON.stringify(scrapedFonts, null, 2) + '\n', 'utf8');
  console.log(`Saved scraped fonts to ${outPath}`);
}

main().catch(console.error);
