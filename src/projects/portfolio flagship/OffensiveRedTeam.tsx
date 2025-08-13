import React from "react";

// Neo-Brutalist Offensive Red Team - Hacker Terminal Aesthetic
export const OffensiveRedTeam: React.FC<{ onBack?: () => void }> = ({ onBack }) => {
  const [view, setView] = React.useState<"overview" | "lab" | "webapp" | "report">("overview");

  return (
    <div style={containerStyle}>
      {/* Animated Background Pattern */}
      <div style={backgroundStyle} />
      
      {/* Terminal Header */}
      <header style={headerStyle}>
        <div style={terminalBarStyle}>
          <div style={terminalDotsStyle}>
            <span style={{...terminalDotStyle, background: '#ff5f56'}} />
            <span style={{...terminalDotStyle, background: '#ffbd2e'}} />
            <span style={{...terminalDotStyle, background: '#27ca3f'}} />
          </div>
          <div style={terminalTitleStyle}>RED_TEAM.exe</div>
        </div>
        
        <div style={titleSectionStyle}>
          <h1 style={mainTitleStyle}>
            <span style={redTextStyle}>OFFENSIVE</span>{" "}
            <span style={hackTextStyle}>PENETRATION</span>{" "}
            <span style={redTextStyle}>TESTING</span>
          </h1>
          <p style={subtitleStyle}>
            {">"} MISSION: EXPLOIT_SYSTEMS | DOCUMENT_VULNS | SECURE_INFRASTRUCTURE
          </p>
          
          {onBack && (
            <button onClick={onBack} style={backButtonStyle}>
              &lt; RETURN_TO_ARSENAL
            </button>
          )}
        </div>
      </header>

      {/* Mission Navigation */}
      <nav style={navStyle}>
        {[
          { id: "overview", label: "MISSION_BRIEF", icon: "🎯" },
          { id: "lab", label: "EXPLOIT_LAB", icon: "💀" },
          { id: "webapp", label: "WEB_ATTACK", icon: "🕷️" },
          { id: "report", label: "INTEL_REPORT", icon: "📋" }
        ].map(({ id, label, icon }) => (
          <button
            key={id}
            onClick={() => setView(id as any)}
            style={{
              ...navButtonStyle,
              ...(view === id ? activeNavButtonStyle : {})
            }}
          >
            <span style={navIconStyle}>{icon}</span>
            <span>{label}</span>
          </button>
        ))}
      </nav>

      {/* Content Sections */}
      <main style={contentStyle}>
        {view === "overview" && <Overview />}
        {view === "lab" && <VulnLab />}
        {view === "webapp" && <WebAppPentest />}
        {view === "report" && <ReportTemplate />}
      </main>

      {/* Terminal Footer */}
      <footer style={footerStyle}>
        <div style={warningStyle}>
          ⚠️ EDUCATIONAL_USE_ONLY | AUTHORIZED_TESTING_REQUIRED | NO_ILLEGAL_ACTIVITIES
        </div>
      </footer>
    </div>
  );
};

// Overview Section
const Overview: React.FC = () => (
  <div style={sectionStyle}>
    <div style={sectionHeaderStyle}>
      <h2 style={sectionTitleStyle}>MISSION OBJECTIVES</h2>
      <div style={statusBadgeStyle}>STATUS: OPERATIONAL</div>
    </div>
    
    <div style={objectivesGridStyle}>
      <ObjectiveCard 
        title="RECONNAISSANCE"
        details={["Service enumeration", "Attack surface mapping", "Vulnerability identification"]}
        tools={["Nmap", "Masscan", "Custom scripts"]}
      />
      <ObjectiveCard 
        title="INITIAL_ACCESS"
        details={["Exploit development", "Payload crafting", "Shell establishment"]}
        tools={["Metasploit", "Custom exploits", "Social engineering"]}
      />
      <ObjectiveCard 
        title="PRIVILEGE_ESCALATION"
        details={["Local exploits", "Misconfiguration abuse", "Credential harvesting"]}
        tools={["LinPEAS", "WinPEAS", "Manual enumeration"]}
      />
      <ObjectiveCard 
        title="LATERAL_MOVEMENT"
        details={["Network pivoting", "Credential reuse", "Service exploitation"]}
        tools={["Bloodhound", "CrackMapExec", "Custom tunnels"]}
      />
    </div>

    <div style={terminalOutputStyle}>
      <div style={terminalHeaderStyle}>ARSENAL.log</div>
      <div style={terminalContentStyle}>
        <div style={terminalLineStyle}>
          [+] Loading offensive capabilities...
        </div>
        <div style={terminalLineStyle}>
          [+] Nmap, Burp Suite, Hydra, Metasploit: READY
        </div>
        <div style={terminalLineStyle}>
          [+] Custom exploit frameworks: LOADED
        </div>
        <div style={terminalLineStyle}>
          [+] Reporting templates: INITIALIZED
        </div>
        <div style={{...terminalLineStyle, color: '#ff4444'}}>
          [!] Remember: Ethical scope control required
        </div>
      </div>
    </div>
  </div>
);

