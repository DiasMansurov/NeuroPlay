"use client";

import { ArrowLeftRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Avatar, BrandMark } from "./ui";
import { isActive, navConfig, type NavItem, type ShellVariant } from "./nav-config";
import s from "./neuroplay.module.css";

function NavLink({ item, active }: { item: NavItem; active: boolean }) {
  const Icon = item.icon;
  return (
    <Link
      href={item.href}
      className={`${s.navLink} ${active ? s.navLinkActive : ""}`}
      aria-current={active ? "page" : undefined}
      title={item.label}
    >
      <Icon size={20} strokeWidth={active ? 2.2 : 1.9} aria-hidden="true" />
      <span className={s.navText}>{item.label}</span>
    </Link>
  );
}

export function Sidebar({ variant }: { variant: ShellVariant }) {
  const pathname = usePathname();
  const config = navConfig[variant];

  return (
    <aside className={s.sidebar} aria-label="Sidebar">
      <Link href={config.home} className={s.brand} aria-label="NeuroPlay home">
        <BrandMark />
        <span className={s.brandText}>NeuroPlay</span>
        {variant === "doctor" ? <span className={s.brandTag}>Clinic</span> : null}
      </Link>

      <nav className={s.navGroup} aria-label="Main">
        <span className={s.navLabel}>{variant === "doctor" ? "Clinic" : "Recovery"}</span>
        {config.primary.map((item) => (
          <NavLink key={item.href} item={item} active={isActive(pathname, item, config.home)} />
        ))}
      </nav>

      <div className={s.sidebarBottom}>
        <nav className={s.navGroup} aria-label="Account">
          {config.secondary.map((item) => (
            <NavLink key={item.href} item={item} active={isActive(pathname, item, config.home)} />
          ))}
        </nav>
        <Link href={config.switchTo.href} className={s.switchLink} title={config.switchTo.label}>
          <ArrowLeftRight size={16} aria-hidden="true" />
          <span>Switch to {config.switchTo.label.toLowerCase()}</span>
        </Link>
        <div className={s.userCard}>
          <Avatar initials={config.user.initials} tone={variant === "doctor" ? "green" : "blue"} />
          <div>
            <strong>{config.user.name}</strong>
            <span>{config.user.role}</span>
          </div>
        </div>
      </div>
    </aside>
  );
}

export function MobileNav({ variant }: { variant: ShellVariant }) {
  const pathname = usePathname();
  const config = navConfig[variant];

  return (
    <nav className={s.mobileNav} aria-label="Main">
      {config.mobile.map((item) => {
        const active = isActive(pathname, item, config.home);
        const Icon = item.icon;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`${s.mobileNavLink} ${active ? s.mobileNavLinkActive : ""}`}
            aria-current={active ? "page" : undefined}
          >
            <Icon size={22} strokeWidth={active ? 2.2 : 1.9} aria-hidden="true" />
            {item.shortLabel ?? item.label}
          </Link>
        );
      })}
    </nav>
  );
}
