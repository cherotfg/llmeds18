// Sample data for standalone/preview mode.
// In production, data comes dynamically from bridge.toolResult.
const SAMPLE_DATA = [
  {
    name: 'Bangkok',
    description: 'Fly from Singapore to Bangkok, a vibrant Southeast Asian city of temples, street food and shopping.',
    image_url: 'https://assets.airtrfx.com/media-em/sq/southeastasia-bangkok.jpg?height=170&quality=80&fit=crop&format=auto&opt=true',
    category: 'Southeast Asia',
    origin: 'Singapore (SIN)',
    destination: 'Bangkok (BKK)',
    cabin_class: 'Economy',
    depart_date: '2026-09-01',
  },
  {
    name: 'Kuala Lumpur',
    description: "Direct flights from Singapore to Kuala Lumpur, Malaysia's dynamic capital.",
    image_url: 'https://assets.airtrfx.com/media-em/sq/5d88e40cbebda_southeastasia-kuala-lumpur2.jpg?height=170&quality=80&fit=crop&format=auto&opt=true',
    price: 'from SGD 193',
    category: 'Southeast Asia',
    origin: 'Singapore (SIN)',
    destination: 'Kuala Lumpur (KUL)',
    cabin_class: 'Economy',
    depart_date: '2026-09-01',
  },
  {
    name: 'Seoul',
    description: "Fly from Singapore to Seoul, South Korea's fast-paced hub of culture, cuisine and technology.",
    image_url: 'https://assets.airtrfx.com/media-em/sq/northasia-seoul.jpg?height=170&quality=80&fit=crop&format=auto&opt=true',
    category: 'North Asia',
    origin: 'Singapore (SIN)',
    destination: 'Seoul (ICN)',
    cabin_class: 'Economy',
    depart_date: '2026-09-01',
  },
  {
    name: 'Melbourne',
    description: "Fly from Singapore to Melbourne, Australia's cultural capital known for its laneways and coffee.",
    image_url: 'https://assets.airtrfx.com/media-em/sq/southwestpacific-melbourne-1.jpg?height=170&quality=80&fit=crop&format=auto&opt=true',
    category: 'Southwest Pacific',
    origin: 'Singapore (SIN)',
    destination: 'Melbourne (MEL)',
    cabin_class: 'Economy',
    depart_date: '2026-09-01',
  },
  {
    name: 'Shanghai',
    description: "Fly from Singapore to Shanghai, China's cosmopolitan financial and cultural centre.",
    image_url: 'https://assets.airtrfx.com/media-em/sq/northasia-shanghai.jpg?height=170&quality=80&fit=crop&format=auto&opt=true',
    category: 'North Asia',
    origin: 'Singapore (SIN)',
    destination: 'Shanghai (PVG)',
    cabin_class: 'Economy',
    depart_date: '2026-09-01',
  },
  {
    name: 'Perth',
    description: 'Fly from Singapore to Perth, the sunny gateway to Western Australia.',
    image_url: 'https://assets.airtrfx.com/media-em/sq/southwestpacific-perth.jpg?height=170&quality=80&fit=crop&format=auto&opt=true',
    category: 'Southwest Pacific',
    origin: 'Singapore (SIN)',
    destination: 'Perth (PER)',
    cabin_class: 'Economy',
    depart_date: '2026-09-01',
  },
  {
    name: 'Sydney',
    description: 'Fly from Singapore to Sydney, home to the iconic Opera House and Harbour Bridge.',
    image_url: 'https://assets.airtrfx.com/media-em/sq/southwestpacific-sydney.jpg?height=170&quality=80&fit=crop&format=auto&opt=true',
    category: 'Southwest Pacific',
    origin: 'Singapore (SIN)',
    destination: 'Sydney (SYD)',
    cabin_class: 'Economy',
    depart_date: '2026-09-01',
  },
  {
    name: 'Manila',
    description: 'Fly from Singapore to Manila, the bustling capital of the Philippines.',
    image_url: 'https://assets.airtrfx.com/media-em/sq/southeastasia-manila.jpg?height=170&quality=80&fit=crop&format=auto&opt=true',
    category: 'Southeast Asia',
    origin: 'Singapore (SIN)',
    destination: 'Manila (MNL)',
    cabin_class: 'Economy',
    depart_date: '2026-09-01',
  },
  {
    name: 'Hong Kong',
    description: 'Limited-time promotional fares from Singapore to Hong Kong; sale period 14 July to 9 August 2026.',
    image_url: 'https://assets.airtrfx.com/media-em/sq/5d88e400b4909_northasia-hong-kong2.jpg?height=170&quality=80&fit=crop&format=auto&opt=true',
    price: 'from SGD 358',
    category: 'North Asia',
    origin: 'Singapore (SIN)',
    destination: 'Hong Kong (HKG)',
    cabin_class: 'Economy',
    depart_date: '2026-09-01',
    is_deal: true,
  },
];

