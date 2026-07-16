# User Logout

## Purpose

Handle secure logout with token revocation and ensure unauthenticated requests are rejected.

## Requirements

### User logout with token revocation

The system SHALL revoke the current Sanctum token when an authenticated user logs out.

#### Scenario: Successful logout

- **WHEN** an authenticated user requests logout
- **THEN** the current token is revoked
- **AND** the system returns status 200

#### Scenario: Revoked token rejected

- **WHEN** a revoked token is used on a protected endpoint
- **THEN** the system returns status 401

---

### Logout requires authentication

The system SHALL require a valid Bearer token to perform logout.

#### Scenario: Unauthenticated logout attempt

- **WHEN** a logout request is made without a valid token
- **THEN** the system returns status 401
