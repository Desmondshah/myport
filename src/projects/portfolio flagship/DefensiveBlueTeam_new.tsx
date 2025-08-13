import React from "react";

// Defensive Security / Blue Team flagship page
// - SIEM Threat Detection Lab walkthrough with an interactive "log triage" sandbox
// - Incident Response Simulation plan and evidence checklist

export const DefensiveBlueTeam: React.FC<{ onBack?: () => void }> = ({
  onBack,
}) => {
  const [view, setView] = React.useState<"overview" | "siem" | "ir">(
    "overview"
  );
  const [siemMode, setSiemMode] = React.useState<
    "setup" | "detection" | "dashboard"
  >("setup");
  const [irStep, setIrStep] = React.useState(0);

  return (
    <div style={containerStyle}>
      <div style={shieldPatternStyle} />
      <section style={sectionStyle}>
        <header style={headerStyle}>
          <div style={titleContainerStyle}>
            <h1 style={titleStyle}>BLUE TEAM OPS</h1>
            <div style={shieldIconStyle}>🛡️</div>
          </div>
          <p style={descriptionStyle}>
            🔒 DEFENSIVE CYBERSECURITY OPERATIONS 🔒
            <br />
            DETECT • ANALYZE • DEFEND • RESPOND
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

        {/* Mission Control Navigation */}
        <nav style={missionNavStyle}>
          <button
            onClick={() => setView("overview")}
            style={{
              ...navBtnStyle,
              ...(view === "overview" ? activeNavStyle : {}),
            }}
          >
            📋 MISSION BRIEF
          </button>
          <button
            onClick={() => setView("siem")}
            style={{
              ...navBtnStyle,
              ...(view === "siem" ? activeNavStyle : {}),
            }}
          >
            🔍 SIEM LAB
          </button>
          <button
            onClick={() => setView("ir")}
            style={{ ...navBtnStyle, ...(view === "ir" ? activeNavStyle : {}) }}
          >
            🚨 INCIDENT RESPONSE
          </button>
        </nav>

        {/* Content Sections */}
        {view === "overview" && <OverviewSection />}
        {view === "siem" && (
          <SiemSection mode={siemMode} setMode={setSiemMode} />
        )}
        {view === "ir" && (
          <IncidentResponseSection step={irStep} setStep={setIrStep} />
        )}

        <footer style={pageFooterStyle}>
          <div style={footerContentStyle}>
            <span style={classificationStyle}>
              🔴 TRAINING CLASSIFICATION: UNCLASSIFIED
            </span>
            <span style={techStackStyle}>
              SPLUNK • ELK • VOLATILITY • WIRESHARK
            </span>
          </div>
        </footer>
      </section>
    </div>
  );
};

// Overview Section
const OverviewSection: React.FC = () => (
  <div style={overviewStyle}>
    <div style={missionCardStyle}>
      <div style={cardHeaderStyle}>
        <h2 style={cardTitleStyle}>MISSION OBJECTIVES</h2>
        <div style={threatLevelStyle}>THREAT LEVEL: HIGH</div>
      </div>
      <div style={objectivesStyle}>
        <ObjectiveItem
          icon="🎯"
          title="SIEM DETECTION ENGINE"
          description="Deploy Splunk/ELK stack to detect brute force, phishing, and C2 beaconing attacks"
          status="ACTIVE"
        />
        <ObjectiveItem
          icon="📊"
          title="THREAT DASHBOARDS"
          description="Create real-time visualization of security events and attack patterns"
          status="ACTIVE"
        />
        <ObjectiveItem
          icon="🚨"
          title="INCIDENT RESPONSE"
          description="Execute ransomware IR playbook with memory forensics and network analysis"
          status="READY"
        />
        <ObjectiveItem
          icon="📝"
          title="IOC DOCUMENTATION"
          description="Document indicators of compromise and lessons learned for future defense"
          status="PENDING"
        />
      </div>
    </div>

    <div style={capabilitiesGridStyle}>
      <CapabilityCard
        title="THREAT DETECTION"
        description="Advanced analytics to identify sophisticated attack patterns"
        technologies={["Splunk", "Sigma Rules", "MITRE ATT&CK"]}
        color="#ff6b35"
      />
      <CapabilityCard
        title="FORENSIC ANALYSIS"
        description="Deep-dive investigation tools for incident reconstruction"
        technologies={["Volatility", "Autopsy", "YARA"]}
        color="#00d9ff"
      />
      <CapabilityCard
        title="NETWORK MONITORING"
        description="Real-time traffic analysis and anomaly detection"
        technologies={["Wireshark", "Zeek", "Suricata"]}
        color="#ff3366"
      />
      <CapabilityCard
        title="THREAT INTEL"
        description="Integration with external threat intelligence feeds"
        technologies={["STIX/TAXII", "MISP", "OpenIOC"]}
        color="#7b68ee"
      />
    </div>
  </div>
);

