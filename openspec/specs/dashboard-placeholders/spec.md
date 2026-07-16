# Dashboard Placeholders

## Purpose

Placeholder dashboard pages for each user role (attendee, organizer, admin) showing account info and upcoming features.

## Requirements

### Attendee Dashboard

Route: `/dashboard`

Access: Only users with role "user"

The attendee dashboard MUST include:

1. Welcome message using the authenticated user's name
2. Role badge showing "Attendee" or "User"
3. Account summary card with:
   - Name
   - Email
   - Role
4. Future features section showing:
   - Discover events (disabled/placeholder)
   - My bookings (disabled/placeholder)
   - My tickets (disabled/placeholder)
   - Favorites (disabled/placeholder)

Each future feature MUST be clearly marked as "Coming soon" or similar.

#### Scenario: Attendee dashboard shows welcome message

- **GIVEN** a user with name "John" and role "user" is logged in
- **WHEN** the user navigates to `/dashboard`
- **THEN** the page MUST display "Welcome back, John" or similar

#### Scenario: Attendee dashboard shows account summary

- **GIVEN** a user with email "john@example.com" is logged in
- **WHEN** the dashboard renders
- **THEN** it MUST display the user's name, email, and role

#### Scenario: Attendee dashboard shows future features

- **GIVEN** a user views the attendee dashboard
- **WHEN** the page renders
- **THEN** it MUST show placeholder sections for Discover events, My bookings, My tickets, and Favorites
- **AND** each MUST be marked as a future feature

#### Scenario: Attendee dashboard does not show real data

- **GIVEN** a user views the attendee dashboard
- **WHEN** the page renders
- **THEN** it MUST NOT show any mock bookings, tickets, or events

---

### Organizer Dashboard

Route: `/organizer/dashboard`

Access: Only users with role "organizer"

The organizer dashboard MUST include:

1. Welcome message
2. Role badge showing "Organizer"
3. Account summary card with:
   - Name
   - Email
   - Role
4. Future features section showing:
   - Create events (disabled/placeholder)
   - Manage events (disabled/placeholder)
   - Ticket types (disabled/placeholder)
   - Bookings (disabled/placeholder)

#### Scenario: Organizer dashboard shows welcome message

- **GIVEN** a user with name "Jane" and role "organizer" is logged in
- **WHEN** the user navigates to `/organizer/dashboard`
- **THEN** the page MUST display "Welcome back, Jane" or similar

#### Scenario: Organizer dashboard shows future features

- **GIVEN** a user views the organizer dashboard
- **WHEN** the page renders
- **THEN** it MUST show placeholder sections for Create events, Manage events, Ticket types, and Bookings
- **AND** each MUST be marked as a future feature

#### Scenario: Organizer dashboard does not show real data

- **GIVEN** a user views the organizer dashboard
- **WHEN** the page renders
- **THEN** it MUST NOT show any mock events, revenue, or analytics

---

### Admin Dashboard

Route: `/admin/dashboard`

Access: Only users with role "admin"

The admin dashboard MUST include:

1. Welcome message
2. Role badge showing "Admin"
3. Account summary card with:
   - Name
   - Email
   - Role
4. Note that admin features will be implemented later

#### Scenario: Admin dashboard shows welcome message

- **GIVEN** a user with name "Admin" and role "admin" is logged in
- **WHEN** the user navigates to `/admin/dashboard`
- **THEN** the page MUST display "Welcome back, Admin" or similar

#### Scenario: Admin dashboard shows placeholder message

- **GIVEN** a user views the admin dashboard
- **WHEN** the page renders
- **THEN** it MUST display a message that administration features will be implemented later

#### Scenario: Admin dashboard does not show admin features

- **GIVEN** a user views the admin dashboard
- **WHEN** the page renders
- **THEN** it MUST NOT show user management, event approval, or other admin functionality

---

### Dashboard Layout

All dashboards MUST use an authenticated layout that includes:

- Eventora logo
- Dashboard title
- Authenticated user name
- Role badge
- Logout action
- Responsive design

#### Scenario: Dashboard layout shows user info

- **GIVEN** a user with name "John" is logged in
- **WHEN** any dashboard renders
- **THEN** the layout MUST display the user's name

#### Scenario: Dashboard layout shows role badge

- **GIVEN** a user with role "organizer" is logged in
- **WHEN** any dashboard renders
- **THEN** the layout MUST display an "Organizer" badge

#### Scenario: Dashboard layout has logout button

- **GIVEN** a user is logged in
- **WHEN** any dashboard renders
- **THEN** the layout MUST include a logout button

---

### Account Summary Card

Each dashboard MUST include an account summary card showing:

- User's full name
- User's email address
- User's role (formatted for display)

#### Scenario: Account summary shows user details

- **GIVEN** a user with name "John Doe", email "john@example.com", role "user"
- **WHEN** the account summary card renders
- **THEN** it MUST display all three fields

---

### Future Features Section

Each dashboard MUST include a section for future features:

- Each feature MUST be displayed as a card or list item
- Each feature MUST be visually disabled or marked as "Coming soon"
- Features MUST NOT be clickable or functional
- Features MUST clearly communicate they are not yet implemented

#### Scenario: Future features are clearly marked

- **GIVEN** a user views any dashboard
- **WHEN** the future features section renders
- **THEN** each feature MUST have a "Coming soon" label or similar indicator

#### Scenario: Future features are not interactive

- **GIVEN** a user views any dashboard
- **WHEN** the user clicks a future feature
- **THEN** nothing MUST happen (no navigation, no error)
