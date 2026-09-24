import type { VisualKind } from "@/lib/neuroplay/demo-data";

// Animated movement demonstrations for the guided session screen.
// Placeholders for future camera/sensor tracking — one per movement type.

const LIMB = { fill: "#FFFFFF", stroke: "#C9DCF3", strokeWidth: 2 } as const;
const BLUE = "#0B84FF";
const JOINT = "#7DB9FF";
const TARGET = "#34C759";
const TARGET_TEXT = "#1F8A3C";
const SOFT = "#DCEBFF";

export const guidanceCues: Record<VisualKind, string[]> = {
  wrist: ["Move slowly", "Keep your forearm still", "Good range of motion", "Hold at the top", "Smooth and controlled"],
  rotation: ["Keep your elbow tucked", "Turn your palm up", "Now palm down", "Slow, even turns", "Good rotation"],
  grip: ["Squeeze gradually", "Hold for three seconds", "Release slowly", "Open your fingers fully", "Nice steady grip"],
  fingers: ["Touch each fingertip", "Keep a steady rhythm", "Light, precise taps", "Now reverse the order", "Great precision"],
  shoulder: ["Raise your arm forward", "Keep your shoulder relaxed", "Pause at the top", "Lower slowly", "Good range of motion"],
  reach: ["Reach for the object", "Place it on the target", "Return to start", "Keep the movement smooth", "Accurate placement"],
  balance: ["Sit tall", "Reach to the side", "Return to the centre", "Keep your feet flat", "Nice and steady"],
  band: ["Pull your elbows back", "Squeeze your shoulder blades", "Return slowly", "Keep your back straight", "Good control"]
};

const styles = (state: string) => `
.gv-pulse { animation: gv-pulse 2.6s ease-in-out infinite; }
.gv-wrist { transform-origin: 262px 170px; animation: gv-wrist 2.6s ease-in-out infinite; }
.gv-rotate { transform-box: fill-box; transform-origin: center; animation: gv-flip 2.6s ease-in-out infinite; }
.gv-squeeze { transform-box: fill-box; transform-origin: center; animation: gv-squeeze 2.6s ease-in-out infinite; }
.gv-grip-hand { transform-origin: 270px 165px; animation: gv-grip 2.6s ease-in-out infinite; }
.gv-tap { animation: gv-tap 5.2s ease-in-out infinite; }
.gv-shoulder { transform-origin: 222px 118px; animation: gv-shoulder 3.2s ease-in-out infinite; }
.gv-reach { animation: gv-reach 3.2s ease-in-out infinite; }
.gv-lean { transform-origin: 260px 214px; animation: gv-lean 3.6s ease-in-out infinite; }
.gv-pull { animation: gv-pull 2.8s ease-in-out infinite; }
.gv-band { transform-box: fill-box; transform-origin: right center; animation: gv-band 2.8s ease-in-out infinite; }
@keyframes gv-pulse { 0%,100% { opacity: .2; } 50% { opacity: .55; } }
@keyframes gv-wrist { 0%,100% { transform: rotate(-26deg); } 50% { transform: rotate(24deg); } }
@keyframes gv-flip { 0%,15% { transform: scaleY(1); } 45%,65% { transform: scaleY(-1); } 95%,100% { transform: scaleY(1); } }
@keyframes gv-squeeze { 0%,15% { transform: scale(1); } 40%,65% { transform: scale(.8); } 90%,100% { transform: scale(1); } }
@keyframes gv-grip { 0%,15% { transform: scale(1); } 40%,65% { transform: scale(.9); } 90%,100% { transform: scale(1); } }
@keyframes gv-tap {
  0%,8% { transform: translate(0,0); } 20%,28% { transform: translate(34px,-14px); }
  40%,48% { transform: translate(68px,-8px); } 60%,68% { transform: translate(100px,16px); }
  80%,88% { transform: translate(68px,-8px); } 100% { transform: translate(0,0); }
}
@keyframes gv-shoulder { 0%,10% { transform: rotate(0deg); } 45%,55% { transform: rotate(-140deg); } 90%,100% { transform: rotate(0deg); } }
@keyframes gv-reach { 0%,10% { transform: translateX(0); } 45%,55% { transform: translateX(150px); } 90%,100% { transform: translateX(0); } }
@keyframes gv-lean { 0%,100% { transform: rotate(0deg); } 25% { transform: rotate(-16deg); } 50% { transform: rotate(0deg); } 75% { transform: rotate(16deg); } }
@keyframes gv-pull { 0%,10% { transform: translateX(0); } 45%,55% { transform: translateX(-100px); } 90%,100% { transform: translateX(0); } }
@keyframes gv-band { 0%,10% { transform: scaleX(1); } 45%,55% { transform: scaleX(1.91); } 90%,100% { transform: scaleX(1); } }
svg.gv * { animation-play-state: ${state} !important; }
@media (prefers-reduced-motion: reduce) { .gv * { animation: none !important; } }
`;

