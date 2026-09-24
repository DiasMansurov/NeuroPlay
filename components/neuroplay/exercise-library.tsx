"use client";

import { Search, SearchX } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";

import { difficulties, exerciseCategories, exercises, type Difficulty, type ExerciseCategory } from "@/lib/neuroplay/demo-data";
import { ExerciseCard } from "./exercise-card";
import { cx } from "./ui";
import s from "./neuroplay.module.css";

export function ExerciseLibrary() {
  const params = useSearchParams();
  const [query, setQuery] = useState(params.get("q") ?? "");
  const [category, setCategory] = useState<ExerciseCategory | "All">("All");
  const [difficulty, setDifficulty] = useState<Difficulty | "All">("All");

  const results = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return exercises.filter((exercise) => {
      const matchesQuery =
        !needle || [exercise.name, exercise.target, exercise.category, exercise.summary].some((text) => text.toLowerCase().includes(needle));
      const matchesCategory = category === "All" || exercise.category === category;
      const matchesDifficulty = difficulty === "All" || exercise.difficulty === difficulty;
      return matchesQuery && matchesCategory && matchesDifficulty;
    });
  }, [query, category, difficulty]);

  function reset() {
    setQuery("");
    setCategory("All");
    setDifficulty("All");
  }

  return (
    <div className={s.stack} style={{ gap: 24 }}>
      <div className={s.stack} style={{ gap: 14 }}>
        <div className={s.toolbar}>
          <label className={s.searchBox}>
            <Search size={18} aria-hidden="true" />
            <span className={s.srOnly}>Search exercises</span>
            <input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search by name or body area" />
          </label>
          <label>
            <span className={s.srOnly}>Difficulty</span>
            <select className={s.select} value={difficulty} onChange={(event) => setDifficulty(event.target.value as Difficulty | "All")}>
              <option value="All">All levels</option>
              {difficulties.map((level) => (
                <option key={level} value={level}>
                  {level}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className={s.chips} role="group" aria-label="Filter by category">
          {(["All", ...exerciseCategories] as const).map((item) => (
            <button
              key={item}
              type="button"
              className={cx(s.chip, category === item && s.chipActive)}
              aria-pressed={category === item}
              onClick={() => setCategory(item)}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <p className={s.cardSub} aria-live="polite">
        {results.length} {results.length === 1 ? "exercise" : "exercises"}
      </p>

      {results.length ? (
        <div className={s.exerciseGrid}>
          {results.map((exercise) => (
            <ExerciseCard key={exercise.id} exercise={exercise} />
          ))}
        </div>
      ) : (
        <div className={s.empty}>
          <SearchX size={28} aria-hidden="true" />
          <p>No exercises match these filters.</p>
          <button type="button" className={cx(s.btn, s.btnSecondary, s.btnSm)} onClick={reset}>
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}
