import { Accessibility, Crosshair, Hand, HandGrab, PersonStanding, Scale, type LucideIcon } from "lucide-react";

import type { VisualKind } from "@/lib/neuroplay/demo-data";

// Compact icon used where an illustration would be too small to read (list thumbnails).
const visualIcons: Record<VisualKind, LucideIcon> = {
  wrist: Hand,
  grip: HandGrab,
  fingers: Crosshair,
  shoulder: Accessibility,
  reach: PersonStanding,
  balance: Scale
};

export function VisualIcon({ kind, size = 22 }: { kind: VisualKind; size?: number }) {
  const Icon = visualIcons[kind];
  return <Icon size={size} aria-hidden="true" />;
}

// Structured, replaceable illustrations for rehabilitation movements.
// Swap for real photography or 3D renders later without touching layouts.

const BLUE = "#0B84FF";
const BLUE_MID = "#7DB9FF";
const BLUE_LIGHT = "#CFE5FF";
const SKIN = "#FFFFFF";

function Backdrop({ id, tone }: { id: string; tone: "light" | "hero" }) {
  if (tone === "hero") return null;
  return (
    <>
      <defs>
        <radialGradient id={`${id}-glow`} cx="0.7" cy="0.3" r="0.8">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.9" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="320" height="200" fill={`url(#${id}-glow)`} />
      <circle cx="262" cy="42" r="54" fill={BLUE_LIGHT} opacity="0.55" />
      <circle cx="40" cy="176" r="46" fill={BLUE_LIGHT} opacity="0.45" />
    </>
  );
}

function Wrist({ hero }: { hero: boolean }) {
  const limb = hero ? "#ffffff" : SKIN;
  const stroke = hero ? "rgba(255,255,255,0.55)" : BLUE_MID;
  return (
    <g>
      <path d="M186 58 A 64 64 0 0 1 186 162" fill="none" stroke={stroke} strokeWidth="3" strokeDasharray="2 9" strokeLinecap="round" />
      <path d="M181 62 l7 -8 l3 10" fill="none" stroke={hero ? "#fff" : BLUE} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M181 158 l7 8 l3 -10" fill="none" stroke={hero ? "#fff" : BLUE} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="34" y="96" width="130" height="30" rx="15" fill={limb} stroke={hero ? "none" : "#B9D3F1"} />
      <g transform="rotate(-24 160 111)">
        <rect x="150" y="93" width="70" height="36" rx="18" fill={limb} stroke={hero ? "none" : "#B9D3F1"} />
        <rect x="206" y="97" width="34" height="11" rx="5.5" fill={limb} stroke={hero ? "none" : "#B9D3F1"} />
        <rect x="206" y="110" width="30" height="11" rx="5.5" fill={limb} stroke={hero ? "none" : "#B9D3F1"} />
      </g>
      <circle cx="160" cy="111" r="7" fill={hero ? "#fff" : BLUE} />
      <circle cx="160" cy="111" r="15" fill="none" stroke={hero ? "rgba(255,255,255,0.5)" : BLUE} strokeOpacity={hero ? 1 : 0.25} strokeWidth="2" />
    </g>
  );
}

function Grip({ hero }: { hero: boolean }) {
  const limb = hero ? "#ffffff" : SKIN;
  return (
    <g>
      {[62, 50, 38].map((r, i) => (
        <circle key={r} cx="176" cy="104" r={r} fill="none" stroke={hero ? "#fff" : BLUE} strokeOpacity={0.12 + i * 0.1} strokeWidth="2" />
      ))}
      <circle cx="176" cy="104" r="28" fill={hero ? "rgba(255,255,255,0.3)" : BLUE} opacity={hero ? 1 : 0.9} />
      <rect x="30" y="112" width="104" height="30" rx="15" fill={limb} stroke={hero ? "none" : "#B9D3F1"} />
      <path d="M126 96 C150 64 206 64 214 98 C220 124 200 142 176 140" fill="none" stroke={limb} strokeWidth="22" strokeLinecap="round" />
      <path d="M126 96 C150 64 206 64 214 98 C220 124 200 142 176 140" fill="none" stroke={hero ? "none" : "#B9D3F1"} strokeWidth="1" />
    </g>
  );
}

function Fingers({ hero }: { hero: boolean }) {
  const limb = hero ? "#ffffff" : SKIN;
  const edge = hero ? "none" : "#B9D3F1";
  const accent = hero ? "#fff" : BLUE;
  return (
    <g>
      <rect x="116" y="100" width="92" height="74" rx="30" fill={limb} stroke={edge} />
      {[
        [122, 40, 70],
        [146, 26, 84],
        [170, 32, 78],
        [192, 50, 60]
      ].map(([x, y, h]) => (
        <rect key={x} x={x} y={y} width="20" height={h} rx="10" fill={limb} stroke={edge} />
      ))}
      <rect x="84" y="112" width="20" height="58" rx="10" fill={limb} stroke={edge} transform="rotate(-38 94 140)" />
      {[
        [132, 40],
        [156, 26],
        [180, 32],
        [202, 50]
      ].map(([cx, cy], i) => (
        <circle key={cx} cx={cx} cy={cy} r="6" fill={accent} opacity={1 - i * 0.2} />
      ))}
      <path d="M90 100 C 100 60, 120 44, 128 40" fill="none" stroke={accent} strokeWidth="2.5" strokeDasharray="2 7" strokeLinecap="round" />
    </g>
  );
}

