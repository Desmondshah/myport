# Portfolio Flagship

This folder contains two security flagship projects meant for portfolio viewing.

## Defensive Security / Blue Team

Showcase: Detect, analyze, and stop attacks via a SIEM lab and an incident response (IR) simulation.

## SIEM Threat Detection Lab

Stack options:

- Splunk (trial/dev license) or Elastic Stack (Elasticsearch + Kibana + Beats/Logstash)

Ingest sources (lab scope):

- Windows Event Logs (Security, Sysmon), Linux auth.log, Web server access logs, DNS/proxy, Firewall/router

Simulated attacks to generate signals:

- Brute force / password spray (repeated bad logins followed by success)
- Phishing clicks (mail log → proxy/DNS to newly seen domains)
- Malware beaconing (periodic low‑byte egress to rare external hosts)

Detection ideas (expressed generically):

- Brute force: count failed logins by user/IP over 5–10m; raise severity if a success follows shortly.
- Phishing: correlate email link clicks to first‑seen domain lookups and HTTP GETs from same host.
- Beaconing: detect fixed‑interval outbound connections with low variance in bytes; enrich with rarity.

Dashboards:

- Failed logins heatmap; geo‑velocity map; rare DNS domains; top talking hosts; alert timeline.

Alerting:

- Email/webhook with context (user, host, source IP, sample events, recommended actions).

## Incident Response Simulation (Ransomware in lab VM)

Scenario: A Windows VM shows ransom notes and suspicious processes.

Containment:

- Isolate VM networking (host‑only/remove NIC). Snapshot before changes.

Evidence collection:

- Memory: Acquire with WinPmem/DumpIt → analyze with Volatility (pslist, netscan, malfind, dlllist, handles).
- Network: Capture pcap with Wireshark/tcpdump; note periodic callbacks, suspicious TLS, DNS TXT.
- Disk/OS: Collect ransom notes, dropped binaries, prefetch, shimcache, SRUM, relevant Event Logs, Sysmon.

Analysis flow:

1. Volatility to enumerate/dump suspect processes; strings/IOCs extraction.
2. Wireshark filters by host; identify beacon patterns and exfil indicators.
3. IOC hunt in SIEM/endpoints; pivot by hash, domain, IP, JA3/JA3S, mutex names.
4. Build a timeline from logs + filesystem timestamps.

Containment/eradication:

- Block IOCs, isolate host, disable compromised accounts; remove persistence (Run keys, services, tasks).
- Patch, reimage or restore known‑good backups; validate before reconnecting to network.

Report template (short):

- Executive Summary → Impact → Root Cause → Control Gaps → Actions Taken → Recommendations → Lessons Learned.

Note: This folder includes an interactive log triage sandbox in `DefensiveBlueTeam.tsx` for portfolio viewing.

## Offensive Security / Penetration Testing

Goal: Show end‑to‑end exploitation of lab environments and secure coding practices on a vulnerable web app.

Vulnerable Lab Exploitation:

- Set up a VulnHub or TryHackMe VM locally on an isolated host‑only network.
- Tools: Nmap, Burp Suite, Hydra, Metasploit (plus manual payloads/scripts as needed).
- Deliverable: Client‑style write‑up with attack chain, PoC commands/payloads, and mitigation recommendations.

Web App Pen‑Test & Fix:

- Use DVWA or OWASP Juice Shop locally; run OWASP Top 10 testing.
- Patch vulnerabilities (parameterized queries, authZ checks, secure headers, secrets management, dependency updates).
- Bonus: Compare OWASP ZAP baseline before vs. after fixes; export redacted reports.

See `OffensiveRedTeam.tsx` for an interactive template (attack chain builder, OWASP coverage toggles, ZAP score before/after tracker).
