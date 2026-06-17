const fs = require('fs');
const path = require('path');

const dirs = ['./src/components', './src/pages', './src'];
let files = [];

dirs.forEach(d => {
  if (fs.existsSync(d)) {
    const items = fs.readdirSync(d);
    items.forEach(i => {
      if (i.endsWith('.jsx') || i.endsWith('.css')) {
        files.push(path.join(d, i));
      }
    });
  }
});

const replacements = [
  // Typography
  { regex: /(?<!dark:)text-white\/50/g, replacement: 'text-slate-500 dark:text-white/50' },
  { regex: /(?<!dark:)text-white\/80/g, replacement: 'text-slate-800 dark:text-white/80' },
  { regex: /(?<!dark:)text-white\/90/g, replacement: 'text-slate-900 dark:text-white/90' },
  { regex: /(?<!dark:)text-white\b(?!\/)/g, replacement: 'text-slate-900 dark:text-white' },
  { regex: /(?<!dark:)text-zinc-300\b/g, replacement: 'text-slate-600 dark:text-zinc-300' },
  { regex: /(?<!dark:)text-slate-200\b/g, replacement: 'text-slate-600 dark:text-slate-200' },
  { regex: /(?<!dark:)text-gray-100\b/g, replacement: 'text-slate-600 dark:text-gray-100' },
  
  // Muted (usually text-muted or text-zinc-500, let's leave this manual or just replace specific ones)
  // The user said: "Look for muted text (e.g., text-white/50) and convert it to text-slate-500 dark:text-white/50." - handled above.

  // Borders, Dividers & Glassmorphism
  { regex: /(?<!dark:)border-white\/10\b/g, replacement: 'border-slate-200 dark:border-white/10' },
  { regex: /(?<!dark:)border-white\/5\b/g, replacement: 'border-slate-200 dark:border-white/5' },
  { regex: /(?<!dark:)bg-white\/5\b/g, replacement: 'bg-slate-50 dark:bg-white/5' },
  { regex: /(?<!dark:)bg-white\/10\b/g, replacement: 'bg-slate-100 dark:bg-white/10' },

  // Shadow
  { regex: /(?<!dark:)shadow-\[0_0_50px_rgba\(16,185,129,0\.3\)\]/g, replacement: 'shadow-xl shadow-slate-200/50 dark:shadow-[0_0_50px_rgba(16,185,129,0.3)]' },
  { regex: /(?<!dark:)shadow-\[0_20px_50px_rgba\(16,185,129,0\.3\)\]/g, replacement: 'shadow-xl shadow-slate-200/50 dark:shadow-[0_20px_50px_rgba(16,185,129,0.3)]' },
];

files.forEach(f => {
  let content = fs.readFileSync(f, 'utf-8');
  let original = content;

  replacements.forEach(r => {
    content = content.replace(r.regex, r.replacement);
  });

  if (content !== original) {
    fs.writeFileSync(f, content, 'utf-8');
    console.log(`Updated: ${f}`);
  }
});

console.log("Audit and replacement complete.");
