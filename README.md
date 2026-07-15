# Eventora

A web platform for discovering, publishing, booking, and managing events with electronic tickets.

## Tech Stack

| Layer | Technology |
|-------|------------|
| Backend API | Laravel 13, PHP 8.4, MySQL |
| Frontend | React 19, TypeScript 6, Vite 8 |
| Styling | Tailwind CSS 4 |
| Auth | Laravel Sanctum (Bearer tokens) |
| Testing | Pest 4 (backend), Vitest (frontend) |

## Monorepo Structure

```
Eventora/
├── apps/
│   ├── api/          # Laravel REST API
│   └── web/          # React frontend
├── openspec/         # Specifications and change proposals
├── docs/             # Architecture documentation
└── .opencode/        # OpenCode skills and commands
```

## Getting Started

### Prerequisites

- PHP 8.4+
- Node.js 20+
- MySQL 8+
- Composer
- npm

### Backend (API)

```bash
cd apps/api
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
composer run dev
```

The API will be available at `https://eventora-api.test` via Laravel Herd.

### Frontend (Web)

```bash
cd apps/web
npm install
npm run dev
```

The frontend will be available at `https://eventora.test` via Laravel Herd.

## User Roles

| Role | Capabilities |
|------|--------------|
| User | Discover events, book tickets, own tickets, submit reviews |
| Organizer | Create and manage own events and ticket types |
| Admin | Review events, administer the platform |

## Core Domains

- Authentication & Authorization
- Categories
- Events (+ review/publishing workflow)
- Ticket types
- Bookings & Booking items
- Payments
- Tickets & QR-code check-in
- Favorites
- Reviews
- Notifications
- AI-assisted event content & discovery

## API Conventions

- RESTful resource routes
- Versioned API (`/api/v1`)
- JSON requests/responses
- Bearer token authentication
- Pagination for collections
- Consistent error structures
- ISO 8601 datetime (UTC storage)

## Development

This project follows a **spec-driven workflow**. Features must go through proposal, specifications, design, and task planning before implementation.

### Available Commands

```bash
# Backend
composer run dev          # Start API server, queue worker, and Vite
composer run test         # Clear config and run tests
php artisan test --compact

# Frontend
npm run dev              # Start Vite dev server
npm run build            # Build for production
npm run test             # Run Vitest
npm run lint             # Run ESLint
npm run typecheck        # Run TypeScript checks
```

## License

MIT
