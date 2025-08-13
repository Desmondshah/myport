import React from "react";
import { createRoot } from "react-dom/client";
import { ConvexReactClient } from "convex/react";
import { ConvexAuthProvider, useAuthActions } from "@convex-dev/auth/react";
import { SignInForm, AnonymousButton } from "./auth/AuthComponents.js";
import { IpAddressLookup } from "./projects/basic/IpAddressLookup.js";
import { LocalNetworkDeviceFinder } from "./projects/basic/LocalNetworkDeviceFinder.js";
import { InternetSpeedTest } from "./projects/basic/InternetSpeedTest.js";
import { BasicEncryptionTool } from "./projects/basic/BasicEncryptionTool.js";
import { PasswordLeakDemo } from "./projects/basic/PasswordLeakDemo.js";
import { RealTimeSystemHealthMonitor } from "./projects/intermediate/RealTimeSystemHealthMonitor.js";
import { DefensiveBlueTeam } from "./projects/portfolio flagship/DefensiveBlueTeam.js";
import { OffensiveRedTeam } from "./projects/portfolio flagship/OffensiveRedTeam.js";
import LoadingPage from "./components/LoadingPage.js";

const convex = new ConvexReactClient(import.meta.env.VITE_CONVEX_URL || "");

// Auth UI moved to src/auth/AuthComponents.tsx

function HomeContent() {
  return (
    <section
      style={{
        maxWidth: 1200,
        margin: "0 auto",
        display: "grid",
        gap: "var(--space-3xl)",
      }}
    >
      <div className="hero">
        <div className="hero__content">
          <h1 className="hero__title">Seyi Opeoluwa</h1>
          <h2 className="hero__subtitle">
            🛡️ IT & Cybersecurity Student | Building Secure Digital Futures
          </h2>
          <div
            style={{
              display: "flex",
              gap: "var(--space-md)",
              flexWrap: "wrap",
              marginTop: "var(--space-xl)",
            }}
          >
            <span className="badge badge--success">
              <span className="status-dot status-dot--active"></span>
              Available for Internships
            </span>
            <span className="badge badge--warning">
              <span className="status-dot status-dot--in-progress"></span>
              Building Security Portfolio
            </span>
          </div>
        </div>
      </div>

      <div className="card card--featured">
        <div className="edu" aria-labelledby="edu-heading">
          <h2 id="edu-heading" className="edu__title">
            <span>Education</span>
          </h2>
          <p className="edu__degree">
            B.S. in Information Technology <br />
            <strong>(Cybersecurity & Cloud Infrastructure Track)</strong>
          </p>
          <div className="edu__grid">
            <div className="edu__block">
              <h4>🎯 Focus Areas</h4>
              <p className="edu__focus">
                I build and secure systems with a passion for network defense,
                cloud security, and intelligent automation that makes digital
                environments safer.
              </p>
            </div>
            <div className="edu__block">
              <h4>⚡ Technical Arsenal</h4>
              <ul className="chunky-tags">
                <li>Python</li>
                <li>TypeScript</li>
                <li>Linux / Bash</li>
                <li>AWS & Azure</li>
                <li>Network Security</li>
                <li>Penetration Testing</li>
                <li>Data Analysis</li>
                <li>Technical Writing</li>
              </ul>
            </div>
            <div className="edu__block">
              <h4>🏆 Achievements & Certifications</h4>
              <ul className="edu__achievements">
                <li>Google Cybersecurity Professional (In Progress)</li>
                <li>CompTIA Security+ (Expected Dec 2025)</li>
                <li>CompTIA IT Fundamentals+</li>
                <li>Active Security Research Projects</li>
              </ul>
            </div>
            <div className="edu__block">
              <h4>🚀 Beyond the Classroom</h4>
              <p className="edu__outside">
                Continuously experimenting with AI-powered security tools,
                contributing to open-source projects, and building innovative
                security-focused side projects that solve real-world problems.
              </p>
            </div>
          </div>
        </div>
        <footer
          style={{
            fontSize: "var(--text-sm)",
            marginTop: "var(--space-xl)",
            textAlign: "center",
            opacity: 0.7,
          }}
        >
          <em>🔄 Last updated 2025 • Always evolving, always learning</em>
        </footer>
      </div>
    </section>
  );
}

