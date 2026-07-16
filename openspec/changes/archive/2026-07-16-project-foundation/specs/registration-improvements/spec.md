# Registration Improvements

## Requirements

### Layout

The registration page MUST use either:

1. A split-screen desktop layout with brand panel on one side, or
2. A centered card with a supporting brand panel

On mobile, the page MUST collapse to a single column.

### Scenario: Desktop shows split layout

GIVEN a user views registration on a 1024px viewport
WHEN the page renders
THEN it MUST display a brand panel and a form side by side

### Scenario: Mobile shows single column

GIVEN a user views registration on a 375px viewport
WHEN the page renders
THEN it MUST display the form in a single column without horizontal overflow

---

### Form Fields

The registration form MUST include:

1. Full name (text input)
2. Email (email input)
3. Password (password input with show/hide toggle)
4. Password confirmation (password input)
5. Role selection (card-style selector)
6. Terms acceptance (checkbox)

### Scenario: All form fields are present

GIVEN a user views the registration page
WHEN the form renders
THEN it MUST display all six form fields

---

### Role Selection

The role selection MUST use card-style UI with:

- Lucide icons for each role
- Role title ("Attendee", "Organizer")
- Short description explaining the role
- Visual highlight when selected
- Keyboard navigation support
- Only `user` and `organizer` options (NO admin)

### Scenario: Attendee card shows icon and description

GIVEN a user views the role selection
WHEN the Attendee card renders
THEN it MUST display a ticket icon, "Attendee" title, and description

### Scenario: Organizer card shows icon and description

GIVEN a user views the role selection
WHEN the Organizer card renders
THEN it MUST display a building icon, "Organizer" title, and description

### Scenario: Admin is not an option

GIVEN a user views the registration form
WHEN the role selection renders
THEN it MUST NOT display an "Admin" option

---

### Terms Acceptance

The registration form MUST include a terms acceptance checkbox:

- Label: "I agree to the Terms of Service and Privacy Policy"
- Must be checked to submit
- Validation error if not checked

### Scenario: Terms checkbox is required

GIVEN a user submits the registration form without checking terms
WHEN the form validates
THEN it MUST display an error: "You must accept the terms"

### Scenario: Terms checkbox can be checked

GIVEN a user clicks the terms checkbox
WHEN the checkbox is clicked
THEN it MUST become checked

---

### Validation

The form MUST validate:

- Name: required
- Email: required, valid format
- Password: minimum 8 characters
- Password confirmation: must match password
- Role: must be "user" or "organizer"
- Terms: must be accepted

### Scenario: Empty form shows all errors

GIVEN a user submits an empty registration form
WHEN the form validates
THEN it MUST show errors for all required fields

### Scenario: Password mismatch shows error

GIVEN a user enters different values in password and confirmation
WHEN the form validates
THEN it MUST show "Passwords do not match"

### Scenario: Invalid email shows error

GIVEN a user enters "notanemail" in the email field
WHEN the form validates
THEN it MUST show "Invalid email address"

---

### Loading and Disabled States

The form MUST:

- Disable the submit button while submitting
- Show a loading spinner on the submit button
- Prevent double submission
- Show backend validation errors
- Show generic server errors

### Scenario: Submit button shows loading state

GIVEN the form is being submitted
WHEN the submit button renders
THEN it MUST be disabled and show a spinner

### Scenario: Backend errors are displayed

GIVEN the backend returns a 422 error with field errors
WHEN the response is received
THEN the errors MUST be displayed next to the corresponding fields

---

### Success Behavior

After successful registration:

1. Store the Bearer token using the centralized token-storage utility
2. Update authentication state via AuthProvider
3. Redirect based on the role returned by the backend:
   - `user` → `/dashboard`
   - `organizer` → `/organizer/dashboard`

### Scenario: Successful registration redirects by role

GIVEN a user registers with role "organizer"
WHEN the registration succeeds
THEN the user MUST be redirected to `/organizer/dashboard`
AND the token MUST be stored
AND the auth state MUST be updated
