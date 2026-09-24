"use client";

import { useEffect, useId, useRef, useState, type PointerEvent } from "react";

import type { ChartPoint } from "@/lib/neuroplay/demo-data";
import s from "./neuroplay.module.css";

const BLUE = "#0B84FF";
const GRID = "#E9EBF0";
const AXIS_TEXT = "#8B8E95";
const SURFACE = "#FFFFFF";

type Props = {
  data: ChartPoint[];
  type?: "line" | "bar";
  height?: number;
  unit?: string;
  label: string;
  // Highlight the most recent point/bar (e.g. "today").
  highlightLast?: boolean;
  domain?: [number, number];
};

function niceDomain(values: number[]): [number, number] {
  const min = Math.min(...values);
  const max = Math.max(...values);
  const lo = Math.max(0, Math.floor((min - 6) / 10) * 10);
  const hi = Math.min(100, Math.ceil((max + 4) / 10) * 10);
  return lo === hi ? [lo, lo + 10] : [lo, hi];
}

function useWidth() {
  const ref = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new ResizeObserver(([entry]) => setWidth(Math.round(entry.contentRect.width)));
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  return [ref, width] as const;
}

export function ProgressChart({ data, type = "line", height = 240, unit = "", label, highlightLast = false, domain }: Props) {
  const [ref, width] = useWidth();
  const [hover, setHover] = useState<number | null>(null);
  const gradientId = useId().replace(/:/g, "");

  const values = data.map((point) => point.value);
  const [lo, hi] = domain ?? (type === "bar" ? [0, Math.max(10, Math.ceil(Math.max(...values) / 10) * 10)] : niceDomain(values));
  const pad = { top: 16, right: 12, bottom: 30, left: 34 };
  const innerW = Math.max(0, width - pad.left - pad.right);
  const innerH = height - pad.top - pad.bottom;
  const y = (value: number) => pad.top + innerH - ((value - lo) / (hi - lo)) * innerH;
  const ticks = Array.from({ length: 5 }, (_, i) => lo + ((hi - lo) / 4) * i);

  const band = innerW / data.length;
  const x = (index: number) =>
    type === "bar" ? pad.left + band * index + band / 2 : pad.left + (data.length === 1 ? innerW / 2 : (innerW / (data.length - 1)) * index);

  const linePath = data.map((point, i) => `${i === 0 ? "M" : "L"}${x(i).toFixed(1)},${y(point.value).toFixed(1)}`).join(" ");
  const areaPath = `${linePath} L${x(data.length - 1).toFixed(1)},${pad.top + innerH} L${x(0).toFixed(1)},${pad.top + innerH} Z`;

  function onMove(event: PointerEvent<SVGSVGElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    const px = event.clientX - rect.left;
    let nearest = 0;
    data.forEach((_, i) => {
      if (Math.abs(x(i) - px) < Math.abs(x(nearest) - px)) nearest = i;
    });
    setHover(nearest);
  }

  const barWidth = Math.min(36, band * 0.56);
  const active = hover ?? null;

  return (
    <div className={s.chart} ref={ref}>
      {width > 0 ? (
        <svg
          width={width}
          height={height}
          viewBox={`0 0 ${width} ${height}`}
          role="img"
          aria-label={`${label}: ${data.map((point) => `${point.label} ${point.value}${unit}`).join(", ")}`}
          onPointerMove={onMove}
          onPointerLeave={() => setHover(null)}
        >
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor={BLUE} stopOpacity="0.18" />
              <stop offset="1" stopColor={BLUE} stopOpacity="0" />
            </linearGradient>
          </defs>

          {ticks.map((tick) => (
            <g key={tick}>
              <line x1={pad.left} x2={width - pad.right} y1={y(tick)} y2={y(tick)} stroke={GRID} strokeWidth="1" />
              <text x={pad.left - 10} y={y(tick)} dy="0.32em" textAnchor="end" fontSize="11" fill={AXIS_TEXT}>
                {Math.round(tick)}
              </text>
            </g>
          ))}

          {data.map((point, i) => (
            <text key={point.label} x={x(i)} y={height - 8} textAnchor="middle" fontSize="11" fill={AXIS_TEXT}>
              {point.label}
            </text>
          ))}

          {type === "line" ? (
            <>
              <path d={areaPath} fill={`url(#${gradientId})`} />
              <path d={linePath} fill="none" stroke={BLUE} strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />
              {active !== null ? (
                <line x1={x(active)} x2={x(active)} y1={pad.top} y2={pad.top + innerH} stroke={AXIS_TEXT} strokeOpacity="0.4" strokeDasharray="3 4" />
              ) : null}
              {data.map((point, i) =>
                active === i || (highlightLast && i === data.length - 1 && active === null) ? (
                  <circle key={point.label} cx={x(i)} cy={y(point.value)} r="6" fill={BLUE} stroke={SURFACE} strokeWidth="2.5" />
                ) : null
              )}
            </>
          ) : (
            data.map((point, i) => {
              const top = y(point.value);
              const h = pad.top + innerH - top;
              const emphasised = active === null ? !highlightLast || i === data.length - 1 : active === i;
              return (
                <path
                  key={point.label}
                  d={`M${x(i) - barWidth / 2},${pad.top + innerH} V${top + 4} q0,-4 4,-4 H${x(i) + barWidth / 2 - 4} q4,0 4,4 V${pad.top + innerH} Z`}
                  fill={BLUE}
                  opacity={emphasised ? 1 : 0.3}
                  style={{ transition: "opacity 160ms" }}
                />
              );
            })
          )}
        </svg>
      ) : (
        <div style={{ height }} />
      )}

      {active !== null && width > 0 ? (
        <div className={s.chartTooltip} style={{ left: x(active), top: y(data[active].value) }}>
          <span>{data[active].label}</span>
          {data[active].value}
          {unit}
        </div>
      ) : null}
    </div>
  );
}
