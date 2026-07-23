// Sample data for standalone/preview mode.
// In production, data comes dynamically from bridge.toolResult.
const SAMPLE_DATA = {
  name: 'Bangkok',
  description: 'Fly from Singapore to Bangkok, a vibrant Southeast Asian city of temples, street food and shopping.',
  image_url: 'https://assets.airtrfx.com/media-em/sq/southeastasia-bangkok.jpg?height=170&quality=80&fit=crop&format=auto&opt=true',
  category: 'Southeast Asia',
  origin: 'Singapore (SIN)',
  destination: 'Bangkok (BKK)',
  cabin_class: 'Economy',
  depart_date: '2026-09-01',
};

// Brand palette from BuildWidgetRequest — used to derive card content background.
const PALETTE = ['#00266b', '#2275d3'];

function getThemedCardBg(palette) {
  if (!palette || !palette[0]) return null;
  let hex = palette[0].replace('#', '');
  if (hex.length === 3) hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  if (hex.length !== 6) return null;
  let [r, g, b] = [parseInt(hex.slice(0, 2), 16), parseInt(hex.slice(2, 4), 16), parseInt(hex.slice(4, 6), 16)];
  if (isNaN(r) || isNaN(g) || isNaN(b)) return null;
  const lum = (c) => { const s = c / 255; return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4); };
  const relLum = (rr, gg, bb) => 0.2126 * lum(rr) + 0.7152 * lum(gg) + 0.0722 * lum(bb);
  if (relLum(r, g, b) <= 0.12) return { bg: `#${hex}`, fg: '#ffffff' };
  let lo = 0, hi = 1;
  for (let i = 0; i < 20; i++) { const m = (lo + hi) / 2; if (relLum(Math.round(r * m), Math.round(g * m), Math.round(b * m)) > 0.12) hi = m; else lo = m; }
  const dr = Math.round(r * lo), dg = Math.round(g * lo), db = Math.round(b * lo);
  return { bg: `#${dr.toString(16).padStart(2, '0')}${dg.toString(16).padStart(2, '0')}${db.toString(16).padStart(2, '0')}`, fg: '#ffffff' };
}
const theme = getThemedCardBg(PALETTE);

const CARD_COLORS = ['#378ef0', '#9256d9', '#0fb5ae', '#e68619', '#d83790', '#2dca72', '#4046ca', '#72b340'];

export default async function decorate(block, bridge) {
  let item;

  if (bridge) {
    bridge.applyHostStyles();
    const isPreview = bridge.hostContext?.preview === true;
    if (isPreview) {
      item = SAMPLE_DATA;
    } else {
      // Detail concept — structuredContent IS the item (flat). No wrapper key.
      const _result = await bridge.toolResult;
      item = (_result?.structuredContent || _result) || {};
    }
  } else {
    item = SAMPLE_DATA;
  }

  block.textContent = '';
  renderDetail(block, item, bridge);

  if (bridge) {
    bridge.reportSize(block.offsetWidth, block.offsetHeight);
    let resizeTimer;
    const ro = new ResizeObserver(() => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => bridge.reportSize(block.offsetWidth, block.offsetHeight), 150);
    });
    ro.observe(block);
  }
}

function renderDetail(block, item, bridge) {
  const card = document.createElement('div');
  card.className = 'detail-card';

  // Image (left)
  const imageWrap = document.createElement('div');
  imageWrap.className = 'detail-image';
  const colorDiv = () => {
    const d = document.createElement('div');
    d.style.cssText = `width:100%;height:100%;background-color:${CARD_COLORS[0]};`;
    return d;
  };
  if (item.image_url) {
    const img = document.createElement('img');
    img.src = item.image_url;
    img.alt = item.name || '';
    img.style.cssText = 'width:100%;height:100%;object-fit:cover;display:block;';
    img.onerror = () => img.parentNode.replaceChild(colorDiv(), img);
    imageWrap.appendChild(img);
  } else {
    imageWrap.appendChild(colorDiv());
  }
  card.appendChild(imageWrap);

  // Content (right)
  const content = document.createElement('div');
  content.className = 'detail-content';
  content.style.cssText = `background:${theme?.bg ?? '#1a1a1a'};color:${theme?.fg ?? '#fff'};`;

  if (item.category) {
    const chip = document.createElement('span');
    chip.className = 'detail-chip';
    chip.textContent = item.category;
    content.appendChild(chip);
  }

  const title = document.createElement('h3');
  title.className = 'detail-title';
  title.textContent = item.name || '';
  content.appendChild(title);

  if (item.description) {
    const desc = document.createElement('p');
    desc.className = 'detail-desc';
    desc.textContent = item.description;
    content.appendChild(desc);
  }

  if (item.price) {
    const price = document.createElement('div');
    price.className = 'detail-price';
    price.textContent = item.price;
    content.appendChild(price);
  }

  const btn = document.createElement('button');
  btn.className = 'detail-cta';
  btn.type = 'button';
  btn.textContent = 'Book Flight';
  if (bridge) {
    btn.addEventListener('click', () => {
      bridge.sendMessage(`Tell me more about ${item.name}`);
    });
  }
  content.appendChild(btn);

  card.appendChild(content);
  block.appendChild(card);
}
