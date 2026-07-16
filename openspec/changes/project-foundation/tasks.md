# Project Foundation Tasks

## 1. UI Component Library

- [ ] 1.1 Create `Button` component with primary, secondary, ghost variants
- [ ] 1.2 Add `loading` state with spinner to Button
- [ ] 1.3 Add `size` prop (sm, md, lg) to Button
- [ ] 1.4 Add `leftIcon` and `rightIcon` props to Button
- [ ] 1.5 Create `Input` component with label, error, placeholder
- [ ] 1.6 Add `aria-describedby` for error messages in Input
- [ ] 1.7 Create `PasswordInput` component with show/hide toggle
- [ ] 1.8 Add `aria-label` to password toggle button
- [ ] 1.9 Create `Checkbox` component with label
- [ ] 1.10 Create `FormField` wrapper component
- [ ] 1.11 Create `RoleSelector` component with card-style roles
- [ ] 1.12 Add Lucide icons to RoleSelector cards
- [ ] 1.13 Add keyboard navigation to RoleSelector
- [ ] 1.14 Create `Badge` component for roles
- [ ] 1.15 Create `Avatar` component with initials
- [ ] 1.16 Create `Card` component with rounded corners

## 2. Mobile Navigation

- [ ] 2.1 Create responsive header component
- [ ] 2.2 Add hamburger menu button for mobile
- [ ] 2.3 Add `aria-expanded` to hamburger button
- [ ] 2.4 Add `aria-label` to hamburger button
- [ ] 2.5 Implement mobile menu open/close
- [ ] 2.6 Close menu on navigation link click
- [ ] 2.7 Close menu on Escape key
- [ ] 2.8 Prevent horizontal overflow on mobile
- [ ] 2.9 Add authenticated header state (dashboard link, role badge, logout)
- [ ] 2.10 Test mobile menu at 320px, 375px, 768px

## 3. Route Structure

- [ ] 3.1 Rename `/organizer` to `/organizer/dashboard`
- [ ] 3.2 Add `/admin/dashboard` route
- [ ] 3.3 Wrap `/dashboard` with ProtectedRoute and role="user"
- [ ] 3.4 Wrap `/organizer/dashboard` with ProtectedRoute and role="organizer"
- [ ] 3.5 Wrap `/admin/dashboard` with ProtectedRoute and role="admin"
- [ ] 3.6 Add GuestRoute to `/login` and `/register`

## 4. Role-Based Redirects

- [ ] 4.1 Update login redirect to use role-based logic
- [ ] 4.2 Update registration redirect to use role-based logic
- [ ] 4.3 Preserve intended destination in login redirect
- [ ] 4.4 Handle unauthorized intended destination (fallback to default)
- [ ] 4.5 Test redirect for user, organizer, admin roles

## 5. Registration Improvements

- [ ] 5.1 Add terms acceptance checkbox to registration form
- [ ] 5.2 Add terms validation (required)
- [ ] 5.3 Update RoleSelector to use Lucide icons
- [ ] 5.4 Add role descriptions to RoleSelector cards
- [ ] 5.5 Update password field to use PasswordInput component
- [ ] 5.6 Implement split-screen or centered card layout
- [ ] 5.7 Update success redirect to use role-based logic
- [ ] 5.8 Test registration with terms checkbox

## 6. Login Improvements

- [ ] 6.1 Update password field to use PasswordInput component
- [ ] 6.2 Add "Forgot password? Coming soon" label
- [ ] 6.3 Update error message to "The provided credentials are invalid."
- [ ] 6.4 Update success redirect to use role-based logic
- [ ] 6.5 Test login with show/hide password

## 7. Dashboard Placeholders

- [ ] 7.1 Update AttendeeDashboardPage with welcome message and account summary
- [ ] 7.2 Add future features section to AttendeeDashboardPage
- [ ] 7.3 Update OrganizerPage (rename to OrganizerDashboardPage)
- [ ] 7.4 Add account summary and future features to OrganizerDashboardPage
- [ ] 7.5 Create AdminDashboardPage
- [ ] 7.6 Add account summary and placeholder message to AdminDashboardPage
- [ ] 7.7 Update ForbiddenPage with role-aware dashboard link
- [ ] 7.8 Test all dashboards render correctly

## 8. Visual Identity

- [ ] 8.1 Update color scheme to brand colors (indigo primary, violet accent)
- [ ] 8.2 Update form widths to 420-520px on desktop
- [ ] 8.3 Update border radius to rounded-xl or rounded-2xl
- [ ] 8.4 Update shadows to subtle (shadow-sm, shadow-md)
- [ ] 8.5 Add focus-visible rings to all interactive elements
- [ ] 8.6 Test at 320px, 375px, 768px, 1024px, 1280px

## 9. Testing

- [ ] 9.1 Add tests for Button component variants
- [ ] 9.2 Add tests for PasswordInput toggle
- [ ] 9.3 Add tests for RoleSelector selection
- [ ] 9.4 Add tests for mobile menu open/close
- [ ] 9.5 Add tests for role-based redirects
- [ ] 9.6 Add tests for admin dashboard access
- [ ] 9.7 Add tests for forbidden page role-aware link
- [ ] 9.8 Update existing tests for new components

## 10. Verification

- [ ] 10.1 Run `npm run lint` — no errors
- [ ] 10.2 Run `npm run typecheck` — no errors
- [ ] 10.3 Run `npm run test:run` — all tests pass
- [ ] 10.4 Run `npm run build` — build succeeds
- [ ] 10.5 Test responsive at 320px, 375px, 768px, 1024px, 1280px
- [ ] 10.6 Test accessibility (keyboard navigation, aria attributes)
- [ ] 10.7 Test all auth flows (register, login, logout, restore)
- [ ] 10.8 Test role-based access for all dashboards