function TargetLabel({ x, y, children = "Target" }: { x: number; y: number; children?: string }) {
  return (
    <text x={x} y={y} fontSize="13" fill={TARGET_TEXT} fontWeight="600">
      {children}
    </text>
  );
}

function Wrist() {
  return (
    <>
      <path d="M262 170 L 380 102 A 136 136 0 0 1 380 238 Z" fill={BLUE} opacity="0.07" />
      <path d="M380 102 A 136 136 0 0 1 380 238" fill="none" stroke={BLUE} strokeWidth="3" strokeDasharray="3 10" strokeLinecap="round" />
      <circle cx="380" cy="102" r="7" fill={TARGET} />
      <circle cx="380" cy="238" r="7" fill={TARGET} />
      <TargetLabel x={396} y={98} />
      <TargetLabel x={396} y={252} />
      <circle className="gv-pulse" cx="262" cy="170" r="34" fill={BLUE} />
      <rect x="70" y="150" width="200" height="40" rx="20" {...LIMB} />
      <circle cx="120" cy="170" r="5" fill={JOINT} />
      <circle cx="190" cy="170" r="5" fill={JOINT} />
      <g className="gv-wrist">
        <rect x="250" y="146" width="98" height="48" rx="24" {...LIMB} />
        <rect x="330" y="150" width="50" height="15" rx="7.5" {...LIMB} />
        <rect x="330" y="168" width="46" height="15" rx="7.5" {...LIMB} />
        <circle cx="376" cy="160" r="5" fill={BLUE} />
        <line x1="262" y1="170" x2="376" y2="160" stroke={BLUE} strokeWidth="2" strokeDasharray="4 5" />
      </g>
      <circle cx="262" cy="170" r="9" fill={BLUE} stroke="#fff" strokeWidth="3" />
    </>
  );
}

function Rotation() {
  return (
    <>
      <rect x="60" y="150" width="240" height="40" rx="20" {...LIMB} />
      <circle cx="110" cy="170" r="5" fill={JOINT} />
      <circle cx="200" cy="170" r="5" fill={JOINT} />
      <circle className="gv-pulse" cx="330" cy="170" r="64" fill={BLUE} />
      <path d="M300 104 A 70 70 0 0 1 392 128" fill="none" stroke={BLUE} strokeWidth="3" strokeLinecap="round" strokeDasharray="3 9" />
      <path d="M384 118 l10 10 l-14 4" fill="none" stroke={BLUE} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M360 236 A 70 70 0 0 1 268 212" fill="none" stroke={BLUE} strokeWidth="3" strokeLinecap="round" strokeDasharray="3 9" />
      <path d="M276 222 l-10 -10 l14 -4" fill="none" stroke={BLUE} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <g className="gv-rotate">
        <rect x="290" y="134" width="92" height="72" rx="30" fill="#fff" stroke="#C9DCF3" strokeWidth="2" />
        {/* palm side — shows which way the hand faces as it turns */}
        <path d="M292 170 H380 V176 a30 30 0 0 1 -30 28 H322 a30 30 0 0 1 -30 -28 Z" fill={BLUE} opacity="0.85" />
        <circle cx="336" cy="188" r="6" fill="#fff" />
      </g>
      <text x="300" y="268" fontSize="13" fill="#5F636B" fontWeight="600">
        Palm up ↔ palm down
      </text>
    </>
  );
}

