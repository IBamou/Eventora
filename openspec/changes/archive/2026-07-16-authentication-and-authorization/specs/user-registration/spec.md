## ADDED Requirements

### Requirement: User registration with role selection
The system SHALL allow visitors to create an account by providing name, email, password, password confirmation, and role.

#### Scenario: Register as user
- **WHEN** a visitor submits valid registration data with role "user"
- **THEN** the system creates an account with the "user" role
- **AND** returns status 201 with the created user resource

#### Scenario: Register as organizer
- **WHEN** a visitor submits valid registration data with role "organizer"
- **THEN** the system creates an account with the "organizer" role
- **AND** returns status 201 with the created user resource

#### Scenario: Reject admin registration
- **WHEN** a visitor submits registration data with role "admin"
- **THEN** the system returns status 422
- **AND** no account is created

#### Scenario: Reject unknown role
- **WHEN** a visitor submits registration data with an unsupported role value
- **THEN** the system returns status 422
- **AND** no account is created

#### Scenario: Reject missing role
- **WHEN** a visitor submits registration data without a role field
- **THEN** the system returns status 422
- **AND** no account is created

### Requirement: Email uniqueness
The system SHALL reject registration with an email address that already exists.

#### Scenario: Duplicate email rejected
- **WHEN** a visitor submits registration data with an email already in use
- **THEN** the system returns status 422
- **AND** no duplicate account is created

### Requirement: Password hashing
The system SHALL hash passwords using Laravel's secure hashing before storage.

#### Scenario: Password is hashed
- **WHEN** a user registers with a password
- **THEN** the stored password MUST NOT be the plaintext value

### Requirement: Registration rate limiting
The system SHALL rate-limit registration attempts to prevent abuse.

#### Scenario: Rate limit exceeded
- **WHEN** a client exceeds the registration rate limit
- **THEN** the system returns status 429

### Requirement: Validation error responses
The system SHALL return consistent validation error responses for invalid registration data.

#### Scenario: Missing required field
- **WHEN** a registration request is missing a required field
- **THEN** the system returns status 422 with a validation error message for that field

#### Scenario: Invalid email format
- **WHEN** a registration request contains an invalid email format
- **THEN** the system returns status 422 with a validation error message

#### Scenario: Password too short
- **WHEN** a registration request contains a password below minimum length
- **THEN** the system returns status 422 with a validation error message

#### Scenario: Password confirmation mismatch
- **WHEN** a registration request has password and password_confirmation that do not match
- **THEN** the system returns status 422 with a validation error message
