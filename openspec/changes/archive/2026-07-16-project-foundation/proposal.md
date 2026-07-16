## Why

Eventora needs a professional, responsive, and accessible authentication interface before users can reliably interact with the platform. The current auth pages are functional but lack brand identity, mobile responsiveness, proper component architecture, and comprehensive testing. This change establishes the visual identity, reusable component library, and UX patterns that all future features will build upon.

## What Changes

- Establish Eventora visual identity (brand colors, typography, component styling)
- Create reusable UI component library (Button, Input, PasswordInput, Checkbox, FormField, RoleSelector, Badge, Avatar, Card)
- Add responsive mobile navigation with hamburger menu
- Improve registration page with terms acceptance, split-screen layout, Lucide icons
- Improve login page with show/hide password toggle
- Add role-based redirects after login and registration
- Add admin dashboard route and placeholder page
- Improve all dashboard placeholders with account summary and future features
- Improve Forbidden page with role-aware navigation
- Rename routes to match spec (`/organizer/dashboard`, `/admin/dashboard`)
- Expand test coverage for mobile nav, role redirects, admin access

## Capabilities

### New Capabilities

- `ui-component-library`: Reusable Button, Input, PasswordInput, Checkbox, FormField, RoleSelector, Badge, Avatar, Card components
- `mobile-navigation`: Responsive header with hamburger menu, aria-expanded, close on navigation
- `role-based-redirects`: Login and registration redirect based on authenticated user role
- `admin-dashboard`: Admin role-verified dashboard placeholder

### Modified Capabilities

- `user-registration`: Add terms acceptance checkbox, split-screen layout, improved role selection with Lucide icons
- `user-login`: Add show/hide password toggle, role-based redirect, "forgot password" label
- `dashboard`: Improve attendee, organizer, and admin dashboards with account summary and future features

## Impact

- **Frontend**: New component library, improved pages, mobile navigation in `apps/web`
- **Routes**: Add `/admin/dashboard`, rename `/organizer` → `/organizer/dashboard`
- **Testing**: Expanded Vitest coverage for mobile, role redirects, admin access
- **Dependencies**: Add `lucide-react` (already installed)
