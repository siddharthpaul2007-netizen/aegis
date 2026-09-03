# AEGIS // SENTINEL — Autonomous Banking Intelligence Platform

[![React](https://img.shields.io/badge/React-18.3-blue.svg?style=flat-square&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue.svg?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.0-646CFF.svg?style=flat-square&logo=vite)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38B2AC.svg?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg?style=flat-square)](LICENSE)

> **AEGIS / SENTINEL** is a next-generation autonomous banking intelligence platform that combines real-time transactional fraud defense, contextual conversational interception, behavioral risk analysis, and predictive financial resilience modeling.

---

## 🌟 Key Highlights & Core Capabilities

### 1. 🛡️ Real-Time Fraud Defense & Conversational Interception
- **Progressive Risk Analysis Pipeline**: Evaluates transactions across multi-layer heuristic and semantic checkpoints (Payee Age & Velocity, Behavioral Anomaly, Contextual Semantics, Device Fingerprint).
- **Active Context Interview**: Automatically triggers real-time conversational interventions when suspicious indicators appear, deconstructing scam coercion before funds leave the account.
- **Dynamic Friction Decisions**: Implements proportional friction mechanisms including step-up biometric verification, 24-hour cooling-off escrow holds, and hard intercepts.
- **Scam Vector Deconstruction**: In-depth threat profiles for emerging cyber vectors such as *Digital Arrest Extortion*, *SIM-Swap / Fake KYC Phishing*, *Job & Investment Ponzi Schemes*, and *Remote Access Trojans (RAT)*.

### 2. 📈 Predictive Financial Health & Stress-Testing Engine
- **Financial Resilience Score (0–100)**: Real-time calculation of liquidity runway, debt-to-income (DTI) health, discretionary burn rate, and shock-absorption buffer.
- **Interactive Scenario Simulation**: Real-time parametric sliders to simulate unexpected income shocks, discretionary expense cuts, and automated debt prepayment sweeps.
- **Prescriptive AI Action Matrix**: Dynamic action recommendations ranked by urgency and financial impact.

### 3. 🧠 AI Center & Explainability Engine
- **Transparent Neural Pipeline**: Full visual telemetry into inference latency, input token analysis, algorithmic layers, and output decision tensors.
- **Ethical Safeguards & Human-in-the-Loop**: Built-in fairness constraints, non-coercive intervention boundaries, and user override protections.

### 4. 📜 Immutable Audit & Forensic Ledger
- Comprehensive cryptographic audit trail capturing all flagged, cleared, and intercepted transactions with deep forensic inspection modals.

---

## 🎮 Pre-Loaded Interactive Scenarios

The platform includes four ready-to-run interactive demo scenarios accessible via the top navigation bar:

| Scenario | Type | Description |
| :--- | :--- | :--- |
| **Legitimate Vendor Payment** | `Low Risk` | Standard recurring B2B invoice clearing without friction. |
| **Digital Arrest Scam** | `Critical Threat` | Coercive government impersonation demanding immediate RTGS escrow transfer. |
| **Emerging Financial Distress** | `Vulnerability Alert` | Negative cash flow projection triggering automated liquidity sweeps. |
| **Urgent KYC Phishing** | `High Risk` | High-urgency SMS spoofing vector leading to unverified beneficiary addition. |

---

## 🏗️ Architecture & Project Structure

```
DemoUi/
├── src/
│   ├── components/
│   │   ├── ai-center/         # Pipeline visualizer & ethical safeguards
│   │   ├── charts/            # Canvas/SVG cashflow streams & resilience curves
│   │   ├── command/           # Cinematic hero & executive telemetry dashboard
│   │   ├── common/            # Design system primitives (cards, badges, buttons)
│   │   ├── fraud/             # Simulators, context interviews, risk signal panels
│   │   ├── health/            # Resilience timeline & scenario stress engines
│   │   ├── history/           # Forensic audit ledger & detail inspection modals
│   │   └── layout/            # Navigation header, scenario bar, ambient cursor
│   ├── context/
│   │   ├── IntelligenceContext.tsx  # Global intelligence state management
│   │   └── ThemeContext.tsx         # Dark/Light ambient theme provider
│   ├── data/                  # Realistic banking databases & mock scenarios
│   ├── services/
│   │   ├── fraudEngine.ts           # Heuristic evaluation & scoring logic
│   │   └── payeeVerification.ts     # Payee verification heuristics & risk classification
│   ├── types/                 # Strict TypeScript schemas & interfaces
│   ├── App.tsx                # Application shell & tab router
│   ├── index.css              # Custom design tokens, glassmorphism & typography
│   └── main.tsx               # Application bootstrap
├── public/                    # Static assets
├── tailwind.config.js         # Custom luxury fintech design tokens & animations
├── tsconfig.json              # TypeScript compiler configuration
└── vite.config.ts             # Vite build pipeline configuration
```

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18.0.0 or higher recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/) / [pnpm](https://pnpm.io/)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/siddharthpaul2007-netizen/aegis.git
   cd aegis
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the local development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173) in your browser.

4. **Build for production:**
   ```bash
   npm run build
   ```

---

## 🎨 Design System & Aesthetics

- **Typography**: Space Grotesk / JetBrains Mono for a high-precision aerospace telemetry feel.
- **Glassmorphism & Lighting**: Multi-layered ambient glows, precision hairline borders (`border-white/[0.08]`), and noise grain overlays.
- **Micro-Interactions**: Proximity cursor glows, smooth spring transitions, and interactive slider telemetry feedback.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
