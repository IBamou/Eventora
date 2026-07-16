# User Session

## Purpose

Handle authenticated user profile retrieval and ensure sensitive data is never exposed through API responses.

## Requirements

### Retrieve authenticated user profile

The system SHALL return the authenticated user's safe public information when a valid Bearer token is provided.

#### Scenario: Successful profile retrieval

- **WHEN** an authenticated user requests their profile with a valid token
- **THEN** the system returns status 200
- **AND** returns the user's id, name, email, role, created_at, and updated_at

#### Scenario: Unauthenticated profile access

- **WHEN** a request is made without a valid Bearer token
- **THEN** the system returns status 401

---

### Safe user resource fields

The system SHALL expose only safe public fields in user resources. Sensitive information MUST NOT be exposed.

#### Scenario: Sensitive fields excluded

- **WHEN** a user resource is returned
- **THEN** the response MUST NOT include password, remember_token, or internal authentication data