function ProjectsContent({ goTo }: { goTo: (view: string) => void }) {
  return (
    <section
      style={{
        maxWidth: 1200,
        margin: "0 auto",
        display: "grid",
        gap: "var(--space-3xl)",
      }}
    >
      <header className="hero">
        <div className="hero__content">
          <h1 className="hero__title">Projects</h1>
          <p className="hero__subtitle">
            🚀 A curated progression from fundamentals to advanced security &
            systems engineering
          </p>
        </div>
      </header>

      <details open className="details-block">
        <summary>
          <span style={{ fontWeight: 700, fontSize: "var(--text-xl)" }}>
            🎯 Basic Projects
          </span>
          <span className="badge badge--secondary">Foundational Skills</span>
        </summary>
        <div style={{ marginTop: "var(--space-xl)" }}>
          <ul className="project-grid">
            <li className="project-card">
              <div className="project-card__title">🌐 IP Address Lookup</div>
              <p className="project-card__description">
                Advanced geolocation tool that fetches your public IP and
                displays comprehensive geographical, ISP, and timezone
                information with beautiful visualizations.
              </p>
              <p className="project-card__tech">
                React • Geolocation APIs • Data Visualization
              </p>
              <div className="project-card__actions">
                <button
                  onClick={() => goTo("iplookup")}
                  className="button--primary"
                  aria-label="Open IP Address Lookup Tool"
                >
                  Launch Tool
                </button>
                <span className="badge badge--success">Live</span>
              </div>
            </li>

            <li className="project-card">
              <div className="project-card__title">
                🔍 Network Device Scanner
              </div>
              <p className="project-card__description">
                Intelligent network discovery tool that parses ARP and neighbor
                tables to map local devices with MAC address resolution and
                device fingerprinting.
              </p>
              <p className="project-card__tech">
                React • Network Analysis • Device Fingerprinting
              </p>
              <div className="project-card__actions">
                <button
                  onClick={() => goTo("lanfinder")}
                  className="button--primary"
                  aria-label="Open Network Device Scanner"
                >
                  Launch Scanner
                </button>
                <span className="badge badge--success">Live</span>
              </div>
            </li>

            <li className="project-card">
              <div className="project-card__title">
                ⚡ Internet Speed Analyzer
              </div>
              <p className="project-card__description">
                Real-time network performance analyzer measuring latency,
                download/upload speeds with detailed metrics and historical
                performance tracking.
              </p>
              <p className="project-card__tech">
                React • Performance Metrics • Real-time Analytics
              </p>
              <div className="project-card__actions">
                <button
                  onClick={() => goTo("speedtest")}
                  className="button--primary"
                  aria-label="Open Speed Test Tool"
                >
                  Test Speed
                </button>
                <span className="badge badge--success">Live</span>
              </div>
            </li>

            <li className="project-card">
              <div className="project-card__title">
                🔐 Encryption Playground
              </div>
              <p className="project-card__description">
                Interactive cryptography demonstration featuring Caesar cipher,
                Base64 encoding, and modern encryption algorithms with
                educational explanations.
              </p>
              <p className="project-card__tech">
                React • Cryptography • Educational Tools
              </p>
              <div className="project-card__actions">
                <button
                  onClick={() => goTo("encryption")}
                  className="button--primary"
                  aria-label="Open Encryption Tool"
                >
                  Explore Crypto
                </button>
                <span className="badge badge--success">Live</span>
              </div>
            </li>

            <li className="project-card">
              <div className="project-card__title">
                🛡️ Password Breach Checker
              </div>
              <p className="project-card__description">
                Privacy-preserving password security checker using k-anonymity
                and hashed breach databases to verify password compromise
                without exposing sensitive data.
              </p>
              <p className="project-card__tech">
                React • Security APIs • Privacy Engineering
              </p>
              <div className="project-card__actions">
                <button
                  onClick={() => goTo("pwleak")}
                  className="button--primary"
                  aria-label="Open Password Breach Checker"
                >
                  Check Security
                </button>
                <span className="badge badge--warning">Privacy-First</span>
              </div>
            </li>
          </ul>
        </div>
      </details>

      <details className="details-block">
        <summary>
          <span style={{ fontWeight: 700, fontSize: "var(--text-xl)" }}>
            ⚡ Intermediate Projects
          </span>
          <span className="badge badge--secondary">
            Multi-Domain Integration
          </span>
        </summary>
        <div style={{ marginTop: "var(--space-xl)" }}>
          <ul className="project-grid">
            <li className="project-card">
              <div className="project-card__title">📊 Network Log Analyzer</div>
              <p className="project-card__description">
                Intelligent firewall and router log parsing system with anomaly
                detection, threat pattern recognition, and automated alert
                generation.
              </p>
              <p className="project-card__tech">
                Python • pandas • Machine Learning • Security Automation
              </p>
              <div className="project-card__actions">
                <span className="badge badge--warning">In Development</span>
              </div>
            </li>

            <li className="project-card">
              <div className="project-card__title">
                📈 Service Uptime Dashboard
              </div>
              <p className="project-card__description">
                Comprehensive homelab monitoring solution that tracks service
                availability, performance metrics, and generates detailed uptime
                reports with alerting.
              </p>
              <p className="project-card__tech">
                Node.js • REST APIs • Time-Series DB • Monitoring
              </p>
              <div className="project-card__actions">
                <span className="badge badge--warning">In Development</span>
              </div>
            </li>

            <li className="project-card">
              <div className="project-card__title">
                🖥️ Real-Time System Monitor
              </div>
              <p className="project-card__description">
                Live system health monitoring with real-time CPU, memory, and
                network statistics displayed through beautiful, responsive
                dashboards.
              </p>
              <p className="project-card__tech">
                React • Convex • Real-time WebSockets • System APIs
              </p>
              <div className="project-card__actions">
                <button
                  onClick={() => goTo("sysmon")}
                  className="button--primary"
                  aria-label="Open Real-Time System Monitor"
                >
                  Monitor Systems
                </button>
                <span className="badge badge--success">Live</span>
              </div>
            </li>
          </ul>
        </div>
      </details>

      <details className="details-block">
        <summary>
          <span style={{ fontWeight: 700, fontSize: "var(--text-xl)" }}>
            🚀 Advanced Projects
          </span>
          <span className="badge badge--warning">Systems & Security Depth</span>
        </summary>
        <div style={{ marginTop: "var(--space-xl)" }}>
          <ul className="project-grid">
            <li className="project-card">
              <div className="project-card__title">☁️ Cloud Cost Guardian</div>
              <p className="project-card__description">
                Advanced cloud cost optimization platform that tracks ephemeral
                environments, detects cost drift, and provides intelligent
                resource recommendations.
              </p>
              <p className="project-card__tech">
                AWS • Cost APIs • Machine Learning • Optimization
              </p>
              <div className="project-card__actions">
                <span className="badge">Concept</span>
              </div>
            </li>

            <li className="project-card">
              <div className="project-card__title">
                🔒 Homelab Security Baselines
              </div>
              <p className="project-card__description">
                CIS-inspired security hardening framework with automated
                baseline scripts, compliance checking, and configuration
                management for homelab environments.
              </p>
              <p className="project-card__tech">
                Linux • Ansible • Security Frameworks • Compliance
              </p>
              <div className="project-card__actions">
                <span className="badge">Concept</span>
              </div>
            </li>
          </ul>
        </div>
      </details>

      <details className="details-block">
        <summary>
          <span style={{ fontWeight: 700, fontSize: "var(--text-xl)" }}>
            🎖️ Portfolio Flagship
          </span>
          <span className="badge badge--error">Showcase Projects</span>
        </summary>
        <div style={{ marginTop: "var(--space-xl)" }}>
          <ul className="project-grid">
            <li className="project-card project-card--featured">
              <div className="project-card__title">
                🛡️ Security Operations Hub
              </div>
              <p className="project-card__description">
                Comprehensive security operations platform aggregating logs,
                system health metrics, and anomaly scoring for complete homelab
                security visibility and response.
              </p>
              <p className="project-card__tech">
                TypeScript • Convex • React • Security Analytics
              </p>
              <div className="project-card__actions">
                <span className="badge badge--warning">In Progress</span>
                <span className="badge badge--error">Flagship</span>
              </div>
            </li>

            <li className="project-card">
              <div className="project-card__title">🔵 Blue Team Operations</div>
              <p className="project-card__description">
                Advanced defensive security platform featuring SIEM detections,
                incident response automation, and comprehensive threat hunting
                capabilities with documented workflows.
              </p>
              <p className="project-card__tech">
                Splunk • ELK Stack • Volatility • Wireshark • IOC Analysis
              </p>
              <div className="project-card__actions">
                <button
                  onClick={() => goTo("blueteam")}
                  className="button--primary"
                  aria-label="Open Blue Team Operations"
                >
                  Defend Systems
                </button>
                <span className="badge badge--success">Operational</span>
              </div>
            </li>

            <li className="project-card">
              <div className="project-card__title">🔴 Red Team Arsenal</div>
              <p className="project-card__description">
                Professional penetration testing platform for exploiting lab
                environments, securing vulnerable applications, and generating
                client-grade security reports.
              </p>
              <p className="project-card__tech">
                Nmap • Burp Suite • Metasploit • OWASP ZAP • Custom Tools
              </p>
              <div className="project-card__actions">
                <button
                  onClick={() => goTo("redteam")}
                  className="button--primary"
                  aria-label="Open Red Team Arsenal"
                >
                  Launch Attacks
                </button>
                <span className="badge badge--error">Ethical Hacking</span>
              </div>
            </li>
          </ul>
        </div>
      </details>

      <div
        className="card"
        style={{ textAlign: "center", background: "var(--bg-muted)" }}
      >
        <p style={{ margin: 0, fontSize: "var(--text-sm)", fontWeight: 600 }}>
          🚧 Some projects are actively in development or conceptual phases
        </p>
        <p
          style={{
            margin: "var(--space-sm) 0 0",
            fontSize: "var(--text-xs)",
            opacity: 0.7,
          }}
        >
          Check back regularly for updates and new additions to the portfolio
        </p>
      </div>
    </section>
  );
}

