# Mobile Navigation

## Purpose

Responsive navigation system for Eventora, providing accessible mobile hamburger menu and adapted header for authenticated/unauthenticated users.

## Requirements

### Public Header

The system MUST provide a responsive header that adapts to screen size:

**Desktop (≥768px):**
- Logo + brand name on the left
- Navigation links on the right
- No hamburger menu

**Mobile (<768px):**
- Logo + brand name on the left
- Hamburger menu button on the right
- Slide-out or dropdown menu when open

#### Scenario: Desktop shows full navigation

- **GIVEN** a user views the site on a 1024px viewport
- **WHEN** the header renders
- **THEN** it MUST display all navigation links horizontally

#### Scenario: Mobile shows hamburger menu

- **GIVEN** a user views the site on a 375px viewport
- **WHEN** the header renders
- **THEN** it MUST display a hamburger menu button
- **AND** navigation links MUST be hidden

---

### Hamburger Menu Button

The hamburger menu button MUST:

- Have `aria-label="Open menu"` when closed
- Have `aria-label="Close menu"` when open
- Have `aria-expanded` attribute reflecting state
- Be keyboard accessible (Enter/Space to toggle)

#### Scenario: Hamburger button has correct aria attributes

- **GIVEN** the mobile menu is closed
- **WHEN** the hamburger button renders
- **THEN** it MUST have `aria-expanded="false"` and `aria-label="Open menu"`

#### Scenario: Hamburger button toggles menu

- **GIVEN** the mobile menu is closed
- **WHEN** the user clicks the hamburger button
- **THEN** the menu MUST open
- **AND** the button MUST have `aria-expanded="true"` and `aria-label="Close menu"`

---

### Mobile Menu Behavior

The mobile menu MUST:

- Open when hamburger button is clicked
- Close when hamburger button is clicked again
- Close when a navigation link is clicked
- Close when clicking outside the menu
- Not cause horizontal overflow
- Be accessible via keyboard (Escape to close)

#### Scenario: Menu closes after navigation

- **GIVEN** the mobile menu is open
- **WHEN** the user clicks a navigation link
- **THEN** the menu MUST close
- **AND** the user MUST be navigated to the target page

#### Scenario: Menu closes on escape key

- **GIVEN** the mobile menu is open
- **WHEN** the user presses the Escape key
- **THEN** the menu MUST close

#### Scenario: Menu does not cause overflow

- **GIVEN** a user views the site on a 320px viewport
- **WHEN** the mobile menu is open
- **THEN** there MUST be no horizontal scrollbar

---

### Authenticated Header

The header MUST adapt for authenticated users:

**Public links replaced with:**
- Dashboard link
- Role badge (showing user role)
- User avatar/name
- Logout button

#### Scenario: Authenticated user sees dashboard link

- **GIVEN** a user is logged in
- **WHEN** the header renders
- **THEN** it MUST display a "Dashboard" link instead of "Sign in"

#### Scenario: Authenticated user sees role badge

- **GIVEN** a user with role "organizer" is logged in
- **WHEN** the header renders
- **THEN** it MUST display an "Organizer" badge

---

### Navigation Links

The header MUST include these links:

**Unauthenticated:**
- Home (`/`)
- Sign in (`/login`)
- Get started (`/register`)

**Authenticated:**
- Home (`/`)
- Dashboard (role-based URL)
- Sign out (button)

#### Scenario: Unauthenticated header shows correct links

- **GIVEN** a user is not logged in
- **WHEN** the header renders
- **THEN** it MUST show "Home", "Sign in", and "Get started" links

#### Scenario: Authenticated user sees correct dashboard link

- **GIVEN** a user with role "user" is logged in
- **WHEN** the header renders
- **THEN** the Dashboard link MUST point to `/dashboard`

#### Scenario: Organizer sees correct dashboard link

- **GIVEN** a user with role "organizer" is logged in
- **WHEN** the header renders
- **THEN** the Dashboard link MUST point to `/organizer/dashboard`
