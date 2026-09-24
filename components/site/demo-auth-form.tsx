"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

import styles from "./demo-auth-form.module.css";

type DemoAuthMode = "sign-in" | "sign-up";

type DemoAuthFormProps = {
  mode: DemoAuthMode;
};

export function DemoAuthForm({ mode }: DemoAuthFormProps) {
  const router = useRouter();
  const isSignUp = mode === "sign-up";
  const [error, setError] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const requiredFields = isSignUp ? ["username", "email", "password"] : ["identifier", "password"];
    const hasEmptyField = requiredFields.some((field) => {
      const value = formData.get(field);
      return typeof value !== "string" || value.trim().length === 0;
    });

    if (hasEmptyField) {
      setError("Please fill in every field to continue.");
      return;
    }

    setError("");
    router.push("/app");
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.fields}>
        {isSignUp ? (
          <>
            <label>
              <span>Username</span>
              <input name="username" autoComplete="username" required />
            </label>
            <label>
              <span>Email</span>
              <input name="email" type="email" autoComplete="email" required />
            </label>
          </>
        ) : (
          <label>
            <span>Email or username</span>
            <input name="identifier" autoComplete="username" required />
          </label>
        )}
        <label>
          <span>Password</span>
          <input name="password" type="password" autoComplete={isSignUp ? "new-password" : "current-password"} required />
        </label>
      </div>

      {error ? <p className={styles.error}>{error}</p> : null}

      <button className={styles.submit} type="submit">
        {isSignUp ? "Create demo account" : "Enter NeuroPlay"}
      </button>

      <p className={styles.switch}>
        {isSignUp ? "Already have demo access?" : "Need demo access?"}{" "}
        <Link href={isSignUp ? "/sign-in" : "/sign-up"}>{isSignUp ? "Sign in" : "Create an account"}</Link>
      </p>
    </form>
  );
}
