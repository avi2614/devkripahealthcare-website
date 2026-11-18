/**
 * Treatment-specific before/after illustrations (inline SVG strings).
 * Each pair shows the condition the treatment addresses and the intended outcome.
 * They are drawings, not patient results — real consented photos can replace them
 * via `beforeAfter` on the treatment in data/site.ts.
 *
 * Plain strings (no JSX) so the same art can be used by the Next.js app and the static index.html.
 */

export type BeforeAfterArt = { before: string; after: string; beforeLabel: string; afterLabel: string };

type Area = { x: number; y: number; w: number; h: number };

const svg = (body: string, bg = "#eaf1fb") =>
  `<svg viewBox="0 0 400 300" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" style="display:block"><rect width="400" height="300" fill="${bg}"/>${body}</svg>`;

/** Deterministic pseudo-random numbers, so server and client render identical markup. */
function rng(seed: number) {
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  return () => (s = (s * 16807) % 2147483647) / 2147483647;
}

const f = (n: number) => n.toFixed(1);

function scatter(seed: number, n: number, areas: Area[], draw: (x: number, y: number, r: number, i: number) => string) {
  const r = rng(seed);
  let out = "";
  for (let i = 0; i < n; i++) {
    const a = areas[i % areas.length];
    out += draw(a.x + r() * a.w, a.y + r() * a.h, r(), i);
  }
  return out;
}

const blurDef = (id: string, sd = 5) =>
  `<defs><filter id="${id}" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="${sd}"/></filter></defs>`;

const star = (x: number, y: number, r: number, fill = "#ffffff") =>
  `<path d="M${x} ${y - r}L${x + r * 0.22} ${y - r * 0.22}L${x + r} ${y}L${x + r * 0.22} ${y + r * 0.22}L${x} ${y + r}L${x - r * 0.22} ${y + r * 0.22}L${x - r} ${y}L${x - r * 0.22} ${y - r * 0.22}Z" fill="${fill}"/>`;

/* ------------------------------------------------------------------ */
/*  Teeth — front view of the smile                                    */
/* ------------------------------------------------------------------ */

const MOUTH = "#4a1622";
const GUM = "#e98b9b";
const WHITE_TOOTH = "#fbfaf5";

type Tooth = { x: number; w: number; h: number; fill: string; rot: number; dy: number; hidden: boolean; chip: boolean; stain: boolean };

function upperTeeth(fill = WHITE_TOOTH, heights = [78, 86, 100, 100, 86, 78]): Tooth[] {
  const ws = [38, 44, 54, 54, 44, 38];
  let x = 59;
  return ws.map((w, i) => {
    const t: Tooth = { x, w, h: heights[i], fill, rot: 0, dy: 0, hidden: false, chip: false, stain: false };
    x += w + 2;
    return t;
  });
}

const toothPath = (x: number, y: number, w: number, h: number) =>
  `M${x} ${y}H${x + w}V${y + h * 0.72}Q${x + w} ${y + h} ${x + w / 2} ${y + h}Q${x} ${y + h} ${x} ${y + h * 0.72}Z`;
const lowerToothPath = (x: number, yb: number, w: number, h: number) =>
  `M${x} ${yb}H${x + w}V${yb - h * 0.72}Q${x + w} ${yb - h} ${x + w / 2} ${yb - h}Q${x} ${yb - h} ${x} ${yb - h * 0.72}Z`;

