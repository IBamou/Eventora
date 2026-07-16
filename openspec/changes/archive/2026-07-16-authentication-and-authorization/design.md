## Context

Eventora is a fresh Laravel 13 + React 19 monorepo with no domain logic yet. The only existing model is the default `User` model. This change establishes the authentication and authorization foundation that all future features will depend on.

Current state:
- `apps/api`: Fresh Laravel scaffold with Sanctum installed
- `apps/web`: Fresh Vite + React scaffold with no app code
- No database migrations beyond the default users table
- No authentication endpoints or frontend pages

## Goals / Non-Goals

**Goals:**
- Implement secure user registration with role selection (user/organizer)
- Implement login with Sanctum Bearer token issuance
- Implement authenticated user profile retrieval
- Implement logout with token revocation
- Establish role-based access control with a backed enum
- Create frontend authentication pages and state management
- Protect routes with role-aware guards

**Non-Goals:**
- Email verification
- Password reset
- Social authentication
- Two-factor authentication
- Organizer approval workflow
- Admin user management
- Any domain features (events, bookings, etc.)

## Decisions

### 1. UserRole as PHP Backed Enum

**Decision:** Create `App\Enums\UserRole` backed by string values "user", "organizer", "admin".

**Rationale:**
- Type-safe role handling throughout the application
- IDE autocomplete and static analysis support
- Can be used in validation rules, middleware, and policies
- Follows Laravel conventions for finite business states

**Alternatives considered:**
- String constants: Less type-safe, no enum methods
- Integer-backed enum: Less readable in database and API responses
- Role package (Spatie): Adds unnecessary complexity for three simple roles

### 2. Role Column on Users Table

**Decision:** Add a `role` column to the existing users table via migration.

**Rationale:**
- Simple and direct approach
- No need for a separate roles table for only three roles
- Can be indexed for efficient role-based queries
- Follows the principle of avoiding abstractions before real use cases

**Alternatives considered:**
- Separate roles table with pivot: Over-engineered for three static roles
- Polymorphic roles: Unnecessary complexity
- JSON column: Poor query performance, no type safety

### 3. Sanctum Bearer Tokens

**Decision:** Use Laravel Sanctum's personal access tokens (Bearer tokens) for API authentication.

**Rationale:**
- Already installed in the project
- Simple token-based auth suitable for SPA + API architecture
- Token revocation on logout
- Well-documented and maintained

**Alternatives considered:**
- Session-based auth: Less suitable for headless API
- JWT: Requires additional package, more complex token management
- Passport: Overkill for this use case

### 4. Thin Controllers with Form Requests

**Decision:** Keep controllers thin by using Form Requests for validation and API Resources for responses.

**Rationale:**
- Separates validation logic from controller logic
- Reusable validation rules
- Clean, consistent API responses
- Follows Laravel conventions

**Alternatives considered:**
- Inline validation: Harder to test, couples logic
- Action classes: Not needed for simple CRUD operations yet

### 5. Role-Based Middleware

**Decision:** Create a custom middleware for role-based route protection.

**Rationale:**
- Clean, reusable role checking
- Can be applied to routes or route groups
- Keeps authorization logic centralized

**Alternatives considered:**
- Policy-only approach: Less convenient for route-level role checks
- Gate definitions: Better for object-level authorization

### 6. Frontend Auth State with React Context

**Decision:** Use React Context for authentication state management.

**Rationale:**
- Simple, built-in solution for auth state
- No additional dependencies
- Sufficient for authentication concerns
- TanStack Query handles server state separately

**Alternatives considered:**
- Zustand: Adds dependency for simple use case
- Redux: Overkill for auth state
- URL-based state: Not suitable for auth tokens

### 7. Feature-Based Frontend Structure

**Decision:** Organize frontend code by feature (auth/, components/, etc.).

**Rationale:**
- Follows project conventions
- Keeps related code together
- Easy to navigate and maintain
- Scales well as features are added

**Alternatives considered:**
- Type-based (components/, hooks/): Scatters feature logic
- Layer-based (api/, ui/): Less intuitive for feature development

## Risks / Trade-offs

**[Risk] Role escalation through API manipulation** → Mitigation: Backend validates role on registration, never trusts frontend role data. Role column has default value.

**[Risk] Token theft** → Mitigation: Tokens are stored securely in memory/localStorage. Logout revokes tokens. HTTPS enforced.

**[Risk] Brute-force attacks** → Mitigation: Rate limiting on registration and login endpoints.

**[Risk] User enumeration** → Mitigation: Login returns generic 401 error regardless of email existence.

**[Trade-off] No email verification** → Acceptable for MVP. Organizer accounts are active immediately. Can be added later.

**[Trade-off] No password reset** → Acceptable for MVP. Users can be seeded or created via Tinker. Can be added later.

## Migration Plan

1. Run `php artisan make:migration add_role_to_users_table`
2. Run `php artisan migrate`
3. Run `php artisan make:enum UserRole`
4. Run tests to verify
5. Deploy backend changes
6. Deploy frontend changes

## Rollback Strategy

1. Remove role column migration
2. Remove UserRole enum
3. Remove auth endpoints
4. Remove frontend auth pages
5. Revert to previous deployment

## Open Questions

- Should organizer accounts require admin approval? (Deferred to events-management change)
- Should there be a maximum number of organizers? (Not in scope)
- Token expiration policy? (Default Sanctum behavior is acceptable)
