import React from "react";

/**
 * InternetSpeedTest
 * ---------------------------------------------------------
 * Pure client-side approximation of download & upload speeds.
 *
 * Download test: Fetches a test file (default 1MB) from a public
 * high‑bandwidth file host with cache busting and streams bytes to
 * measure throughput.
 * Upload test: POSTs a random blob (default 256KB) to httpbin.org
 * and measures elapsed time until response.
 *
 * Notes / Limitations:
 * - Results are approximate (TCP slow start, buffering, browser overhead).
 * - Using third-party endpoints (hetzner.de & httpbin.org) – suitable for
 *   demo; replace with controlled endpoints for production consistency.
 * - Large tests consume user bandwidth; defaults are conservative.
 */

interface Result {
  downloadMbps?: number;
  uploadMbps?: number;
  latencyMs?: number;
  error?: string;
}

// Added phase + progress + advanced toggle
export const InternetSpeedTest: React.FC<{ onBack?: () => void }> = ({
  onBack,
}) => {
  const [status, setStatus] = React.useState<
    "idle" | "running" | "done" | "error"
  >("idle");
  const [phase, setPhase] = React.useState<
    "idle" | "latency" | "download" | "upload" | "finalizing" | "done"
  >("idle");
  const [progress, setProgress] = React.useState(0); // 0..1 for current phase (download only)
  const [showAdvanced, setShowAdvanced] = React.useState(false);
  const [result, setResult] = React.useState<Result | null>(null);
  const [downloadUrl, setDownloadUrl] = React.useState(
    "https://httpbin.org/bytes/1000000" // switched to httpbin bytes (CORS-friendly)
  );
  const [downloadSizeBytes, setDownloadSizeBytes] = React.useState(1_000_000); // approximate known size (1MB)
  const [uploadSizeBytes, setUploadSizeBytes] = React.useState(256 * 1024); // 256KB
  const [log, setLog] = React.useState<string[]>([]);

  const appendLog = (m: string) =>
    setLog((l) => [...l, `[${new Date().toLocaleTimeString()}] ${m}`]);

  const runTest = async () => {
    setStatus("running");
    setPhase("latency");
    setProgress(0);
    setResult(null);
    setLog([]);
    try {
      const partial: Result = {};

      // Quick connectivity preflight to httpbin (often reliable)
      try {
        await fetch("https://httpbin.org/status/204?cache=" + Math.random(), {
          cache: "no-store",
          method: "GET",
        });
      } catch {
        appendLog("Preflight connectivity check failed (httpbin).");
      }

      // Latency
      appendLog("Measuring latency...");
      const t0 = performance.now();
      await fetch("https://httpbin.org/get?cache=" + Math.random(), {
        cache: "no-store",
      });
      partial.latencyMs = performance.now() - t0;
      appendLog(`Latency ~${partial.latencyMs.toFixed(1)} ms`);

      // Download test with fallback list
      setPhase("download");
      appendLog("Starting download test...");
      const candidates: {
        url: string;
        size: number;
        label: string;
        inMemory?: boolean;
      }[] = [
        {
          url: `https://httpbin.org/bytes/${downloadSizeBytes}?seed=${Math.random()}`,
          size: downloadSizeBytes,
          label: "httpbin bytes",
        },
        {
          url: `/speedtest-256k.bin?c=${Math.random()}`,
          size: 256 * 1024,
          label: "local static 256KB",
        },
        {
          url: `https://speed.hetzner.de/1MB.bin?v=${Math.random()}`,
          size: 1_000_000,
          label: "hetzner.de 1MB",
        },
      ];

      let downloadMbps = 0;
      for (const candidate of candidates) {
        try {
          appendLog(`Trying ${candidate.label}...`);
          const t1 = performance.now();
          const resp = await fetch(candidate.url, { cache: "no-store" });
          if (!resp.ok) throw new Error(`HTTP ${resp.status}`);

          const reader = resp.body?.getReader();
          if (!reader) throw new Error("No body reader");

          let bytesReceived = 0;
          // eslint-disable-next-line no-constant-condition
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            bytesReceived += value?.length || 0;
            setProgress(Math.min(bytesReceived / candidate.size, 1));
          }
          const elapsed = (performance.now() - t1) / 1000;
          downloadMbps = (bytesReceived * 8) / (1_000_000 * elapsed);
          appendLog(
            `Download: ${bytesReceived} bytes in ${elapsed.toFixed(
              2
            )}s = ${downloadMbps.toFixed(2)} Mbps`
          );
          break;
        } catch (e: any) {
          appendLog(`${candidate.label} failed: ${e?.message || e}`);
        }
      }
      partial.downloadMbps = downloadMbps || undefined;

      // Upload test
      setPhase("upload");
      setProgress(0);
      appendLog("Starting upload test...");
      try {
        const blob = new Blob([crypto.getRandomValues(new Uint8Array(uploadSizeBytes))]);
        const t2 = performance.now();
        const uploadResp = await fetch("https://httpbin.org/post", {
          method: "POST",
          body: blob,
          cache: "no-store",
        });
        if (!uploadResp.ok) throw new Error(`Upload HTTP ${uploadResp.status}`);
        const elapsed = (performance.now() - t2) / 1000;
        partial.uploadMbps = (uploadSizeBytes * 8) / (1_000_000 * elapsed);
        appendLog(
          `Upload: ${uploadSizeBytes} bytes in ${elapsed.toFixed(
            2
          )}s = ${partial.uploadMbps.toFixed(2)} Mbps`
        );
      } catch (e: any) {
        appendLog(`Upload failed: ${e?.message || e}`);
      }

      setPhase("finalizing");
      appendLog("Test complete.");
      setResult(partial);
      setStatus("done");
      setPhase("done");
    } catch (e: any) {
      appendLog(`Error: ${e?.message || e}`);
      setResult({ error: e?.message || "Test failed" });
      setStatus("error");
      setPhase("done");
    }
  };

  return (
    <div style={containerStyle}>
      <div style={speedLinesStyle} />
      <section style={sectionStyle}>
        <header style={headerStyle}>
          <div style={titleContainerStyle}>
            <h1 style={titleStyle}>SPEED METER</h1>
            <div style={gaugeIconStyle}>📡</div>
          </div>
          <p style={descriptionStyle}>
            ⚡ NETWORK PERFORMANCE ANALYZER ⚡
            <br />
            BANDWIDTH • LATENCY • THROUGHPUT
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

        <div style={dashboardStyle}>
          {/* Speed Gauges */}
          <div style={gaugesContainerStyle}>
            <SpeedGauge
              label="DOWNLOAD"
              value={result?.downloadMbps || 0}
              unit="MBPS"
              color="#00d9ff"
              active={phase === "download"}
              progress={phase === "download" ? progress : 0}
            />
            <SpeedGauge
              label="UPLOAD"
              value={result?.uploadMbps || 0}
              unit="MBPS"
              color="#ff6b35"
              active={phase === "upload"}
              progress={phase === "upload" ? progress : 0}
            />
            <SpeedGauge
              label="LATENCY"
              value={result?.latencyMs || 0}
              unit="MS"
              color="#ff3366"
              active={phase === "latency"}
              progress={0}
            />
          </div>

          {/* Control Center */}
          <div style={controlCenterStyle}>
            <div style={controlHeaderStyle}>
              <h2 style={controlTitleStyle}>MISSION CONTROL</h2>
              <div style={statusLightStyle(status)} />
            </div>

            <div style={testControlsStyle}>
              <button
                onClick={runTest}
                disabled={status === "running"}
                style={runBtnStyle(status === "running")}
              >
                {status === "running" ? "TESTING..." : "INITIATE TEST"}
              </button>

              <button
                onClick={() => setShowAdvanced(!showAdvanced)}
                style={advancedBtnStyle}
              >
                {showAdvanced ? "HIDE" : "SHOW"} ADVANCED
              </button>
            </div>

            {/* Phase Indicator */}
            {status === "running" && (
              <div style={phaseIndicatorStyle}>
                <div style={phaseBarStyle}>
                  <div 
                    style={{
                      ...phaseProgressStyle,
                      width: `${getPhaseProgress(phase, progress)}%`,
                    }}
                  />
                </div>
                <span style={phaseTextStyle}>
                  {getPhaseLabel(phase).toUpperCase()}
                </span>
              </div>
            )}

            {/* Advanced Settings */}
            {showAdvanced && (
              <div style={advancedPanelStyle}>
                <div style={settingGroupStyle}>
                  <label style={settingLabelStyle}>DOWNLOAD SIZE (BYTES)</label>
                  <input
                    type="number"
                    value={downloadSizeBytes}
                    onChange={(e) => setDownloadSizeBytes(Number(e.target.value))}
                    min="100000"
                    max="10000000"
                    style={numberInputStyle}
                  />
                </div>
                <div style={settingGroupStyle}>
                  <label style={settingLabelStyle}>UPLOAD SIZE (BYTES)</label>
                  <input
                    type="number"
                    value={uploadSizeBytes}
                    onChange={(e) => setUploadSizeBytes(Number(e.target.value))}
                    min="50000"
                    max="5000000"
                    style={numberInputStyle}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Live Log Terminal */}
          <div style={terminalStyle}>
            <div style={terminalHeaderStyle}>
              <span style={terminalTitleStyle}>TELEMETRY LOG</span>
              <div style={terminalDotsStyle}>
                <div style={dotStyle} />
                <div style={{...dotStyle, background: '#ff3366'}} />
                <div style={{...dotStyle, background: '#ffff00'}} />
              </div>
            </div>
            <div style={terminalBodyStyle}>
              {log.length === 0 ? (
                <div style={terminalPlaceholderStyle}>
                  &gt; AWAITING TELEMETRY DATA...
                </div>
              ) : (
                log.map((line, i) => (
                  <div key={i} style={logLineStyle}>
                    &gt; {line}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        <footer style={pageFooterStyle}>
          <div style={footerContentStyle}>
            <span style={warningTextStyle}>⚠️ APPROXIMATE RESULTS</span>
            <span style={techStackStyle}>FETCH API • STREAMS • PERFORMANCE</span>
          </div>
        </footer>
      </section>
    </div>
  );
};

const SpeedGauge: React.FC<{
  label: string;
  value: number;
  unit: string;
  color: string;
  active: boolean;
  progress: number;
}> = ({ label, value, unit, color, active, progress }) => (
  <div style={{...gaugeStyle, borderColor: color, ...(active ? activeGaugeStyle : {})}}>
    <div style={gaugeLabelStyle}>
      {label}
    </div>
    <div style={gaugeValueStyle}>
      {value > 0 ? value.toFixed(1) : "--"}
    </div>
    <div style={gaugeUnitStyle}>
      {unit}
    </div>
    {active && (
      <div style={gaugeProgressStyle}>
        <div 
          style={{
            ...gaugeProgressBarStyle,
            width: `${progress * 100}%`,
            background: color,
          }}
        />
      </div>
    )}
    <div style={{...gaugeGlowStyle, boxShadow: `0 0 20px ${color}`}} />
  </div>
);

// Helper functions
function getPhaseProgress(phase: string, progress: number): number {
  switch (phase) {
    case "latency": return 20;
    case "download": return 20 + (progress * 40);
    case "upload": return 60 + (progress * 30);
    case "finalizing": return 95;
    case "done": return 100;
    default: return 0;
  }
}

function getPhaseLabel(phase: string): string {
  switch (phase) {
    case "latency": return "Measuring Latency";
    case "download": return "Download Test";
    case "upload": return "Upload Test";
    case "finalizing": return "Finalizing";
    case "done": return "Complete";
    default: return "Idle";
  }
}

// Speed-themed neo-brutalist styles
const containerStyle: React.CSSProperties = {
  minHeight: '100vh',
  position: 'relative',
  background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
  overflow: 'hidden',
};

const speedLinesStyle: React.CSSProperties = {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundImage: `
    repeating-linear-gradient(
      45deg,
      transparent,
      transparent 2px,
      rgba(0, 217, 255, 0.1) 3px,
      rgba(0, 217, 255, 0.1) 4px
    ),
    repeating-linear-gradient(
      -45deg,
      transparent,
      transparent 2px,
      rgba(255, 107, 53, 0.1) 3px,
      rgba(255, 107, 53, 0.1) 4px
    )
  `,
  animation: 'slideIn 20s linear infinite',
  pointerEvents: 'none',
};

const sectionStyle: React.CSSProperties = {
  position: 'relative',
  zIndex: 1,
  maxWidth: '1200px',
  margin: '0 auto',
  padding: 'clamp(1rem, 4vw, 2rem)',
  display: 'grid',
  gap: 'clamp(1.5rem, 4vw, 2.5rem)',
};

const headerStyle: React.CSSProperties = {
  textAlign: 'center',
  marginBottom: '2rem',
};

const titleContainerStyle: React.CSSProperties = {
  position: 'relative',
  display: 'inline-block',
  marginBottom: '1rem',
};

const titleStyle: React.CSSProperties = {
  fontSize: 'clamp(2.5rem, 8vw, 4rem)',
  fontWeight: 900,
  color: '#00d9ff',
  textTransform: 'uppercase',
  letterSpacing: '0.1em',
  margin: 0,
  textShadow: '0 0 30px #00d9ff, 6px 6px 0 #000',
  fontFamily: 'monospace',
};

const gaugeIconStyle: React.CSSProperties = {
  position: 'absolute',
  top: '-15px',
  right: '-40px',
  fontSize: '3rem',
  transform: 'rotate(15deg)',
  animation: 'pulse 3s ease-in-out infinite',
};

const descriptionStyle: React.CSSProperties = {
  fontSize: 'clamp(0.9rem, 2.5vw, 1.1rem)',
  color: '#fff',
  fontWeight: 700,
  textTransform: 'uppercase',
  letterSpacing: '0.1em',
  lineHeight: 1.4,
  textShadow: '0 0 15px rgba(255, 255, 255, 0.5)',
};

const backBtnStyle: React.CSSProperties = {
  marginTop: '1.5rem',
  background: '#000',
  color: '#00d9ff',
  border: '3px solid #00d9ff',
  padding: '0.75rem 1.5rem',
  fontSize: '0.8rem',
  fontWeight: 700,
  textTransform: 'uppercase',
  letterSpacing: '0.1em',
  cursor: 'pointer',
  borderRadius: '0',
  boxShadow: '0 0 15px #00d9ff, 4px 4px 0 #00d9ff',
  transition: 'all 0.2s ease',
};

const dashboardStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: '1fr 300px',
  gridTemplateRows: 'auto 1fr',
  gap: '2rem',
  minHeight: '600px',
};

const gaugesContainerStyle: React.CSSProperties = {
  gridColumn: '1 / 3',
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
  gap: '1.5rem',
  marginBottom: '1rem',
};

const gaugeStyle: React.CSSProperties = {
  background: 'rgba(0, 0, 0, 0.8)',
  border: '4px solid',
  borderRadius: '0',
  padding: '2rem 1rem',
  textAlign: 'center',
  position: 'relative',
  overflow: 'hidden',
  transition: 'all 0.3s ease',
};

const activeGaugeStyle: React.CSSProperties = {
  transform: 'scale(1.05)',
  boxShadow: '0 0 30px currentColor',
};

const gaugeLabelStyle: React.CSSProperties = {
  fontSize: '0.8rem',
  fontWeight: 700,
  color: '#fff',
  textTransform: 'uppercase',
  letterSpacing: '0.1em',
  marginBottom: '0.5rem',
  fontFamily: 'monospace',
};

const gaugeValueStyle: React.CSSProperties = {
  fontSize: '2.5rem',
  fontWeight: 900,
  color: '#fff',
  fontFamily: 'monospace',
  textShadow: '0 0 10px currentColor',
  marginBottom: '0.25rem',
};

const gaugeUnitStyle: React.CSSProperties = {
  fontSize: '0.7rem',
  fontWeight: 600,
  color: '#ccc',
  textTransform: 'uppercase',
  letterSpacing: '0.1em',
  fontFamily: 'monospace',
};

const gaugeProgressStyle: React.CSSProperties = {
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  height: '4px',
  background: 'rgba(255, 255, 255, 0.1)',
};

const gaugeProgressBarStyle: React.CSSProperties = {
  height: '100%',
  transition: 'width 0.3s ease',
};

const gaugeGlowStyle: React.CSSProperties = {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  pointerEvents: 'none',
  borderRadius: '0',
};

const controlCenterStyle: React.CSSProperties = {
  gridColumn: '2',
  gridRow: '2',
  background: 'rgba(0, 0, 0, 0.9)',
  border: '4px solid #ff6b35',
  borderRadius: '0',
  padding: '1.5rem',
  boxShadow: '0 0 25px rgba(255, 107, 53, 0.3)',
};

const controlHeaderStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '1.5rem',
  paddingBottom: '1rem',
  borderBottom: '2px solid #ff6b35',
};

const controlTitleStyle: React.CSSProperties = {
  fontSize: '1rem',
  fontWeight: 800,
  color: '#ff6b35',
  textTransform: 'uppercase',
  letterSpacing: '0.1em',
  margin: 0,
  fontFamily: 'monospace',
};

const statusLightStyle = (status: string): React.CSSProperties => ({
  width: '15px',
  height: '15px',
  borderRadius: '50%',
  border: '2px solid #000',
  background: status === 'running' ? '#ffff00' : 
             status === 'done' ? '#00ff00' : 
             status === 'error' ? '#ff0000' : '#666',
  boxShadow: `0 0 10px ${
    status === 'running' ? '#ffff00' : 
    status === 'done' ? '#00ff00' : 
    status === 'error' ? '#ff0000' : '#666'
  }`,
  animation: status === 'running' ? 'pulse 1s infinite' : 'none',
});

const testControlsStyle: React.CSSProperties = {
  display: 'grid',
  gap: '1rem',
  marginBottom: '1.5rem',
};

const runBtnStyle = (disabled: boolean): React.CSSProperties => ({
  background: disabled ? '#333' : '#ff6b35',
  color: disabled ? '#666' : '#fff',
  border: '3px solid #000',
  padding: '1rem',
  fontSize: '0.9rem',
  fontWeight: 700,
  textTransform: 'uppercase',
  cursor: disabled ? 'not-allowed' : 'pointer',
  borderRadius: '0',
  boxShadow: '4px 4px 0 #000',
  fontFamily: 'monospace',
  letterSpacing: '0.1em',
  transition: 'all 0.2s ease',
  opacity: disabled ? 0.6 : 1,
});

const advancedBtnStyle: React.CSSProperties = {
  background: '#000',
  color: '#00d9ff',
  border: '2px solid #00d9ff',
  padding: '0.5rem',
  fontSize: '0.7rem',
  fontWeight: 600,
  textTransform: 'uppercase',
  cursor: 'pointer',
  borderRadius: '0',
  fontFamily: 'monospace',
  letterSpacing: '0.1em',
};

const phaseIndicatorStyle: React.CSSProperties = {
  marginBottom: '1rem',
  padding: '1rem',
  background: 'rgba(255, 255, 255, 0.05)',
  border: '2px solid #333',
};

const phaseBarStyle: React.CSSProperties = {
  width: '100%',
  height: '8px',
  background: '#333',
  border: '2px solid #000',
  marginBottom: '0.5rem',
  overflow: 'hidden',
};

const phaseProgressStyle: React.CSSProperties = {
  height: '100%',
  background: 'linear-gradient(90deg, #00d9ff, #ff6b35)',
  transition: 'width 0.3s ease',
};

const phaseTextStyle: React.CSSProperties = {
  fontSize: '0.7rem',
  fontWeight: 700,
  color: '#fff',
  textTransform: 'uppercase',
  letterSpacing: '0.1em',
  fontFamily: 'monospace',
};

const advancedPanelStyle: React.CSSProperties = {
  padding: '1rem',
  background: 'rgba(0, 0, 0, 0.5)',
  border: '2px dashed #666',
  marginTop: '1rem',
};

const settingGroupStyle: React.CSSProperties = {
  marginBottom: '1rem',
};

const settingLabelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: '0.7rem',
  fontWeight: 700,
  color: '#ccc',
  textTransform: 'uppercase',
  letterSpacing: '0.1em',
  marginBottom: '0.5rem',
  fontFamily: 'monospace',
};

const numberInputStyle: React.CSSProperties = {
  width: '100%',
  background: '#000',
  color: '#00d9ff',
  border: '2px solid #333',
  padding: '0.5rem',
  fontSize: '0.8rem',
  fontFamily: 'monospace',
  fontWeight: 600,
};

const terminalStyle: React.CSSProperties = {
  gridColumn: '1',
  gridRow: '2',
  background: '#000',
  border: '4px solid #00ff00',
  borderRadius: '0',
  boxShadow: '0 0 25px rgba(0, 255, 0, 0.3)',
  overflow: 'hidden',
};

const terminalHeaderStyle: React.CSSProperties = {
  background: '#00ff00',
  color: '#000',
  padding: '0.75rem 1rem',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
};

const terminalTitleStyle: React.CSSProperties = {
  fontSize: '0.8rem',
  fontWeight: 700,
  textTransform: 'uppercase',
  letterSpacing: '0.1em',
  fontFamily: 'monospace',
};

const terminalDotsStyle: React.CSSProperties = {
  display: 'flex',
  gap: '0.5rem',
};

const dotStyle: React.CSSProperties = {
  width: '10px',
  height: '10px',
  borderRadius: '50%',
  background: '#00ff00',
  border: '1px solid #000',
};

const terminalBodyStyle: React.CSSProperties = {
  padding: '1rem',
  height: '300px',
  overflowY: 'auto',
  fontSize: '0.8rem',
  fontFamily: 'monospace',
  lineHeight: 1.4,
};

const terminalPlaceholderStyle: React.CSSProperties = {
  color: '#666',
  fontStyle: 'italic',
};

const logLineStyle: React.CSSProperties = {
  color: '#00ff00',
  marginBottom: '0.25rem',
  wordBreak: 'break-all',
};

const pageFooterStyle: React.CSSProperties = {
  textAlign: 'center',
  marginTop: '3rem',
};

const footerContentStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  flexWrap: 'wrap',
  gap: '1rem',
  padding: '1rem',
  background: 'rgba(0, 0, 0, 0.8)',
  border: '3px solid #333',
  fontSize: '0.7rem',
  fontFamily: 'monospace',
};

const warningTextStyle: React.CSSProperties = {
  color: '#ff3366',
  fontWeight: 700,
  textTransform: 'uppercase',
  letterSpacing: '0.1em',
  textShadow: '0 0 10px #ff3366',
};

const techStackStyle: React.CSSProperties = {
  color: '#666',
  fontWeight: 600,
  textTransform: 'uppercase',
  letterSpacing: '0.1em',
};

export default InternetSpeedTest;