function mouthScene(
  teeth: Tooth[],
  o: { top?: number; gum?: string; lowerFill?: string; tartar?: boolean; sparkle?: boolean; lowerRot?: number[] } = {},
) {
  const top = o.top ?? 92;
  const gum = o.gum ?? GUM;
  const lf = o.lowerFill ?? teeth[0].fill;
  let s = `<rect width="400" height="300" fill="${MOUTH}"/>`;
  s += `<rect x="0" y="236" width="400" height="64" fill="${gum}"/>`;
  for (let i = 0; i < 7; i++) {
    const x = 68 + i * 38;
    const rot = o.lowerRot?.[i] ?? 0;
    s += `<path d="${lowerToothPath(x, 240, 36, 52)}" fill="${lf}" stroke="#cfc8b8" stroke-width="1.2" transform="rotate(${rot} ${x + 18} 214)"/>`;
    if (o.tartar) s += `<path d="M${x + 2} 240h32v-7q-16 -6 -32 0z" fill="#9b7a45" opacity="0.85"/>`;
  }
  s += `<rect x="0" y="0" width="400" height="${top + 8}" fill="${gum}"/>`;
  for (const t of teeth) {
    if (t.hidden) continue;
    const cx = t.x + t.w / 2;
    const y = top + t.dy;
    s += `<g transform="rotate(${t.rot} ${cx} ${y + t.h / 2})">`;
    s += `<path d="${toothPath(t.x, y, t.w, t.h)}" fill="${t.fill}" stroke="#cfc8b8" stroke-width="1.5"/>`;
    if (t.stain) s += `<ellipse cx="${cx}" cy="${f(y + t.h * 0.55)}" rx="${f(t.w * 0.28)}" ry="${f(t.h * 0.18)}" fill="#8d6431" opacity="0.6"/>`;
    if (t.chip) s += `<path d="M${f(t.x + t.w * 0.45)} ${y + t.h + 3}L${t.x + t.w + 3} ${f(y + t.h * 0.6)}L${t.x + t.w + 3} ${y + t.h + 3}Z" fill="${MOUTH}"/>`;
    if (o.tartar) s += `<path d="M${t.x} ${y + 4}h${t.w}v10q${f(-t.w / 2)} 8 ${-t.w} 0z" fill="#9b7a45" opacity="0.85"/>`;
    s += `<path d="M${f(t.x + t.w * 0.26)} ${y + 12}Q${f(t.x + t.w * 0.2)} ${f(y + t.h * 0.45)} ${f(t.x + t.w * 0.3)} ${f(y + t.h * 0.68)}" stroke="#ffffff" stroke-opacity="0.65" stroke-width="3" fill="none" stroke-linecap="round"/>`;
    s += `</g>`;
  }
  for (let i = 1; i < teeth.length; i++) {
    const bx = teeth[i].x - 1;
    s += `<path d="M${bx - 9} ${top + 4}L${bx + 9} ${top + 4}L${bx} ${top + 20}Z" fill="${gum}"/>`;
  }
  if (o.sparkle) s += star(132, 150, 9) + star(262, 132, 12) + star(220, 205, 7);
  return svg(s, MOUTH);
}

/* ------------------------------------------------------------------ */
/*  Teeth — cross-section in the jaw                                   */
/* ------------------------------------------------------------------ */

const MOLAR =
  "M150,110 C150,80 165,72 178,80 C188,86 192,86 200,80 C208,86 212,86 222,80 C235,72 250,80 250,110 L246,150 C244,175 240,205 232,235 C228,248 216,246 215,232 L208,175 L192,175 L185,232 C184,246 172,248 168,235 C160,205 156,175 154,150 Z";
const PULP =
  "M178,115 C178,105 222,105 222,115 L220,150 L214,225 C213,232 208,232 208,225 L204,165 L196,165 L192,225 C192,232 187,232 186,225 L180,150 Z";
const CROWN =
  "M150,138 L150,110 C150,80 165,72 178,80 C188,86 192,86 200,80 C208,86 212,86 222,80 C235,72 250,80 250,110 L250,138 Q200,150 150,138 Z";

const molar = (dx: number, fill = WHITE_TOOTH, pulp = "#eaa3a3") =>
  `<g transform="translate(${dx} 0)"><path d="${MOLAR}" fill="${fill}" stroke="#bfb6a3" stroke-width="2"/><path d="${PULP}" fill="${pulp}"/></g>`;
const neighbours = molar(-178) + molar(178);

