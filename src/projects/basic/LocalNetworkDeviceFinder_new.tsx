import React from "react";

/**
 * Neo-Brutalist LocalNetworkDeviceFinder - Network Reconnaissance Tool
 * Cyber warfare aesthetic with network mapping theme
 */

interface ParsedDevice {
  ip: string;
  mac: string;
  vendor?: string;
  source: string;
}

// Enhanced OUI vendor database
const OUI_MAP: Record<string, string> = {
  "dc:a6:32": "Ubiquiti_Networks",
  "f4:f5:e8": "TP-Link_Technologies",
  "b8:27:eb": "Raspberry_Pi_Foundation",
  "00:1a:2b": "Cisco_Systems",
  "3c:5a:b4": "Google_Inc",
  "d8:8d:5c": "Amazon_Technologies",
  "00:16:3e": "Xensource_Inc",
  "52:54:00": "QEMU_Virtual_NIC",
  "00:0c:29": "VMware_Inc",
  "08:00:27": "PCS_Systemtechnik",
  "00:50:56": "VMware_ESX_Server",
  "00:1c:42": "Parallels_Inc",
};

export const LocalNetworkDeviceFinder: React.FC<{ onBack?: () => void }> = ({
  onBack,
}) => {
  const [inputText, setInputText] = React.useState("");
  const [devices, setDevices] = React.useState<ParsedDevice[]>([]);
  const [scanMode, setScanMode] = React.useState<"arp" | "dhcp" | "manual">(
    "arp"
  );
  const [isScanning, setIsScanning] = React.useState(false);

  const parseNetworkData = () => {
    setIsScanning(true);

    // Simulate scanning delay for dramatic effect
    setTimeout(() => {
      const parsed: ParsedDevice[] = [];
      const lines = inputText.split("\n").filter((line) => line.trim());

      for (const line of lines) {
        const device = parseLineForDevice(line);
        if (device) {
          parsed.push(device);
        }
      }

      setDevices(parsed);
      setIsScanning(false);
    }, 1500);
  };

  const parseLineForDevice = (line: string): ParsedDevice | null => {
    // ARP table format: IP_ADDRESS HW_TYPE HW_ADDRESS FLAGS MASK IFACE
    const arpMatch = line.match(
      /(\d+\.\d+\.\d+\.\d+).*?([a-fA-F0-9]{2}[:-]){5}[a-fA-F0-9]{2}/
    );
    if (arpMatch) {
      const ip = arpMatch[1];
      const macMatch = line.match(/([a-fA-F0-9]{2}[:-]){5}[a-fA-F0-9]{2}/);
      if (macMatch) {
        const mac = macMatch[0].toLowerCase();
        return {
          ip,
          mac,
          vendor: getVendorFromMac(mac),
          source: "ARP_TABLE",
        };
      }
    }

    // DHCP lease format variations
    const dhcpMatch = line.match(
      /(\d+\.\d+\.\d+\.\d+).*?([a-fA-F0-9]{2}[:-]){5}[a-fA-F0-9]{2}/
    );
    if (dhcpMatch) {
      const ip = dhcpMatch[1];
      const macMatch = line.match(/([a-fA-F0-9]{2}[:-]){5}[a-fA-F0-9]{2}/);
      if (macMatch) {
        const mac = macMatch[0].toLowerCase();
        return {
          ip,
          mac,
          vendor: getVendorFromMac(mac),
          source: "DHCP_LEASE",
        };
      }
    }

    // Manual IP:MAC format
    const manualMatch = line.match(
      /(\d+\.\d+\.\d+\.\d+).*?([a-fA-F0-9]{2}[:-]){5}[a-fA-F0-9]{2}/
    );
    if (manualMatch) {
      const ip = manualMatch[1];
      const macMatch = line.match(/([a-fA-F0-9]{2}[:-]){5}[a-fA-F0-9]{2}/);
      if (macMatch) {
        const mac = macMatch[0].toLowerCase();
        return {
          ip,
          mac,
          vendor: getVendorFromMac(mac),
          source: "MANUAL_ENTRY",
        };
      }
    }

    return null;
  };

  const getVendorFromMac = (mac: string): string => {
    const prefix = mac.substring(0, 8).replace(/[:-]/g, ":");
    return OUI_MAP[prefix] || "UNKNOWN_VENDOR";
  };

  const clearData = () => {
    setInputText("");
    setDevices([]);
  };

  const getExampleData = () => {
    const examples = {
      arp: `192.168.1.1     ether   aa:bb:cc:dd:ee:ff   C                     eth0
192.168.1.10    ether   b8:27:eb:12:34:56   C                     eth0
192.168.1.15    ether   f4:f5:e8:98:76:54   C                     eth0
192.168.1.20    ether   dc:a6:32:11:22:33   C                     eth0`,
      dhcp: `192.168.1.100 aa:bb:cc:dd:ee:ff LAPTOP-001 lease-time
192.168.1.101 b8:27:eb:12:34:56 RaspberryPi active
192.168.1.102 f4:f5:e8:98:76:54 TP-Link_Router active`,
      manual: `192.168.1.1 - aa:bb:cc:dd:ee:ff (Gateway)
192.168.1.10 - b8:27:eb:12:34:56 (Pi)
192.168.1.15 - f4:f5:e8:98:76:54 (Router)`,
    };
    setInputText(examples[scanMode]);
  };

  return (
    <div style={containerStyle}>
      {/* Animated Background */}
      <div style={backgroundStyle} />

      {/* Terminal Header */}
      <header style={headerStyle}>
        <div style={terminalBarStyle}>
          <div style={terminalDotsStyle}>
            <span style={{ ...terminalDotStyle, background: "#ff5f56" }} />
            <span style={{ ...terminalDotStyle, background: "#ffbd2e" }} />
            <span style={{ ...terminalDotStyle, background: "#27ca3f" }} />
          </div>
          <div style={terminalTitleStyle}>NETWORK_RECON.exe</div>
        </div>

        <div style={titleSectionStyle}>
          <h1 style={mainTitleStyle}>
            <span style={primaryTextStyle}>LOCAL</span>{" "}
            <span style={secondaryTextStyle}>NETWORK</span>{" "}
            <span style={primaryTextStyle}>RECONNAISSANCE</span>
          </h1>
          <p style={subtitleStyle}>
            {">"} PASSIVE_ENUMERATION | DEVICE_DISCOVERY | OUI_ANALYSIS
          </p>

          {onBack && (
            <button onClick={onBack} style={backButtonStyle}>
              &lt; RETURN_TO_ARSENAL
            </button>
          )}
        </div>
      </header>

      {/* Scan Mode Selection */}
      <div style={scanModeStyle}>
        <h3 style={sectionTitleStyle}>RECONNAISSANCE_MODE</h3>
        <div style={modeButtonsStyle}>
          {[
            {
              id: "arp",
              label: "ARP_TABLE",
              icon: "🔍",
              desc: "Parse ARP cache data",
            },
            {
              id: "dhcp",
              label: "DHCP_LEASES",
              icon: "📡",
              desc: "Parse DHCP lease table",
            },
            {
              id: "manual",
              label: "MANUAL_INTEL",
              icon: "📝",
              desc: "Custom IP:MAC pairs",
            },
          ].map(({ id, label, icon, desc }) => (
            <button
              key={id}
              onClick={() => setScanMode(id as any)}
              style={{
                ...modeButtonStyle,
                ...(scanMode === id ? activeModeButtonStyle : {}),
              }}
            >
              <span style={modeIconStyle}>{icon}</span>
              <div style={modeInfoStyle}>
                <span style={modeLabelStyle}>{label}</span>
                <span style={modeDescStyle}>{desc}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Data Input Panel */}
      <div style={inputPanelStyle}>
        <div style={panelHeaderStyle}>
          <span style={panelIconStyle}>📥</span>
          <h3 style={panelTitleStyle}>DATA_INGESTION</h3>
          <button onClick={getExampleData} style={exampleButtonStyle}>
            LOAD_SAMPLE_DATA
          </button>
        </div>

        <div style={inputAreaStyle}>
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={`Paste your ${scanMode.toUpperCase()} data here...`}
            style={textareaStyle}
          />

          <div style={inputControlsStyle}>
            <button
              onClick={parseNetworkData}
              disabled={!inputText.trim() || isScanning}
              style={{
                ...parseButtonStyle,
                ...(isScanning ? scanningButtonStyle : {}),
              }}
            >
              {isScanning ? "SCANNING_NETWORK..." : "INITIATE_SCAN"}
            </button>
            <button onClick={clearData} style={clearButtonStyle}>
              CLEAR_INTEL
            </button>
          </div>
        </div>
      </div>

      {/* Scanning Animation */}
      {isScanning && (
        <div style={scanningOverlayStyle}>
          <div style={scanningContentStyle}>
            <div style={scanningIconStyle}>🔍</div>
            <div style={scanningTextStyle}>ANALYZING NETWORK TOPOLOGY...</div>
            <div style={scanningProgressStyle}>
              <div style={progressBarStyle} />
            </div>
          </div>
        </div>
      )}

      {/* Results Panel */}
      {devices.length > 0 && (
        <div style={resultsStyle}>
          <div style={resultsHeaderStyle}>
            <span style={panelIconStyle}>🎯</span>
            <h3 style={panelTitleStyle}>DISCOVERED_ASSETS</h3>
            <div style={deviceCountStyle}>
              {devices.length} DEVICES_IDENTIFIED
            </div>
          </div>

          <div style={devicesGridStyle}>
            {devices.map((device, index) => (
              <DeviceCard key={index} device={device} index={index} />
            ))}
          </div>
        </div>
      )}

      {/* Intelligence Brief */}
      <div style={intelBriefStyle}>
        <div style={panelHeaderStyle}>
          <span style={panelIconStyle}>📊</span>
          <h3 style={panelTitleStyle}>INTELLIGENCE_BRIEF</h3>
        </div>

        <div style={briefContentStyle}>
          <div style={briefSectionStyle}>
            <h4 style={briefTitleStyle}>OPERATIONAL_SECURITY</h4>
            <ul style={briefListStyle}>
              <li>This tool performs PASSIVE enumeration only</li>
              <li>No network packets are transmitted</li>
              <li>Data parsing occurs client-side only</li>
              <li>
                Only use on networks you own or have permission to analyze
              </li>
            </ul>
          </div>

          <div style={briefSectionStyle}>
            <h4 style={briefTitleStyle}>DATA_SOURCES</h4>
            <div style={sourcesGridStyle}>
              <div style={sourceItemStyle}>
                <span style={sourceIconStyle}>🔍</span>
                <div>
                  <strong>ARP_CACHE:</strong> arp -a (Windows) | ip neigh
                  (Linux)
                </div>
              </div>
              <div style={sourceItemStyle}>
                <span style={sourceIconStyle}>📡</span>
                <div>
                  <strong>DHCP_LEASES:</strong> Router admin panel exports
                </div>
              </div>
              <div style={sourceItemStyle}>
                <span style={sourceIconStyle}>📝</span>
                <div>
                  <strong>MANUAL_INTEL:</strong> Custom IP:MAC pair lists
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Device Card Component
const DeviceCard: React.FC<{ device: ParsedDevice; index: number }> = ({
  device,
  index,
}) => (
  <div
    style={{
      ...deviceCardStyle,
      animationDelay: `${index * 0.1}s`,
    }}
  >
    <div style={deviceHeaderStyle}>
      <span style={deviceNumberStyle}>
        {String(index + 1).padStart(2, "0")}
      </span>
      <span style={deviceTypeStyle}>NETWORK_NODE</span>
      <span
        style={{
          ...sourceTagStyle,
          background: getSourceColor(device.source),
        }}
      >
        {device.source}
      </span>
    </div>

    <div style={deviceInfoStyle}>
      <div style={deviceFieldStyle}>
        <span style={fieldLabelStyle}>IP_ADDRESS:</span>
        <span style={fieldValueStyle}>{device.ip}</span>
      </div>
      <div style={deviceFieldStyle}>
        <span style={fieldLabelStyle}>MAC_ADDRESS:</span>
        <span style={fieldValueStyle}>{device.mac.toUpperCase()}</span>
      </div>
      <div style={deviceFieldStyle}>
        <span style={fieldLabelStyle}>VENDOR:</span>
        <span
          style={{
            ...fieldValueStyle,
            color: device.vendor === "UNKNOWN_VENDOR" ? "#ff6666" : "#44ff44",
          }}
        >
          {device.vendor}
        </span>
      </div>
    </div>

    <div style={deviceStatusStyle}>
      <div style={statusIndicatorStyle} />
      <span>ACTIVE_TARGET</span>
    </div>
  </div>
);

// Helper Functions
const getSourceColor = (source: string) => {
  switch (source) {
    case "ARP_TABLE":
      return "#44ff44";
    case "DHCP_LEASE":
      return "#4444ff";
    case "MANUAL_ENTRY":
      return "#ffff44";
    default:
      return "#ff4444";
  }
};

// Styles
const containerStyle: React.CSSProperties = {
  minHeight: "100vh",
  background: "linear-gradient(135deg, #0a1a0a 0%, #1a0a1a 100%)",
  color: "#44ff44",
  fontFamily: "'Courier New', monospace",
  fontSize: "14px",
  lineHeight: 1.4,
  position: "relative",
  overflow: "hidden",
  padding: "20px",
};

const backgroundStyle: React.CSSProperties = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundImage: `
    radial-gradient(circle at 25% 25%, rgba(68, 255, 68, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 75% 75%, rgba(68, 255, 68, 0.1) 0%, transparent 50%),
    linear-gradient(45deg, transparent 45%, rgba(68, 255, 68, 0.05) 50%, transparent 55%)
  `,
  animation: "networkPulse 3s ease-in-out infinite",
};

const headerStyle: React.CSSProperties = {
  position: "relative",
  zIndex: 1,
  maxWidth: "1200px",
  margin: "0 auto 20px",
};

const terminalBarStyle: React.CSSProperties = {
  background: "#222",
  border: "1px solid #44ff44",
  borderRadius: "8px 8px 0 0",
  padding: "8px 16px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
};

const terminalDotsStyle: React.CSSProperties = {
  display: "flex",
  gap: "6px",
};

const terminalDotStyle: React.CSSProperties = {
  width: "12px",
  height: "12px",
  borderRadius: "50%",
};

const terminalTitleStyle: React.CSSProperties = {
  color: "#44ff44",
  fontSize: "12px",
  fontWeight: "bold",
  letterSpacing: "1px",
};

const titleSectionStyle: React.CSSProperties = {
  background: "#111",
  border: "1px solid #44ff44",
  borderTop: "none",
  borderRadius: "0 0 8px 8px",
  padding: "24px",
  textAlign: "center",
};

const mainTitleStyle: React.CSSProperties = {
  margin: 0,
  fontSize: clamp(24, 5, 48),
  fontWeight: "bold",
  letterSpacing: "2px",
  textShadow: "0 0 10px #44ff44",
};

const primaryTextStyle: React.CSSProperties = {
  color: "#44ff44",
};

const secondaryTextStyle: React.CSSProperties = {
  color: "#ffffff",
  animation: "glitch 2s infinite",
};

const subtitleStyle: React.CSSProperties = {
  margin: "16px 0",
  color: "#66ff66",
  fontSize: "16px",
  letterSpacing: "1px",
};

const backButtonStyle: React.CSSProperties = {
  marginTop: "16px",
  background: "transparent",
  color: "#44ff44",
  border: "2px solid #44ff44",
  padding: "8px 16px",
  fontSize: "12px",
  fontFamily: "inherit",
  cursor: "pointer",
  transition: "all 0.3s ease",
  letterSpacing: "1px",
};

const scanModeStyle: React.CSSProperties = {
  position: "relative",
  zIndex: 1,
  maxWidth: "1200px",
  margin: "0 auto 20px",
};

const sectionTitleStyle: React.CSSProperties = {
  margin: "0 0 16px 0",
  fontSize: "18px",
  color: "#44ff44",
  letterSpacing: "2px",
  textShadow: "0 0 5px #44ff44",
};

const modeButtonsStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
  gap: "12px",
};

const modeButtonStyle: React.CSSProperties = {
  background: "linear-gradient(145deg, #1a1a1a, #2a2a2a)",
  color: "#66ff66",
  border: "2px solid #333",
  padding: "16px",
  fontSize: "12px",
  fontFamily: "inherit",
  cursor: "pointer",
  transition: "all 0.3s ease",
  display: "flex",
  alignItems: "center",
  gap: "12px",
  boxShadow: "4px 4px 0px #000",
};

const activeModeButtonStyle: React.CSSProperties = {
  background: "linear-gradient(145deg, #44ff44, #33cc33)",
  color: "#000",
  border: "2px solid #44ff44",
  transform: "translate(-2px, -2px)",
  boxShadow: "6px 6px 0px #000",
};

const modeIconStyle: React.CSSProperties = {
  fontSize: "24px",
  minWidth: "24px",
};

const modeInfoStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "4px",
};

const modeLabelStyle: React.CSSProperties = {
  fontWeight: "bold",
  letterSpacing: "1px",
};

const modeDescStyle: React.CSSProperties = {
  fontSize: "10px",
  opacity: 0.8,
};

const inputPanelStyle: React.CSSProperties = {
  position: "relative",
  zIndex: 1,
  maxWidth: "1200px",
  margin: "0 auto 20px",
  background: "linear-gradient(145deg, #1a1a1a, #2a2a2a)",
  border: "2px solid #44ff44",
  borderRadius: "0",
  overflow: "hidden",
  boxShadow: "4px 4px 0px #000",
};

const panelHeaderStyle: React.CSSProperties = {
  background: "#44ff44",
  color: "#000",
  padding: "12px 16px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "8px",
};

const panelIconStyle: React.CSSProperties = {
  fontSize: "16px",
};

const panelTitleStyle: React.CSSProperties = {
  margin: 0,
  fontSize: "14px",
  fontWeight: "bold",
  letterSpacing: "1px",
  flex: 1,
};

const exampleButtonStyle: React.CSSProperties = {
  background: "#000",
  color: "#44ff44",
  border: "1px solid #44ff44",
  padding: "4px 8px",
  fontSize: "10px",
  fontFamily: "inherit",
  cursor: "pointer",
  letterSpacing: "1px",
};

const inputAreaStyle: React.CSSProperties = {
  padding: "16px",
};

const textareaStyle: React.CSSProperties = {
  width: "100%",
  minHeight: "120px",
  background: "#000",
  color: "#44ff44",
  border: "1px solid #44ff44",
  padding: "12px",
  fontSize: "12px",
  fontFamily: "'Courier New', monospace",
  resize: "vertical",
  marginBottom: "12px",
};

const inputControlsStyle: React.CSSProperties = {
  display: "flex",
  gap: "12px",
};

const parseButtonStyle: React.CSSProperties = {
  background: "linear-gradient(145deg, #44ff44, #33cc33)",
  color: "#000",
  border: "2px solid #44ff44",
  padding: "10px 20px",
  fontSize: "12px",
  fontFamily: "inherit",
  cursor: "pointer",
  fontWeight: "bold",
  letterSpacing: "1px",
  boxShadow: "2px 2px 0px #000",
  transition: "all 0.3s ease",
};

const scanningButtonStyle: React.CSSProperties = {
  background: "#666",
  color: "#ccc",
  cursor: "not-allowed",
  animation: "pulse 1s infinite",
};

const clearButtonStyle: React.CSSProperties = {
  background: "transparent",
  color: "#ff6666",
  border: "2px solid #ff6666",
  padding: "10px 20px",
  fontSize: "12px",
  fontFamily: "inherit",
  cursor: "pointer",
  letterSpacing: "1px",
};

const scanningOverlayStyle: React.CSSProperties = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: "rgba(0, 0, 0, 0.8)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 1000,
};

