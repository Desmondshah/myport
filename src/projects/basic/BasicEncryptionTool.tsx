import React from "react";

/**
 * BasicEncryptionTool
 * -------------------------------------------------------
 * Educational demo showing reversible transforms (NOT secure):
 *  - Caesar shift (A-Z / a-z only)
 *  - Base64 encode/decode (UTF-8 safe wrapper)
 * Lets user enter plaintext, encrypt, then decrypt back.
 * Everything happens client-side in memory.
 */

type Mode = "caesar" | "base64";

export const BasicEncryptionTool: React.FC<{ onBack?: () => void }> = ({
  onBack,
}) => {
  const [mode, setMode] = React.useState<Mode>("caesar");
  const [shift, setShift] = React.useState(3); // Caesar shift
  const [input, setInput] = React.useState("");
  const [output, setOutput] = React.useState("");
  const [direction, setDirection] = React.useState<"encrypt" | "decrypt">(
    "encrypt"
  );

  const run = React.useCallback(() => {
    try {
      if (direction === "encrypt") {
        setOutput(transform(input, mode, shift));
      } else {
        setOutput(reverseTransform(input, mode, shift));
      }
    } catch (e: any) {
      setOutput("Error: " + (e?.message || e));
    }
  }, [input, mode, shift, direction]);

  const swapIO = () => {
    setInput(output);
    setOutput("");
  };

  return (
    <div style={containerStyle}>
      <div style={matrixRainStyle} />
      <section style={sectionStyle}>
        <header style={headerStyle}>
          <div style={titleContainerStyle}>
            <h1 style={titleStyle}>CRYPTO LAB</h1>
            <div style={lockIconStyle}>🔐</div>
          </div>
          <p style={descriptionStyle}>
            ⚠️ EDUCATIONAL CIPHER PLAYGROUND ⚠️
            <br />
            NOT FOR PRODUCTION USE
          </p>
          {onBack && (
            <button
              onClick={onBack}
              style={backBtnStyle}
              aria-label="Back to Projects"
            >
              ← BACK TO ARSENAL
            </button>
          )}
        </header>

        <div style={mainGridStyle}>
          {/* Control Panel */}
          <div style={controlPanelStyle}>
            <div style={panelHeaderStyle}>
              <h2 style={panelTitleStyle}>CIPHER CONFIG</h2>
              <div style={securityBadgeStyle}>INSECURE</div>
            </div>

            <div style={controlsStyle}>
              <div style={controlGroupStyle}>
                <label style={labelStyle}>ALGORITHM</label>
                <select
                  value={mode}
                  onChange={(e) => setMode(e.target.value as Mode)}
                  style={selectStyle}
                >
                  <option value="caesar">CAESAR SHIFT</option>
                  <option value="base64">BASE64 ENCODING</option>
                </select>
              </div>

              {mode === "caesar" && (
                <div style={controlGroupStyle}>
                  <label style={labelStyle}>SHIFT VALUE</label>
                  <input
                    type="number"
                    value={shift}
                    onChange={(e) => setShift(Number(e.target.value))}
                    min="1"
                    max="25"
                    style={numberInputStyle}
                  />
                </div>
              )}

              <div style={controlGroupStyle}>
                <label style={labelStyle}>OPERATION</label>
                <div style={toggleGroupStyle}>
                  <button
                    onClick={() => setDirection("encrypt")}
                    style={{
                      ...toggleBtnStyle,
                      ...(direction === "encrypt" ? activeToggleStyle : {}),
                    }}
                  >
                    ENCRYPT
                  </button>
                  <button
                    onClick={() => setDirection("decrypt")}
                    style={{
                      ...toggleBtnStyle,
                      ...(direction === "decrypt" ? activeToggleStyle : {}),
                    }}
                  >
                    DECRYPT
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Input/Output Terminal */}
          <div style={terminalStyle}>
            <div style={terminalHeaderStyle}>
              <div style={terminalTitleStyle}>
                <span style={terminalIconStyle}>▶</span>
                CIPHER TERMINAL
              </div>
              <div style={terminalIndicatorsStyle}>
                <div style={indicatorStyle} />
                <div style={{ ...indicatorStyle, background: "#ff3366" }} />
                <div style={{ ...indicatorStyle, background: "#00d9ff" }} />
              </div>
            </div>

            <div style={ioContainerStyle}>
              <div style={ioSectionStyle}>
                <label style={ioLabelStyle}>INPUT</label>
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Enter text to transform..."
                  style={textareaStyle}
                />
              </div>

              <div style={arrowContainerStyle}>
                <button onClick={run} style={processBtnStyle}>
                  {direction === "encrypt" ? "🔒 ENCRYPT" : "🔓 DECRYPT"}
                </button>
                <button onClick={swapIO} style={swapBtnStyle}>
                  ⇅ SWAP
                </button>
              </div>

              <div style={ioSectionStyle}>
                <label style={ioLabelStyle}>OUTPUT</label>
                <textarea
                  value={output}
                  readOnly
                  placeholder="Result will appear here..."
                  style={{
                    ...textareaStyle,
                    background: "#000",
                    color: "#00ff00",
                  }}
                />
              </div>
            </div>
          </div>

          {/* Algorithm Info */}
          <div style={infoCardStyle}>
            <div style={infoHeaderStyle}>
              <h3 style={infoTitleStyle}>ALGORITHM INFO</h3>
              <div style={warningIconStyle}>⚠️</div>
            </div>

            {mode === "caesar" && (
              <div style={infoContentStyle}>
                <p style={infoTextStyle}>
                  <strong>Caesar Cipher:</strong> Shifts each letter by {shift}{" "}
                  positions in the alphabet. Only affects A-Z and a-z. Numbers
                  and symbols remain unchanged.
                </p>
                <div style={exampleStyle}>
                  <span style={exampleLabelStyle}>EXAMPLE:</span>
                  <br />A → {String.fromCharCode(((0 + shift) % 26) + 65)}
                  <br />B → {String.fromCharCode(((1 + shift) % 26) + 65)}
                </div>
              </div>
            )}

            {mode === "base64" && (
              <div style={infoContentStyle}>
                <p style={infoTextStyle}>
                  <strong>Base64 Encoding:</strong> Converts text to base64
                  representation. Not encryption - just encoding! Easily
                  reversible.
                </p>
                <div style={exampleStyle}>
                  <span style={exampleLabelStyle}>EXAMPLE:</span>
                  <br />
                  "Hello" → "SGVsbG8="
                </div>
              </div>
            )}
          </div>
        </div>

        <footer style={pageFooterStyle}>
          <div style={disclaimerStyle}>
            <span style={warningTextStyle}>⚠️ EDUCATIONAL USE ONLY</span>
            <span style={techTextStyle}>REACT • TYPESCRIPT • CLIENT-SIDE</span>
          </div>
        </footer>
      </section>
    </div>
  );
};

