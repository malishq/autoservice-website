const fixed = (n: number) => n.toFixed(2);

function ring(count: number, radius: number, offset = 0) {
  return Array.from({ length: count }, (_, i) => {
    const a = ((i * 360) / count + offset) * (Math.PI / 180);
    return { x: 200 + radius * Math.sin(a), y: 200 - radius * Math.cos(a) };
  });
}

export function BrakeDisc({ className = "" }: { className?: string }) {
  const outer = ring(12, 150);
  const inner = ring(12, 122, 15);
  const bolts = ring(5, 62);
  return (
    <svg viewBox="0 0 400 400" className={className} role="img" aria-label="Тормозной диск, рисунок">
      <circle cx={200} cy={200} r={192} fill="var(--steel-dark)" />
      <circle cx={200} cy={200} r={180} fill="var(--steel)" />
      <circle cx={194} cy={194} r={176} fill="var(--ink)" opacity={0.08} />
      {outer.map((p, i) => (
        <circle key={`o${i}`} cx={fixed(p.x)} cy={fixed(p.y)} r={6} fill="var(--ground)" />
      ))}
      {inner.map((p, i) => (
        <circle key={`i${i}`} cx={fixed(p.x)} cy={fixed(p.y)} r={6} fill="var(--ground)" />
      ))}
      <circle cx={200} cy={200} r={100} fill="var(--steel-dark)" />
      <circle cx={200} cy={200} r={88} fill="var(--steel)" opacity={0.45} />
      {bolts.map((p, i) => (
        <circle key={`b${i}`} cx={fixed(p.x)} cy={fixed(p.y)} r={11} fill="var(--ground)" />
      ))}
      <circle cx={200} cy={200} r={34} fill="var(--ground)" />
      <circle cx={200} cy={200} r={20} fill="var(--steel)" />
      <circle cx={200} cy={200} r={8} fill="var(--accent)" />
      <text x={200} y={276} textAnchor="middle" className="font-display" fontSize={16} fill="var(--ink)" opacity={0.8}>
        Ø300 · MIN TH 22
      </text>
    </svg>
  );
}

export function Tyre({ className = "" }: { className?: string }) {
  const sipes = Array.from({ length: 28 }, (_, i) => (i * 360) / 28);
  const windows = Array.from({ length: 5 }, (_, i) => i * 72);
  const lugs = ring(5, 30);
  return (
    <svg viewBox="0 0 400 400" className={className} role="img" aria-label="Колесо с шиной и литым диском, рисунок">
      <defs>
        <path id="tyre-arc" d="M 40 200 A 160 160 0 0 1 360 200" />
      </defs>
      <circle cx={200} cy={200} r={192} fill="var(--surface-3)" />
      {sipes.map((a) => (
        <rect key={a} x={195} y={10} width={10} height={22} rx={3} fill="var(--ground)" transform={`rotate(${a} 200 200)`} />
      ))}
      <circle cx={200} cy={200} r={158} fill="var(--steel-dark)" opacity={0.5} />
      <text className="font-display" fontSize={15} fill="var(--ink)" opacity={0.85} letterSpacing={2}>
        <textPath href="#tyre-arc" startOffset="50%" textAnchor="middle">
          205/55 R16 91V
        </textPath>
      </text>
      <circle cx={200} cy={200} r={126} fill="var(--steel)" />
      <circle cx={200} cy={200} r={118} fill="var(--ink)" opacity={0.08} />
      {windows.map((a) => (
        <path
          key={a}
          d="M 200 84 L 236 118 Q 244 128 236 138 L 214 162 Q 200 172 186 162 L 164 138 Q 156 128 164 118 Z"
          fill="var(--surface-2)"
          transform={`rotate(${a} 200 200)`}
        />
      ))}
      <circle cx={200} cy={200} r={46} fill="var(--steel)" />
      {lugs.map((p, i) => (
        <circle key={i} cx={fixed(p.x)} cy={fixed(p.y)} r={7} fill="var(--ground)" />
      ))}
      <circle cx={200} cy={200} r={14} fill="var(--steel-dark)" />
      <circle cx={200} cy={200} r={6} fill="var(--accent)" />
    </svg>
  );
}

