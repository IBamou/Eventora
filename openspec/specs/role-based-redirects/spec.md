# Role-Based Redirects

## Purpose

Handle post-authentication routing based on user roles, ensuring users are directed to the appropriate dashboard and protected routes are enforced.

## Requirements

### Login Redirect

After successful login, the system MUST redirect the user based on their authenticated role:

- `user` → `/dashboard`
- `organizer` → `/organizer/dashboard`
- `admin` → `/admin/dashboard`

The redirect MUST use the role returned by the backend, NOT the role selected or assumed by the frontend.

#### Scenario: User redirects to attendee dashboard

- **GIVEN** a user with role "user" logs in successfully
- **WHEN** the login response is received
- **THEN** the user MUST be redirected to `/dashboard`

#### Scenario: Organizer redirects to organizer dashboard

- **GIVEN** a user with role "organizer" logs in successfully
- **WHEN** the login response is received
- **THEN** the user MUST be redirected to `/organizer/dashboard`

#### Scenario: Admin redirects to admin dashboard

- **GIVEN** a user with role "admin" logs in successfully
- **WHEN** the login response is received
- **THEN** the user MUST be redirected to `/admin/dashboard`

---

### Intended Destination Preservation

When a user is redirected to login from a protected route, the system MUST:

1. Store the intended destination in location state
2. After successful login, redirect to the intended destination IF the user's role is authorized
3. If the user's role is not authorized for the intended destination, redirect to their default dashboard

#### Scenario: Intended destination is preserved

- **GIVEN** a user attempts to access `/dashboard` without authentication
- **WHEN** the user is redirected to `/login`
- **THEN** the login page MUST store `/dashboard` as the intended destination

#### Scenario: Intended destination is restored after login

- **GIVEN** a user was redirected from `/dashboard` to `/login`
- **WHEN** the user logs in with role "user"
- **THEN** the user MUST be redirected to `/dashboard`

#### Scenario: Unauthorized intended destination falls back to default

- **GIVEN** a user with role "user" was redirected from `/organizer/dashboard` to `/login`
- **WHEN** the user logs in successfully
- **THEN** the user MUST be redirected to `/dashboard` (their default)
- **AND** NOT to `/organizer/dashboard`

---

### Registration Redirect

After successful registration, the system MUST redirect the user based on their assigned role:

- `user` → `/dashboard`
- `organizer` → `/organizer/dashboard`

Admin role MUST NOT be available for public registration.

#### Scenario: New user redirects to attendee dashboard

- **GIVEN** a visitor registers with role "user"
- **WHEN** the registration response is received
- **THEN** the user MUST be redirected to `/dashboard`

#### Scenario: New organizer redirects to organizer dashboard

- **GIVEN** a visitor registers with role "organizer"
- **WHEN** the registration response is received
- **THEN** the user MUST be redirected to `/organizer/dashboard`

---

### Guest Route Protection

The login and register routes MUST be protected by a GuestRoute that:

- Shows loading while session is restoring
- Redirects authenticated users to their default dashboard
- Does not render the login/register form for authenticated users

#### Scenario: Authenticated user redirected from login

- **GIVEN** a user is already authenticated
- **WHEN** the user navigates to `/login`
- **THEN** the user MUST be redirected to their default dashboard

#### Scenario: Authenticated user redirected from register

- **GIVEN** a user is already authenticated
- **WHEN** the user navigates to `/register`
- **THEN** the user MUST be redirected to their default dashboard

#### Scenario: Loading state shown during restoration

- **GIVEN** a stored token exists
- **WHEN** the session is being restored
- **THEN** a loading spinner MUST be displayed
- **AND** the login/register form MUST NOT be shown