// SIEM Section
const SiemSection: React.FC<{
  mode: string;
  setMode: (mode: "setup" | "detection" | "dashboard") => void;
}> = ({ mode, setMode }) => (
  <div style={siemStyle}>
    <div style={siemNavStyle}>
      <button
        onClick={() => setMode("setup")}
        style={{
          ...siemTabStyle,
          ...(mode === "setup" ? activeSiemTabStyle : {}),
        }}
      >
        SETUP
      </button>
      <button
        onClick={() => setMode("detection")}
        style={{
          ...siemTabStyle,
          ...(mode === "detection" ? activeSiemTabStyle : {}),
        }}
      >
        DETECTION
      </button>
      <button
        onClick={() => setMode("dashboard")}
        style={{
          ...siemTabStyle,
          ...(mode === "dashboard" ? activeSiemTabStyle : {}),
        }}
      >
        DASHBOARD
      </button>
    </div>

    {mode === "setup" && (
      <div style={siemContentStyle}>
        <div style={terminalStyle}>
          <div style={terminalHeaderStyle}>
            <span style={terminalTitleStyle}>SIEM DEPLOYMENT CONSOLE</span>
            <div style={terminalDotsStyle}>
              <div style={dotStyle} />
              <div style={{ ...dotStyle, background: "#ffff00" }} />
              <div style={{ ...dotStyle, background: "#ff0000" }} />
            </div>
          </div>
          <div style={terminalBodyStyle}>
            <div style={commandLineStyle}>
              &gt; docker-compose up -d elasticsearch kibana logstash
            </div>
            <div style={commandLineStyle}>
              &gt; splunk start --accept-license
            </div>
            <div style={commandLineStyle}>
              &gt; Configure data inputs: Windows Event Logs, Sysmon, Apache
              access
            </div>
            <div style={commandLineStyle}>
              &gt; Install security apps: Splunk Security Essentials, ES
            </div>
            <div style={commandOutputStyle}>
              [INFO] SIEM stack deployment: COMPLETE ✓
            </div>
            <div style={commandOutputStyle}>
              [INFO] Data ingestion rate: 1.2M events/hour
            </div>
            <div style={commandOutputStyle}>
              [INFO] Detection rules active: 127
            </div>
          </div>
        </div>

        <div style={setupStepsStyle}>
          <h3 style={stepsTitleStyle}>DEPLOYMENT CHECKLIST</h3>
          <SetupStep
            text="Deploy ELK Stack or Splunk instance"
            completed={true}
          />
          <SetupStep
            text="Configure log forwarding (Winlogbeat, Filebeat)"
            completed={true}
          />
          <SetupStep
            text="Ingest Windows Event Logs & Sysmon"
            completed={true}
          />
          <SetupStep
            text="Deploy network monitoring (Zeek, Suricata)"
            completed={false}
          />
          <SetupStep
            text="Configure threat intelligence feeds"
            completed={false}
          />
          <SetupStep
            text="Create detection rules and dashboards"
            completed={false}
          />
        </div>
      </div>
    )}

    {mode === "detection" && (
      <div style={detectionStyle}>
        <div style={rulesGridStyle}>
          <DetectionRule
            name="BRUTE FORCE ATTACK"
            description="Failed login attempts > 5 from same IP within 5 minutes"
            severity="HIGH"
            triggered={true}
            events={23}
          />
          <DetectionRule
            name="PHISHING CALLBACK"
            description="First-seen domain resolution followed by HTTP GET"
            severity="MEDIUM"
            triggered={true}
            events={7}
          />
          <DetectionRule
            name="C2 BEACONING"
            description="Periodic outbound connections with consistent timing"
            severity="CRITICAL"
            triggered={false}
            events={0}
          />
          <DetectionRule
            name="PRIVILEGE ESCALATION"
            description="Suspicious process execution as SYSTEM"
            severity="HIGH"
            triggered={false}
            events={0}
          />
        </div>

        <div style={alertsTerminalStyle}>
          <div style={alertsHeaderStyle}>
            <span style={alertsTitleStyle}>LIVE ALERT STREAM</span>
            <span style={alertsCountStyle}>4 ACTIVE ALERTS</span>
          </div>
          <div style={alertsBodyStyle}>
            <AlertEntry
              timestamp="14:23:15"
              severity="HIGH"
              rule="BRUTE_FORCE"
              message="Multiple failed logins detected from 192.168.1.100"
            />
            <AlertEntry
              timestamp="14:21:03"
              severity="MEDIUM"
              rule="PHISH_CALLBACK"
              message="Suspicious domain resolution: evil-domain.com"
            />
            <AlertEntry
              timestamp="14:18:42"
              severity="LOW"
              rule="FILE_TRANSFER"
              message="Large outbound data transfer detected"
            />
            <AlertEntry
              timestamp="14:15:11"
              severity="HIGH"
              rule="BRUTE_FORCE"
              message="Authentication success after failed attempts"
            />
          </div>
        </div>
      </div>
    )}

    {mode === "dashboard" && (
      <div style={dashboardStyle}>
        <div style={kpiGridStyle}>
          <KPICard title="TOTAL EVENTS" value="1,247,392" color="#00ff00" />
          <KPICard title="ACTIVE ALERTS" value="4" color="#ff3366" />
          <KPICard title="BLOCKED IPS" value="127" color="#ff6b35" />
          <KPICard title="UPTIME" value="99.9%" color="#00d9ff" />
        </div>

        <div style={chartsPlaceholderStyle}>
          <div style={chartBoxStyle}>
            <h4 style={chartTitleStyle}>📈 ATTACK PATTERNS</h4>
            <div style={chartContentStyle}>
              Real-time attack visualization would appear here
            </div>
          </div>
          <div style={chartBoxStyle}>
            <h4 style={chartTitleStyle}>🌍 THREAT GEOGRAPHY</h4>
            <div style={chartContentStyle}>Global threat map visualization</div>
          </div>
          <div style={chartBoxStyle}>
            <h4 style={chartTitleStyle}>🎯 TOP ATTACKERS</h4>
            <div style={chartContentStyle}>Most active threat sources</div>
          </div>
          <div style={chartBoxStyle}>
            <h4 style={chartTitleStyle}>⏱️ RESPONSE TIMES</h4>
            <div style={chartContentStyle}>Mean time to detection/response</div>
          </div>
        </div>
      </div>
    )}
  </div>
);