export function Wrench({ className = "" }: { className?: string }) {
  const socket = Array.from({ length: 24 }, (_, i) => {
    const r = i % 2 ? 22 : 28;
    const a = (i * 15 * Math.PI) / 180;
    return `${fixed(64 + r * Math.sin(a))},${fixed(200 - r * Math.cos(a))}`;
  }).join(" ");
  return (
    <svg viewBox="0 0 400 400" className={className} role="img" aria-label="Комбинированный гаечный ключ на 19, рисунок">
      <g transform="rotate(-32 200 200)">
        <rect x={96} y={182} width={200} height={36} rx={18} fill="var(--steel)" />
        <rect x={100} y={186} width={192} height={9} rx={4} fill="var(--ink)" opacity={0.14} />
        <rect x={100} y={206} width={192} height={9} rx={4} fill="var(--steel-dark)" opacity={0.9} />
        <circle cx={64} cy={200} r={54} fill="var(--steel)" />
        <circle cx={60} cy={196} r={50} fill="var(--ink)" opacity={0.08} />
        <polygon points={socket} fill="var(--ground)" />
        <path
          d="M 290 156 Q 328 138 362 150 L 384 170 L 354 184 L 354 216 L 384 230 L 362 250 Q 328 262 290 244 Z"
          fill="var(--steel)"
        />
        <path d="M 296 160 Q 326 146 356 156 L 348 170 Q 326 160 300 170 Z" fill="var(--ink)" opacity={0.12} />
        <text x={150} y={207} className="font-display" fontSize={18} fontWeight={600} fill="var(--ground)">
          19
        </text>
        <text x={222} y={207} className="font-display" fontSize={14} fill="var(--ground)" opacity={0.8}>
          Cr-V
        </text>
      </g>
    </svg>
  );
}

const BAYS = [
  { label: "ТО", kind: "car" },
  { label: "ТО", kind: "car" },
  { label: "Ремонт", kind: "lift" },
  { label: "Ремонт", kind: "car" },
  { label: "Шины", kind: "tyres" },
  { label: "Диагностика", kind: "diag" },
] as const;

function Car({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect x={-8} y={30} width={14} height={34} rx={5} fill="var(--accent-ink)" />
      <rect x={90} y={30} width={14} height={34} rx={5} fill="var(--accent-ink)" />
      <rect x={-8} y={156} width={14} height={34} rx={5} fill="var(--accent-ink)" />
      <rect x={90} y={156} width={14} height={34} rx={5} fill="var(--accent-ink)" />
      <rect x={0} y={0} width={96} height={220} rx={36} fill="var(--accent-ink)" />
      <rect x={12} y={48} width={72} height={34} rx={10} fill="var(--accent-soft)" />
      <rect x={12} y={150} width={72} height={26} rx={9} fill="var(--accent-soft)" />
      <rect x={-10} y={68} width={12} height={8} rx={3} fill="var(--accent-ink)" />
      <rect x={94} y={68} width={12} height={8} rx={3} fill="var(--accent-ink)" />
      <rect x={22} y={92} width={52} height={50} rx={8} fill="var(--accent-soft)" opacity={0.25} />
    </g>
  );
}