// Transform functions (unchanged from original)
function transform(text: string, mode: Mode, shift: number): string {
  if (mode === "caesar") {
    return text
      .split("")
      .map((char) => {
        const code = char.charCodeAt(0);
        if (code >= 65 && code <= 90) {
          return String.fromCharCode(((code - 65 + shift) % 26) + 65);
        }
        if (code >= 97 && code <= 122) {
          return String.fromCharCode(((code - 97 + shift) % 26) + 97);
        }
        return char;
      })
      .join("");
  }
  if (mode === "base64") {
    return btoa(unescape(encodeURIComponent(text)));
  }
  return text;
}

function reverseTransform(text: string, mode: Mode, shift: number): string {
  if (mode === "caesar") {
    return transform(text, mode, 26 - shift);
  }
  if (mode === "base64") {
    try {
      return decodeURIComponent(escape(atob(text)));
    } catch {
      throw new Error("Invalid Base64 input");
    }
  }
  return text;
}

// Crypto-themed neo-brutalist styles
const containerStyle: React.CSSProperties = {
  minHeight: "100vh",
  position: "relative",
  background: "linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)",
  color: "#00ff00",
  overflow: "hidden",
};

const matrixRainStyle: React.CSSProperties = {
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundImage: `
    repeating-linear-gradient(
      90deg,
      transparent,
      transparent 98px,
      rgba(0, 255, 0, 0.1) 100px
    )
  `,
  animation: "matrix 3s linear infinite",
  pointerEvents: "none",
};

const sectionStyle: React.CSSProperties = {
  position: "relative",
  zIndex: 1,
  maxWidth: "1200px",
  margin: "0 auto",
  padding: "clamp(1rem, 4vw, 2rem)",
  display: "grid",
  gap: "clamp(1.5rem, 4vw, 2.5rem)",
};

const headerStyle: React.CSSProperties = {
  textAlign: "center",
  marginBottom: "2rem",
};

const titleContainerStyle: React.CSSProperties = {
  position: "relative",
  display: "inline-block",
  marginBottom: "1rem",
};

const titleStyle: React.CSSProperties = {
  fontSize: "clamp(2.5rem, 8vw, 4rem)",
  fontWeight: 900,
  color: "#00ff00",
  textTransform: "uppercase",
  letterSpacing: "0.1em",
  margin: 0,
  textShadow: "0 0 20px #00ff00, 4px 4px 0 #000",
  fontFamily: "monospace",
  animation: "glitch 4s infinite",
};

