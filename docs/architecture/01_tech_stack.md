# Spesifikasi Teknis (Architecture)

## Overview
Proyek ini dirancang untuk performa tinggi dan SEO maksimal, menggunakan pendekatan monorepo dengan Laravel sebagai backend API dan Inertia.js untuk menjembatani React.js sebagai frontend, memungkinkan Server-Side Rendering (SSR).

## Core Stack
- **Framework Utama:** Laravel 11
- **Language:** PHP 8.2+
- **Database:** PostgreSQL 14+

## Frontend & UI
- **Library:** React.js 18+ (via Inertia.js)
- **Styling:** Tailwind CSS
- **Component Library:** Shadcn/ui (untuk desain bersih, modern, dan konsisten)
- **Rendering:** SSR (Server-Side Rendering) aktif.
    - *Note:* Wajib install Node.js di server VPS untuk menjalankan layanan SSR.

## Tools & Libraries Tambahan
- **PDF Engine:** `barryvdh/laravel-dompdf`
    - Digunakan untuk generate dokumen Invoice profesional dengan kop surat.
- **Image Optimization:** Spatie Media Library (Recomendation) atau native storage link.

## Server Requirements
- PHP >= 8.2
- Composer
- Node.js & NPM (untuk build asset dan server SSR)
- MySQL Database
- Nginx/Apache Web Server