const scanningContentStyle: React.CSSProperties = {
  background: "#111",
  border: "2px solid #44ff44",
  padding: "32px",
  textAlign: "center",
  boxShadow: "8px 8px 0px #000",
};

const scanningIconStyle: React.CSSProperties = {
  fontSize: "48px",
  marginBottom: "16px",
  animation: "rotate 2s linear infinite",
};

const scanningTextStyle: React.CSSProperties = {
  color: "#44ff44",
  fontSize: "16px",
  fontWeight: "bold",
  letterSpacing: "2px",
  marginBottom: "16px",
};

const scanningProgressStyle: React.CSSProperties = {
  width: "200px",
  height: "4px",
  background: "#333",
  border: "1px solid #44ff44",
  overflow: "hidden",
};

const progressBarStyle: React.CSSProperties = {
  width: "100%",
  height: "100%",
  background: "linear-gradient(90deg, #44ff44, #66ff66)",
  animation: "progress 1.5s ease-in-out infinite",
};

const resultsStyle: React.CSSProperties = {
  position: "relative",
  zIndex: 1,
  maxWidth: "1200px",
  margin: "0 auto 20px",
  background: "linear-gradient(145deg, #1a1a1a, #2a2a2a)",
  border: "2px solid #44ff44",
  borderRadius: "0",
  overflow: "hidden",
  boxShadow: "4px 4px 0px #000",
};