// Incident Response Section
const IncidentResponseSection: React.FC<{
  step: number;
  setStep: (step: number) => void;
}> = ({ step, setStep }) => {
  const irSteps = [
    "INITIAL DETECTION",
    "CONTAINMENT",
    "EVIDENCE COLLECTION",
    "ANALYSIS",
    "ERADICATION",
    "RECOVERY",
    "LESSONS LEARNED",
  ];

  return (
    <div style={irStyle}>
      <div style={irHeaderStyle}>
        <h2 style={irTitleStyle}>INCIDENT RESPONSE PLAYBOOK</h2>
        <div style={scenarioStyle}>SCENARIO: RANSOMWARE INFECTION</div>
      </div>

      <div style={irStepsStyle}>
        {irSteps.map((stepName, index) => (
          <button
            key={index}
            onClick={() => setStep(index)}
            style={{
              ...irStepBtnStyle,
              ...(index === step ? activeIrStepStyle : {}),
              ...(index < step ? completedIrStepStyle : {}),
            }}
          >
            <span style={stepNumberStyle}>{index + 1}</span>
            <span style={stepNameStyle}>{stepName}</span>
          </button>
        ))}
      </div>

      <div style={irContentStyle}>
        {step === 0 && (
          <IRStepContent title="INITIAL DETECTION" content={detectionContent} />
        )}
        {step === 1 && (
          <IRStepContent title="CONTAINMENT" content={containmentContent} />
        )}
        {step === 2 && (
          <IRStepContent
            title="EVIDENCE COLLECTION"
            content={evidenceContent}
          />
        )}
        {step === 3 && (
          <IRStepContent title="ANALYSIS" content={analysisContent} />
        )}
        {step === 4 && (
          <IRStepContent title="ERADICATION" content={eradicationContent} />
        )}
        {step === 5 && (
          <IRStepContent title="RECOVERY" content={recoveryContent} />
        )}
        {step === 6 && (
          <IRStepContent title="LESSONS LEARNED" content={lessonsContent} />
        )}
      </div>
    </div>
  );
};

// Helper Components
const ObjectiveItem: React.FC<{
  icon: string;
  title: string;
  description: string;
  status: string;
}> = ({ icon, title, description, status }) => (
  <div style={objectiveItemStyle}>
    <div style={objectiveIconStyle}>{icon}</div>
    <div style={objectiveContentStyle}>
      <div style={objectiveTitleStyle}>{title}</div>
      <div style={objectiveDescStyle}>{description}</div>
    </div>
    <div
      style={{
        ...objectiveStatusStyle,
        color:
          status === "ACTIVE"
            ? "#00ff00"
            : status === "READY"
              ? "#00d9ff"
              : "#ffff00",
      }}
    >
      {status}
    </div>
  </div>
);

const CapabilityCard: React.FC<{
  title: string;
  description: string;
  technologies: string[];
  color: string;
}> = ({ title, description, technologies, color }) => (
  <div style={{ ...capabilityCardStyle, borderColor: color }}>
    <h3 style={capabilityTitleStyle}>{title}</h3>
    <p style={capabilityDescStyle}>{description}</p>
    <div style={techTagsStyle}>
      {technologies.map((tech, i) => (
        <span key={i} style={{ ...techTagStyle, borderColor: color }}>
          {tech}
        </span>
      ))}
    </div>
  </div>
);

