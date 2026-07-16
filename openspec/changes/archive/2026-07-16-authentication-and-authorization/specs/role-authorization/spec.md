## ADDED Requirements

### Requirement: UserRole backed enum
The system SHALL use a PHP backed enum for user roles with values "user", "organizer", and "admin".

#### Scenario: Valid role values
- **WHEN** a role is assigned to a user
- **THEN** the role MUST be one of "user", "organizer", or "admin"

### Requirement: Role-based route protection
The system SHALL protect private endpoints using role-based middleware or authorization mechanisms.

#### Scenario: User accesses user-only route
- **WHEN** a user with role "user" accesses a route restricted to "organizer"
- **THEN** the system returns status 403

#### Scenario: Organizer accesses organizer route
- **WHEN** a user with role "organizer" accesses a route restricted to "organizer"
- **THEN** the system allows access

#### Scenario: Admin accesses admin route
- **WHEN** a user with role "admin" accesses a route restricted to "admin"
- **THEN** the system allows access

#### Scenario: Unauthenticated access to protected route
- **WHEN** a request is made to a role-protected route without authentication
- **THEN** the system returns status 401

### Requirement: Role stored in database
The system SHALL store the user's role in the users table.

#### Scenario: Role column exists
- **WHEN** a user is created
- **THEN** the role is persisted in the database

### Requirement: Role casting in User model
The system SHALL cast the role attribute to the UserRole enum in the User model.

#### Scenario: Role is cast to enum
- **WHEN** a User model is retrieved
- **THEN** the role attribute is an instance of UserRole enum