// Vulnerable Lab Section
const VulnLab: React.FC = () => {
  const [notes, setNotes] = React.useState<string>(
    "TARGET_SYSTEM: VulnHub/THM_VM\nIP_RANGE: 10.10.0.0/24\nSCOPE: Lab_Network_Only\n\nRECON_NOTES:\n- Service enumeration in progress\n- Potential entry points identified\n"
  );
  const [attackChain, setAttackChain] = React.useState<AttackStep[]>([
    { phase: "RECON", detail: "nmap -sC -sV -p- 10.10.0.42", risk: "LOW" },
    { phase: "INITIAL_ACCESS", detail: "CMS upload bypass -> webshell", risk: "HIGH" },
  ]);

  return (
    <div style={sectionStyle}>
      <div style={sectionHeaderStyle}>
        <h2 style={sectionTitleStyle}>VULNERABLE LAB EXPLOITATION</h2>
        <div style={statusBadgeStyle}>TARGET: ACQUIRED</div>
      </div>

      <div style={gridLayoutStyle}>
        <div style={panelStyle}>
          <div style={panelHeaderStyle}>
            <span style={panelIconStyle}>🎯</span>
            <h3 style={panelTitleStyle}>DEPLOYMENT PROTOCOL</h3>
          </div>
          <div style={panelContentStyle}>
            <div style={stepStyle}>
              <span style={stepNumberStyle}>01</span>
              <span>Import vulnerable VM (VulnHub/THM) to isolated network</span>
            </div>
            <div style={stepStyle}>
              <span style={stepNumberStyle}>02</span>
              <span>Configure host-only network with attack machine</span>
            </div>
            <div style={stepStyle}>
              <span style={stepNumberStyle}>03</span>
              <span>Create VM snapshot for clean reversion</span>
            </div>
            <div style={stepStyle}>
              <span style={stepNumberStyle}>04</span>
              <span>Initialize traffic capture and logging</span>
            </div>
          </div>
        </div>

        <div style={panelStyle}>
          <div style={panelHeaderStyle}>
            <span style={panelIconStyle}>⚔️</span>
            <h3 style={panelTitleStyle}>ATTACK CHAIN</h3>
          </div>
          <div style={panelContentStyle}>
            <AttackChainEditor steps={attackChain} onChange={setAttackChain} />
          </div>
        </div>
      </div>

      <div style={panelStyle}>
        <div style={panelHeaderStyle}>
          <span style={panelIconStyle}>📝</span>
          <h3 style={panelTitleStyle}>OPERATION_NOTES</h3>
        </div>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          style={textareaStyle}
          placeholder="Enter reconnaissance and exploitation notes..."
        />
      </div>
    </div>
  );
};