const SetupStep: React.FC<{ text: string; completed: boolean }> = ({
  text,
  completed,
}) => (
  <div style={setupStepStyle}>
    <div
      style={{
        ...stepIndicatorStyle,
        background: completed ? "#00ff00" : "#333",
      }}
    >
      {completed ? "✓" : "○"}
    </div>
    <span style={{ ...stepTextStyle, color: completed ? "#fff" : "#666" }}>
      {text}
    </span>
  </div>
);

const DetectionRule: React.FC<{
  name: string;
  description: string;
  severity: string;
  triggered: boolean;
  events: number;
}> = ({ name, description, severity, triggered, events }) => (
  <div style={{ ...ruleCardStyle, borderColor: getSeverityColor(severity) }}>
    <div style={ruleHeaderStyle}>
      <span style={ruleNameStyle}>{name}</span>
      <span style={{ ...ruleSeverityStyle, color: getSeverityColor(severity) }}>
        {severity}
      </span>
    </div>
    <p style={ruleDescStyle}>{description}</p>
    <div style={ruleStatsStyle}>
      <span style={ruleStatusStyle}>
        {triggered ? "🔴 TRIGGERED" : "🟢 MONITORING"}
      </span>
      <span style={ruleEventsStyle}>{events} events</span>
    </div>
  </div>
);

const AlertEntry: React.FC<{
  timestamp: string;
  severity: string;
  rule: string;
  message: string;
}> = ({ timestamp, severity, rule, message }) => (
  <div style={alertEntryStyle}>
    <span style={alertTimeStyle}>{timestamp}</span>
    <span style={{ ...alertSeverityStyle, color: getSeverityColor(severity) }}>
      {severity}
    </span>
    <span style={alertRuleStyle}>{rule}</span>
    <span style={alertMessageStyle}>{message}</span>
  </div>
);

const KPICard: React.FC<{ title: string; value: string; color: string }> = ({
  title,
  value,
  color,
}) => (
  <div style={{ ...kpiCardStyle, borderColor: color }}>
    <div style={kpiTitleStyle}>{title}</div>
    <div style={{ ...kpiValueStyle, color }}>{value}</div>
  </div>
);

const IRStepContent: React.FC<{ title: string; content: string[] }> = ({
  title,
  content,
}) => (
  <div style={irStepContentStyle}>
    <h3 style={irStepTitleStyle}>{title}</h3>
    <div style={irStepBodyStyle}>
      {content.map((item, i) => (
        <div key={i} style={irStepItemStyle}>
          <span style={irBulletStyle}>▶</span>
          <span>{item}</span>
        </div>
      ))}
    </div>
  </div>
);

// Helper Functions
function getSeverityColor(severity: string): string {
  switch (severity) {
    case "CRITICAL":
      return "#ff0000";
    case "HIGH":
      return "#ff3366";
    case "MEDIUM":
      return "#ff6b35";
    case "LOW":
      return "#ffff00";
    default:
      return "#666";
  }
}

// Content Data
const detectionContent = [
  "User reports suspicious activity on workstation",
  "Endpoint detection shows encrypted files with .locked extension",
  "Ransom note discovered on desktop",
  "Network monitoring shows unusual outbound traffic",
  "Alert triggered in SIEM for suspicious process execution",
];

const containmentContent = [
  "Isolate infected workstation from network",
  "Snapshot VM state before any changes",
  "Identify and isolate other potentially affected systems",
  "Activate incident response team",
  "Document initial findings and timeline",
];

const evidenceContent = [
  "Acquire memory dump using WinPmem/DumpIt",
  "Capture network traffic with Wireshark",
  "Image hard drive for forensic analysis",
  "Collect system logs and registry hives",
  "Document file system changes and encrypted files",
];

const analysisContent = [
  "Analyze memory dump with Volatility framework",
  "Examine network traffic for C2 communications",
  "Identify malware persistence mechanisms",
  "Extract IOCs (file hashes, IPs, domains)",
  "Determine attack vector and timeline",
];

const eradicationContent = [
  "Remove malware from infected systems",
  "Patch vulnerabilities that enabled initial access",
  "Update security controls and signatures",
  "Remove attacker persistence mechanisms",
  "Validate system integrity",
];

const recoveryContent = [
  "Restore encrypted files from backups",
  "Rebuild compromised systems from clean images",
  "Implement additional monitoring for affected systems",
  "Update incident response procedures",
  "Monitor for signs of re-infection",
];

const lessonsContent = [
  "Document attack vector and vulnerabilities exploited",
  "Update detection rules based on observed TTPs",
  "Improve backup and recovery procedures",
  "Enhance user awareness training",
  "Review and update incident response playbook",
];

