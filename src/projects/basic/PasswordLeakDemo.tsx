import React from "react";

/**
 * PasswordLeakDemo (Safe)
 * -------------------------------------------------------
 * Demonstrates k‑anonymity breach checking using the Pwned Passwords API.
 * User enters a (FAKE / TEST) password. We:
 *   1. Hash with SHA‑1 in browser
 *   2. Send only the first 5 hex chars (prefix) to the API
 *   3. Receive list of suffixes + counts, match locally
 *   4. Report exposure count (if any)
 * No full password or full hash leaves the browser.
 *
 * IMPORTANT: Never test real production passwords here.
 */

export const PasswordLeakDemo: React.FC<{ onBack?: () => void }> = ({
  onBack,
}) => {
  const [pw, setPw] = React.useState("");
  const [hash, setHash] = React.useState<string>("");
  const [count, setCount] = React.useState<number | null>(null);
  const [status, setStatus] = React.useState<
    "idle" | "hashing" | "query" | "done" | "error"
  >("idle");
  const [error, setError] = React.useState<string>("");
  const [showHash, setShowHash] = React.useState(false);

  const disabled = !pw.trim() || status === "hashing" || status === "query";

  async function run() {
    setStatus("hashing");
    setError("");
    setCount(null);
    setHash("");
    try {
      const sha1Hex = await sha1(pw);
      setHash(sha1Hex);
      const prefix = sha1Hex.substring(0, 5).toUpperCase();
      const suffix = sha1Hex.substring(5).toUpperCase();
      setStatus("query");
      const resp = await fetch(
        "https://api.pwnedpasswords.com/range/" + prefix,
        {
          headers: { "Add-Padding": "true" }, // enable padded responses (defense-in-depth)
        }
      );
      if (!resp.ok) throw new Error("API request failed: " + resp.status);
      const text = await resp.text();
      let found: number | null = null;
      // Each line: SUFFIX:COUNT
      for (const line of text.split(/\r?\n/)) {
        if (!line) continue;
        const [suf, cnt] = line.split(":");
        if (suf === suffix) {
          found = parseInt(cnt, 10) || 0;
          break;
        }
      }
      setCount(found ?? 0);
      setStatus("done");
    } catch (e: any) {
      setError(e?.message || String(e));
      setStatus("error");
    }
  }

  return (
    <section
      style={{
        maxWidth: 880,
        lineHeight: 1.55,
        display: "grid",
        gap: "1.25rem",
      }}
    >
      <header>
        <h1 style={{ margin: 0, fontSize: "1.9rem" }}>Password Leak Demo</h1>
        <p style={{ margin: ".5rem 0 0", color: "#444", fontSize: ".9rem" }}>
          Checks whether a <strong>test password</strong> appears in known
          breach corpuses using the Have I Been Pwned k‑anonymity API. Only the
          first 5 chars of the SHA‑1 hash are sent—your raw password never
          leaves the browser. DO NOT use a real password.
        </p>
        {onBack && (
          <button
            onClick={onBack}
            style={backBtn}
            aria-label="Back to Projects"
          >
            ← Back to Projects
          </button>
        )}
      </header>

      <div style={cardBox}>
        <strong style={{ fontSize: "1rem" }}>Test Input</strong>
        <label
          style={{ display: "grid", marginTop: ".7rem", fontSize: ".65rem" }}
        >
          <span>Password (fake / sample)</span>
          <input
            type="password"
            value={pw}
            onChange={(e) => setPw(e.target.value)}
            placeholder="Enter a fake password like: Winter2025!"
            aria-label="Test password"
            style={inputStyle}
          />
        </label>
        <div
          style={{
            display: "flex",
            gap: ".6rem",
            flexWrap: "wrap",
            marginTop: ".7rem",
          }}
        >
          <button
            onClick={run}
            disabled={disabled}
            style={btnStyle}
            aria-label="Run leak check"
          >
            {status === "hashing" || status === "query"
              ? "Checking…"
              : "Check Leak"}
          </button>
          <button
            onClick={() => {
              setPw("");
              setCount(null);
              setHash("");
              setStatus("idle");
              setError("");
            }}
            style={{ ...btnStyle, background: "#555", borderColor: "#555" }}
            aria-label="Clear"
          >
            Clear
          </button>
          <button
            onClick={() => setShowHash((s) => !s)}
            disabled={!hash}
            style={{
              ...btnStyle,
              background: showHash ? "#444" : "#666",
              borderColor: showHash ? "#444" : "#666",
            }}
            aria-label="Toggle hash visibility"
          >
            {showHash ? "Hide Hash" : "Show Hash"}
          </button>
        </div>
        <p
          style={{ margin: ".6rem 0 0", fontSize: ".55rem", color: "#b00020" }}
        >
          Never paste real passwords. This is for learning only.
        </p>
      </div>

      {(status === "done" || status === "error") && (
        <div style={cardBox}>
          <strong style={{ fontSize: "1rem" }}>Result</strong>
          {status === "error" && (
            <p
              style={{
                margin: ".6rem 0 0",
                fontSize: ".7rem",
                color: "#b00020",
              }}
            >
              {error}
            </p>
          )}
          {status === "done" && (
            <div style={{ marginTop: ".6rem", fontSize: ".7rem" }}>
              {count ? (
                <p style={{ margin: 0 }}>
                  This password hash appeared{" "}
                  <strong>{count.toLocaleString()}</strong> time
                  {count !== 1 && "s"} in breaches. It's unsafe—never use it.
                </p>
              ) : (
                <p style={{ margin: 0 }}>
                  This password was <strong>not found</strong> in the dataset
                  (good sign), but still avoid reusing or relying on simple
                  phrases.
                </p>
              )}
            </div>
          )}
          {hash && showHash && (
            <p
              style={{
                margin: ".7rem 0 0",
                fontSize: ".55rem",
                wordBreak: "break-all",
                color: "#555",
              }}
            >
              SHA‑1: <code>{hash}</code>
            </p>
          )}
          <p style={{ margin: ".7rem 0 0", fontSize: ".55rem", color: "#777" }}>
            API padded responses requested. Source: Pwned Passwords. Rate limits
            may apply.
          </p>
        </div>
      )}

      <footer style={{ fontSize: ".55rem", color: "#777" }}>
        Use a password manager + unique strong passwords. For real apps, prefer
        salted hash & dedicated secrets handling.
      </footer>
    </section>
  );
};