const resultsHeaderStyle: React.CSSProperties = {
  background: "#44ff44",
  color: "#000",
  padding: "12px 16px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "8px",
};

const deviceCountStyle: React.CSSProperties = {
  background: "#000",
  color: "#44ff44",
  padding: "4px 8px",
  fontSize: "10px",
  fontWeight: "bold",
  border: "1px solid #44ff44",
};

const devicesGridStyle: React.CSSProperties = {
  padding: "16px",
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
  gap: "16px",
};

const deviceCardStyle: React.CSSProperties = {
  background: "#222",
  border: "1px solid #444",
  padding: "16px",
  boxShadow: "2px 2px 0px #000",
  animation: "slideInUp 0.5s ease-out",
};

const deviceHeaderStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  marginBottom: "12px",
  paddingBottom: "8px",
  borderBottom: "1px solid #444",
};

const deviceNumberStyle: React.CSSProperties = {
  background: "#44ff44",
  color: "#000",
  width: "32px",
  height: "32px",
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "12px",
  fontWeight: "bold",
};

const deviceTypeStyle: React.CSSProperties = {
  color: "#44ff44",
  fontSize: "12px",
  fontWeight: "bold",
  flex: 1,
  textAlign: "center",
};

const sourceTagStyle: React.CSSProperties = {
  color: "#000",
  padding: "2px 6px",
  fontSize: "10px",
  fontWeight: "bold",
};