// Blue Team themed neo-brutalist styles
const containerStyle: React.CSSProperties = {
  minHeight: "100vh",
  position: "relative",
  background: "linear-gradient(135deg, #0a0a2e 0%, #16213e 50%, #1a1a3a 100%)",
  overflow: "hidden",
};

const shieldPatternStyle: React.CSSProperties = {
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundImage: `
    radial-gradient(circle at 20% 20%, rgba(0, 217, 255, 0.1) 2px, transparent 2px),
    radial-gradient(circle at 80% 80%, rgba(255, 107, 53, 0.1) 2px, transparent 2px),
    repeating-conic-gradient(from 0deg at 50% 50%, transparent 0deg, rgba(255, 255, 255, 0.02) 10deg, transparent 20deg)
  `,
  backgroundSize: "50px 50px, 60px 60px, 100px 100px",
  animation: "rotate 30s linear infinite",
  pointerEvents: "none",
};

const sectionStyle: React.CSSProperties = {
  position: "relative",
  zIndex: 1,
  maxWidth: "1400px",
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
  color: "#00d9ff",
  textTransform: "uppercase",
  letterSpacing: "0.1em",
  margin: 0,
  textShadow: "0 0 30px #00d9ff, 6px 6px 0 #000",
  fontFamily: "monospace",
};

const shieldIconStyle: React.CSSProperties = {
  position: "absolute",
  top: "-20px",
  right: "-50px",
  fontSize: "3rem",
  animation: "pulse 2s ease-in-out infinite",
};

const descriptionStyle: React.CSSProperties = {
  fontSize: "clamp(0.9rem, 2.5vw, 1.1rem)",
  color: "#fff",
  fontWeight: 700,
  textTransform: "uppercase",
  letterSpacing: "0.1em",
  lineHeight: 1.4,
  textShadow: "0 0 15px rgba(255, 255, 255, 0.5)",
  marginBottom: "1.5rem",
};

const backBtnStyle: React.CSSProperties = {
  background: "#000",
  color: "#00d9ff",
  border: "3px solid #00d9ff",
  padding: "0.75rem 1.5rem",
  fontSize: "0.8rem",
  fontWeight: 700,
  textTransform: "uppercase",
  letterSpacing: "0.1em",
  cursor: "pointer",
  borderRadius: "0",
  boxShadow: "0 0 15px #00d9ff, 4px 4px 0 #00d9ff",
  transition: "all 0.2s ease",
};

const missionNavStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
  gap: "1rem",
  marginBottom: "2rem",
};

const navBtnStyle: React.CSSProperties = {
  background: "rgba(0, 0, 0, 0.8)",
  color: "#666",
  border: "3px solid #333",
  padding: "1rem",
  fontSize: "0.9rem",
  fontWeight: 700,
  textTransform: "uppercase",
  cursor: "pointer",
  borderRadius: "0",
  fontFamily: "monospace",
  letterSpacing: "0.1em",
  transition: "all 0.3s ease",
  textAlign: "center",
};

const activeNavStyle: React.CSSProperties = {
  background: "#00d9ff",
  color: "#000",
  borderColor: "#00d9ff",
  boxShadow: "0 0 25px #00d9ff",
  transform: "translateY(-2px)",
};

// Continue with more styles...
const overviewStyle: React.CSSProperties = {
  display: "grid",
  gap: "2rem",
};

const missionCardStyle: React.CSSProperties = {
  background: "rgba(0, 0, 0, 0.9)",
  border: "4px solid #00d9ff",
  borderRadius: "0",
  padding: "2rem",
  boxShadow: "0 0 30px rgba(0, 217, 255, 0.3)",
  transform: "rotate(-0.5deg)",
};

const cardHeaderStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "2rem",
  paddingBottom: "1rem",
  borderBottom: "3px solid #00d9ff",
};

const cardTitleStyle: React.CSSProperties = {
  fontSize: "1.8rem",
  fontWeight: 900,
  color: "#00d9ff",
  textTransform: "uppercase",
  letterSpacing: "0.1em",
  margin: 0,
  fontFamily: "monospace",
};

const threatLevelStyle: React.CSSProperties = {
  background: "#ff3366",
  color: "#fff",
  padding: "0.5rem 1rem",
  fontSize: "0.8rem",
  fontWeight: 700,
  textTransform: "uppercase",
  border: "2px solid #000",
  animation: "pulse 2s infinite",
};

const objectivesStyle: React.CSSProperties = {
  display: "grid",
  gap: "1rem",
};

const objectiveItemStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "auto 1fr auto",
  gap: "1rem",
  alignItems: "center",
  padding: "1rem",
  background: "rgba(255, 255, 255, 0.05)",
  border: "2px solid #333",
  borderRadius: "0",
};