function Grip() {
  return (
    <>
      {[92, 76, 60].map((r, i) => (
        <circle key={r} className="gv-pulse" cx="270" cy="165" r={r} fill="none" stroke={BLUE} strokeWidth="2" style={{ animationDelay: `${i * 0.2}s` }} />
      ))}
      <rect x="40" y="176" width="150" height="40" rx="20" {...LIMB} />
      <circle className="gv-squeeze" cx="270" cy="165" r="44" fill={BLUE} />
      <g className="gv-grip-hand">
        <path d="M180 150 C210 96 300 92 318 146 C330 184 300 214 264 212" fill="none" stroke="#C9DCF3" strokeWidth="34" strokeLinecap="round" />
        <path d="M180 150 C210 96 300 92 318 146 C330 184 300 214 264 212" fill="none" stroke="#fff" strokeWidth="30" strokeLinecap="round" />
        <path d="M232 110 v10 M262 104 v10 M292 114 v10" stroke="#C9DCF3" strokeWidth="2" strokeLinecap="round" />
      </g>
      <TargetLabel x={372} y={100}>Hold 3 s</TargetLabel>
    </>
  );
}

function Fingers() {
  const tips = [
    [226, 70],
    [260, 56],
    [294, 62],
    [326, 86]
  ];
  return (
    <>
      <rect x="200" y="140" width="150" height="120" rx="48" {...LIMB} />
      {[
        [212, 62, 100],
        [246, 48, 112],
        [280, 54, 106],
        [312, 78, 84]
      ].map(([x, y, h]) => (
        <rect key={x} x={x} y={y} width="28" height={h} rx="14" {...LIMB} />
      ))}
      {tips.map(([cx, cy]) => (
        <circle key={cx} cx={cx} cy={cy + 8} r="8" fill={SOFT} stroke={TARGET} strokeWidth="2" />
      ))}
      <rect x="150" y="168" width="28" height="92" rx="14" {...LIMB} transform="rotate(-40 164 214)" />
      <g className="gv-tap">
        <circle cx="226" cy="78" r="14" fill={BLUE} opacity="0.2" />
        <circle cx="226" cy="78" r="8" fill={BLUE} />
      </g>
      <path d="M150 150 C 160 110, 190 88, 214 80" fill="none" stroke={BLUE} strokeWidth="2.5" strokeDasharray="3 8" strokeLinecap="round" />
      <TargetLabel x={360} y={80}>Fingertips</TargetLabel>
    </>
  );
}

function Shoulder() {
  return (
    <>
      <path d="M222 118 L222 248 A130 130 0 0 0 306 18 Z" fill={BLUE} opacity="0.06" />
      <path d="M222 248 A130 130 0 0 0 306 18" fill="none" stroke={BLUE} strokeWidth="3" strokeDasharray="3 10" strokeLinecap="round" />
      <circle cx="306" cy="18" r="7" fill={TARGET} />
      <TargetLabel x={318} y={24}>Target</TargetLabel>
      <circle cx="196" cy="68" r="28" {...LIMB} />
      <rect x="164" y="102" width="68" height="150" rx="30" {...LIMB} />
      <circle className="gv-pulse" cx="222" cy="118" r="26" fill={BLUE} />
      <g className="gv-shoulder">
        <rect x="208" y="118" width="28" height="140" rx="14" {...LIMB} />
        <circle cx="222" cy="186" r="5" fill={JOINT} />
        <circle cx="222" cy="252" r="7" fill={BLUE} />
      </g>
      <circle cx="222" cy="118" r="9" fill={BLUE} stroke="#fff" strokeWidth="3" />
    </>
  );
}

