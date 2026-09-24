import { Activity, ArrowUpRight, ChevronLeft, type LucideIcon } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

import s from "./neuroplay.module.css";

export function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function BrandMark() {
  return (
    <span className={s.brandMark} aria-hidden="true">
      <Activity size={19} strokeWidth={2.4} />
    </span>
  );
}

export function Avatar({
  initials,
  size = "md",
  tone = "blue"
}: {
  initials: string;
  size?: "md" | "lg" | "xl";
  tone?: "blue" | "green";
}) {
  return (
    <span
      className={cx(s.avatar, size === "lg" && s.avatarLg, size === "xl" && s.avatarXl, tone === "green" && s.avatarGreen)}
      aria-hidden="true"
    >
      {initials}
    </span>
  );
}

export function PageHeader({ title, subtitle, actions }: { title: string; subtitle?: string; actions?: ReactNode }) {
  return (
    <header className={s.pageHeader}>
      <div>
        <h1>{title}</h1>
        {subtitle ? <p>{subtitle}</p> : null}
      </div>
      {actions ? <div className={s.pageHeaderActions}>{actions}</div> : null}
    </header>
  );
}

export function SectionHead({ title, subtitle, action, id }: { title: string; subtitle?: string; action?: ReactNode; id?: string }) {
  return (
    <div className={s.sectionHead}>
      <div>
        <h2 id={id}>{title}</h2>
        {subtitle ? <p>{subtitle}</p> : null}
      </div>
      {action}
    </div>
  );
}

export function BackLink({ href, label = "Back" }: { href: string; label?: string }) {
  return (
    <Link href={href} className={s.backLink}>
      <ChevronLeft size={18} aria-hidden="true" />
      {label}
    </Link>
  );
}

export function TextLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link href={href} className={s.textLink}>
      {children}
      <ArrowUpRight size={16} aria-hidden="true" />
    </Link>
  );
}

type Tone = "blue" | "green" | "amber" | "red" | "gray" | "solid";

const pillTone: Record<Tone, string> = {
  blue: s.pillBlue,
  green: s.pillGreen,
  amber: s.pillAmber,
  red: s.pillRed,
  gray: s.pillGray,
  solid: s.pillSolid
};

export function StatusPill({ tone = "gray", icon: Icon, children }: { tone?: Tone; icon?: LucideIcon; children: ReactNode }) {
  return (
    <span className={cx(s.pill, pillTone[tone])}>
      {Icon ? <Icon size={13} strokeWidth={2.4} aria-hidden="true" /> : null}
      {children}
    </span>
  );
}

export function ProgressBar({
  value,
  label,
  tone = "blue",
  size = "md",
  valueLabel
}: {
  value: number;
  label?: string;
  tone?: "blue" | "green" | "amber" | "indigo";
  size?: "sm" | "md";
  valueLabel?: string;
}) {
  const fillTone = { blue: "", green: s.fillGreen, amber: s.fillAmber, indigo: s.fillIndigo }[tone];
  const clamped = Math.max(0, Math.min(100, value));
  const bar = (
    <div
      className={cx(s.track, size === "sm" && s.trackSm)}
      role="progressbar"
      aria-valuenow={clamped}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={label}
    >
      <i className={cx(s.fill, fillTone)} style={{ width: `${clamped}%` }} />
    </div>
  );

  if (!label) return bar;

  return (
    <div className={s.progressRow}>
      <div className={s.progressLabel}>
        <span>{label}</span>
        <span>{valueLabel ?? `${clamped}%`}</span>
      </div>
      {bar}
    </div>
  );
}

export function MetricCard({
  label,
  value,
  unit,
  icon: Icon,
  tone = "blue",
  delta,
  note
}: {
  label: string;
  value: string | number;
  unit?: string;
  icon: LucideIcon;
  tone?: "blue" | "green" | "amber";
  delta?: string;
  note?: string;
}) {
  return (
    <article className={cx(s.card, s.metric)}>
      <div className={s.metricTop}>
        <span className={cx(s.metricIcon, tone === "green" && s.metricIconGreen, tone === "amber" && s.metricIconAmber)}>
          <Icon size={19} aria-hidden="true" />
        </span>
        {delta ? (
          <span className={cx(s.delta, delta.startsWith("+") || delta.startsWith("−") ? s.deltaUp : s.deltaNeutral)}>
            {delta}
          </span>
        ) : null}
      </div>
      <div>
        <div className={s.metricValue}>
          {value}
          {unit ? <small>{unit}</small> : null}
        </div>
        <div className={s.metricLabel}>{label}</div>
      </div>
      {note ? <div className={s.metricNote}>{note}</div> : null}
    </article>
  );
}

export function InfoTile({ icon: Icon, label, value }: { icon: LucideIcon; label: string; value: string }) {
  return (
    <div className={s.infoTile}>
      <span className={s.metricIcon}>
        <Icon size={18} aria-hidden="true" />
      </span>
      <div>
        <span>{label}</span>
        <strong>{value}</strong>
      </div>
    </div>
  );
}
