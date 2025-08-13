import React from "react";

interface LookupData {
  ip: string;
  city?: string;
  region?: string;
  country?: string;
  org?: string;
  timezone?: string;
}

// Unified page-level component (merges previous widget + page wrapper)
export const IpAddressLookup: React.FC<{ onBack?: () => void }> = ({
  onBack,
}) => {
  const [data, setData] = React.useState<LookupData | null>(null);
  const [status, setStatus] = React.useState<
    "idle" | "loading" | "error" | "done"
  >("idle");
  const [error, setError] = React.useState<string>("");

  const fetchInfo = async () => {
    setStatus("loading");
    setError("");
    try {
      const ipRes = await fetch("https://api.ipify.org?format=json");
      if (!ipRes.ok) throw new Error("ipify request failed");
      const ipJson = await ipRes.json();
      const ip = ipJson.ip as string;
      const detailRes = await fetch(`https://ipapi.co/${ip}/json/`);
      if (!detailRes.ok) throw new Error("ipapi request failed");
      const d = await detailRes.json();
      setData({
        ip,
        city: d.city,
        region: d.region,
        country: d.country_name || d.country,
        org: d.org || d.org_name || d.asn,
        timezone: d.timezone,
      });
      setStatus("done");
    } catch (e: any) {
      console.warn(e);
      setError(e?.message || "Lookup failed");
      setStatus("error");
    }
  };

  return (
    <div style={containerStyle}>
      <div style={backgroundPattern} />
      <section style={sectionStyle}>
        <header style={headerStyle}>
          <div style={titleContainerStyle}>
            <h1 style={titleStyle}>IP LOOKUP</h1>
            <div style={accentBarStyle} />
          </div>
          <p style={descriptionStyle}>
            🌐 GEOLOCATION INTELLIGENCE TOOL
            <br />
            Track your digital footprint with precision
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

        <div style={mainCardStyle}>
          <div style={cardHeaderStyle}>
            <h2 style={cardTitleStyle}>INTEL SCANNER</h2>
            <div style={statusIndicatorStyle} />
          </div>

          <div style={toolboxStyle}>
            {status === "idle" && (
              <div style={idleStateStyle}>
                <div style={scanIconStyle}>🎯</div>
                <p style={promptStyle}>INITIATE LOCATION SCAN</p>
                <button
                  onClick={fetchInfo}
                  style={primaryBtnStyle}
                  aria-label="Run IP address lookup"
                >
                  EXECUTE SCAN
                </button>
              </div>
            )}

            {status === "loading" && (
              <div style={loadingStateStyle}>
                <div style={loadingAnimationStyle}>
                  <div style={loadingDotStyle} />
                  <div style={{ ...loadingDotStyle, animationDelay: "0.2s" }} />
                  <div style={{ ...loadingDotStyle, animationDelay: "0.4s" }} />
                </div>
                <p style={loadingTextStyle}>SCANNING NETWORK...</p>
              </div>
            )}

            {status === "error" && (
              <div style={errorStateStyle}>
                <div style={errorIconStyle}>⚠️</div>
                <p style={errorTextStyle}>{error}</p>
                <button
                  onClick={fetchInfo}
                  style={retryBtnStyle}
                  aria-label="Retry lookup"
                >
                  RETRY SCAN
                </button>
              </div>
            )}

            {status === "done" && data && (
              <div style={resultsStyle}>
                <div style={resultsHeaderStyle}>
                  <span style={successIconStyle}>✓</span>
                  <span style={successTextStyle}>SCAN COMPLETE</span>
                </div>

                <div style={dataGridStyle}>
                  <DataCard
                    label="IP ADDRESS"
                    value={data.ip}
                    color="#ff6b35"
                  />
                  <DataCard
                    label="LOCATION"
                    value={
                      [data.city, data.region, data.country]
                        .filter(Boolean)
                        .join(", ") || "UNKNOWN"
                    }
                    color="#00d9ff"
                  />
                  <DataCard
                    label="ISP/ORG"
                    value={data.org || "UNKNOWN"}
                    color="#ff3366"
                  />
                  <DataCard
                    label="TIMEZONE"
                    value={data.timezone || "UNKNOWN"}
                    color="#7b68ee"
                  />
                </div>

                <button
                  onClick={fetchInfo}
                  style={refreshBtnStyle}
                  aria-label="Refresh lookup"
                >
                  🔄 REFRESH DATA
                </button>
              </div>
            )}
          </div>

          <div style={footerStyle}>
            <span style={dataSourceStyle}>DATA: ipify.org & ipapi.co</span>
            <span style={warningStyle}>⚡ RATE LIMITED</span>
          </div>
        </div>

        <footer style={pageFooterStyle}>
          <div style={techStackStyle}>
            <span>REACT</span> • <span>TYPESCRIPT</span> •{" "}
            <span>REST APIs</span>
          </div>
        </footer>
      </section>
    </div>
  );
};