const objectiveIconStyle: React.CSSProperties = {
  fontSize: "1.5rem",
};

const objectiveContentStyle: React.CSSProperties = {
  display: "grid",
  gap: "0.25rem",
};

const objectiveTitleStyle: React.CSSProperties = {
  fontSize: "1rem",
  fontWeight: 700,
  color: "#fff",
  textTransform: "uppercase",
  letterSpacing: "0.1em",
  fontFamily: "monospace",
};

const objectiveDescStyle: React.CSSProperties = {
  fontSize: "0.8rem",
  color: "#ccc",
  lineHeight: 1.4,
};

const objectiveStatusStyle: React.CSSProperties = {
  fontSize: "0.7rem",
  fontWeight: 700,
  textTransform: "uppercase",
  letterSpacing: "0.1em",
  fontFamily: "monospace",
};

const capabilitiesGridStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
  gap: "1.5rem",
};

const capabilityCardStyle: React.CSSProperties = {
  background: "rgba(0, 0, 0, 0.8)",
  border: "3px solid",
  borderRadius: "0",
  padding: "1.5rem",
  transform: "rotate(0.5deg)",
  transition: "all 0.3s ease",
};

const capabilityTitleStyle: React.CSSProperties = {
  fontSize: "1.2rem",
  fontWeight: 800,
  color: "#fff",
  textTransform: "uppercase",
  letterSpacing: "0.1em",
  marginBottom: "1rem",
  fontFamily: "monospace",
};

const capabilityDescStyle: React.CSSProperties = {
  fontSize: "0.9rem",
  color: "#ccc",
  lineHeight: 1.5,
  marginBottom: "1rem",
};

const techTagsStyle: React.CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  gap: "0.5rem",
};

const techTagStyle: React.CSSProperties = {
  background: "transparent",
  border: "2px solid",
  padding: "0.25rem 0.5rem",
  fontSize: "0.7rem",
  fontWeight: 600,
  textTransform: "uppercase",
  color: "#fff",
  borderRadius: "0",
  fontFamily: "monospace",
};

// SIEM Section Styles
const siemStyle: React.CSSProperties = {
  display: "grid",
  gap: "2rem",
};

const siemNavStyle: React.CSSProperties = {
  display: "flex",
  gap: "1rem",
  justifyContent: "center",
  flexWrap: "wrap",
};

const siemTabStyle: React.CSSProperties = {
  background: "#000",
  color: "#666",
  border: "3px solid #333",
  padding: "0.75rem 1.5rem",
  fontSize: "0.8rem",
  fontWeight: 700,
  textTransform: "uppercase",
  cursor: "pointer",
  borderRadius: "0",
  fontFamily: "monospace",
  letterSpacing: "0.1em",
  transition: "all 0.2s ease",
};

const activeSiemTabStyle: React.CSSProperties = {
  background: "#ff6b35",
  color: "#fff",
  borderColor: "#ff6b35",
  boxShadow: "0 0 15px #ff6b35",
};

const siemContentStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "1fr 400px",
  gap: "2rem",
};

const terminalStyle: React.CSSProperties = {
  background: "#000",
  border: "4px solid #00ff00",
  borderRadius: "0",
  boxShadow: "0 0 25px rgba(0, 255, 0, 0.3)",
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
  fontSize: "0.8rem",
  fontWeight: 700,
  textTransform: "uppercase",
  letterSpacing: "0.1em",
  fontFamily: "monospace",
};

const terminalDotsStyle: React.CSSProperties = {
  display: "flex",
  gap: "0.5rem",
};

const dotStyle: React.CSSProperties = {
  width: "10px",
  height: "10px",
  borderRadius: "50%",
  background: "#00ff00",
  border: "1px solid #000",
};

const terminalBodyStyle: React.CSSProperties = {
  padding: "1rem",
  fontSize: "0.8rem",
  fontFamily: "monospace",
  lineHeight: 1.4,
  height: "300px",
  overflowY: "auto",
};

const commandLineStyle: React.CSSProperties = {
  color: "#00ff00",
  marginBottom: "0.5rem",
};

const commandOutputStyle: React.CSSProperties = {
  color: "#ffff00",
  marginBottom: "0.5rem",
  paddingLeft: "1rem",
};

const setupStepsStyle: React.CSSProperties = {
  background: "rgba(0, 0, 0, 0.8)",
  border: "3px solid #ff6b35",
  borderRadius: "0",
  padding: "1.5rem",
  boxShadow: "0 0 25px rgba(255, 107, 53, 0.3)",
};

const stepsTitleStyle: React.CSSProperties = {
  fontSize: "1.2rem",
  fontWeight: 800,
  color: "#ff6b35",
  textTransform: "uppercase",
  letterSpacing: "0.1em",
  marginBottom: "1.5rem",
  fontFamily: "monospace",
};

const setupStepStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "1rem",
  marginBottom: "1rem",
  padding: "0.5rem",
};

const stepIndicatorStyle: React.CSSProperties = {
  width: "24px",
  height: "24px",
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "0.8rem",
  fontWeight: 700,
  color: "#000",
  border: "2px solid #000",
};

const stepTextStyle: React.CSSProperties = {
  fontSize: "0.9rem",
  fontFamily: "monospace",
  lineHeight: 1.4,
};

// Detection Section Styles
const detectionStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "1fr 400px",
  gap: "2rem",
};

const rulesGridStyle: React.CSSProperties = {
  display: "grid",
  gap: "1rem",
};

const ruleCardStyle: React.CSSProperties = {
  background: "rgba(0, 0, 0, 0.8)",
  border: "3px solid",
  borderRadius: "0",
  padding: "1rem",
  transition: "all 0.3s ease",
};

const ruleHeaderStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "0.5rem",
};

const ruleNameStyle: React.CSSProperties = {
  fontSize: "0.9rem",
  fontWeight: 700,
  color: "#fff",
  textTransform: "uppercase",
  letterSpacing: "0.1em",
  fontFamily: "monospace",
};

const ruleSeverityStyle: React.CSSProperties = {
  fontSize: "0.7rem",
  fontWeight: 700,
  textTransform: "uppercase",
  letterSpacing: "0.1em",
  fontFamily: "monospace",
};

const ruleDescStyle: React.CSSProperties = {
  fontSize: "0.8rem",
  color: "#ccc",
  lineHeight: 1.4,
  marginBottom: "1rem",
};

const ruleStatsStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const ruleStatusStyle: React.CSSProperties = {
  fontSize: "0.7rem",
  fontWeight: 600,
  color: "#fff",
  fontFamily: "monospace",
};

const ruleEventsStyle: React.CSSProperties = {
  fontSize: "0.7rem",
  fontWeight: 600,
  color: "#666",
  fontFamily: "monospace",
};

const alertsTerminalStyle: React.CSSProperties = {
  background: "#000",
  border: "4px solid #ff3366",
  borderRadius: "0",
  boxShadow: "0 0 25px rgba(255, 51, 102, 0.3)",
  overflow: "hidden",
};

const alertsHeaderStyle: React.CSSProperties = {
  background: "#ff3366",
  color: "#fff",
  padding: "0.75rem 1rem",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const alertsTitleStyle: React.CSSProperties = {
  fontSize: "0.8rem",
  fontWeight: 700,
  textTransform: "uppercase",
  letterSpacing: "0.1em",
  fontFamily: "monospace",
};

const alertsCountStyle: React.CSSProperties = {
  fontSize: "0.7rem",
  fontWeight: 600,
  fontFamily: "monospace",
};

const alertsBodyStyle: React.CSSProperties = {
  padding: "1rem",
  height: "400px",
  overflowY: "auto",
  fontSize: "0.7rem",
  fontFamily: "monospace",
  lineHeight: 1.4,
};

const alertEntryStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "auto auto auto 1fr",
  gap: "1rem",
  marginBottom: "0.5rem",
  padding: "0.5rem 0",
  borderBottom: "1px solid #333",
};

const alertTimeStyle: React.CSSProperties = {
  color: "#666",
  fontWeight: 600,
  whiteSpace: "nowrap",
};

const alertSeverityStyle: React.CSSProperties = {
  fontWeight: 700,
  whiteSpace: "nowrap",
};

const alertRuleStyle: React.CSSProperties = {
  color: "#00d9ff",
  fontWeight: 600,
  whiteSpace: "nowrap",
};

const alertMessageStyle: React.CSSProperties = {
  color: "#fff",
  wordBreak: "break-all",
};

// Dashboard Section Styles
const dashboardStyle: React.CSSProperties = {
  display: "grid",
  gap: "2rem",
};

const kpiGridStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
  gap: "1rem",
};

const kpiCardStyle: React.CSSProperties = {
  background: "rgba(0, 0, 0, 0.8)",
  border: "3px solid",
  borderRadius: "0",
  padding: "1.5rem",
  textAlign: "center",
  transform: "rotate(-0.5deg)",
};

const kpiTitleStyle: React.CSSProperties = {
  fontSize: "0.7rem",
  fontWeight: 700,
  color: "#fff",
  textTransform: "uppercase",
  letterSpacing: "0.1em",
  marginBottom: "0.5rem",
  fontFamily: "monospace",
};

const kpiValueStyle: React.CSSProperties = {
  fontSize: "2rem",
  fontWeight: 900,
  fontFamily: "monospace",
  textShadow: "0 0 10px currentColor",
};

const chartsPlaceholderStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
  gap: "1.5rem",
};

