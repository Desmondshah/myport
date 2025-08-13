import React from "react";
import { useAuthActions } from "@convex-dev/auth/react";

export interface AuthCallbacks {
  onAuthed: () => void;
}

export function SignInForm({ onAuthed }: AuthCallbacks) {
  const { signIn } = useAuthActions();
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        signIn("password", formData)
          .then(() => onAuthed())
          .catch((err) => {
            console.error("Sign in failed", err);
            alert("Sign in failed");
          });
      }}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "0.5rem",
        maxWidth: 280,
      }}
    >
      <input name="email" type="email" placeholder="Email" required />
      <input name="password" type="password" placeholder="Password" required />
      <button type="submit">Sign In</button>
    </form>
  );
}

export function AnonymousButton({ onAuthed }: AuthCallbacks) {
  const { signIn } = useAuthActions();
  return (
    <button
      onClick={() => {
        onAuthed();
        try {
          const result = signIn("anonymous" as any);
          if (
            result &&
            typeof (result as Promise<unknown>).then === "function"
          ) {
            (result as Promise<unknown>).catch((err) => {
              console.error("Anon sign in failed", err);
            });
          }
        } catch (err) {
          console.error("Anon sign in threw", err);
        }
      }}
      style={{ marginTop: "1rem" }}
    >
      Continue as Guest
    </button>
  );
}