const deviceInfoStyle: React.CSSProperties = {
  display: "grid",
  gap: "8px",
  marginBottom: "12px",
};

const deviceFieldStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const fieldLabelStyle: React.CSSProperties = {
  color: "#888",
  fontSize: "11px",
  fontWeight: "bold",
};

const fieldValueStyle: React.CSSProperties = {
  color: "#44ff44",
  fontSize: "12px",
  fontFamily: "'Courier New', monospace",
};

const deviceStatusStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "8px",
  fontSize: "11px",
  color: "#44ff44",
};

const statusIndicatorStyle: React.CSSProperties = {
  width: "8px",
  height: "8px",
  borderRadius: "50%",
  background: "#44ff44",
  animation: "pulse 2s infinite",
};

const intelBriefStyle: React.CSSProperties = {
  position: "relative",
  zIndex: 1,
  maxWidth: "1200px",
  margin: "0 auto",
  background: "linear-gradient(145deg, #1a1a1a, #2a2a2a)",
  border: "2px solid #44ff44",
  borderRadius: "0",
  overflow: "hidden",
  boxShadow: "4px 4px 0px #000",
};

const briefContentStyle: React.CSSProperties = {
  padding: "16px",
  display: "grid",
  gap: "20px",
};

const briefSectionStyle: React.CSSProperties = {
  background: "#222",
  border: "1px solid #444",
  padding: "16px",
};

const briefTitleStyle: React.CSSProperties = {
  margin: "0 0 12px 0",
  fontSize: "14px",
  color: "#44ff44",
  letterSpacing: "1px",
};

const briefListStyle: React.CSSProperties = {
  margin: 0,
  paddingLeft: "20px",
  color: "#ccc",
  fontSize: "12px",
};

const sourcesGridStyle: React.CSSProperties = {
  display: "grid",
  gap: "12px",
};

const sourceItemStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "8px",
  padding: "8px",
  background: "#333",
  border: "1px solid #555",
};

const sourceIconStyle: React.CSSProperties = {
  fontSize: "16px",
  minWidth: "16px",
};

// Helper function for responsive font sizing
function clamp(min: number, vw: number, max: number): string {
  return `clamp(${min}px, ${vw}vw, ${max}px)`;
}

export default LocalNetworkDeviceFinder;