// Brand palette from BuildWidgetRequest — used to derive card info-strip background.
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
  let items;

  if (bridge) {
    bridge.applyHostStyles();
    const isPreview = bridge.hostContext?.preview === true;
    if (isPreview) {
      items = SAMPLE_DATA;
    } else {
      const _result = await bridge.toolResult;
      const structuredContent = _result?.structuredContent || _result;
      // structuredContent.flights — bare array outputSchema; key derived from actionName "search_flights"
      items = structuredContent?.flights || [];
    }
  } else {
    items = SAMPLE_DATA;
  }

  block.textContent = '';
  renderFlights(block, items, bridge);

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

function renderFlights(block, items, bridge) {
  const list = (items || []).filter((it) => !it.is_deal).slice(0, 10);

  const wrapper = document.createElement('div');
  wrapper.className = 'search-flights-wrapper';

  const track = document.createElement('div');
  track.className = 'search-flights-track';

  list.forEach((item, i) => {
    const card = document.createElement('article');
    card.className = 'search-flights-card';

    const imageContainer = document.createElement('div');
    imageContainer.className = 'search-flights-image';
    const fallbackColor = CARD_COLORS[i % CARD_COLORS.length];
    const colorDiv = () => {
      const d = document.createElement('div');
      d.style.cssText = `width:100%;height:100%;background-color:${fallbackColor};`;
      return d;
    };
    if (item.image_url) {
      const img = document.createElement('img');
      img.src = item.image_url;
      img.alt = item.name || '';
      img.loading = 'lazy';
      img.style.cssText = 'width:100%;height:100%;object-fit:cover;display:block;';
      img.onerror = () => img.parentNode.replaceChild(colorDiv(), img);
      imageContainer.appendChild(img);
    } else {
      imageContainer.appendChild(colorDiv());
    }
    card.appendChild(imageContainer);

    const info = document.createElement('div');
    info.className = 'search-flights-info';
    info.style.cssText = `background:${theme?.bg ?? '#1a1a1a'};color:${theme?.fg ?? '#fff'};`;

    const title = document.createElement('h3');
    title.className = 'search-flights-name';
    title.textContent = item.name || item.destination || '';
    info.appendChild(title);

    if (item.description) {
      const desc = document.createElement('p');
      desc.className = 'search-flights-desc';
      desc.textContent = item.description;
      info.appendChild(desc);
    }

    const meta = document.createElement('div');
    meta.className = 'search-flights-meta';
    if (item.price) {
      const price = document.createElement('span');
      price.className = 'search-flights-price';
      price.textContent = item.price;
      meta.appendChild(price);
    }
    if (item.category) {
      const badge = document.createElement('span');
      badge.className = 'search-flights-badge';
      badge.textContent = item.category;
      meta.appendChild(badge);
    }
    if (meta.childNodes.length) info.appendChild(meta);

    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'search-flights-cta';
    btn.textContent = 'Search Flights';
    if (bridge) {
      btn.addEventListener('click', () => {
        bridge.sendMessage(`Search flights to ${item.name || item.destination}`);
      });
    }
    info.appendChild(btn);

    card.appendChild(info);
    track.appendChild(card);
  });

  const fade = document.createElement('div');
  fade.className = 'search-flights-fade';
  fade.style.cssText = `position:absolute;top:0;right:0;height:100%;width:60px;background:linear-gradient(to right,transparent,${theme?.bg ?? '#1a1a1a'}cc);pointer-events:none;border-radius:0 10px 10px 0;`;

  const mkArrow = (dir) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = `search-flights-arrow search-flights-arrow-${dir}`;
    b.setAttribute('aria-label', dir === 'left' ? 'Scroll left' : 'Scroll right');
    b.textContent = dir === 'left' ? '◀' : '▶';
    b.addEventListener('click', () => {
      const cardEl = track.querySelector('.search-flights-card');
      const step = cardEl ? cardEl.offsetWidth + 16 : 236;
      track.scrollBy({ left: dir === 'left' ? -step : step, behavior: 'smooth' });
    });
    b.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); b.click(); }
    });
    return b;
  };
  const leftArrow = mkArrow('left');
  const rightArrow = mkArrow('right');

  const updateArrows = () => {
    const maxScroll = track.scrollWidth - track.clientWidth - 1;
    leftArrow.style.display = track.scrollLeft <= 0 ? 'none' : 'flex';
    rightArrow.style.display = track.scrollLeft >= maxScroll ? 'none' : 'flex';
    fade.style.display = track.scrollLeft >= maxScroll ? 'none' : 'block';
  };
  track.addEventListener('scroll', updateArrows);

  wrapper.appendChild(track);
  wrapper.appendChild(fade);
  wrapper.appendChild(leftArrow);
  wrapper.appendChild(rightArrow);
  block.appendChild(wrapper);

  requestAnimationFrame(updateArrows);
}