function Bay({ x, y, label, kind }: { x: number; y: number; label: string; kind: (typeof BAYS)[number]["kind"] }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect x={0} y={0} width={180} height={330} rx={10} fill="var(--accent-ink)" opacity={0.12} />
      {(kind === "car" || kind === "lift") && (
        <>
          <rect x={30} y={34} width={18} height={250} rx={9} fill="var(--accent-ink)" opacity={0.45} />
          <rect x={132} y={34} width={18} height={250} rx={9} fill="var(--accent-ink)" opacity={0.45} />
        </>
      )}
      {kind === "car" && <Car x={42} y={48} />}
      {kind === "tyres" && (
        <>
          <rect x={46} y={60} width={88} height={88} rx={12} fill="var(--accent-ink)" />
          <circle cx={90} cy={104} r={30} fill="var(--accent-soft)" />
          <circle cx={90} cy={104} r={10} fill="var(--accent-ink)" />
          <circle cx={60} cy={222} r={26} fill="var(--accent-ink)" />
          <circle cx={60} cy={222} r={9} fill="var(--accent-soft)" />
          <circle cx={120} cy={222} r={26} fill="var(--accent-ink)" />
          <circle cx={120} cy={222} r={9} fill="var(--accent-soft)" />
        </>
      )}
      {kind === "diag" && (
        <>
          <rect x={56} y={70} width={68} height={110} rx={10} fill="var(--accent-ink)" />
          <rect x={66} y={82} width={48} height={32} rx={6} fill="var(--accent-soft)" />
          <rect x={60} y={200} width={60} height={14} rx={7} fill="var(--accent-ink)" opacity={0.5} />
          <rect x={60} y={224} width={44} height={14} rx={7} fill="var(--accent-ink)" opacity={0.5} />
        </>
      )}
      <text x={90} y={318} textAnchor="middle" className="font-display" fontSize={24} fontWeight={500} fill="var(--accent-ink)">
        {label}
      </text>
    </g>
  );
}

export function BayPlan({ columns, className = "" }: { columns: 6 | 3; className?: string }) {
  const rows = BAYS.length / columns;
  const width = columns * 200 + 20;
  const height = rows * 350 + 20;
  return (
    <svg viewBox={`0 0 ${width} ${height}`} className={className} role="img" aria-label="План шести постов: два поста ТО, два поста ремонта, шиномонтаж и диагностика">
      {BAYS.map((bay, i) => (
        <Bay key={i} x={20 + (i % columns) * 200} y={20 + Math.floor(i / columns) * 350} label={bay.label} kind={bay.kind} />
      ))}
    </svg>
  );
}

function mulberry(seed: number) {
  let t = seed;
  return () => {
    t += 0x6d2b79f5;
    let r = Math.imul(t ^ (t >>> 15), t | 1);
    r ^= r + Math.imul(r ^ (r >>> 7), r | 61);
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

type Dot = { u: number; v: number; tone: string; r: number };

function flowDots(): Dot[] {
  const rand = mulberry(20261028);
  const dots: Dot[] = [];
  for (let i = 0; i < 52; i += 1) {
    dots.push({ u: 0.02 + rand() * 0.28, v: 0.06 + rand() * 0.88, tone: rand() > 0.5 ? "var(--surface-3)" : "var(--muted)", r: 0.016 + rand() * 0.01 });
  }
  for (let col = 0; col < 24; col += 1) {
    for (let row = 0; row < 3; row += 1) {
      dots.push({ u: 0.36 + col * 0.0115, v: 0.44 + row * 0.06, tone: "var(--ink)", r: 0.019 });
    }
  }
  for (let col = 0; col < 10; col += 1) {
    for (let row = 0; row < 4; row += 1) {
      dots.push({ u: 0.7 + col * 0.03, v: 0.2 + row * 0.2, tone: "var(--accent)", r: 0.02 });
    }
  }
  return dots;
}

const DOTS = flowDots();

export function FlowDiagram({ vertical = false, className = "" }: { vertical?: boolean; className?: string }) {
  const width = vertical ? 300 : 1200;
  const height = vertical ? 400 : 270;
  const scale = vertical ? 300 : 270;
  return (
    <svg viewBox={`0 0 ${width} ${height}`} className={className} role="img" aria-label="Схема визита: россыпь симптомов собирается в одну смету и расходится ровными рядами выполненных работ">
      {DOTS.map((d, i) => {
        const x = vertical ? d.v * width : d.u * width;
        const y = vertical ? d.u * height : d.v * height;
        return <circle key={i} cx={fixed(x)} cy={fixed(y)} r={fixed(d.r * scale)} fill={d.tone} />;
      })}
    </svg>
  );
}
