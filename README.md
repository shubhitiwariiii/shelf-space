<div align="center">

# 📚 ShelfSpace

### Discover Libraries & Study Spaces Near You

Find libraries with **pricing, timings, amenities, ratings, and real-time locations** on an interactive map.

<p>
  <img src="https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js">
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white">
  <img src="https://img.shields.io/badge/TailwindCSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white">
  <img src="https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white">
  <img src="https://img.shields.io/badge/PostgreSQL-336791?style=for-the-badge&logo=postgresql&logoColor=white">
  <img src="https://img.shields.io/badge/OpenStreetMap-7EBC6F?style=for-the-badge&logo=openstreetmap&logoColor=white">
</p>

<p>
<a href="#">🌐 Live Demo</a> •
<a href="https://github.com/shubhitiwariiii/shelfspace">📂 Repository</a> •
<a href="https://github.com/shubhitiwariiii/shelfspace/issues">🐛 Report Bug</a> •
<a href="https://github.com/shubhitiwariiii/shelfspace/issues">💡 Request Feature</a>
</p>

---

## 📸 Project Preview


### 🏠 Landing Page

<p align="center">
<img width="1350" height="639" alt="Screenshot 2026-06-25 201419" src="https://github.com/user-attachments/assets/20ea3bde-dd5a-429c-9a80-99edf4552c8f" />
<img width="1349" height="629" alt="Screenshot 2026-06-25 201450" src="https://github.com/user-attachments/assets/089bffb9-bd7b-4134-b3e8-8e571380fb5e" />

</p>

---

### 🗺️ Explore Libraries

<p align="center">
<img width="1350" height="637" alt="Screenshot 2026-06-25 201525" src="https://github.com/user-attachments/assets/8a56bae4-629d-4a98-808d-aad1c3e41a68" />

</p>

---

### 📖 Library Details

<p align="center">
<img width="1350" height="633" alt="Screenshot 2026-06-25 201720" src="https://github.com/user-attachments/assets/87dd98d8-4541-49f1-8b2a-0c6177700b54" />

</p>

---

### Login/Signup

<p align="center">
<img width="1350" height="631" alt="Screenshot 2026-06-25 201913" src="https://github.com/user-attachments/assets/bb98e0f1-984b-4586-9c6b-dbee2c7dd0b7" />
<img width="1352" height="630" alt="Screenshot 2026-06-25 201931" src="https://github.com/user-attachments/assets/5d3c5b73-073a-42a0-a128-8f48d9eacf9c" />

</p>

---

## 🎯 About

ShelfSpace helps students discover **libraries and paid study spaces** without relying on incomplete or outdated map listings.

Unlike traditional map services, ShelfSpace combines **real OpenStreetMap locations** with **verified information** like pricing, operating hours, amenities, seating capacity, WiFi availability, and contact details.

The project is built around a scalable data ingestion pipeline, allowing new districts or states to be added without changing application logic.

---

## ✨ Features

| Feature                  | Description                                |
| ------------------------ | ------------------------------------------ |
| 🗺️ Interactive Map      | Explore nearby libraries visually          |
| 📍 Smart Search          | Search by district or state                |
| 📚 Detailed Profiles     | Pricing, timings, amenities, owner details |
| ❤️ Save Libraries        | Bookmark favourite study spaces            |
| 🔐 Secure Authentication | Supabase Auth                              |
| ⭐ Ratings                | Community ratings (where available)        |
| 📱 Responsive UI         | Optimized for desktop & mobile             |
| ⚡ Fast Performance       | Built with Next.js App Router              |

---

## 🛠 Tech Stack

| Category       | Technology                               |
| -------------- | ---------------------------------------- |
| Framework      | Next.js 14                               |
| Language       | TypeScript                               |
| Styling        | Tailwind CSS                             |
| Backend        | Supabase                                 |
| Database       | PostgreSQL                               |
| Authentication | Supabase Auth                            |
| Maps           | Google Maps JavaScript API               |
| Geodata        | OpenStreetMap (Overpass API + Nominatim) |
| Hosting        | Vercel                                   |