const DataCard: React.FC<{ label: string; value: string; color: string }> = ({
  label,
  value,
  color,
}) => (
  <div style={{ ...dataCardStyle, borderColor: color }}>
    <div style={{ ...dataLabelStyle, color }}>{label}</div>
    <div style={dataValueStyle}>{value}</div>
  </div>
);

// Styles with unique IP-themed neo-brutalist design
const containerStyle: React.CSSProperties = {
  minHeight: "100vh",
  position: "relative",
  background: "linear-gradient(135deg, #f8f8f8 0%, #e8e8e8 100%)",
  overflow: "hidden",
};

const backgroundPattern: React.CSSProperties = {
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundImage: `
    linear-gradient(45deg, rgba(0,0,0,0.02) 25%, transparent 25%),
    linear-gradient(-45deg, rgba(0,0,0,0.02) 25%, transparent 25%),
    linear-gradient(45deg, transparent 75%, rgba(0,0,0,0.02) 75%),
    linear-gradient(-45deg, transparent 75%, rgba(0,0,0,0.02) 75%)
  `,
  backgroundSize: "20px 20px",
  backgroundPosition: "0 0, 0 10px, 10px -10px, -10px 0px",
  pointerEvents: "none",
};

const sectionStyle: React.CSSProperties = {
  position: "relative",
  zIndex: 1,
  maxWidth: "900px",
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
  color: "#000",
  textTransform: "uppercase",
  letterSpacing: "-0.05em",
  margin: 0,
  textShadow: "4px 4px 0 #ff6b35",
  position: "relative",
  zIndex: 2,
};

const accentBarStyle: React.CSSProperties = {
  position: "absolute",
  bottom: "-8px",
  left: "50%",
  transform: "translateX(-50%)",
  width: "80%",
  height: "8px",
  background: "linear-gradient(90deg, #ff6b35, #00d9ff)",
  borderRadius: "0",
  boxShadow: "4px 4px 0 #000",
};

const descriptionStyle: React.CSSProperties = {
  fontSize: "clamp(0.9rem, 2.5vw, 1.1rem)",
  color: "#333",
  fontWeight: 600,
  textTransform: "uppercase",
  letterSpacing: "0.1em",
  lineHeight: 1.4,
};

const backBtnStyle: React.CSSProperties = {
  marginTop: "1.5rem",
  background: "#000",
  color: "#fff",
  border: "4px solid #000",
  padding: "0.75rem 1.5rem",
  fontSize: "0.8rem",
  fontWeight: 700,
  textTransform: "uppercase",
  letterSpacing: "0.1em",
  cursor: "pointer",
  transform: "rotate(-1deg)",
  boxShadow: "6px 6px 0 #ff6b35",
  transition: "all 0.2s ease",
};

const mainCardStyle: React.CSSProperties = {
  background: "#fff",
  border: "6px solid #000",
  borderRadius: "0",
  boxShadow: "12px 12px 0 #000",
  padding: "clamp(1.5rem, 4vw, 2.5rem)",
  transform: "rotate(0.5deg)",
  position: "relative",
  overflow: "hidden",
};

const cardHeaderStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "2rem",
  paddingBottom: "1rem",
  borderBottom: "4px solid #000",
};

const cardTitleStyle: React.CSSProperties = {
  fontSize: "clamp(1.5rem, 4vw, 2rem)",
  fontWeight: 800,
  color: "#000",
  textTransform: "uppercase",
  letterSpacing: "0.05em",
  margin: 0,
};

const statusIndicatorStyle: React.CSSProperties = {
  width: "20px",
  height: "20px",
  background: "#00ff00",
  border: "3px solid #000",
  borderRadius: "50%",
  boxShadow: "0 0 10px #00ff00",
  animation: "pulse 2s infinite",
};

const toolboxStyle: React.CSSProperties = {
  minHeight: "300px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "2rem",
  background: "#f8f8f8",
  border: "4px dashed #000",
  borderRadius: "0",
  margin: "1rem 0",
};

const idleStateStyle: React.CSSProperties = {
  textAlign: "center",
  width: "100%",
};

const scanIconStyle: React.CSSProperties = {
  fontSize: "4rem",
  marginBottom: "1rem",
  filter: "grayscale(1)",
};

const promptStyle: React.CSSProperties = {
  fontSize: "1.2rem",
  fontWeight: 700,
  color: "#333",
  textTransform: "uppercase",
  letterSpacing: "0.1em",
  marginBottom: "1.5rem",
};