// Web App Pentest Section
const WebAppPentest: React.FC = () => {
  const [zapBefore, setZapBefore] = React.useState<number | "">(47);
  const [zapAfter, setZapAfter] = React.useState<number | "">(12);

  return (
    <div style={sectionStyle}>
      <div style={sectionHeaderStyle}>
        <h2 style={sectionTitleStyle}>WEB APPLICATION ASSAULT</h2>
        <div style={statusBadgeStyle}>OWASP: ACTIVE</div>
      </div>

      <div style={gridLayoutStyle}>
        <div style={panelStyle}>
          <div style={panelHeaderStyle}>
            <span style={panelIconStyle}>🕷️</span>
            <h3 style={panelTitleStyle}>TARGET_APPS</h3>
          </div>
          <div style={panelContentStyle}>
            <div style={targetAppStyle}>
              <span style={appNameStyle}>DVWA</span>
              <span style={vulnerabilityBadgeStyle}>SQL_INJECTION</span>
              <span style={vulnerabilityBadgeStyle}>XSS</span>
              <span style={vulnerabilityBadgeStyle}>CSRF</span>
            </div>
            <div style={targetAppStyle}>
              <span style={appNameStyle}>JUICE_SHOP</span>
              <span style={vulnerabilityBadgeStyle}>BROKEN_AUTH</span>
              <span style={vulnerabilityBadgeStyle}>SECURITY_MISC</span>
            </div>
            <div style={targetAppStyle}>
              <span style={appNameStyle}>WEBGOAT</span>
              <span style={vulnerabilityBadgeStyle}>INJECTION</span>
              <span style={vulnerabilityBadgeStyle}>BROKEN_ACCESS</span>
            </div>
          </div>
        </div>

        <div style={panelStyle}>
          <div style={panelHeaderStyle}>
            <span style={panelIconStyle}>🔍</span>
            <h3 style={panelTitleStyle}>ZAP_SCAN_RESULTS</h3>
          </div>
          <div style={panelContentStyle}>
            <div style={zapResultStyle}>
              <label style={zapLabelStyle}>
                PRE-ATTACK ALERTS:
                <input
                  type="number"
                  value={zapBefore}
                  onChange={(e) => setZapBefore(e.target.value ? Number(e.target.value) : "")}
                  style={zapInputStyle}
                  min={0}
                />
              </label>
              <label style={zapLabelStyle}>
                POST-MITIGATION ALERTS:
                <input
                  type="number"
                  value={zapAfter}
                  onChange={(e) => setZapAfter(e.target.value ? Number(e.target.value) : "")}
                  style={zapInputStyle}
                  min={0}
                />
              </label>
              <div style={improvementStyle}>
                SECURITY IMPROVEMENT: {
                  typeof zapBefore === "number" && typeof zapAfter === "number"
                    ? Math.max(0, zapBefore - zapAfter)
                    : "—"
                } VULNERABILITIES ELIMINATED
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style={panelStyle}>
        <div style={panelHeaderStyle}>
          <span style={panelIconStyle}>🛡️</span>
          <h3 style={panelTitleStyle}>COUNTERMEASURES_DATABASE</h3>
        </div>
        <div style={panelContentStyle}>
          <div style={countermeasuresGridStyle}>
            <CountermeasureCard 
              title="INPUT_VALIDATION"
              description="Parameterized queries, input sanitization, type checking"
            />
            <CountermeasureCard 
              title="AUTHENTICATION"
              description="Strong password policies, MFA, session management"
            />
            <CountermeasureCard 
              title="AUTHORIZATION"
              description="Principle of least privilege, RBAC, access controls"
            />
            <CountermeasureCard 
              title="SECURITY_HEADERS"
              description="CSP, HSTS, X-Frame-Options, X-Content-Type-Options"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// Report Template Section
const ReportTemplate: React.FC = () => (
  <div style={sectionStyle}>
    <div style={sectionHeaderStyle}>
      <h2 style={sectionTitleStyle}>INTELLIGENCE REPORT TEMPLATE</h2>
      <div style={statusBadgeStyle}>CLASSIFIED</div>
    </div>

    <div style={reportSectionsStyle}>
      <ReportSection 
        number="01"
        title="EXECUTIVE_SUMMARY"
        content="High-level risk assessment, affected assets, business impact analysis"
      />
      <ReportSection 
        number="02"
        title="SCOPE_AND_METHODOLOGY"
        content="Target identification, tools deployed, rules of engagement, testing approach"
      />
      <ReportSection 
        number="03"
        title="VULNERABILITY_ANALYSIS"
        content="Per-issue breakdown: severity, CVSS scores, exploitation evidence, impact assessment"
      />
      <ReportSection 
        number="04"
        title="ATTACK_NARRATIVE"
        content="Kill chain progression, lateral movement paths, persistence mechanisms, data exfiltration"
      />
      <ReportSection 
        number="05"
        title="REMEDIATION_STRATEGY"
        content="Patches, configuration hardening, monitoring recommendations, compensating controls"
      />
      <ReportSection 
        number="06"
        title="TECHNICAL_APPENDIX"
        content="Tool outputs, payloads, proof-of-concept code, network diagrams"
      />
    </div>
  </div>
);

// Helper Components
interface AttackStep {
  phase: string;
  detail: string;
  risk: string;
}

interface AttackChainEditorProps {
  steps: AttackStep[];
  onChange: (steps: AttackStep[]) => void;
}

const AttackChainEditor: React.FC<AttackChainEditorProps> = ({ steps, onChange }) => {
  const addStep = () => {
    onChange([...steps, { phase: "NEW_PHASE", detail: "Enter attack details", risk: "MEDIUM" }]);
  };

  const updateStep = (index: number, field: keyof AttackStep, value: string) => {
    const newSteps = [...steps];
    newSteps[index][field] = value;
    onChange(newSteps);
  };

  return (
    <div style={attackChainStyle}>
      {steps.map((step, index) => (
        <div key={index} style={attackStepStyle}>
          <div style={attackStepHeaderStyle}>
            <span style={stepPhaseStyle}>{step.phase}</span>
            <span style={{...riskBadgeStyle, 
              background: step.risk === "HIGH" ? "#ff4444" : 
                         step.risk === "MEDIUM" ? "#ffaa44" : "#44ff44"
            }}>
              {step.risk}
            </span>
          </div>
          <input
            type="text"
            value={step.detail}
            onChange={(e) => updateStep(index, "detail", e.target.value)}
            style={attackInputStyle}
            placeholder="Enter attack details..."
          />
        </div>
      ))}
      <button onClick={addStep} style={addStepButtonStyle}>
        + ADD_ATTACK_VECTOR
      </button>
    </div>
  );
};

const ObjectiveCard: React.FC<{
  title: string;
  details: string[];
  tools: string[];
}> = ({ title, details, tools }) => (
  <div style={objectiveCardStyle}>
    <h3 style={objectiveTitleStyle}>{title}</h3>
    <div style={objectiveDetailsStyle}>
      {details.map((detail, index) => (
        <div key={index} style={objectiveDetailStyle}>• {detail}</div>
      ))}
    </div>
    <div style={objectiveToolsStyle}>
      <span style={toolsLabelStyle}>TOOLS:</span>
      {tools.map((tool, index) => (
        <span key={index} style={toolBadgeStyle}>{tool}</span>
      ))}
    </div>
  </div>
);

const CountermeasureCard: React.FC<{
  title: string;
  description: string;
}> = ({ title, description }) => (
  <div style={countermeasureCardStyle}>
    <h4 style={countermeasureTitleStyle}>{title}</h4>
    <p style={countermeasureDescStyle}>{description}</p>
  </div>
);

const ReportSection: React.FC<{
  number: string;
  title: string;
  content: string;
}> = ({ number, title, content }) => (
  <div style={reportSectionStyle}>
    <div style={reportSectionHeaderStyle}>
      <span style={reportNumberStyle}>{number}</span>
      <h3 style={reportSectionTitleStyle}>{title}</h3>
    </div>
    <p style={reportContentStyle}>{content}</p>
  </div>
);

// Styles
const containerStyle: React.CSSProperties = {
  minHeight: "100vh",
  background: "linear-gradient(135deg, #0a0a0a 0%, #1a0a0a 100%)",
  color: "#ff4444",
  fontFamily: "'Courier New', monospace",
  fontSize: "14px",
  lineHeight: 1.4,
  position: "relative",
  overflow: "hidden"
};

const backgroundStyle: React.CSSProperties = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundImage: `
    radial-gradient(circle at 20% 50%, rgba(255, 68, 68, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(255, 68, 68, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 40% 80%, rgba(255, 68, 68, 0.1) 0%, transparent 50%)
  `,
  animation: "redPulse 4s ease-in-out infinite"
};

const headerStyle: React.CSSProperties = {
  position: "relative",
  zIndex: 1,
  maxWidth: "1200px",
  margin: "0 auto",
  padding: "20px"
};

const terminalBarStyle: React.CSSProperties = {
  background: "#222",
  border: "1px solid #ff4444",
  borderRadius: "8px 8px 0 0",
  padding: "8px 16px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between"
};

const terminalDotsStyle: React.CSSProperties = {
  display: "flex",
  gap: "6px"
};

const terminalDotStyle: React.CSSProperties = {
  width: "12px",
  height: "12px",
  borderRadius: "50%"
};

const terminalTitleStyle: React.CSSProperties = {
  color: "#ff4444",
  fontSize: "12px",
  fontWeight: "bold"
};

const titleSectionStyle: React.CSSProperties = {
  background: "#111",
  border: "1px solid #ff4444",
  borderTop: "none",
  borderRadius: "0 0 8px 8px",
  padding: "24px",
  textAlign: "center"
};

const mainTitleStyle: React.CSSProperties = {
  margin: 0,
  fontSize: clamp(24, 5, 48),
  fontWeight: "bold",
  letterSpacing: "2px",
  textShadow: "0 0 10px #ff4444"
};

const redTextStyle: React.CSSProperties = {
  color: "#ff4444"
};

const hackTextStyle: React.CSSProperties = {
  color: "#ffffff",
  animation: "glitch 2s infinite"
};

const subtitleStyle: React.CSSProperties = {
  margin: "16px 0",
  color: "#ff6666",
  fontSize: "16px",
  letterSpacing: "1px"
};

const backButtonStyle: React.CSSProperties = {
  marginTop: "16px",
  background: "transparent",
  color: "#ff4444",
  border: "2px solid #ff4444",
  padding: "8px 16px",
  fontSize: "12px",
  fontFamily: "inherit",
  cursor: "pointer",
  transition: "all 0.3s ease",
  letterSpacing: "1px"
};

const navStyle: React.CSSProperties = {
  position: "relative",
  zIndex: 1,
  maxWidth: "1200px",
  margin: "0 auto 20px",
  padding: "0 20px",
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
  gap: "12px"
};

const navButtonStyle: React.CSSProperties = {
  background: "linear-gradient(145deg, #1a1a1a, #2a2a2a)",
  color: "#ff6666",
  border: "2px solid #333",
  padding: "16px",
  fontSize: "12px",
  fontFamily: "inherit",
  cursor: "pointer",
  transition: "all 0.3s ease",
  display: "flex",
  alignItems: "center",
  gap: "8px",
  letterSpacing: "1px",
  boxShadow: "4px 4px 0px #000"
};

const activeNavButtonStyle: React.CSSProperties = {
  background: "linear-gradient(145deg, #ff4444, #cc3333)",
  color: "#fff",
  border: "2px solid #ff4444",
  transform: "translate(-2px, -2px)",
  boxShadow: "6px 6px 0px #000"
};

const navIconStyle: React.CSSProperties = {
  fontSize: "16px"
};

const contentStyle: React.CSSProperties = {
  position: "relative",
  zIndex: 1,
  maxWidth: "1200px",
  margin: "0 auto",
  padding: "0 20px 40px"
};

const footerStyle: React.CSSProperties = {
  position: "relative",
  zIndex: 1,
  maxWidth: "1200px",
  margin: "0 auto",
  padding: "20px",
  textAlign: "center"
};

const warningStyle: React.CSSProperties = {
  background: "#2a1a1a",
  border: "2px solid #ff4444",
  padding: "12px",
  color: "#ff6666",
  fontSize: "12px",
  letterSpacing: "1px",
  animation: "pulse 2s infinite"
};

const sectionStyle: React.CSSProperties = {
  display: "grid",
  gap: "20px"
};

const sectionHeaderStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  marginBottom: "16px"
};

