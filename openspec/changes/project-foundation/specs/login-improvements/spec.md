# Login Improvements

## Requirements

### Layout

The login page MUST share the same visual identity as registration:

- Centered card layout on desktop
- Brand logo and name above the form
- Single column on mobile
- Matching color scheme and typography

### Scenario: Login matches registration style

GIVEN a user views login and registration side by side
WHEN both pages render
THEN they MUST share the same visual identity (colors, fonts, spacing)

---

### Form Fields

The login form MUST include:

1. Email (email input)
2. Password (password input with show/hide toggle)

### Scenario: Login form has email and password

GIVEN a user views the login page
WHEN the form renders
THEN it MUST display email and password fields

---

### Show/Hide Password

The password field MUST include a toggle button to show/hide the password:

- Toggle button MUST have `aria-label` ("Show password" or "Hide password")
- Password MUST be hidden by default
- Toggle MUST switch between `type="password"` and `type="text"`

### Scenario: Password is hidden by default

GIVEN a user views the login form
WHEN the password field renders
THEN it MUST be type="password"

### Scenario: Toggle shows password

GIVEN the password is hidden
WHEN the user clicks the toggle button
THEN the password MUST become visible (type="text")
AND the toggle label MUST change to "Hide password"

---

### Content

The login page MUST include:

- Heading: "Welcome back"
- Supporting text explaining the login purpose
- Submit button: "Sign in"
- Link to registration: "Don't have an account? Create one"
- Link to home: Back arrow or logo link
- "Forgot password? Coming soon" label (non-functional)

### Scenario: Login page shows welcome heading

GIVEN a user views the login page
WHEN the page renders
THEN it MUST display "Welcome back" as the heading

### Scenario: Forgot password label is present

GIVEN a user views the login page
WHEN the page renders
THEN it MUST display "Forgot password? Coming soon"
AND the label MUST NOT be a working link

---

### Validation

The form MUST validate:

- Email: required, valid format
- Password: required

### Scenario: Empty form shows errors

GIVEN a user submits an empty login form
WHEN the form validates
THEN it MUST show "Email is required" and "Password is required"

### Scenario: Invalid email format

GIVEN a user enters "notanemail" in the email field
WHEN the form validates
THEN it MUST show "Invalid email address"

---

### Error States

The login form MUST handle:

1. **Invalid credentials**: Generic message "The provided credentials are invalid."
2. **Network error**: "An unexpected error occurred. Please try again."
3. **Server error**: "An unexpected error occurred. Please try again."

The invalid credentials message MUST NOT reveal whether the email exists.

### Scenario: Invalid credentials shows generic message

GIVEN a user enters wrong email or password
WHEN the backend returns 401
THEN the form MUST show "The provided credentials are invalid."
AND it MUST NOT say "Email not found" or similar

### Scenario: Network error shows generic message

GIVEN a user submits the login form
WHEN a network error occurs
THEN the form MUST show "An unexpected error occurred. Please try again."

---

### Loading and Disabled States

The form MUST:

- Disable the submit button while submitting
- Show a loading spinner on the submit button
- Prevent double submission

### Scenario: Submit button shows loading state

GIVEN the form is being submitted
WHEN the submit button renders
THEN it MUST be disabled and show "Signing in..." with a spinner

---

### Login Redirect

After successful login, the system MUST redirect based on:

1. If there's an intended destination (from ProtectedRoute), redirect there IF authorized
2. Otherwise, redirect based on role:
   - `user` → `/dashboard`
   - `organizer` → `/organizer/dashboard`
   - `admin` → `/admin/dashboard`

### Scenario: Login redirects to intended destination

GIVEN a user was redirected from `/dashboard` to `/login`
WHEN the user logs in with role "user"
THEN the user MUST be redirected to `/dashboard`

### Scenario: Login redirects by role when no intended destination

GIVEN a user navigates directly to `/login`
WHEN the user logs in with role "organizer"
THEN the user MUST be redirected to `/organizer/dashboard`
