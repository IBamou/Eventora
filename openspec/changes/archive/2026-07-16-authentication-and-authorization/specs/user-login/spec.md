## ADDED Requirements

### Requirement: User login with credentials
The system SHALL authenticate users using email and password and issue a Sanctum Bearer token.

#### Scenario: Successful login
- **WHEN** a registered user submits valid email and password
- **THEN** the system returns status 200
- **AND** returns a Sanctum Bearer token
- **AND** returns the authenticated user's safe public information

#### Scenario: Invalid credentials
- **WHEN** a user submits invalid email or password
- **THEN** the system returns status 401
- **AND** the response MUST NOT reveal whether the email exists

### Requirement: Login rate limiting
The system SHALL rate-limit login attempts to prevent brute-force attacks.

#### Scenario: Rate limit exceeded
- **WHEN** a client exceeds the login rate limit
- **THEN** the system returns status 429

### Requirement: Login validation errors
The system SHALL return consistent validation error responses for invalid login data.

#### Scenario: Missing email
- **WHEN** a login request is missing the email field
- **THEN** the system returns status 422 with a validation error message

#### Scenario: Missing password
- **WHEN** a login request is missing the password field
- **THEN** the system returns status 422 with a validation error message
