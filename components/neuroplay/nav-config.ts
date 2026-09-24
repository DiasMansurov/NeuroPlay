import {
  ChartColumn,
  ChartLine,
  Dumbbell,
  FileText,
  House,
  LayoutDashboard,
  Settings,
  Stethoscope,
  UserRound,
  UsersRound,
  type LucideIcon
} from "lucide-react";

export type ShellVariant = "patient" | "doctor";

export type NavItem = {
  href: string;
  label: string;
  shortLabel?: string;
  icon: LucideIcon;
  // Extra path prefixes that should also mark this item active.
  matches?: string[];
};

type NavConfig = {
  primary: NavItem[];
  secondary: NavItem[];
  mobile: NavItem[];
  user: { name: string; initials: string; role: string };
  home: string;
  searchPlaceholder: string;
  searchTarget: string;
  switchTo: { href: string; label: string };
};

const patientPrimary: NavItem[] = [
  { href: "/app", label: "Overview", shortLabel: "Home", icon: House },
  { href: "/app/exercises", label: "Exercises", icon: Dumbbell, matches: ["/app/session"] },
  { href: "/app/progress", label: "Progress", icon: ChartLine },
  { href: "/app/care", label: "Care Team", shortLabel: "Care", icon: Stethoscope },
  { href: "/app/reports", label: "Reports", icon: FileText }
];

const doctorPrimary: NavItem[] = [
  { href: "/doctor", label: "Dashboard", icon: LayoutDashboard },
  { href: "/doctor/patients", label: "Patients", icon: UsersRound },
  { href: "/doctor/analytics", label: "Analytics", icon: ChartColumn },
  { href: "/doctor/settings", label: "Settings", icon: Settings }
];

export const navConfig: Record<ShellVariant, NavConfig> = {
  patient: {
    primary: patientPrimary,
    secondary: [
      { href: "/app/profile", label: "Profile", icon: UserRound },
      { href: "/app/profile#preferences", label: "Settings", icon: Settings }
    ],
    mobile: patientPrimary.slice(0, 4),
    user: { name: "Alex Morgan", initials: "AM", role: "Patient" },
    home: "/app",
    searchPlaceholder: "Search exercises",
    searchTarget: "/app/exercises",
    switchTo: { href: "/doctor", label: "Clinician view" }
  },
  doctor: {
    primary: doctorPrimary.slice(0, 3),
    secondary: [doctorPrimary[3]],
    mobile: doctorPrimary,
    user: { name: "Dr. Sarah Chen", initials: "SC", role: "Physical Therapist" },
    home: "/doctor",
    searchPlaceholder: "Search patients",
    searchTarget: "/doctor/patients",
    switchTo: { href: "/app", label: "Patient view" }
  }
};

export function isActive(pathname: string, item: NavItem, home: string) {
  if (item.href.includes("#")) return false;
  if (item.href === home) return pathname === home;
  const prefixes = [item.href, ...(item.matches ?? [])];
  return prefixes.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`));
}

const titles: Array<[RegExp, string]> = [
  [/^\/app$/, "Overview"],
  [/^\/app\/exercises$/, "Exercises"],
  [/^\/app\/exercises\/.+/, "Exercise details"],
  [/^\/app\/session\/results/, "Session results"],
  [/^\/app\/progress/, "Progress"],
  [/^\/app\/care/, "Care Team"],
  [/^\/app\/reports/, "Reports"],
  [/^\/app\/profile/, "Profile"],
  [/^\/doctor$/, "Dashboard"],
  [/^\/doctor\/patients$/, "Patients"],
  [/^\/doctor\/patients\/.+/, "Patient details"],
  [/^\/doctor\/analytics/, "Analytics"],
  [/^\/doctor\/settings/, "Settings"]
];

export function pageTitle(pathname: string) {
  return titles.find(([pattern]) => pattern.test(pathname))?.[1] ?? "";
}