function ContactContent() {
  return (
    <section
      style={{
        maxWidth: 1200,
        margin: "0 auto",
        display: "grid",
        gap: "var(--space-3xl)",
      }}
    >
      <div className="hero">
        <div className="hero__content">
          <h1 className="hero__title">Get In Touch</h1>
          <p className="hero__subtitle">
            🤝 Ready to collaborate, learn, and build the future of
            cybersecurity together
          </p>
        </div>
      </div>

      <div className="card card--featured">
        <div style={{ display: "grid", gap: "var(--space-xl)" }}>
          <div>
            <h3
              style={{
                margin: 0,
                fontSize: "var(--text-xl)",
                fontWeight: 700,
                color: "var(--bg-accent)",
              }}
            >
              🚀 Open to Opportunities
            </h3>
            <p
              style={{
                margin: "var(--space-md) 0 0",
                fontSize: "var(--text-lg)",
                lineHeight: 1.6,
              }}
            >
              I'm actively seeking <strong>internships</strong>,{" "}
              <strong>collaboration opportunities</strong>, and{" "}
              <strong>security-focused projects</strong> where I can contribute
              my skills while continuing to learn and grow in the cybersecurity
              field.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gap: "var(--space-lg)",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            }}
          >
            <div
              className="card"
              style={{ background: "var(--bg-accent-2)", color: "var(--fg)" }}
            >
              <h4
                style={{
                  margin: 0,
                  fontSize: "var(--text-lg)",
                  fontWeight: 700,
                }}
              >
                📧 Direct Contact
              </h4>
              <div style={{ marginTop: "var(--space-md)" }}>
                <p style={{ margin: 0, fontSize: "var(--text-base)" }}>
                  <strong>Email:</strong>{" "}
                  <a
                    href="mailto:seyi.opeoluwa@example.com"
                    style={{ color: "var(--bg-accent-3)" }}
                  >
                    seyi.opeoluwa@example.com
                  </a>
                </p>
                <p
                  style={{
                    margin: "var(--space-sm) 0 0",
                    fontSize: "var(--text-sm)",
                    opacity: 0.8,
                  }}
                >
                  Response time: Usually within 24 hours
                </p>
              </div>
            </div>

            <div
              className="card"
              style={{
                background: "var(--bg-accent-4)",
                color: "var(--fg-alt)",
              }}
            >
              <h4
                style={{
                  margin: 0,
                  fontSize: "var(--text-lg)",
                  fontWeight: 700,
                }}
              >
                🔗 Professional Networks
              </h4>
              <div
                style={{
                  marginTop: "var(--space-md)",
                  display: "grid",
                  gap: "var(--space-sm)",
                }}
              >
                <a
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  style={{
                    color: "var(--fg-alt)",
                    display: "flex",
                    alignItems: "center",
                    gap: "var(--space-sm)",
                    fontSize: "var(--text-base)",
                  }}
                >
                  <span>💼</span> LinkedIn: /in/seyi-opeoluwa
                </a>
                <a
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  style={{
                    color: "var(--fg-alt)",
                    display: "flex",
                    alignItems: "center",
                    gap: "var(--space-sm)",
                    fontSize: "var(--text-base)",
                  }}
                >
                  <span>🐙</span> GitHub: /seyi-cybersec
                </a>
                <a
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  style={{
                    color: "var(--fg-alt)",
                    display: "flex",
                    alignItems: "center",
                    gap: "var(--space-sm)",
                    fontSize: "var(--text-base)",
                  }}
                >
                  <span>🐦</span> Twitter: @seyi_security
                </a>
              </div>
            </div>

            <div
              className="card"
              style={{ background: "var(--bg-accent)", color: "var(--fg-alt)" }}
            >
              <h4
                style={{
                  margin: 0,
                  fontSize: "var(--text-lg)",
                  fontWeight: 700,
                }}
              >
                🎯 Areas of Interest
              </h4>
              <ul
                style={{
                  marginTop: "var(--space-md)",
                  paddingLeft: "var(--space-md)",
                  fontSize: "var(--text-base)",
                  lineHeight: 1.6,
                }}
              >
                <li>Security Operations & SIEM</li>
                <li>Cloud Security & DevSecOps</li>
                <li>Incident Response & Forensics</li>
                <li>Penetration Testing & Red Team</li>
                <li>Security Automation & Tooling</li>
              </ul>
            </div>
          </div>

          <div
            className="card"
            style={{ background: "var(--bg-muted)", textAlign: "center" }}
          >
            <h4
              style={{ margin: 0, fontSize: "var(--text-lg)", fontWeight: 700 }}
            >
              🤖 Let's Build Something Amazing
            </h4>
            <p
              style={{
                margin: "var(--space-md) 0 0",
                fontSize: "var(--text-base)",
                maxWidth: "60ch",
                marginLeft: "auto",
                marginRight: "auto",
                lineHeight: 1.6,
              }}
            >
              Whether you're looking for a passionate cybersecurity student to
              join your team, have an interesting project idea, or just want to
              discuss the latest in security trends, I'd love to hear from you!
            </p>
            <div
              style={{
                marginTop: "var(--space-lg)",
                display: "flex",
                gap: "var(--space-md)",
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              <span className="badge badge--success">
                <span className="status-dot status-dot--active"></span>
                Available for Work
              </span>
              <span className="badge badge--secondary">Remote-Friendly</span>
              <span className="badge badge--warning">Quick Learner</span>
            </div>
          </div>
        </div>
      </div>

      <footer
        style={{
          fontSize: "var(--text-sm)",
          textAlign: "center",
          opacity: 0.7,
          padding: "var(--space-xl)",
          borderTop: "2px dashed var(--border)",
        }}
      >
        <p style={{ margin: 0 }}>
          🔒{" "}
          <em>
            Note: Replace placeholder contact information with actual links when
            deploying
          </em>
        </p>
        <p style={{ margin: "var(--space-sm) 0 0" }}>
          <em>Built with passion for security • Updated 2025</em>
        </p>
      </footer>
    </section>
  );
}

