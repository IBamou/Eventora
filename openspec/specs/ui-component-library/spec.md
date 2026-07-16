# UI Component Library

## Purpose

Reusable UI component library for the Eventora frontend, providing accessible, consistent components built with React and Tailwind CSS.

## Requirements

### Button Component

The system MUST provide a reusable Button component with the following variants:

1. **Primary**: Solid background, white text
2. **Secondary**: Border only, text color
3. **Ghost**: No border, text color

The Button component MUST support:

- `disabled` state with reduced opacity
- `loading` state with spinner
- `size` prop (sm, md, lg)
- `leftIcon` and `rightIcon` props
- Proper `type` attribute (button, submit, reset)
- `focus-visible` ring for keyboard navigation

#### Scenario: Button renders with correct variant

- **GIVEN** a user views a Button with `variant="primary"`
- **WHEN** the Button renders
- **THEN** it MUST have a solid indigo background and white text

#### Scenario: Button shows loading state

- **GIVEN** a Button with `isLoading={true}`
- **WHEN** the Button renders
- **THEN** it MUST display a spinner and be disabled

#### Scenario: Button is keyboard accessible

- **GIVEN** a user navigates to a Button using the keyboard
- **WHEN** the Button receives focus
- **THEN** it MUST display a visible focus ring

---

### Input Component

The system MUST provide a reusable Input component with:

- Label (visible, associated via `htmlFor`)
- Placeholder text
- Error message display
- Disabled state
- Proper `aria-describedby` for error messages

#### Scenario: Input displays label

- **GIVEN** an Input with `label="Email"`
- **WHEN** the Input renders
- **THEN** it MUST display the label above the input field

#### Scenario: Input displays error

- **GIVEN** an Input with `error="Email is required"`
- **WHEN** the Input renders
- **THEN** it MUST display the error message below the input
- **AND** the input MUST have a red border

---

### PasswordInput Component

The system MUST provide a PasswordInput component that extends Input with:

- Show/hide password toggle button
- Toggle button MUST have `aria-label` ("Show password" or "Hide password")
- Password visibility state MUST be managed internally

#### Scenario: PasswordInput toggles visibility

- **GIVEN** a user views a PasswordInput
- **WHEN** the user clicks the toggle button
- **THEN** the password field MUST switch from type="password" to type="text"
- **AND** the toggle button label MUST change to "Hide password"

#### Scenario: PasswordInput hides password by default

- **GIVEN** a PasswordInput renders
- **WHEN** the component mounts
- **THEN** the password field MUST be type="password"
- **AND** the toggle button MUST show "Show password"

---

### Checkbox Component

The system MUST provide a Checkbox component with:

- Visible label
- Checked state
- Disabled state
- `aria-checked` attribute
- Keyboard interaction (Space to toggle)

#### Scenario: Checkbox toggles on click

- **GIVEN** an unchecked Checkbox
- **WHEN** the user clicks the Checkbox
- **THEN** it MUST become checked

#### Scenario: Checkbox displays label

- **GIVEN** a Checkbox with `label="I agree to terms"`
- **WHEN** the Checkbox renders
- **THEN** it MUST display the label next to the checkbox

---

### FormField Component

The system MUST provide a FormField wrapper component that combines:

- Label
- Input (or other form control)
- Error message
- Helper text (optional)

#### Scenario: FormField associates label with input

- **GIVEN** a FormField with `label="Name"` and an Input
- **WHEN** the FormField renders
- **THEN** the label MUST be associated with the input via `htmlFor` and `id`

---

### RoleSelector Component

The system MUST provide a RoleSelector component for registration that:

- Displays role options as selectable cards
- Each card MUST include:
  - Lucide icon
  - Role title (e.g., "Attendee", "Organizer")
  - Short description
  - Selected state (visual highlight)
- Supports keyboard navigation (arrow keys, Enter/Space to select)
- Only allows single selection
- Uses `aria-role="radiogroup"` and `role="radio"` for accessibility

#### Scenario: RoleSelector displays role options

- **GIVEN** a RoleSelector with roles ["user", "organizer"]
- **WHEN** the RoleSelector renders
- **THEN** it MUST display two cards: "Attendee" and "Organizer"

#### Scenario: RoleSelector allows selection

- **GIVEN** a RoleSelector with no selected role
- **WHEN** the user clicks the "Attendee" card
- **THEN** the "Attendee" card MUST be visually highlighted
- **AND** the selected role MUST be "user"

#### Scenario: RoleSelector prevents admin selection

- **GIVEN** a RoleSelector for public registration
- **WHEN** the RoleSelector renders
- **THEN** it MUST NOT display an "Admin" option

---

### Badge Component

The system MUST provide a Badge component for displaying roles:

- **User/Attendee**: Green background, green text
- **Organizer**: Blue background, blue text
- **Admin**: Red background, red text

#### Scenario: Badge displays role correctly

- **GIVEN** a Badge with `role="organizer"`
- **WHEN** the Badge renders
- **THEN** it MUST display "Organizer" with blue styling

---

### Avatar Component

The system MUST provide an Avatar component that:

- Displays user initials when no image is provided
- Uses a background color based on user name
- Supports `size` prop (sm, md, lg)

#### Scenario: Avatar shows initials

- **GIVEN** an Avatar with `name="John Doe"`
- **WHEN** the Avatar renders
- **THEN** it MUST display "JD" inside a colored circle

---

### Card Component

The system MUST provide a Card component with:

- White background
- Subtle border and shadow
- Rounded corners (`rounded-xl`)
- Configurable padding

#### Scenario: Card renders with content

- **GIVEN** a Card with child content
- **WHEN** the Card renders
- **THEN** it MUST display the content inside a white container with rounded corners