const primaryBtnStyle: React.CSSProperties = {
  background: "#ff6b35",
  color: "#fff",
  border: "4px solid #000",
  padding: "1rem 2rem",
  fontSize: "1rem",
  fontWeight: 700,
  textTransform: "uppercase",
  letterSpacing: "0.1em",
  cursor: "pointer",
  borderRadius: "0",
  boxShadow: "6px 6px 0 #000",
  transition: "all 0.2s ease",
  transform: "rotate(-0.5deg)",
};

const loadingStateStyle: React.CSSProperties = {
  textAlign: "center",
  width: "100%",
};

const loadingAnimationStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "center",
  gap: "0.5rem",
  marginBottom: "1rem",
};

const loadingDotStyle: React.CSSProperties = {
  width: "12px",
  height: "12px",
  background: "#ff6b35",
  border: "2px solid #000",
  borderRadius: "50%",
  animation: "bounce 1.4s ease-in-out infinite both",
};

const loadingTextStyle: React.CSSProperties = {
  fontSize: "1rem",
  fontWeight: 700,
  color: "#333",
  textTransform: "uppercase",
  letterSpacing: "0.1em",
};

const errorStateStyle: React.CSSProperties = {
  textAlign: "center",
  width: "100%",
};

const errorIconStyle: React.CSSProperties = {
  fontSize: "3rem",
  marginBottom: "1rem",
};

const errorTextStyle: React.CSSProperties = {
  fontSize: "1rem",
  fontWeight: 600,
  color: "#ff3366",
  textTransform: "uppercase",
  marginBottom: "1.5rem",
};

const retryBtnStyle: React.CSSProperties = {
  background: "#ff3366",
  color: "#fff",
  border: "4px solid #000",
  padding: "0.75rem 1.5rem",
  fontSize: "0.9rem",
  fontWeight: 700,
  textTransform: "uppercase",
  cursor: "pointer",
  borderRadius: "0",
  boxShadow: "4px 4px 0 #000",
  transform: "rotate(0.5deg)",
};

const resultsStyle: React.CSSProperties = {
  width: "100%",
};

const resultsHeaderStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "0.5rem",
  marginBottom: "2rem",
};

const successIconStyle: React.CSSProperties = {
  fontSize: "1.5rem",
  color: "#00ff00",
  textShadow: "2px 2px 0 #000",
};

const successTextStyle: React.CSSProperties = {
  fontSize: "1.2rem",
  fontWeight: 700,
  color: "#000",
  textTransform: "uppercase",
  letterSpacing: "0.1em",
};

const dataGridStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
  gap: "1rem",
  marginBottom: "2rem",
};

const dataCardStyle: React.CSSProperties = {
  background: "#fff",
  border: "4px solid #000",
  borderRadius: "0",
  padding: "1rem",
  boxShadow: "4px 4px 0 currentColor",
  transform: "rotate(-0.3deg)",
  transition: "all 0.2s ease",
};

const dataLabelStyle: React.CSSProperties = {
  fontSize: "0.7rem",
  fontWeight: 700,
  textTransform: "uppercase",
  letterSpacing: "0.1em",
  marginBottom: "0.5rem",
  borderBottom: "2px solid currentColor",
  paddingBottom: "0.25rem",
};

const dataValueStyle: React.CSSProperties = {
  fontSize: "0.9rem",
  fontWeight: 600,
  color: "#000",
  wordBreak: "break-all",
  fontFamily: "monospace",
};

const refreshBtnStyle: React.CSSProperties = {
  background: "#00d9ff",
  color: "#000",
  border: "4px solid #000",
  padding: "0.75rem 1.5rem",
  fontSize: "0.9rem",
  fontWeight: 700,
  textTransform: "uppercase",
  cursor: "pointer",
  borderRadius: "0",
  boxShadow: "4px 4px 0 #000",
  display: "block",
  margin: "0 auto",
  transform: "rotate(0.2deg)",
};

const footerStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginTop: "2rem",
  paddingTop: "1rem",
  borderTop: "4px solid #000",
  fontSize: "0.7rem",
  fontWeight: 600,
  textTransform: "uppercase",
};

const dataSourceStyle: React.CSSProperties = {
  color: "#666",
  letterSpacing: "0.1em",
};

const warningStyle: React.CSSProperties = {
  color: "#ff3366",
  fontWeight: 700,
  letterSpacing: "0.1em",
};

const pageFooterStyle: React.CSSProperties = {
  textAlign: "center",
  marginTop: "3rem",
};

const techStackStyle: React.CSSProperties = {
  fontSize: "0.8rem",
  fontWeight: 600,
  color: "#666",
  textTransform: "uppercase",
  letterSpacing: "0.15em",
};

export default IpAddressLookup;