---

# 🏗 Architecture

```text
                    OpenStreetMap
                  (Overpass API)
                         │
               Nominatim Geocoder
                         │
          scripts/fetch-libraries.ts
                         │
                      Upsert
                         │
                ┌─────────────────┐
                │    Supabase      │
                │ PostgreSQL + RLS │
                └───────┬──────────┘
                        │
        ┌───────────────┼───────────────┐
        │               │               │
   Authentication   Library Data    Saved Libraries
        │               │               │
        └───────────────┴───────────────┘
                        │
                 Next.js Application
                        │
      Landing → Explore → Details → Dashboard
```

---

# 🗄 Database Schema

```mermaid
erDiagram

profiles ||--o{ saved_libraries : saves
libraries ||--o{ saved_libraries : bookmarked
libraries ||--|| library_details : contains

profiles {
uuid id
string email
}

libraries {
uuid id
string name
string address
float latitude
float longitude
}

library_details {
uuid library_id
string timings
string pricing
string amenities
string owner
string contact
}

saved_libraries {
uuid user_id
uuid library_id
}
```

---

## 📂 Folder Structure

```text
ShelfSpace
│
├── app
│   ├── explore
│   ├── dashboard
│   ├── library
│   └── auth
│
├── components
│
├── lib
│
├── scripts
│   └── fetch-libraries.ts
│
├── public
│   └── readme
│
├── supabase
│   └── schema.sql
│
├── package.json
└── README.md
```

---

# ⚡ Engineering Highlights

* ✔ Real geographic data from OpenStreetMap
* ✔ Provider-agnostic database design
* ✔ Idempotent data ingestion pipeline
* ✔ Row Level Security (RLS)
* ✔ Manual enrichment workflow
* ✔ Scalable architecture
* ✔ Bookmark system with authenticated users
* ✔ Separation of scraped and verified data

---

# 🚀 Getting Started

## Clone Repository

```bash
git clone https://github.com/shubhitiwariiii/shelfspace.git

cd shelfspace
```

---

## Install Dependencies

```bash
npm install
```

---

## Configure Environment Variables

Create a `.env.local`

```env
NEXT_PUBLIC_SUPABASE_URL=

NEXT_PUBLIC_SUPABASE_ANON_KEY=

SUPABASE_SECRET_KEY=

NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=
```

---

## Setup Database

Run

```
supabase/schema.sql
```

inside the Supabase SQL Editor.

---

## Fetch Library Data

```bash
npm run fetch-libraries
```

This imports real library locations from OpenStreetMap.

---

## Run Development Server

```bash
npm run dev
```

Visit

```
http://localhost:3000
```

---

# 🚀 Roadmap

* ✅ Project Setup
* ✅ Supabase Integration
* ✅ OpenStreetMap Pipeline
* ✅ Database Schema
* ✅ Row Level Security
* ✅ Landing Page
* ✅ Explore Page
* ⏳ Library Details
* ⏳ Authentication
* ⏳ Saved Dashboard
* ⏳ Search Filters
* ⏳ Mobile Optimization
* ⏳ Admin Dashboard

---

# 💡 Future Improvements

* AI-based library recommendations
* User reviews & ratings
* Open now filter
* Nearby libraries
* Admin verification dashboard
* Image gallery
* Availability status
* Analytics dashboard

---

# 👩‍💻 Author

**Shubhi Tiwari**

<p>
<a href="https://github.com/shubhitiwariiii">
<img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github">
</a>

<a href="https://linkedin.com/in/shubhi-tiwari-664553329">
<img src="https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin">
</a>
</p>

---

<div align="center">

## ⭐ If you found this project useful, please consider giving it a star!

Made with ❤️ 

</div>
