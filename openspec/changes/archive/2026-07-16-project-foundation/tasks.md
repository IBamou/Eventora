# Project Foundation Tasks

## 1. UI Component Library

- [x] 1.1 Create `Button` component with primary, secondary, ghost variants
- [x] 1.2 Add `loading` state with spinner to Button
- [x] 1.3 Add `size` prop (sm, md, lg) to Button
- [x] 1.4 Add `leftIcon` and `rightIcon` props to Button
- [x] 1.5 Create `Input` component with label, error, placeholder
- [x] 1.6 Add `aria-describedby` for error messages in Input
- [x] 1.7 Create `PasswordInput` component with show/hide toggle
- [x] 1.8 Add `aria-label` to password toggle button
- [x] 1.9 Create `Checkbox` component with label
- [x] 1.10 Create `FormField` wrapper component
- [x] 1.11 Create `RoleSelector` component with card-style roles
- [x] 1.12 Add Lucide icons to RoleSelector cards
- [x] 1.13 Add keyboard navigation to RoleSelector
- [x] 1.14 Create `Badge` component for roles
- [x] 1.15 Create `Avatar` component with initials
- [x] 1.16 Create `Card` component with rounded corners

## 2. Mobile Navigation

- [x] 2.1 Create responsive header component
- [x] 2.2 Add hamburger menu button for mobile
- [x] 2.3 Add `aria-expanded` to hamburger button
- [x] 2.4 Add `aria-label` to hamburger button
- [x] 2.5 Implement mobile menu open/close
- [x] 2.6 Close menu on navigation link click
- [x] 2.7 Close menu on Escape key
- [x] 2.8 Prevent horizontal overflow on mobile
- [x] 2.9 Add authenticated header state (dashboard link, role badge, logout)
- [x] 2.10 Test mobile menu at 320px, 375px, 768px

## 3. Route Structure

- [x] 3.1 Rename `/organizer` to `/organizer/dashboard`
- [x] 3.2 Add `/admin/dashboard` route
- [x] 3.3 Wrap `/dashboard` with ProtectedRoute and role="user"
- [x] 3.4 Wrap `/organizer/dashboard` with ProtectedRoute and role="organizer"
- [x] 3.5 Wrap `/admin/dashboard` with ProtectedRoute and role="admin"
- [x] 3.6 Add GuestRoute to `/login` and `/register`

## 4. Role-Based Redirects

- [x] 4.1 Update login redirect to use role-based logic
- [x] 4.2 Update registration redirect to use role-based logic
- [x] 4.3 Preserve intended destination in login redirect
- [x] 4.4 Handle unauthorized intended destination (fallback to default)
- [x] 4.5 Test redirect for user, organizer, admin roles

## 5. Registration Improvements

- [x] 5.1 Add terms acceptance checkbox to registration form
- [x] 5.2 Add terms validation (required)
- [x] 5.3 Update RoleSelector to use Lucide icons
- [x] 5.4 Add role descriptions to RoleSelector cards
- [x] 5.5 Update password field to use PasswordInput component
- [x] 5.6 Implement split-screen or centered card layout
- [x] 5.7 Update success redirect to use role-based logic
- [x] 5.8 Test registration with terms checkbox

## 6. Login Improvements

- [x] 6.1 Update password field to use PasswordInput component
- [x] 6.2 Add "Forgot password? Coming soon" label
- [x] 6.3 Update error message to "The provided credentials are invalid."
- [x] 6.4 Update success redirect to use role-based logic
- [x] 6.5 Test login with show/hide password

## 7. Dashboard Placeholders

- [x] 7.1 Update AttendeeDashboardPage with welcome message and account summary
- [x] 7.2 Add future features section to AttendeeDashboardPage
- [x] 7.3 Update OrganizerPage (rename to OrganizerDashboardPage)
- [x] 7.4 Add account summary and future features to OrganizerDashboardPage
- [x] 7.5 Create AdminDashboardPage
- [x] 7.6 Add account summary and placeholder message to AdminDashboardPage
- [x] 7.7 Update ForbiddenPage with role-aware dashboard link
- [x] 7.8 Test all dashboards render correctly

## 8. Visual Identity

- [x] 8.1 Update color scheme to brand colors (indigo primary, violet accent)
- [x] 8.2 Update form widths to 420-520px on desktop
- [x] 8.3 Update border radius to rounded-xl or rounded-2xl
- [x] 8.4 Update shadows to subtle (shadow-sm, shadow-md)
- [x] 8.5 Add focus-visible rings to all interactive elements
- [x] 8.6 Test at 320px, 375px, 768px, 1024px, 1280px

## 9. Testing

- [x] 9.1 Add tests for Button component variants
- [x] 9.2 Add tests for PasswordInput toggle
- [x] 9.3 Add tests for RoleSelector selection
- [x] 9.4 Add tests for mobile menu open/close
- [x] 9.5 Add tests for role-based redirects
- [x] 9.6 Add tests for admin dashboard access
- [x] 9.7 Add tests for forbidden page role-aware link
- [x] 9.8 Update existing tests for new components

## 10. Verification

- [x] 10.1 Run `npm run lint` — no errors
- [x] 10.2 Run `npm run typecheck` — no errors
- [x] 10.3 Run `npm run test:run` — all tests pass
- [x] 10.4 Run `npm run build` — build succeeds
- [x] 10.5 Test responsive at 320px, 375px, 768px, 1024px, 1280px
- [x] 10.6 Test accessibility (keyboard navigation, aria attributes)
- [x] 10.7 Test all auth flows (register, login, logout, restore)
- [x] 10.8 Test role-based access for all dashboards
