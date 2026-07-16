# Project Foundation Design

## Overview

This design establishes the visual identity, component architecture, and UX patterns for Eventora's authentication interface. All future features will build upon these foundations.

## Brand Identity

### Colors

- **Primary**: Indigo (`#4F46E5`) — headers, buttons, links
- **Accent**: Violet (`#7C3AED`) — badges, highlights
- **Background**: Light slate (`#F8FAFC`) — page backgrounds
- **Surface**: White (`#FFFFFF`) — cards, forms
- **Text**: Dark slate (`#0F172A`) — headings, body
- **Muted**: Gray (`#64748B`) — secondary text
- **Success**: Green (`#16A34A`) — positive states
- **Error**: Red (`#DC2626`) — validation, errors
- **Warning**: Amber (`#D97706`) — caution states

### Typography

- **Headings**: Inter or system font stack
- **Body**: Inter or system font stack
- **Monospace**: JetBrains Mono or system monospace

### Spacing & Sizing

- Form width: 420-520px on desktop
- Border radius: `rounded-xl` (12px) or `rounded-2xl` (16px)
- Shadows: Subtle (`shadow-sm`, `shadow-md`)
- Focus rings: `focus-visible:ring-2 focus-visible:ring-indigo-500`

## Component Architecture

### Base Components

```
src/components/ui/
├── Button.tsx          # Primary, secondary, ghost variants
├── Input.tsx           # Text input with label, error
├── PasswordInput.tsx   # Input with show/hide toggle
├── Checkbox.tsx        # Checkbox with label
├── FormField.tsx       # Wrapper for label + input + error
├── RoleSelector.tsx    # Card-style role selection
├── Badge.tsx           # Role badges (user, organizer, admin)
├── Avatar.tsx          # User avatar with initials
└── Card.tsx            # Container card component
```

### Layout Components

```
src/layouts/
├── PublicLayout.tsx    # Header + content for public pages
└── AuthenticatedLayout.tsx  # Header + sidebar/content for auth pages
```

### Header Behavior

**Public (unauthenticated):**
- Logo + Home link
- Login link
- Create Account button

**Authenticated:**
- Logo + Home link
- Dashboard link
- Role badge
- User avatar/name
- Logout button

**Mobile:**
- Hamburger menu button
- `aria-expanded` on toggle
- Slide-out or dropdown menu
- Close on navigation

## Route Structure

```
/                      → HomePage (public)
/register              → RegisterPage (guest only)
/login                 → LoginPage (guest only)
/dashboard             → AttendeeDashboardPage (user)
/organizer/dashboard   → OrganizerDashboardPage (organizer)
/admin/dashboard       → AdminDashboardPage (admin)
/forbidden             → ForbiddenPage (public)
```

## Role-Based Redirects

After login/registration:
- `user` → `/dashboard`
- `organizer` → `/organizer/dashboard`
- `admin` → `/admin/dashboard`

## Registration Flow

1. User fills form (name, email, password, confirmation, role, terms)
2. Role selection uses card-style UI with Lucide icons
3. Terms checkbox required
4. On success: store token, redirect by role
5. Never trust frontend role — use backend response

## Login Flow

1. User enters email and password
2. Show/hide password toggle
3. "Forgot password? Coming soon" label (non-functional)
4. On success: store token, redirect by role (or preserve intended destination)
5. Invalid credentials: generic error message

## Dashboard Placeholders

### Attendee Dashboard
- Welcome message with user name
- Role badge (User/Attendee)
- Account summary card (name, email, role)
- Future features section (Discover events, My bookings, My tickets, Favorites)

### Organizer Dashboard
- Welcome message
- Role badge (Organizer)
- Account summary card
- Future features section (Create events, Manage events, Ticket types, Bookings)

### Admin Dashboard
- Welcome message
- Role badge (Admin)
- Account summary card
- Note that admin features will be implemented later

## Forbidden Page

- Lock icon
- "Access Denied" heading
- Explanation text
- Button to correct dashboard (based on user role)
- Button to home

## Testing Strategy

### Component Tests
- Button renders with correct variants
- Input displays label and error
- PasswordInput toggles visibility
- Checkbox handles checked state
- RoleSelector allows single selection
- Badge displays correct colors

### Page Tests
- Home page shows auth actions for guests, dashboard link for auth users
- Register page shows role options, terms checkbox, validates form
- Login page shows form, toggles password, validates form
- Dashboard pages show correct content for each role
- Forbidden page shows role-aware navigation

### Integration Tests
- Mobile menu opens and closes
- Navigation closes mobile menu
- Role-based redirects work correctly
- Session restoration works
- Protected routes redirect properly

## Accessibility

- All form fields have visible labels
- Role selection is keyboard accessible
- Buttons have proper types
- Mobile menu uses `aria-expanded`
- Icon-only buttons have accessible names
- Focus-visible styling on all interactive elements
- Sufficient color contrast (WCAG AA)
- Error messages connected to fields via `aria-describedby`
- Loading states announced to screen readers

## Responsive Breakpoints

- 320px: Mobile small
- 375px: Mobile standard
- 768px: Tablet
- 1024px: Desktop
- 1280px: Desktop large

All layouts must work without horizontal overflow at any breakpoint.