async function sha1(message: string): Promise<string> {
  const enc = new TextEncoder();
  const data = enc.encode(message);
  const hashBuf = await crypto.subtle.digest("SHA-1", data);
  const bytes = new Uint8Array(hashBuf);
  return Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

const cardBox: React.CSSProperties = {
  border: "1px solid #ddd",
  padding: "1rem 1rem .9rem",
  borderRadius: 10,
  background: "#fff",
  maxWidth: 880,
};
const btnStyle: React.CSSProperties = {
  marginTop: ".55rem",
  appearance: "none",
  background: "#222",
  color: "#fff",
  border: "1px solid #222",
  padding: ".45rem .8rem",
  borderRadius: 5,
  fontSize: ".65rem",
  cursor: "pointer",
};
const backBtn: React.CSSProperties = {
  marginTop: ".75rem",
  appearance: "none",
  background: "#f5f5f5",
  color: "#222",
  border: "1px solid #ccc",
  padding: ".45rem .85rem",
  borderRadius: 6,
  fontSize: ".7rem",
  cursor: "pointer",
};
const inputStyle: React.CSSProperties = {
  marginTop: ".35rem",
  width: "100%",
  padding: ".5rem .6rem",
  fontSize: ".7rem",
  border: "1px solid #ccc",
  borderRadius: 6,
  fontFamily: "system-ui, sans-serif",
};

export default PasswordLeakDemo;