function jaw(body: string, o: { dip?: boolean; seed?: number } = {}) {
  let s = `<rect x="0" y="150" width="400" height="150" fill="#f1dcbc"/>`;
  s += scatter(o.seed ?? 7, 70, [{ x: 0, y: 168, w: 400, h: 130 }], (x, y, r) => `<circle cx="${f(x)}" cy="${f(y)}" r="${f(2 + r * 4)}" fill="#e3c79f"/>`);
  s += o.dip
    ? `<path d="M0 128H118C158 128 166 160 200 160C234 160 242 128 282 128H400V172H0Z" fill="${GUM}"/>`
    : `<rect x="0" y="128" width="400" height="44" fill="${GUM}"/>`;
  return svg(s + body, "#eaf1fb");
}

const implant =
  `<rect x="190" y="166" width="20" height="82" rx="7" fill="#9aa5b8"/>` +
  [174, 184, 194, 204, 214, 224, 234].map((y) => `<path d="M185 ${y}L215 ${y + 5}" stroke="#6f7b90" stroke-width="3" stroke-linecap="round"/>`).join("") +
  `<rect x="192" y="136" width="16" height="34" rx="2" fill="#b9c2d2"/>` +
  `<path d="${CROWN}" fill="${WHITE_TOOTH}" stroke="#bfb6a3" stroke-width="2"/>`;

/* ------------------------------------------------------------------ */
/*  Face                                                               */
/* ------------------------------------------------------------------ */

const SKIN = "#f2c9a8";
const HAIR = "#3b2a20";
const HAIR_FULL = `<path d="M106 150C96 70 150 32 200 32C252 32 306 70 294 150C288 118 276 98 258 92C228 104 176 104 142 92C124 98 112 118 106 150Z" fill="${HAIR}"/>`;

const CHEEK_L: Area = { x: 132, y: 166, w: 44, h: 40 };
const CHEEK_R: Area = { x: 224, y: 166, w: 44, h: 40 };
const FOREHEAD: Area = { x: 162, y: 104, w: 76, h: 16 };
const CHIN: Area = { x: 182, y: 234, w: 36, h: 18 };

function faceScene(o: { skin?: string; hair?: string; overlay?: string; defs?: string } = {}) {
  const skin = o.skin ?? SKIN;
  let s = o.defs ?? "";
  s += `<path d="M84 300C96 254 150 244 200 244C250 244 304 254 316 300Z" fill="#5f7fb5"/>`;
  s += `<rect x="172" y="222" width="56" height="40" fill="${skin}"/>`;
  s += `<ellipse cx="109" cy="160" rx="12" ry="20" fill="${skin}"/><ellipse cx="291" cy="160" rx="12" ry="20" fill="${skin}"/>`;
  s += `<ellipse cx="200" cy="155" rx="92" ry="112" fill="${skin}"/>`;
  s += o.hair ?? HAIR_FULL;
  s += `<path d="M148 130Q164 121 181 128M219 128Q236 121 252 130" stroke="#6b4a35" stroke-width="4" fill="none" stroke-linecap="round"/>`;
  s += `<path d="M152 149Q165 157 178 149M222 149Q235 157 248 149" stroke="#4a3426" stroke-width="3" fill="none" stroke-linecap="round"/>`;
  s += `<path d="M200 152Q197 178 190 188Q200 195 210 188" stroke="#c98f6b" stroke-width="3" fill="none" stroke-linecap="round"/>`;
  s += `<path d="M178 214Q200 229 222 214" stroke="#b5564f" stroke-width="5" fill="none" stroke-linecap="round"/>`;
  s += o.overlay ?? "";
  return svg(s);
}

const glow =
  `<ellipse cx="156" cy="180" rx="24" ry="12" fill="#ffffff" opacity="0.3"/>` +
  `<ellipse cx="244" cy="180" rx="24" ry="12" fill="#ffffff" opacity="0.3"/>` +
  `<ellipse cx="200" cy="112" rx="30" ry="7" fill="#ffffff" opacity="0.28"/>`;