const lockIconStyle: React.CSSProperties = {
  position: "absolute",
  top: "-20px",
  right: "-30px",
  fontSize: "2rem",
  animation: "float 3s ease-in-out infinite",
};

const descriptionStyle: React.CSSProperties = {
  fontSize: "clamp(0.9rem, 2.5vw, 1.1rem)",
  color: "#ff3366",
  fontWeight: 700,
  textTransform: "uppercase",
  letterSpacing: "0.1em",
  lineHeight: 1.4,
  fontFamily: "monospace",
  textShadow: "0 0 10px #ff3366",
};

const backBtnStyle: React.CSSProperties = {
  marginTop: "1.5rem",
  background: "#000",
  color: "#00ff00",
  border: "3px solid #00ff00",
  padding: "0.75rem 1.5rem",
  fontSize: "0.8rem",
  fontWeight: 700,
  textTransform: "uppercase",
  letterSpacing: "0.1em",
  cursor: "pointer",
  fontFamily: "monospace",
  boxShadow: "0 0 15px #00ff00, 4px 4px 0 #00ff00",
  transition: "all 0.2s ease",
};

const mainGridStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "300px 1fr 300px",
  gap: "2rem",
};

const controlPanelStyle: React.CSSProperties = {
  background: "#111",
  border: "4px solid #00ff00",
  borderRadius: "0",
  padding: "1.5rem",
  boxShadow: "0 0 20px rgba(0, 255, 0, 0.3)",
  transform: "rotate(-1deg)",
};

const panelHeaderStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "1.5rem",
  paddingBottom: "1rem",
  borderBottom: "2px solid #00ff00",
};

const panelTitleStyle: React.CSSProperties = {
  fontSize: "1.2rem",
  fontWeight: 800,
  color: "#00ff00",
  textTransform: "uppercase",
  letterSpacing: "0.1em",
  margin: 0,
  fontFamily: "monospace",
};

const securityBadgeStyle: React.CSSProperties = {
  background: "#ff3366",
  color: "#fff",
  padding: "0.25rem 0.5rem",
  fontSize: "0.6rem",
  fontWeight: 700,
  textTransform: "uppercase",
  border: "2px solid #000",
  animation: "pulse 2s infinite",
};

const controlsStyle: React.CSSProperties = {
  display: "grid",
  gap: "1rem",
};

const controlGroupStyle: React.CSSProperties = {
  display: "grid",
  gap: "0.5rem",
};

const labelStyle: React.CSSProperties = {
  fontSize: "0.8rem",
  fontWeight: 700,
  color: "#00ff00",
  textTransform: "uppercase",
  letterSpacing: "0.1em",
  fontFamily: "monospace",
};

const selectStyle: React.CSSProperties = {
  background: "#000",
  color: "#00ff00",
  border: "2px solid #00ff00",
  padding: "0.5rem",
  fontSize: "0.8rem",
  fontFamily: "monospace",
  fontWeight: 600,
  textTransform: "uppercase",
  cursor: "pointer",
};

const numberInputStyle: React.CSSProperties = {
  background: "#000",
  color: "#00ff00",
  border: "2px solid #00ff00",
  padding: "0.5rem",
  fontSize: "1rem",
  fontFamily: "monospace",
  fontWeight: 600,
  textAlign: "center",
  width: "80px",
};

const toggleGroupStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "0.5rem",
};

const toggleBtnStyle: React.CSSProperties = {
  background: "#000",
  color: "#666",
  border: "2px solid #333",
  padding: "0.5rem",
  fontSize: "0.7rem",
  fontWeight: 700,
  textTransform: "uppercase",
  cursor: "pointer",
  fontFamily: "monospace",
  transition: "all 0.2s ease",
};

const activeToggleStyle: React.CSSProperties = {
  background: "#00ff00",
  color: "#000",
  borderColor: "#00ff00",
  boxShadow: "0 0 10px #00ff00",
};

const terminalStyle: React.CSSProperties = {
  background: "#000",
  border: "4px solid #00ff00",
  borderRadius: "0",
  boxShadow: "0 0 30px rgba(0, 255, 0, 0.3)",
  overflow: "hidden",
};

