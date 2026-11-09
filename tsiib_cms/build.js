/**
 * Ts'íib — build
 * Lee cada texto de content/articulos/*.md (los que crea el panel /admin)
 * y genera articulos.json, que es lo que carga la página principal.
 * Netlify lo ejecuta solo en cada publicación (ver netlify.toml).
 */
const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const { marked } = require('marked');

const DIR = path.join(__dirname, 'content', 'articulos');
const OUT = path.join(__dirname, 'articulos.json');
const MESES = ['Ene', 'Feb', 'Mar', 'Abr', 'Mayo', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];

marked.setOptions({ gfm: true, breaks: true }); // respeta saltos de línea (útil en poesía)

function toISO(d) {
  if (d instanceof Date) return d.toISOString().slice(0, 10);
  return String(d || '').slice(0, 10);
}

function dateLabel(iso) {
  const [y, m] = iso.split('-').map(Number);
  return y && m ? `${MESES[m - 1]} ${y}` : '';
}

function readingTime(text) {
  const words = text.replace(/[#>*_`\[\]()!-]/g, ' ').split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200)) + ' min';
}

const files = fs.existsSync(DIR) ? fs.readdirSync(DIR).filter(f => f.endsWith('.md')) : [];
const arts = [];

for (const file of files) {
  try {
    const { data, content } = matter(fs.readFileSync(path.join(DIR, file), 'utf8'));
    if (data.published === false) continue; // borradores no salen al sitio
    if (!data.title) { console.warn(`⚠︎ ${file}: sin título, se omite`); continue; }
    const iso = toISO(data.date);
    arts.push({
      id: file.replace(/\.md$/, ''),
      cat: data.category || 'Artículos',
      title: String(data.title),
      author: String(data.author || 'Redacción Ts\'íib'),
      iso,
      date: dateLabel(iso),
      time: readingTime(content),
      image: data.image || '',
      caption: data.caption || '',
      tags: Array.isArray(data.tags) ? data.tags.filter(Boolean) : [],
      html: marked.parse(content || ''),
    });
  } catch (e) {
    console.warn(`⚠︎ ${file}: no se pudo leer (${e.message})`);
  }
}

arts.sort((a, b) => (b.iso || '').localeCompare(a.iso || ''));
fs.writeFileSync(OUT, JSON.stringify(arts, null, 1));
console.log(`✓ articulos.json — ${arts.length} textos publicados`);