function Reach() {
  return (
    <>
      <rect x="20" y="246" width="480" height="12" rx="6" fill={SOFT} />
      <rect x="236" y="226" width="56" height="20" rx="8" fill="none" stroke="#B9C7DA" strokeWidth="2" strokeDasharray="4 5" />
      <rect x="386" y="226" width="56" height="20" rx="8" fill="#E7F8EC" stroke={TARGET} strokeWidth="2" />
      <TargetLabel x={390} y={278}>Target</TargetLabel>
      <text x="238" y="278" fontSize="13" fill="#8B8E95" fontWeight="600">
        Start
      </text>
      <path d="M264 196 C 310 160, 360 160, 414 196" fill="none" stroke={BLUE} strokeWidth="2.5" strokeDasharray="3 8" strokeLinecap="round" />
      <g className="gv-reach">
        <rect x="-60" y="178" width="290" height="34" rx="17" {...LIMB} />
        <circle cx="120" cy="195" r="5" fill={JOINT} />
        <rect x="248" y="208" width="32" height="30" rx="8" fill={BLUE} />
        <rect x="222" y="170" width="54" height="46" rx="20" {...LIMB} />
        <circle cx="250" cy="193" r="7" fill={BLUE} />
      </g>
    </>
  );
}

function Balance() {
  return (
    <>
      <rect x="180" y="214" width="160" height="16" rx="8" fill={SOFT} />
      <rect x="192" y="230" width="12" height="60" rx="6" fill={SOFT} />
      <rect x="316" y="230" width="12" height="60" rx="6" fill={SOFT} />
      <path d="M150 110 h-50 m10 -10 l-10 10 l10 10" fill="none" stroke={BLUE} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" opacity="0.5" />
      <path d="M370 110 h50 m-10 -10 l10 10 l-10 10" fill="none" stroke={BLUE} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" opacity="0.5" />
      <g className="gv-lean">
        <rect x="232" y="112" width="56" height="104" rx="26" {...LIMB} />
        <circle cx="260" cy="82" r="26" {...LIMB} />
        <rect x="172" y="128" width="176" height="22" rx="11" {...LIMB} />
        <circle cx="178" cy="139" r="6" fill={BLUE} />
        <circle cx="342" cy="139" r="6" fill={BLUE} />
      </g>
      <circle className="gv-pulse" cx="260" cy="214" r="22" fill={BLUE} />
      <circle cx="260" cy="214" r="8" fill={BLUE} stroke="#fff" strokeWidth="3" />
      <text x="206" y="310" fontSize="13" fill="#5F636B" fontWeight="600">
        Weight shift left ↔ right
      </text>
    </>
  );
}

function Band() {
  return (
    <>
      <rect x="440" y="100" width="18" height="160" rx="9" fill="#B9C7DA" />
      <circle cx="449" cy="170" r="10" fill="#fff" stroke="#B9C7DA" strokeWidth="2" />
      <rect className="gv-band" x="330" y="166" width="110" height="8" rx="4" fill={TARGET} opacity="0.9" />
      <circle cx="130" cy="96" r="28" {...LIMB} />
      <rect x="96" y="130" width="68" height="140" rx="30" {...LIMB} />
      <g className="gv-pull">
        <rect x="150" y="156" width="190" height="28" rx="14" {...LIMB} />
        <circle cx="240" cy="170" r="5" fill={JOINT} />
        <rect x="318" y="152" width="34" height="36" rx="14" {...LIMB} />
        <circle cx="335" cy="170" r="7" fill={BLUE} />
      </g>
      <circle className="gv-pulse" cx="150" cy="150" r="24" fill={BLUE} />
      <TargetLabel x={210} y={250}>Elbows back</TargetLabel>
    </>
  );
}

const scenes: Record<VisualKind, () => React.ReactElement> = {
  wrist: Wrist,
  rotation: Rotation,
  grip: Grip,
  fingers: Fingers,
  shoulder: Shoulder,
  reach: Reach,
  balance: Balance,
  band: Band
};

export function GuidanceVisual({ kind, paused }: { kind: VisualKind; paused: boolean }) {
  const Scene = scenes[kind];
  return (
    <svg viewBox="0 0 520 320" className="gv" aria-hidden="true" style={{ overflow: "hidden" }}>
      <style>{styles(paused ? "paused" : "running")}</style>
      <Scene />
    </svg>
  );
}