const chartBoxStyle: React.CSSProperties = {
  background: "rgba(0, 0, 0, 0.8)",
  border: "3px dashed #666",
  borderRadius: "0",
  padding: "2rem",
  textAlign: "center",
  minHeight: "200px",
};

const chartTitleStyle: React.CSSProperties = {
  fontSize: "1rem",
  fontWeight: 700,
  color: "#fff",
  textTransform: "uppercase",
  letterSpacing: "0.1em",
  marginBottom: "1rem",
  fontFamily: "monospace",
};

const chartContentStyle: React.CSSProperties = {
  fontSize: "0.8rem",
  color: "#666",
  fontStyle: "italic",
};

// IR Section Styles
const irStyle: React.CSSProperties = {
  display: "grid",
  gap: "2rem",
};

const irHeaderStyle: React.CSSProperties = {
  textAlign: "center",
  padding: "2rem",
  background: "rgba(255, 51, 102, 0.1)",
  border: "3px solid #ff3366",
  borderRadius: "0",
};

const irTitleStyle: React.CSSProperties = {
  fontSize: "2rem",
  fontWeight: 900,
  color: "#ff3366",
  textTransform: "uppercase",
  letterSpacing: "0.1em",
  marginBottom: "1rem",
  fontFamily: "monospace",
  textShadow: "0 0 20px #ff3366",
};

const scenarioStyle: React.CSSProperties = {
  background: "#ff3366",
  color: "#fff",
  padding: "0.5rem 1rem",
  fontSize: "0.9rem",
  fontWeight: 700,
  textTransform: "uppercase",
  border: "2px solid #000",
  display: "inline-block",
  fontFamily: "monospace",
};

const irStepsStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
  gap: "1rem",
};

const irStepBtnStyle: React.CSSProperties = {
  background: "rgba(0, 0, 0, 0.8)",
  color: "#666",
  border: "3px solid #333",
  padding: "1rem",
  fontSize: "0.7rem",
  fontWeight: 700,
  textTransform: "uppercase",
  cursor: "pointer",
  borderRadius: "0",
  fontFamily: "monospace",
  letterSpacing: "0.1em",
  transition: "all 0.3s ease",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "0.5rem",
  textAlign: "center",
};

const activeIrStepStyle: React.CSSProperties = {
  background: "#ff3366",
  color: "#fff",
  borderColor: "#ff3366",
  boxShadow: "0 0 20px #ff3366",
};

const completedIrStepStyle: React.CSSProperties = {
  background: "#00ff00",
  color: "#000",
  borderColor: "#00ff00",
};

const stepNumberStyle: React.CSSProperties = {
  fontSize: "1.5rem",
  fontWeight: 900,
  fontFamily: "monospace",
};

const stepNameStyle: React.CSSProperties = {
  fontSize: "0.6rem",
  lineHeight: 1.2,
};

const irContentStyle: React.CSSProperties = {
  background: "rgba(0, 0, 0, 0.8)",
  border: "3px solid #ff3366",
  borderRadius: "0",
  padding: "2rem",
  boxShadow: "0 0 25px rgba(255, 51, 102, 0.3)",
};

const irStepContentStyle: React.CSSProperties = {
  display: "grid",
  gap: "1.5rem",
};

const irStepTitleStyle: React.CSSProperties = {
  fontSize: "1.5rem",
  fontWeight: 800,
  color: "#ff3366",
  textTransform: "uppercase",
  letterSpacing: "0.1em",
  fontFamily: "monospace",
  textShadow: "0 0 15px #ff3366",
};

const irStepBodyStyle: React.CSSProperties = {
  display: "grid",
  gap: "0.75rem",
};

const irStepItemStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "flex-start",
  gap: "1rem",
  padding: "0.75rem",
  background: "rgba(255, 255, 255, 0.05)",
  border: "2px solid #333",
  fontSize: "0.9rem",
  lineHeight: 1.4,
  color: "#fff",
};

const irBulletStyle: React.CSSProperties = {
  color: "#ff3366",
  fontWeight: 700,
  fontSize: "0.8rem",
  marginTop: "0.1rem",
};

const pageFooterStyle: React.CSSProperties = {
  textAlign: "center",
  marginTop: "3rem",
};

const footerContentStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  flexWrap: "wrap",
  gap: "1rem",
  padding: "1rem",
  background: "rgba(0, 0, 0, 0.8)",
  border: "3px solid #333",
  fontSize: "0.7rem",
  fontFamily: "monospace",
};

const classificationStyle: React.CSSProperties = {
  color: "#ff0000",
  fontWeight: 700,
  textTransform: "uppercase",
  letterSpacing: "0.1em",
  textShadow: "0 0 10px #ff0000",
};

const techStackStyle: React.CSSProperties = {
  color: "#666",
  fontWeight: 600,
  textTransform: "uppercase",
  letterSpacing: "0.1em",
};

export default DefensiveBlueTeam;
