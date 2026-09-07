# THERMOSAFE 🌡️🛡️

## AI-Powered Extreme Heat Early Warning & Human Thermal Stress Intelligence Platform

> **Smart India Hackathon Problem: SIH26083**
> *Extreme Heatwave Early Warning and Human Thermal Stress Index*

---

### 🎯 Overview

THERMOSAFE is a production-quality, AI-powered disaster management platform that transforms meteorological data into actionable Human Thermal Stress Risk Scores and provides early warnings for extreme heat conditions across India.

**Core Pipeline:**
```
WEATHER DATA → THERMAL STRESS CALCULATION → HUMAN VULNERABILITY ANALYSIS
→ AI-BASED HEAT RISK PREDICTION → GIS VISUALIZATION → EARLY WARNING → ACTIONABLE RECOMMENDATION
```

---

### 🏗️ Architecture

| Layer | Technology |
|-------|-----------|
| **Frontend** | React 18 + TypeScript + Tailwind CSS |
| **Backend** | Python + FastAPI |
| **Maps** | Leaflet + OpenStreetMap |
| **Database** | PostgreSQL + PostGIS |
| **ML/AI** | Pandas + NumPy + Scikit-learn |
| **Charts** | Recharts |

---

### 📦 Project Structure

```
SIH26083/
├── frontend/               # React + TypeScript + Tailwind
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Route pages
│   │   ├── hooks/          # Custom React hooks
│   │   ├── services/       # API client
│   │   ├── stores/         # Zustand state
│   │   ├── types/          # TypeScript interfaces
│   │   └── utils/          # Utility functions
│   └── package.json
├── backend/                # FastAPI Python backend
│   ├── app/
│   │   ├── api/            # API route handlers
│   │   ├── services/       # Business logic
│   │   ├── models/         # Pydantic models
│   │   ├── ml/             # ML pipeline
│   │   └── data/           # Demo data & GeoJSON
│   └── requirements.txt
├── .env.example
└── README.md
```

---

### 🚀 Quick Start

#### Prerequisites
- Python 3.10+
- Node.js 18+
- PostgreSQL 14+ (optional — SQLite fallback for demo)

```

### 🧪 Demo Mode

THERMOSAFE includes 5 predefined scenarios for demonstration:

| Scenario | Description |
|----------|-------------|
| 🟢 Normal Day | Standard summer conditions, low thermal stress |
| 🟠 Severe Heatwave | High temperature + humidity, elevated risk |
| 🔴 Extreme Heatwave | Critical thermal stress + vulnerable population |
| 🌊 Coastal Heat | High humidity with moderate temperature |
| 🏜️ Dry Heat | Very high temperature with low humidity |

---

### 📊 Key Features

- **Human Thermal Stress Score (0-100)** — Unified score combining HI, WBGT, UTCI
- **Heat Index** — Rothfusz/NOAA regression
- **WBGT** — Wet Bulb Globe Temperature (Australian BOM simplified)
- **UTCI** — Universal Thermal Climate Index approximation
- **Heatwave Early Warning** — IMD criteria-based alerts
- **AI/ML Predictions** — Random Forest risk classification
- **Vulnerability Assessment** — State-level demographic risk
- **Interactive GIS Map** — India heat-risk visualization
- **Government Dashboard** — Authority-level command center
- **72-Hour Forecast** — Multi-horizon risk prediction

---

### 🔬 Scientific Basis

| Index | Method | Reference |
|-------|--------|-----------|
| Heat Index | Rothfusz 9-term polynomial regression | NOAA/NWS (1990) |
| WBGT | Simplified outdoor approximation | Australian BoM |
| UTCI | Regression approximation | Bröde et al. (2012) |
| HTSS Weights | Balanced Biometeorology profile | ISO 7243, ISB COST 730 |
| Heatwave Criteria | IMD classification rules | India Meteorological Department |

---

### ⚠️ Disclaimer

This platform is a **disaster-preparedness and risk-awareness tool**. It is NOT a medical diagnostic system. Risk assessments are based on environmental data and demographic indicators. Always follow official IMD/NDMA advisories for emergency decisions.

---

### 📄 License

Built for Smart India Hackathon 2026 — Team THERMOSAFE