const sectionTitleStyle: React.CSSProperties = {
  margin: 0,
  fontSize: "24px",
  color: "#ff4444",
  letterSpacing: "2px",
  textShadow: "0 0 5px #ff4444"
};

const statusBadgeStyle: React.CSSProperties = {
  background: "#ff4444",
  color: "#000",
  padding: "4px 12px",
  fontSize: "10px",
  fontWeight: "bold",
  letterSpacing: "1px",
  border: "2px solid #000",
  boxShadow: "2px 2px 0px #000"
};

const objectivesGridStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
  gap: "16px"
};

const objectiveCardStyle: React.CSSProperties = {
  background: "linear-gradient(145deg, #1a1a1a, #2a1a1a)",
  border: "2px solid #ff4444",
  padding: "16px",
  borderRadius: "0",
  boxShadow: "4px 4px 0px #000"
};

const objectiveTitleStyle: React.CSSProperties = {
  margin: "0 0 12px 0",
  fontSize: "16px",
  color: "#ff4444",
  letterSpacing: "1px"
};

const objectiveDetailsStyle: React.CSSProperties = {
  marginBottom: "12px"
};

const objectiveDetailStyle: React.CSSProperties = {
  color: "#ccc",
  fontSize: "12px",
  marginBottom: "4px"
};