function Shoulder({ hero }: { hero: boolean }) {
  const limb = hero ? "#ffffff" : SKIN;
  const edge = hero ? "none" : "#B9D3F1";
  const accent = hero ? "#fff" : BLUE;
  return (
    <g>
      <path d="M150 92 A 70 70 0 0 1 220 26" fill="none" stroke={hero ? "rgba(255,255,255,0.55)" : BLUE_MID} strokeWidth="3" strokeDasharray="2 9" strokeLinecap="round" />
      <circle cx="112" cy="54" r="22" fill={limb} stroke={edge} />
      <rect x="84" y="84" width="58" height="96" rx="26" fill={limb} stroke={edge} />
      <g transform="rotate(-52 132 96)">
        <rect x="126" y="84" width="104" height="24" rx="12" fill={limb} stroke={edge} />
      </g>
      <circle cx="132" cy="96" r="7" fill={accent} />
      <circle cx="198" cy="16" r="6" fill={accent} opacity="0.6" />
    </g>
  );
}

function Reach({ hero }: { hero: boolean }) {
  const limb = hero ? "#ffffff" : SKIN;
  const edge = hero ? "none" : "#B9D3F1";
  const accent = hero ? "#fff" : BLUE;
  return (
    <g>
      <rect x="40" y="150" width="240" height="10" rx="5" fill={hero ? "rgba(255,255,255,0.3)" : BLUE_LIGHT} />
      {[196, 236].map((x) => (
        <circle key={x} cx={x} cy="140" r="12" fill="none" stroke={accent} strokeWidth="2.5" strokeDasharray="3 5" />
      ))}
      <rect x="148" y="126" width="20" height="24" rx="6" fill={accent} opacity="0.85" />
      <rect x="30" y="92" width="100" height="26" rx="13" fill={limb} stroke={edge} transform="rotate(14 30 105)" />
      <rect x="120" y="100" width="62" height="30" rx="15" fill={limb} stroke={edge} transform="rotate(24 120 115)" />
      <path d="M150 70 C 180 56, 212 70, 222 110" fill="none" stroke={accent} strokeWidth="2.5" strokeDasharray="2 8" strokeLinecap="round" />
    </g>
  );
}

function Balance({ hero }: { hero: boolean }) {
  const limb = hero ? "#ffffff" : SKIN;
  const edge = hero ? "none" : "#B9D3F1";
  const accent = hero ? "#fff" : BLUE;
  return (
    <g>
      <rect x="112" y="136" width="96" height="14" rx="7" fill={hero ? "rgba(255,255,255,0.35)" : BLUE_LIGHT} />
      <rect x="120" y="150" width="10" height="36" rx="5" fill={hero ? "rgba(255,255,255,0.35)" : BLUE_LIGHT} />
      <rect x="190" y="150" width="10" height="36" rx="5" fill={hero ? "rgba(255,255,255,0.35)" : BLUE_LIGHT} />
      <g transform="rotate(-14 160 136)">
        <rect x="136" y="70" width="48" height="70" rx="22" fill={limb} stroke={edge} />
        <circle cx="160" cy="48" r="19" fill={limb} stroke={edge} />
        <rect x="180" y="82" width="80" height="20" rx="10" fill={limb} stroke={edge} />
      </g>
      <path d="M86 60 h-36 m8 -8 l-8 8 l8 8" fill="none" stroke={accent} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" opacity="0.6" />
      <path d="M240 36 h36 m-8 -8 l8 8 l-8 8" fill="none" stroke={accent} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </g>
  );
}

const figures: Record<VisualKind, (props: { hero: boolean }) => React.ReactElement> = {
  wrist: Wrist,
  grip: Grip,
  fingers: Fingers,
  shoulder: Shoulder,
  reach: Reach,
  balance: Balance
};

export function RehabVisual({
  kind,
  tone = "light",
  id,
  label,
  fit = "slice"
}: {
  kind: VisualKind;
  tone?: "light" | "hero";
  id: string;
  label?: string;
  fit?: "slice" | "meet";
}) {
  const Figure = figures[kind];
  return (
    <svg
      viewBox="0 0 320 200"
      preserveAspectRatio={tone === "hero" || fit === "meet" ? "xMidYMid meet" : "xMidYMid slice"}
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      <Backdrop id={id} tone={tone} />
      <Figure hero={tone === "hero"} />
    </svg>
  );
}