const terminalHeaderStyle: React.CSSProperties = {
  background: "#00ff00",
  color: "#000",
  padding: "0.75rem 1rem",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const terminalTitleStyle: React.CSSProperties = {
  fontSize: "0.9rem",
  fontWeight: 700,
  textTransform: "uppercase",
  letterSpacing: "0.1em",
  fontFamily: "monospace",
  display: "flex",
  alignItems: "center",
  gap: "0.5rem",
};

const terminalIconStyle: React.CSSProperties = {
  fontSize: "1rem",
};

const terminalIndicatorsStyle: React.CSSProperties = {
  display: "flex",
  gap: "0.5rem",
};

const indicatorStyle: React.CSSProperties = {
  width: "12px",
  height: "12px",
  borderRadius: "50%",
  background: "#00ff00",
  border: "2px solid #000",
};

const ioContainerStyle: React.CSSProperties = {
  padding: "2rem",
  display: "grid",
  gap: "1.5rem",
};

const ioSectionStyle: React.CSSProperties = {
  display: "grid",
  gap: "0.5rem",
};

const ioLabelStyle: React.CSSProperties = {
  fontSize: "0.8rem",
  fontWeight: 700,
  color: "#00ff00",
  textTransform: "uppercase",
  letterSpacing: "0.1em",
  fontFamily: "monospace",
};

const textareaStyle: React.CSSProperties = {
  background: "#111",
  color: "#00ff00",
  border: "2px solid #333",
  padding: "1rem",
  fontSize: "0.9rem",
  fontFamily: "monospace",
  minHeight: "120px",
  resize: "vertical",
  lineHeight: 1.4,
};

const arrowContainerStyle: React.CSSProperties = {
  display: "flex",
  gap: "1rem",
  justifyContent: "center",
  alignItems: "center",
};

const processBtnStyle: React.CSSProperties = {
  background: "#ff3366",
  color: "#fff",
  border: "3px solid #000",
  padding: "1rem 2rem",
  fontSize: "1rem",
  fontWeight: 700,
  textTransform: "uppercase",
  cursor: "pointer",
  borderRadius: "0",
  boxShadow: "6px 6px 0 #000",
  fontFamily: "monospace",
  letterSpacing: "0.1em",
  transition: "all 0.2s ease",
};

const swapBtnStyle: React.CSSProperties = {
  background: "#00d9ff",
  color: "#000",
  border: "3px solid #000",
  padding: "0.75rem 1rem",
  fontSize: "0.8rem",
  fontWeight: 700,
  textTransform: "uppercase",
  cursor: "pointer",
  borderRadius: "0",
  boxShadow: "4px 4px 0 #000",
  fontFamily: "monospace",
  letterSpacing: "0.1em",
  transform: "rotate(0.5deg)",
};

const infoCardStyle: React.CSSProperties = {
  background: "#111",
  border: "4px solid #ff3366",
  borderRadius: "0",
  padding: "1.5rem",
  boxShadow: "0 0 20px rgba(255, 51, 102, 0.3)",
  transform: "rotate(1deg)",
};

const infoHeaderStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "1rem",
  paddingBottom: "0.5rem",
  borderBottom: "2px solid #ff3366",
};

const infoTitleStyle: React.CSSProperties = {
  fontSize: "1rem",
  fontWeight: 800,
  color: "#ff3366",
  textTransform: "uppercase",
  letterSpacing: "0.1em",
  margin: 0,
  fontFamily: "monospace",
};

const warningIconStyle: React.CSSProperties = {
  fontSize: "1.5rem",
  animation: "shake 2s infinite",
};

const infoContentStyle: React.CSSProperties = {
  color: "#ccc",
};

const infoTextStyle: React.CSSProperties = {
  fontSize: "0.8rem",
  lineHeight: 1.4,
  marginBottom: "1rem",
  fontFamily: "monospace",
};

const exampleStyle: React.CSSProperties = {
  background: "#000",
  border: "2px solid #333",
  padding: "0.75rem",
  fontSize: "0.7rem",
  fontFamily: "monospace",
  color: "#00ff00",
};

const exampleLabelStyle: React.CSSProperties = {
  color: "#ff3366",
  fontWeight: 700,
};

const pageFooterStyle: React.CSSProperties = {
  textAlign: "center",
  marginTop: "3rem",
};

const disclaimerStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  flexWrap: "wrap",
  gap: "1rem",
  padding: "1rem",
  background: "#111",
  border: "3px solid #666",
  fontSize: "0.7rem",
  fontFamily: "monospace",
};

const warningTextStyle: React.CSSProperties = {
  color: "#ff3366",
  fontWeight: 700,
  textTransform: "uppercase",
  letterSpacing: "0.1em",
  textShadow: "0 0 10px #ff3366",
};

const techTextStyle: React.CSSProperties = {
  color: "#666",
  fontWeight: 600,
  textTransform: "uppercase",
  letterSpacing: "0.1em",
};

export default BasicEncryptionTool;