// Small helper component for home sections
const Section: React.FC<{ title: string; children: React.ReactNode }> = ({
  title,
  children,
}) => (
  <div>
    <h3
      style={{
        margin: 0,
        fontSize: ".8rem",
        textTransform: "uppercase",
        letterSpacing: ".08em",
      }}
    >
      {title}
    </h3>
    <div style={{ marginTop: ".4rem", fontSize: ".85rem", maxWidth: 760 }}>
      {children}
    </div>
  </div>
);

const AUTH_STORAGE_KEY = "portfolio_authed_v1";

function App() {
  const { signOut } = useAuthActions();
  const [authed, setAuthed] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const [tab, setTab] = React.useState<
    | "home"
    | "projects"
    | "contact"
    | "iplookup"
    | "lanfinder"
    | "speedtest"
    | "encryption"
    | "pwleak"
    | "sysmon"
    | "blueteam"
    | "redteam"
  >("home");
  const setAuthedPersist = (value: boolean) => {
    setAuthed(value);
    try {
      if (value) {
        localStorage.setItem(AUTH_STORAGE_KEY, "1");
      } else {
        localStorage.removeItem(AUTH_STORAGE_KEY);
      }
    } catch (e) {
      // Storage might be unavailable (private mode, etc.)
      console.warn("Unable to access localStorage", e);
    }
  };

  React.useEffect(() => {
    try {
      if (localStorage.getItem(AUTH_STORAGE_KEY)) {
        setAuthed(true);
      }
    } catch (e) {
      console.warn("Unable to read localStorage", e);
    }
  }, []);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  // Show loading page first
  if (isLoading) {
    return (
      <LoadingPage onLoadingComplete={handleLoadingComplete} duration={4000} />
    );
  }

  const tabs: { key: typeof tab; label: string; hidden?: boolean }[] = [
    { key: "home", label: "Home" },
    { key: "projects", label: "Projects" },
    { key: "contact", label: "Contact" },
    { key: "iplookup", label: "IP Lookup", hidden: true },
    { key: "lanfinder", label: "LAN Finder", hidden: true },
    { key: "speedtest", label: "Speed Test", hidden: true },
    { key: "encryption", label: "Encryption", hidden: true },
    { key: "pwleak", label: "Password Leak", hidden: true },
    { key: "sysmon", label: "Sys Monitor", hidden: true },
    { key: "blueteam", label: "Blue Team", hidden: true },
    { key: "redteam", label: "Red Team", hidden: true },
  ];

  return (
    <main
      style={{
        padding: "var(--space-xl) var(--space-md) var(--space-3xl)",
        display: "grid",
        gap: "var(--space-3xl)",
        minHeight: "100vh",
        background: "var(--bg)",
      }}
    >
      {!authed && (
        <div
          style={{
            maxWidth: 500,
            margin: "0 auto",
            marginTop: "10vh",
          }}
        >
          <div className="hero">
            <div className="hero__content">
              <h1 className="hero__title">Seyi's Portfolio</h1>
              <p className="hero__subtitle">
                🔐 Cybersecurity Student & Future Security Professional
              </p>
              <div style={{ marginTop: "var(--space-xl)" }}>
                <p
                  style={{
                    margin: "0 0 var(--space-lg)",
                    fontSize: "var(--text-lg)",
                    opacity: 0.9,
                  }}
                >
                  Sign in to explore my journey or continue as a guest.
                </p>
                <SignInForm onAuthed={() => setAuthedPersist(true)} />
                <AnonymousButton onAuthed={() => setAuthedPersist(true)} />
              </div>
            </div>
          </div>
        </div>
      )}
      {authed && (
        <div style={{ display: "grid", gap: "var(--space-2xl)" }}>
          <nav
            aria-label="Main Navigation"
            className="nav-tabs"
            style={{
              display: "flex",
              gap: "var(--space-sm)",
              flexWrap: "wrap",
              alignItems: "center",
              position: "sticky",
              top: "var(--space-md)",
              zIndex: 100,
              maxWidth: 1200,
              margin: "0 auto",
              width: "100%",
            }}
          >
            <div
              style={{
                display: "flex",
                gap: "var(--space-sm)",
                flexWrap: "wrap",
                flex: 1,
              }}
            >
              {tabs
                .filter((t) => !t.hidden)
                .map((t) => (
                  <button
                    key={t.key}
                    onClick={() => setTab(t.key)}
                    aria-current={t.key === tab}
                    className={t.key === tab ? "button--primary" : ""}
                  >
                    {t.label}
                  </button>
                ))}
            </div>
            <div style={{ display: "flex", gap: "var(--space-sm)" }}>
              <button
                onClick={() => {
                  signOut();
                  setAuthedPersist(false);
                }}
                className="button--ghost"
                aria-label="Sign out of portfolio"
              >
                Sign Out
              </button>
            </div>
          </nav>
          {tab === "home" && <HomeContent />}
          {tab === "projects" && (
            <ProjectsContent
              goTo={(view) => {
                setTab(view as any);
              }}
            />
          )}
          {tab === "iplookup" && (
            <IpAddressLookup
              onBack={() => {
                setTab("projects");
              }}
            />
          )}
          {tab === "lanfinder" && (
            <LocalNetworkDeviceFinder
              onBack={() => {
                setTab("projects");
              }}
            />
          )}
          {tab === "speedtest" && (
            <InternetSpeedTest
              onBack={() => {
                setTab("projects");
              }}
            />
          )}
          {tab === "encryption" && (
            <BasicEncryptionTool
              onBack={() => {
                setTab("projects");
              }}
            />
          )}
          {tab === "pwleak" && (
            <PasswordLeakDemo
              onBack={() => {
                setTab("projects");
              }}
            />
          )}
          {tab === "sysmon" && (
            <RealTimeSystemHealthMonitor
              onBack={() => {
                setTab("projects");
              }}
            />
          )}
          {tab === "blueteam" && (
            <DefensiveBlueTeam
              onBack={() => {
                setTab("projects");
              }}
            />
          )}
          {tab === "redteam" && (
            <OffensiveRedTeam
              onBack={() => {
                setTab("projects");
              }}
            />
          )}
          {tab === "contact" && <ContactContent />}

          {/* Floating Action Button */}
          <button
            className="floating-cta"
            onClick={() => setTab("contact")}
            aria-label="Quick contact"
            title="Get in touch"
          >
            💬
          </button>
        </div>
      )}
    </main>
  );
}

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ConvexAuthProvider client={convex}>
      <App />
    </ConvexAuthProvider>
  </React.StrictMode>
);