const objectiveToolsStyle: React.CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  gap: "6px",
  alignItems: "center"
};

const toolsLabelStyle: React.CSSProperties = {
  fontSize: "10px",
  color: "#ff6666",
  marginRight: "8px"
};

const toolBadgeStyle: React.CSSProperties = {
  background: "#333",
  color: "#ff4444",
  padding: "2px 6px",
  fontSize: "10px",
  border: "1px solid #ff4444"
};

const terminalOutputStyle: React.CSSProperties = {
  background: "#000",
  border: "2px solid #ff4444",
  borderRadius: "4px",
  overflow: "hidden"
};

const terminalHeaderStyle: React.CSSProperties = {
  background: "#ff4444",
  color: "#000",
  padding: "8px 16px",
  fontSize: "12px",
  fontWeight: "bold"
};

const terminalContentStyle: React.CSSProperties = {
  padding: "16px",
  fontFamily: "'Courier New', monospace",
  fontSize: "12px"
};

const terminalLineStyle: React.CSSProperties = {
  color: "#ff6666",
  marginBottom: "4px"
};

const gridLayoutStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
  gap: "20px"
};

const panelStyle: React.CSSProperties = {
  background: "linear-gradient(145deg, #1a1a1a, #2a1a1a)",
  border: "2px solid #ff4444",
  borderRadius: "0",
  overflow: "hidden",
  boxShadow: "4px 4px 0px #000"
};

