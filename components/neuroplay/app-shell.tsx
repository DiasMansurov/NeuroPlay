"use client";

import { ArrowLeftRight, Bell, CalendarClock, LogOut, MessageCircle, Search, Settings, Sparkles, UserRound } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";

import { navConfig, pageTitle, type ShellVariant } from "./nav-config";
import { MobileNav, Sidebar } from "./sidebar";
import { ToastProvider } from "./toast";
import { Avatar, BrandMark, cx } from "./ui";
import s from "./neuroplay.module.css";

const notifications = {
  patient: [
    { icon: CalendarClock, title: "Check-in with Dr. Chen", detail: "Thu, 1 Oct · 10:30" },
    { icon: MessageCircle, title: "New note from your care team", detail: "Keep the pace slow on the final set." },
    { icon: Sparkles, title: "9-day streak", detail: "You've trained every day this week." }
  ],
  doctor: [
    { icon: Bell, title: "James Okafor missed 3 sessions", detail: "Adherence dropped to 54%." },
    { icon: Sparkles, title: "Alex Morgan hit a new ROM best", detail: "64° wrist extension this morning." },
    { icon: CalendarClock, title: "4 check-ins scheduled this week", detail: "Next: Thu, 1 Oct · 10:30" }
  ]
};

function useDismiss(open: boolean, close: () => void) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const onPointer = (event: PointerEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) close();
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open, close]);
  return ref;
}

function Topbar({ variant }: { variant: ShellVariant }) {
  const pathname = usePathname();
  const router = useRouter();
  const config = navConfig[variant];
  const [menu, setMenu] = useState<"none" | "bell" | "user">("none");
  const [unread, setUnread] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const close = () => setMenu("none");
  const bellRef = useDismiss(menu === "bell", close);
  const userRef = useDismiss(menu === "user", close);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMenu("none"), [pathname]);

  function onSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const query = new FormData(event.currentTarget).get("q")?.toString().trim() ?? "";
    router.push(query ? `${config.searchTarget}?q=${encodeURIComponent(query)}` : config.searchTarget);
  }

  return (
    <header className={cx(s.topbar, scrolled && s.topbarScrolled)}>
      <div className={s.topbarLeft}>
        <Link href={config.home} className={cx(s.brand, s.topbarBrand)} aria-label="NeuroPlay home">
          <BrandMark />
          NeuroPlay
        </Link>
        <span className={s.crumb}>
          {variant === "doctor" ? "Clinic" : "NeuroPlay"} / <strong>{pageTitle(pathname)}</strong>
        </span>
      </div>

      <div className={s.topbarActions}>
        <form className={s.searchBox} role="search" onSubmit={onSearch}>
          <Search size={17} aria-hidden="true" />
          <label className={s.srOnly} htmlFor="topbar-search">
            {config.searchPlaceholder}
          </label>
          <input id="topbar-search" name="q" type="search" placeholder={config.searchPlaceholder} />
        </form>

        <div className={s.popoverWrap} ref={bellRef}>
          <button
            type="button"
            className={s.iconButton}
            aria-label={unread ? "Notifications, 3 unread" : "Notifications"}
            aria-expanded={menu === "bell"}
            onClick={() => {
              setMenu(menu === "bell" ? "none" : "bell");
              setUnread(false);
            }}
          >
            <Bell size={19} aria-hidden="true" />
            {unread ? <span className={s.iconDot} /> : null}
          </button>
          {menu === "bell" ? (
            <div className={s.popover} role="dialog" aria-label="Notifications">
              <div className={s.popoverHead}>Notifications</div>
              {notifications[variant].map(({ icon: Icon, title, detail }) => (
                <div className={s.popoverItem} key={title}>
                  <span className={s.popoverIcon}>
                    <Icon size={17} aria-hidden="true" />
                  </span>
                  <span>
                    {title}
                    <small>{detail}</small>
                  </span>
                </div>
              ))}
            </div>
          ) : null}
        </div>

        <div className={s.popoverWrap} ref={userRef}>
          <button
            type="button"
            className={s.avatarButton}
            aria-label="Account menu"
            aria-expanded={menu === "user"}
            onClick={() => setMenu(menu === "user" ? "none" : "user")}
          >
            <Avatar initials={config.user.initials} tone={variant === "doctor" ? "green" : "blue"} />
          </button>
          {menu === "user" ? (
            <div className={s.popover} role="menu" aria-label="Account">
              <div className={s.popoverHead}>
                <span>
                  {config.user.name}
                  <small className={s.cardSub} style={{ display: "block", fontWeight: 400 }}>
                    {config.user.role}
                  </small>
                </span>
              </div>
              <div className={s.popoverDivider} />
              {variant === "patient" ? (
                <>
                  <Link className={s.popoverItem} href="/app/profile" role="menuitem">
                    <UserRound size={18} aria-hidden="true" /> Profile
                  </Link>
                  <Link className={s.popoverItem} href="/app/profile#preferences" role="menuitem">
                    <Settings size={18} aria-hidden="true" /> Settings
                  </Link>
                </>
              ) : (
                <Link className={s.popoverItem} href="/doctor/settings" role="menuitem">
                  <Settings size={18} aria-hidden="true" /> Settings
                </Link>
              )}
              <Link className={s.popoverItem} href={config.switchTo.href} role="menuitem">
                <ArrowLeftRight size={18} aria-hidden="true" /> Switch to {config.switchTo.label.toLowerCase()}
              </Link>
              <div className={s.popoverDivider} />
              <Link className={s.popoverItem} href="/" role="menuitem">
                <LogOut size={18} aria-hidden="true" /> Sign out
              </Link>
            </div>
          ) : null}
        </div>
      </div>
    </header>
  );
}

export function AppShell({ variant, fontClassName, children }: { variant: ShellVariant; fontClassName?: string; children: ReactNode }) {
  const pathname = usePathname();
  // The active training session is a distraction-free focus mode without navigation chrome.
  const focusMode = pathname === "/app/session";

  return (
    <div className={cx(s.root, fontClassName)}>
      <ToastProvider>
        {focusMode ? (
          children
        ) : (
          <>
            <a href="#np-content" className={s.skipLink}>
              Skip to content
            </a>
            <Sidebar variant={variant} />
            <div className={s.main}>
              <Topbar variant={variant} />
              <main id="np-content" className={s.content}>
                {children}
              </main>
            </div>
            <MobileNav variant={variant} />
          </>
        )}
      </ToastProvider>
    </div>
  );
}
