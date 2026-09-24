"use client";

import { useEffect, useState } from "react";

function greetingFor(hour: number) {
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

export function Greeting({ name }: { name: string }) {
  // Render a stable greeting on the server, then match the viewer's local time.
  const [greeting, setGreeting] = useState("Good morning");
  useEffect(() => setGreeting(greetingFor(new Date().getHours())), []);
  return (
    <h1>
      {greeting}, {name}
    </h1>
  );
}