const panelHeaderStyle: React.CSSProperties = {
  background: "#ff4444",
  color: "#000",
  padding: "12px 16px",
  display: "flex",
  alignItems: "center",
  gap: "8px"
};

const panelIconStyle: React.CSSProperties = {
  fontSize: "16px"
};

const panelTitleStyle: React.CSSProperties = {
  margin: 0,
  fontSize: "14px",
  fontWeight: "bold",
  letterSpacing: "1px"
};

const panelContentStyle: React.CSSProperties = {
  padding: "16px"
};

const stepStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "12px",
  marginBottom: "12px",
  padding: "8px",
  background: "#222",
  border: "1px solid #444"
};

const stepNumberStyle: React.CSSProperties = {
  background: "#ff4444",
  color: "#000",
  width: "24px",
  height: "24px",
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "10px",
  fontWeight: "bold",
  flexShrink: 0
};

const textareaStyle: React.CSSProperties = {
  width: "100%",
  minHeight: "120px",
  background: "#000",
  color: "#ff6666",
  border: "1px solid #ff4444",
  padding: "12px",
  fontSize: "12px",
  fontFamily: "'Courier New', monospace",
  resize: "vertical"
};

const targetAppStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "8px",
  marginBottom: "12px",
  padding: "8px",
  background: "#222",
  border: "1px solid #444"
};

