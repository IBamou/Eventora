## Why

Eventora requires a secure authentication and authorization foundation before any domain features can be built. Without user accounts, roles, and session management, features like event creation, bookings, and ticket management cannot enforce ownership or access control. This change establishes the security perimeter for the entire platform.

## What Changes

- Add user registration with role selection (user or organizer)
- Add login with Sanctum Bearer token issuance
- Add authenticated user profile retrieval
- Add logout with token revocation
- Add `UserRole` backed enum for type-safe role handling
- Add role-based route protection middleware
- Add registration and login rate limiting
- Add frontend authentication pages and state management
- Add protected routes and role-aware navigation guards

## Capabilities

### New Capabilities

- `user-registration`: Account creation with role selection, validation, and duplicate email rejection
- `user-login`: Credential verification and Sanctum token issuance
- `user-session`: Authenticated user profile retrieval and token-based session management
- `user-logout`: Token revocation and session termination
- `role-authorization`: Role-based access control using backed enums and middleware

### Modified Capabilities

None. This is the initial authentication foundation.

## Impact

- **Backend**: New controllers, Form Requests, API Resources, enum, middleware, and migrations in `apps/api`
- **Frontend**: New authentication pages, API module, auth context, protected routes in `apps/web`
- **Database**: `role` column added to `users` table
- **API**: New `/api/v1/auth/*` endpoints
- **Dependencies**: No new packages required (Sanctum already installed)
- **Testing**: Comprehensive Pest and Vitest coverage for all auth flows
