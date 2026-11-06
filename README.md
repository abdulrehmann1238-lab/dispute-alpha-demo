# Dispute Alpha — Premium Credit Dispute Management Platform

Dispute Alpha is a high-precision, interactive FinTech SaaS platform engineered for professional credit dispute operations, compliance leads, and specialized dispute analysts.

## Platform Highlights

- **Public Marketing Experience**:
  - Atmospheric animated hero composition.
  - Interactive product tour, 6-feature capability suite, and multi-step lifecycle workflow.
  - Security architecture visualization and validated demonstration request forms.
- **Operational SaaS Applications**:
  - **Executive Admin**: Multi-bureau metrics, staff assignment, workload management, and compliance sign-off authority.
  - **Dispute Staff**: Tri-bureau report review, discrepancy flagging, live split-screen Letter Studio, and bureau response logging.
  - **Client Portal**: Dedicated welcoming interface with a 7-stage progress roadmap, document upload simulation, sanitized dispute summaries, and direct specialist messaging.
- **Mandatory Human Approval Gate**:
  - Dispute correspondence is strictly gated through authorized compliance review (`Draft` → `Pending Approval` → `Approved` → `Submission Recorded`).
- **Interactive Mock Data & Persistence**:
  - Full client, dispute, task, document, and activity state persisted via `localStorage` with instantaneous demo data reset.

## Tech Stack

- **Framework**: React 18 with TypeScript
- **Bundler & Tooling**: Vite 6
- **Styling**: Tailwind CSS with custom FinTech color palette
- **Icons & Animation**: Lucide React & Framer Motion
- **Charts**: Recharts
- **Routing**: React Router v6 (configured with SPA redirects for Netlify)

## Local Development

```bash
# Install dependencies
npm install

# Start local development server
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview
```

## Netlify Deployment

This repository is pre-configured for one-click deployment on Netlify:
- **Build Command**: `npm run build`
- **Publish Directory**: `dist`
- **SPA Routing**: Handled via `netlify.toml` and `public/_redirects` (`/* -> /index.html 200`)