const appNameStyle: React.CSSProperties = {
  color: "#ff4444",
  fontWeight: "bold",
  minWidth: "100px"
};

const vulnerabilityBadgeStyle: React.CSSProperties = {
  background: "#333",
  color: "#ff6666",
  padding: "2px 6px",
  fontSize: "10px",
  border: "1px solid #666"
};

const zapResultStyle: React.CSSProperties = {
  display: "grid",
  gap: "12px"
};

const zapLabelStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column" as const,
  gap: "4px",
  fontSize: "12px",
  color: "#ff6666"
};

const zapInputStyle: React.CSSProperties = {
  background: "#000",
  color: "#ff4444",
  border: "1px solid #ff4444",
  padding: "6px",
  fontSize: "12px",
  fontFamily: "inherit",
  width: "100px"
};

const improvementStyle: React.CSSProperties = {
  background: "#0a2a0a",
  color: "#44ff44",
  padding: "8px",
  border: "1px solid #44ff44",
  fontSize: "12px",
  fontWeight: "bold",
  textAlign: "center" as const
};

const countermeasuresGridStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
  gap: "12px"
};

const countermeasureCardStyle: React.CSSProperties = {
  background: "#222",
  border: "1px solid #444",
  padding: "12px"
};

const countermeasureTitleStyle: React.CSSProperties = {
  margin: "0 0 8px 0",
  fontSize: "12px",
  color: "#ff4444",
  letterSpacing: "1px"
};

const countermeasureDescStyle: React.CSSProperties = {
  margin: 0,
  fontSize: "11px",
  color: "#ccc",
  lineHeight: 1.4
};

const reportSectionsStyle: React.CSSProperties = {
  display: "grid",
  gap: "16px"
};

const reportSectionStyle: React.CSSProperties = {
  background: "linear-gradient(145deg, #1a1a1a, #2a1a1a)",
  border: "2px solid #ff4444",
  padding: "16px",
  boxShadow: "4px 4px 0px #000"
};

const reportSectionHeaderStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "12px",
  marginBottom: "8px"
};

const reportNumberStyle: React.CSSProperties = {
  background: "#ff4444",
  color: "#000",
  width: "32px",
  height: "32px",
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "14px",
  fontWeight: "bold"
};

const reportSectionTitleStyle: React.CSSProperties = {
  margin: 0,
  fontSize: "16px",
  color: "#ff4444",
  letterSpacing: "1px"
};

const reportContentStyle: React.CSSProperties = {
  margin: 0,
  fontSize: "12px",
  color: "#ccc",
  lineHeight: 1.4
};

const attackChainStyle: React.CSSProperties = {
  display: "grid",
  gap: "8px"
};

const attackStepStyle: React.CSSProperties = {
  background: "#222",
  border: "1px solid #444",
  padding: "12px"
};

const attackStepHeaderStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "8px"
};

const stepPhaseStyle: React.CSSProperties = {
  color: "#ff4444",
  fontSize: "12px",
  fontWeight: "bold"
};

const riskBadgeStyle: React.CSSProperties = {
  color: "#000",
  padding: "2px 6px",
  fontSize: "10px",
  fontWeight: "bold"
};

const attackInputStyle: React.CSSProperties = {
  width: "100%",
  background: "#000",
  color: "#ff6666",
  border: "1px solid #444",
  padding: "6px",
  fontSize: "12px",
  fontFamily: "inherit"
};

const addStepButtonStyle: React.CSSProperties = {
  background: "transparent",
  color: "#ff4444",
  border: "2px dashed #ff4444",
  padding: "12px",
  fontSize: "12px",
  fontFamily: "inherit",
  cursor: "pointer",
  letterSpacing: "1px"
};

// Helper function for responsive font sizing
function clamp(min: number, vw: number, max: number): string {
  return `clamp(${min}px, ${vw}vw, ${max}px)`;
}

export default OffensiveRedTeam;
