<div align="center">

# 📚 ShelfSpace

### Discover libraries and study spaces near you — pricing, timings, and amenities, all in one map.

[![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![OpenStreetMap](https://img.shields.io/badge/OpenStreetMap-7EBC6F?style=for-the-badge&logo=openstreetmap&logoColor=white)](https://www.openstreetmap.org/)

[Live Demo](#) · [Report Bug](https://github.com/shubhitiwariiii/shelfspace/issues) · [Request Feature](https://github.com/shubhitiwariiii/shelfspace/issues)

</div>

---

## 📖 About The Project

Finding a library or paid study space nearby usually means asking around, or digging through outdated Google listings that don't tell you the things that actually matter — what it costs, when it's open, who runs it, or whether it has WiFi and a quiet zone.

**ShelfSpace** fixes that by combining real geographic data with structured, verified details. It pulls actual library locations from OpenStreetMap, plots them on an interactive map, and layers in pricing, timings, owner contact, and amenities — the details no map API gives you out of the box.

This isn't a demo built on five hardcoded entries. It's architected around a real ingestion pipeline that can scale to any district or state, with a clean separation between *data that can be scraped* and *data that has to be verified by hand*.

---

## ✨ Features

### 🗺️ Discovery
- Interactive map view of libraries in any searched district/state
- List + map hybrid view, so users can browse either way
- Search by location ("libraries near me" style queries)

### 📋 Rich Library Profiles
- Pricing information
- Operating timings
- Owner / contact details
- Amenities (WiFi, quiet zones, seating capacity, etc.)
- Google-style ratings where available

### 👤 User Features
- Email-based authentication via Supabase Auth
- Save/bookmark libraries to a personal dashboard
- Persistent saved list across sessions

### ⚙️ Engineering Highlights
- **Decoupled data ingestion** — a standalone script pulls and upserts library data from OpenStreetMap (Overpass API + Nominatim geocoding), independent of the live application, so adding new districts never requires touching app code
- **Idempotent upserts** — re-running ingestion never creates duplicate entries, keyed by unique source ID
- **Row Level Security (RLS)** on every table — public read access for library data, strictly scoped per-user access for saved lists and profiles
- **Provider-agnostic schema** — built so the data source can later be swapped or supplemented (e.g. Google Places API) without changing the database structure or frontend code

---

## 🛠️ Built With

| Category | Technology |
|---|---|
| **Framework** | Next.js 14 (App Router) |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS |
| **Database** | Supabase (PostgreSQL) |
| **Auth** | Supabase Auth |
| **Maps** | Google Maps JavaScript API |
| **Geodata source** | OpenStreetMap — Overpass API + Nominatim |
| **Hosting** | Vercel |

---

## 🏗️ Architecture

```
┌─────────────────────┐
│   Ingestion Script    │   scripts/fetch-libraries.ts
│  (Nominatim + Overpass)│   — run manually/on schedule
└──────────┬───────────┘
           │ upsert
           ▼
┌─────────────────────┐
│   Supabase (Postgres)  │
│  ┌─────────────────┐  │
│  │ libraries         │ │  ← scraped: name, address, lat/lng
│  │ library_details   │ │  ← manual: pricing, owner, timings
│  │ profiles          │ │  ← Supabase Auth extension
│  │ saved_libraries   │ │  ← user bookmarks
│  └─────────────────┘  │
└──────────┬───────────┘
           │ RLS-scoped queries
           ▼
┌─────────────────────┐
│   Next.js App Router   │
│  /explore  (map+list)  │
│  /library/[id] (detail)│
│  /dashboard (saved)    │
└─────────────────────┘
```

**Why this separation matters:** Map APIs give you a name and a pin, not a price tag or an owner's phone number. Splitting `libraries` (auto-ingested) from `library_details` (manually verified) means the system never has to fake data it doesn't actually have — and it makes the enrichment workflow a clear, isolated step rather than a hack bolted onto the ingestion script.

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- A free [Supabase](https://supabase.com) account
- A [Google Maps API key](https://console.cloud.google.com/) (for the map view only — ingestion uses free OSM data)

### Installation

```bash
git clone https://github.com/shubhitiwariiii/shelfspace.git
cd shelfspace
npm install
```

### Environment Setup

Create a `.env.local` file:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_publishable_key
SUPABASE_SECRET_KEY=your_supabase_secret_key
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_key
```

### Database Setup

Run the schema in `/supabase/schema.sql` via the Supabase SQL Editor. This creates all four tables with Row Level Security policies pre-configured.

### Seed Library Data

```bash
npm run fetch-libraries
```

This pulls real library data for the configured districts from OpenStreetMap and populates your database. Edit the `AREAS` array in `scripts/fetch-libraries.ts` to target different districts/states.

### Run Locally

```bash
npm run dev
```

Visit `http://localhost:3000`.

---

## 🗺️ Roadmap

- [x] Project scaffold + Supabase integration
- [x] OpenStreetMap ingestion pipeline
- [x] Database schema with RLS policies
- [ ] Map + list explore page
- [ ] Library detail pages
- [ ] Authentication flow
- [ ] Saved libraries dashboard
- [ ] Search & filtering (amenities, pricing range, open now)
- [ ] Mobile responsiveness pass
- [ ] Admin enrichment interface for owner/pricing data

See [open issues](https://github.com/shubhitiwariiii/shelfspace/issues) for the full list.

---

## 👤 Author

**Shubhi Tiwari**

B.Tech CSE (AI & ML) · Galgotias College of Engineering and Technology

[![GitHub](https://img.shields.io/badge/GitHub-100000?style=flat-square&logo=github&logoColor=white)](https://github.com/shubhitiwariiii)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?style=flat-square&logo=linkedin&logoColor=white)](https://linkedin.com/in/shubhi-tiwari-664553329)

---

<div align="center">

If this project helped you or you found it interesting, consider giving it a ⭐

</div>