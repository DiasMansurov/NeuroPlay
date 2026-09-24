import type { Metadata } from "next";

import { ProfileView } from "@/components/neuroplay/profile-view";

export const metadata: Metadata = {
  title: "Profile",
  description: "Your NeuroPlay profile and preferences."
};

export default function ProfilePage() {
  return <ProfileView />;
}