const pimple = (x: number, y: number, r: number) =>
  `<circle cx="${f(x)}" cy="${f(y)}" r="${f(r)}" fill="#d9534f" opacity="0.85"/><circle cx="${f(x)}" cy="${f(y - r * 0.15)}" r="${f(r * 0.35)}" fill="#f6e3b0"/>`;

/* ------------------------------------------------------------------ */
/*  Skin close-up                                                      */
/* ------------------------------------------------------------------ */

function patch(body: string, o: { skin?: string; pores?: number; seed?: number } = {}) {
  const skin = o.skin ?? SKIN;
  let s = `<ellipse cx="150" cy="90" rx="190" ry="110" fill="#ffffff" opacity="0.14"/>`;
  s += scatter(o.seed ?? 3, o.pores ?? 140, [{ x: 0, y: 0, w: 400, h: 300 }], (x, y, r) => `<circle cx="${f(x)}" cy="${f(y)}" r="${f(0.8 + r * 0.9)}" fill="#c48f6c" opacity="0.4"/>`);
  return svg(s + body, skin);
}

/* ------------------------------------------------------------------ */
/*  Per-treatment pairs                                                */
/* ------------------------------------------------------------------ */

function build(id: string): BeforeAfterArt | undefined {
  switch (id) {
    case "root-canal":
      return {
        beforeLabel: "Infected pulp & abscess",
        afterLabel: "Cleaned, sealed & crowned",
        before: jaw(
          neighbours +
            molar(0, WHITE_TOOTH, "#b52a2a") +
            `<path d="M170 80C164 96 174 114 188 116C198 110 196 92 188 80Z" fill="#4a3220"/>` +
            `<circle cx="176" cy="240" r="13" fill="#f5c84c" stroke="#d35400" stroke-width="3" opacity="0.92"/>` +
            `<circle cx="224" cy="240" r="13" fill="#f5c84c" stroke="#d35400" stroke-width="3" opacity="0.92"/>` +
            `<path d="M150 252l-12 6M250 252l12 6M200 262v12" stroke="#d35400" stroke-width="3" stroke-linecap="round"/>`,
        ),
        after: jaw(neighbours + molar(0, WHITE_TOOTH, "#f08a5d") + `<path d="${CROWN}" fill="#ffffff" stroke="#8e98ab" stroke-width="2.5"/>`),
      };
    case "extraction":
      return {
        beforeLabel: "Broken, infected tooth",
        afterLabel: "Tooth removed, socket healed",
        before: jaw(
          neighbours +
            `<ellipse cx="200" cy="140" rx="74" ry="18" fill="#d9465a" opacity="0.75"/>` +
            molar(0, "#e9dcc0", "#8f1f1f") +
            `<path d="M138 60L262 60L254 100L236 90L224 110L206 94L190 114L174 96L160 108L146 98Z" fill="#eaf1fb"/>` +
            `<path d="M162 112C170 104 182 112 190 122C182 132 168 128 162 112Z" fill="#3e2a1b"/><path d="M214 118C222 108 236 114 238 126C228 134 216 130 214 118Z" fill="#3e2a1b"/>` +
            `<circle cx="200" cy="248" r="15" fill="#f5c84c" stroke="#d35400" stroke-width="3" opacity="0.9"/>`,
        ),
        after: jaw(neighbours + scatter(11, 14, [{ x: 172, y: 172, w: 56, h: 70 }], (x, y, r) => `<circle cx="${f(x)}" cy="${f(y)}" r="${f(2 + r * 3)}" fill="#ead2ad"/>`), { dip: true }),
      };
    case "orthodontics": {
      const crooked = upperTeeth();
      const rot = [-9, 7, -5, 11, -13, 6];
      const dy = [8, -6, 12, 0, 10, -4];
      const dx = [6, -4, 4, -6, 8, -2];
      crooked.forEach((t, i) => {
        t.rot = rot[i];
        t.dy = dy[i];
        t.x += dx[i];
      });
      return {
        beforeLabel: "Crooked, crowded teeth",
        afterLabel: "Straight, aligned teeth",
        before: mouthScene(crooked, { lowerRot: [8, -10, 6, -12, 9, -7, 10] }),
        after: mouthScene(upperTeeth()),
      };
    }
    case "smile-correction":
      return {
        beforeLabel: "Gummy, uneven smile",
        afterLabel: "Balanced, even smile",
        before: mouthScene(upperTeeth(WHITE_TOOTH, [66, 92, 84, 104, 74, 70]), { top: 116 }),
        after: mouthScene(upperTeeth(WHITE_TOOTH, [80, 88, 100, 100, 88, 80])),
      };
    case "veneers-bridges": {
      const worn = upperTeeth("#efe6cf");
      worn[1].fill = "#d9d2c3";
      worn[2].hidden = true;
      worn[3].chip = true;
      worn[3].stain = true;
      worn[4].stain = true;
      worn[0].chip = true;
      return {
        beforeLabel: "Chipped, stained & missing tooth",
        afterLabel: "Veneers & bridge restore the smile",
        before: mouthScene(worn, { lowerFill: "#efe6cf" }),
        after: mouthScene(upperTeeth("#ffffff"), { sparkle: true }),
      };
    }
    case "implants":
      return {
        beforeLabel: "Missing tooth",
        afterLabel: "Implant with natural-looking crown",
        before: jaw(neighbours + `<path d="${CROWN}" fill="none" stroke="#8e98ab" stroke-width="2.5" stroke-dasharray="7 7" opacity="0.75"/>`, { dip: true }),
        after: jaw(neighbours + implant),
      };
    case "cleaning-whitening": {
      const yellow = upperTeeth("#e2c27a");
      yellow[2].stain = true;
      yellow[4].stain = true;
      return {
        beforeLabel: "Tartar & yellow stains",
        afterLabel: "Clean, whiter teeth",
        before: mouthScene(yellow, { tartar: true, gum: "#de6f80" }),
        after: mouthScene(upperTeeth("#ffffff"), { sparkle: true }),
      };
    }
    case "acne":
      return {
        beforeLabel: "Active acne breakouts",
        afterLabel: "Clearer, calmer skin",
        before: faceScene({
          defs: blurDef("ba-acne-red", 6),
          overlay:
            `<g filter="url(#ba-acne-red)"><ellipse cx="156" cy="186" rx="26" ry="20" fill="#e07a6f" opacity="0.35"/><ellipse cx="244" cy="186" rx="26" ry="20" fill="#e07a6f" opacity="0.35"/></g>` +
            scatter(21, 26, [CHEEK_L, CHEEK_R, FOREHEAD, CHEEK_L, CHEEK_R, CHIN], (x, y, r) => pimple(x, y, 2.5 + r * 3.5)),
        }),
        after: faceScene({ overlay: glow }),
      };
    case "pigmentation":
      return {
        beforeLabel: "Melasma & dark patches",
        afterLabel: "More even skin tone",
        before: faceScene({
          defs: blurDef("ba-pig", 5),
          overlay:
            `<g filter="url(#ba-pig)" fill="#9c6640" opacity="0.5">` +
            `<ellipse cx="152" cy="182" rx="22" ry="15"/><ellipse cx="166" cy="196" rx="12" ry="9"/>` +
            `<ellipse cx="248" cy="182" rx="22" ry="15"/><ellipse cx="236" cy="198" rx="12" ry="8"/>` +
            `<ellipse cx="200" cy="112" rx="30" ry="8"/><ellipse cx="200" cy="203" rx="16" ry="4"/></g>` +
            scatter(31, 18, [CHEEK_L, CHEEK_R], (x, y, r) => `<circle cx="${f(x)}" cy="${f(y)}" r="${f(1.2 + r * 1.8)}" fill="#8a5636" opacity="0.6"/>`),
        }),
        after: faceScene({ overlay: glow }),
      };
    case "chemical-peels":
      return {
        beforeLabel: "Dull, uneven skin",
        afterLabel: "Brighter, smoother skin",
        before: faceScene({
          skin: "#d6b293",
          overlay:
            scatter(41, 34, [CHEEK_L, CHEEK_R, FOREHEAD, CHIN], (x, y, r) => `<circle cx="${f(x)}" cy="${f(y)}" r="${f(1.5 + r * 2.5)}" fill="#a97a55" opacity="0.55"/>`) +
            `<path d="M172 108q28 -5 56 0M176 116q24 -4 48 0M150 162q14 6 26 2M224 164q14 4 26 -2" stroke="#b08460" stroke-width="1.5" fill="none" opacity="0.7"/>`,
        }),
        after: faceScene({ skin: "#f5cfb0", overlay: glow + star(262, 168, 6) + star(140, 118, 5) }),
      };
    case "microneedling":
      return {
        beforeLabel: "Pitted acne scars",
        afterLabel: "Smoother skin texture",
        before: patch(
          scatter(51, 22, [{ x: 20, y: 20, w: 360, h: 260 }], (x, y, r) => {
            const s = 7 + r * 10;
            return `<ellipse cx="${f(x)}" cy="${f(y)}" rx="${f(s)}" ry="${f(s * 0.8)}" fill="#c48a68"/><ellipse cx="${f(x + s * 0.18)}" cy="${f(y + s * 0.2)}" rx="${f(s * 0.68)}" ry="${f(s * 0.5)}" fill="#dca787"/>`;
          }) + scatter(52, 8, [{ x: 30, y: 30, w: 340, h: 240 }], (x, y, r) => `<circle cx="${f(x)}" cy="${f(y)}" r="${f(3 + r * 3)}" fill="#d9776b" opacity="0.45"/>`),
          { skin: "#e8b997", seed: 5 },
        ),
        after: patch(`<ellipse cx="250" cy="200" rx="120" ry="60" fill="#ffffff" opacity="0.12"/>`, { pores: 60, seed: 5 }),
      };
    case "medi-facials":
      return {
        beforeLabel: "Dull skin & blackheads",
        afterLabel: "Hydrated, glowing skin",
        before: faceScene({
          skin: "#d9b698",
          overlay:
            scatter(61, 30, [{ x: 186, y: 166, w: 28, h: 24 }, CHIN], (x, y, r) => `<circle cx="${f(x)}" cy="${f(y)}" r="${f(0.9 + r * 0.9)}" fill="#2f2119"/>`) +
            scatter(62, 16, [CHEEK_L, CHEEK_R], (x, y, r) => `<path d="M${f(x)} ${f(y)}l${f(4 + r * 4)} 1l-2 3z" fill="#fff6ee" opacity="0.8"/>`),
        }),
        after: faceScene({
          skin: "#f5cfb0",
          overlay:
            glow +
            [
              [150, 172],
              [252, 176],
              [196, 110],
            ]
              .map(([x, y]) => `<path d="M${x} ${y - 7}q5 7 0 11q-5 -4 0 -11z" fill="#bfe3ff" opacity="0.9"/>`)
              .join("") +
            star(268, 150, 7) +
            star(134, 140, 5),
        }),
      };
    case "microdermabrasion":
      return {
        beforeLabel: "Rough, flaky texture",
        afterLabel: "Soft, refined skin",
        before: patch(
          scatter(71, 40, [{ x: 10, y: 10, w: 380, h: 280 }], (x, y, r) => {
            const s = 4 + r * 7;
            return `<path d="M${f(x)} ${f(y)}l${f(s)} ${f(-s * 0.4)}l${f(s * 0.5)} ${f(s * 0.8)}l${f(-s)} ${f(s * 0.3)}z" fill="#fff7f0" opacity="0.75"/>`;
          }) +
            `<path d="M30 80q80 20 160 -6M60 210q90 -18 190 8M220 60q60 30 150 10M40 150q50 10 110 -4" stroke="#b9876a" stroke-width="1.6" fill="none" opacity="0.6"/>` +
            scatter(72, 10, [{ x: 20, y: 20, w: 360, h: 260 }], (x, y, r) => `<circle cx="${f(x)}" cy="${f(y)}" r="${f(10 + r * 14)}" fill="#c28f6d" opacity="0.18"/>`),
          { skin: "#dfb797", pores: 200, seed: 7 },
        ),
        after: patch(`<ellipse cx="260" cy="210" rx="130" ry="60" fill="#ffffff" opacity="0.12"/>`, { pores: 70, seed: 7 }),
      };
    case "laser-hair-removal":
      return {
        beforeLabel: "Unwanted hair",
        afterLabel: "Smooth, hair-free skin",
        before: patch(
          scatter(81, 260, [{ x: 0, y: 0, w: 400, h: 300 }], (x, y, r) => {
            const len = 9 + r * 9;
            return `<path d="M${f(x)} ${f(y)}q${f(2 + r * 3)} ${f(-len * 0.5)} ${f(len * 0.55)} ${f(-len)}" stroke="#2e2119" stroke-width="1.6" fill="none" stroke-linecap="round"/>`;
          }),
          { seed: 9 },
        ),
        after: patch(`<ellipse cx="250" cy="200" rx="130" ry="60" fill="#ffffff" opacity="0.14"/>`, { seed: 9 }),
      };
    case "hair":
      return {
        beforeLabel: "Thinning, receding hairline",
        afterLabel: "Fuller hair density",
        before: faceScene({
          hair:
            `<path d="M110 128C104 72 150 40 200 40C250 40 296 72 290 128C285 104 277 88 266 80C250 68 236 62 222 66L178 66C164 62 150 68 134 80C124 88 115 104 110 128Z" fill="${HAIR}" opacity="0.5"/>` +
            scatter(91, 40, [{ x: 140, y: 46, w: 120, h: 18 }], (x, y, r) => `<path d="M${f(x)} ${f(y)}q${f(-3 + r * 6)} 8 ${f(-2 + r * 4)} 16" stroke="${HAIR}" stroke-width="1.6" fill="none" opacity="0.75"/>`),
        }),
        after: faceScene({
          hair:
            HAIR_FULL +
            scatter(92, 46, [{ x: 140, y: 40, w: 120, h: 50 }], (x, y, r) => `<path d="M${f(x)} ${f(y)}q${f(-4 + r * 8)} 10 ${f(-3 + r * 6)} 20" stroke="#57402f" stroke-width="2" fill="none" opacity="0.7"/>`),
        }),
      };
    case "skin-procedures":
      return {
        beforeLabel: "Mole, wart & skin tag",
        afterLabel: "Clear skin after removal",
        before: faceScene({
          overlay:
            `<circle cx="244" cy="192" r="6" fill="#4a2e1f"/>` +
            `<g fill="#9b7b62"><circle cx="164" cy="234" r="5"/><circle cx="170" cy="230" r="4.5"/><circle cx="169" cy="238" r="4"/><circle cx="160" cy="229" r="3.5"/></g>` +
            `<path d="M214 246q2 6 0 10" stroke="#c99a78" stroke-width="2.5" fill="none"/><ellipse cx="214" cy="259" rx="4" ry="5" fill="#c99a78"/>` +
            `<circle cx="150" cy="116" r="4" fill="#5a3826"/>`,
        }),
        after: faceScene({ overlay: glow }),
      };
    default:
      return undefined;
  }
}

const cache = new Map<string, BeforeAfterArt | undefined>();

/** The illustrated before/after pair for a treatment id, or undefined if none is drawn. */
export function beforeAfterArt(id: string): BeforeAfterArt | undefined {
  if (!cache.has(id)) cache.set(id, build(id));
  return cache.get(id);
}
