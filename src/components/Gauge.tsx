const MIN_ANGLE = -135;
const MAX_ANGLE = 135;
const MAX_RPM = 8;
const CENTER = 500;

export const IDLE_RPM = 1;

export function rpmToAngle(rpm: number) {
  return MIN_ANGLE + (rpm / MAX_RPM) * (MAX_ANGLE - MIN_ANGLE);
}

function polar(radius: number, angle: number) {
  const rad = (angle * Math.PI) / 180;
  return { x: CENTER + radius * Math.sin(rad), y: CENTER - radius * Math.cos(rad) };
}

const fixed = (n: number) => n.toFixed(2);

function arcPath(radius: number, from: number, to: number) {
  const a = polar(radius, from);
  const b = polar(radius, to);
  const large = to - from > 180 ? 1 : 0;
  return `M ${fixed(a.x)} ${fixed(a.y)} A ${radius} ${radius} 0 ${large} 1 ${fixed(b.x)} ${fixed(b.y)}`;
}

const majors = Array.from({ length: MAX_RPM + 1 }, (_, i) => i);
const minors = Array.from({ length: MAX_RPM * 4 }, (_, i) => i / 4).filter((v) => !Number.isInteger(v));

export function Gauge({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 1000 1000" className={className} role="img" aria-label="Тахометр: стрелка на холостых оборотах">
      <circle cx={CENTER} cy={CENTER} r={498} fill="var(--surface-2)" />
      <circle cx={CENTER} cy={CENTER} r={474} fill="var(--surface)" />
      <path d={arcPath(452, rpmToAngle(6.5), rpmToAngle(MAX_RPM))} fill="none" stroke="var(--accent)" strokeWidth={36} />
      {minors.map((v) => {
        const a = rpmToAngle(v);
        const p1 = polar(470, a);
        const p2 = polar(444, a);
        return <line key={v} x1={fixed(p1.x)} y1={fixed(p1.y)} x2={fixed(p2.x)} y2={fixed(p2.y)} stroke="var(--muted)" strokeWidth={5} />;
      })}
      {majors.map((v) => {
        const a = rpmToAngle(v);
        const p1 = polar(470, a);
        const p2 = polar(418, a);
        const t = polar(356, a);
        return (
          <g key={v}>
            <line x1={fixed(p1.x)} y1={fixed(p1.y)} x2={fixed(p2.x)} y2={fixed(p2.y)} stroke="var(--ink)" strokeWidth={10} />
            <text
              x={fixed(t.x)}
              y={fixed(t.y)}
              textAnchor="middle"
              dominantBaseline="central"
              className="font-display"
              fontSize={70}
              fontWeight={500}
              fill={v >= 7 ? "var(--accent)" : "var(--ink)"}
            >
              {v}
            </text>
          </g>
        );
      })}
      <text x={CENTER} y={700} textAnchor="middle" className="font-display" fontSize={34} fontWeight={400} fill="var(--muted)">
        об/мин × 1000
      </text>
      <text x={CENTER} y={770} textAnchor="middle" className="font-display" fontSize={44} fontWeight={600} fill="var(--ink)">
        ОСЬ
      </text>
      <circle cx={CENTER} cy={CENTER} r={58} fill="var(--surface-3)" />
      <polygon data-needle points="500,566 484,500 500,96 516,500" fill="var(--accent)" transform={`rotate(${rpmToAngle(IDLE_RPM)} ${CENTER} ${CENTER})`} />
      <circle cx={CENTER} cy={CENTER} r={30} fill="var(--ground)" />
      <circle cx={CENTER} cy={CENTER} r={10} fill="var(--accent)" />
    </svg>
  );
}
