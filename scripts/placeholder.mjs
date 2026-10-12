// Generates placeholder project screenshots (replace with real ones).
import sharp from "sharp";
const items = [
  ["getfitwithsudhir", "GetFitWithSudhir", "Online fitness coaching", "#3b82f6", "#22d3ee"],
  ["dreambodycode", "DreamBodyCode", "In development", "#8b5cf6", "#ec4899"],
];
for (const [slug, title, sub, a, b] of items) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="1000">
  <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient>
  <radialGradient id="r" cx="0.75" cy="0.3" r="0.6"><stop offset="0" stop-color="${b}" stop-opacity="0.55"/><stop offset="1" stop-color="#0a0a0f" stop-opacity="0"/></radialGradient></defs>
  <rect width="1600" height="1000" fill="#0d0d14"/><rect width="1600" height="1000" fill="url(#r)"/>
  <rect x="100" y="70" width="1400" height="60" rx="30" fill="#ffffff" fill-opacity="0.05"/>
  <rect x="140" y="92" width="160" height="16" rx="8" fill="url(#g)"/>
  <text x="120" y="440" font-family="Arial, Helvetica, sans-serif" font-size="120" font-weight="800" fill="#ffffff">${title}</text>
  <text x="124" y="520" font-family="Arial, Helvetica, sans-serif" font-size="44" fill="#a3a3b8">${sub}</text>
  <rect x="124" y="590" width="300" height="80" rx="40" fill="url(#g)"/>
  <text x="274" y="642" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="30" font-weight="700" fill="#fff">Placeholder</text>
  <rect x="120" y="760" width="420" height="160" rx="24" fill="#ffffff" fill-opacity="0.05"/>
  <rect x="590" y="760" width="420" height="160" rx="24" fill="#ffffff" fill-opacity="0.05"/>
  <rect x="1060" y="760" width="420" height="160" rx="24" fill="#ffffff" fill-opacity="0.05"/>
  </svg>`;
  await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toFile(`public/projects/${slug}.png`);
  console.log("wrote", slug);
}
