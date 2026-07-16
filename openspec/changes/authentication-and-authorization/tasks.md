# Authentication and Authorization Tasks

## 1. Database, Sanctum, and Enum Setup

- [x] 1.1 Verify Laravel Sanctum is installed and configured
- [x] 1.2 Verify the `personal_access_tokens` migration exists
- [x] 1.3 Create the `UserRole` backed enum with the values `user`, `organizer`, and `admin`
- [x] 1.4 Create a migration that adds a `role` column to the `users` table with `user` as the default value
- [x] 1.5 Add an index to the `role` column if role-based queries will use it
- [x] 1.6 Run the migrations and verify the resulting database schema
- [x] 1.7 Update the `User` model to cast the `role` attribute to `UserRole`
- [x] 1.8 Ensure password, `remember_token`, and authentication internals are hidden from serialization
- [x] 1.9 Verify API routes are loaded with the `/api` prefix
- [x] 1.10 Configure API versioning under `/api/v1`

## 2. Backend Requests and Authentication Responses

- [x] 2.1 Create `RegisterRequest`
- [x] 2.2 Validate `name`, `email`, `password`, `password_confirmation`, and `role`
- [x] 2.3 Allow only `user` and `organizer` during public registration
- [x] 2.4 Reject `admin`, unknown roles, and missing roles with status `422`
- [x] 2.5 Normalize the email address before validation and persistence
- [x] 2.6 Enforce unique email addresses
- [x] 2.7 Enforce password confirmation and Laravel password requirements
- [x] 2.8 Create `LoginRequest`
- [x] 2.9 Normalize the login email before authentication
- [x] 2.10 Define the standard authentication success-response structure
- [x] 2.11 Define the standard validation-error response structure
- [x] 2.12 Define consistent JSON responses for unauthenticated, forbidden, invalid-credentials, and server errors
- [x] 2.13 Ensure invalid login responses do not reveal whether an email exists

## 3. Backend Authentication Implementation

- [x] 3.1 Create `AuthController`
- [x] 3.2 Implement user and organizer registration
- [x] 3.3 Hash passwords using Laravel's hashing system
- [x] 3.4 Prevent public registration from assigning the `admin` role
- [x] 3.5 Implement login using email and password
- [x] 3.6 Generate a Laravel Sanctum Bearer token after successful login
- [x] 3.7 Implement the authenticated-user profile endpoint
- [x] 3.8 Implement logout by revoking only the current access token
- [x] 3.9 Ensure logout does not revoke other active user tokens
- [x] 3.10 Create `UserResource` for safe authenticated-user responses
- [x] 3.11 Ensure `UserResource` exposes only approved public fields
- [x] 3.12 Keep authentication controller methods thin

## 4. Backend Routes

- [x] 4.1 Define `POST /api/v1/auth/register`
- [x] 4.2 Define `POST /api/v1/auth/login`
- [x] 4.3 Define `GET /api/v1/auth/me`
- [x] 4.4 Define `POST /api/v1/auth/logout`
- [x] 4.5 Apply `auth:sanctum` to the `me` and `logout` routes
- [x] 4.6 Apply named rate limiters to the registration and login routes

## 5. Backend Authorization Middleware

- [x] 5.1 Create `RoleMiddleware`
- [x] 5.2 Support one or multiple permitted roles
- [x] 5.3 Return `401 Unauthorized` when no authenticated user exists
- [x] 5.4 Return `403 Forbidden` when the authenticated user's role is not permitted
- [x] 5.5 Register the middleware alias in `bootstrap/app.php`
- [ ] 5.6 Add dedicated test routes only inside the test environment
- [ ] 5.7 Verify that no testing-only authorization routes are exposed in production
- [ ] 5.8 Document that Policies will handle resource ownership in future features

## 6. Backend Security Configuration

- [ ] 6.1 Create a named rate limiter for registration
- [ ] 6.2 Limit registration attempts by client IP
- [ ] 6.3 Create a named rate limiter for login
- [ ] 6.4 Limit login attempts using the normalized email and client IP
- [ ] 6.5 Apply the rate limiters to their corresponding routes
- [ ] 6.6 Configure CORS for the React frontend origin
- [ ] 6.7 Keep `supports_credentials` disabled while using Bearer-token authentication
- [ ] 6.8 Ensure passwords and tokens are never written to application logs
- [ ] 6.9 Ensure protected routes do not rely on frontend role checks
- [ ] 6.10 Ensure authentication exceptions always return JSON for API requests

## 7. Backend Factories and Testing Foundation

- [x] 7.1 Update `UserFactory` with a default `user` role
- [x] 7.2 Add a `user` factory state
- [x] 7.3 Add an `organizer` factory state
- [x] 7.4 Add an `admin` factory state
- [ ] 7.5 Create reusable authentication test helpers when they reduce duplication
- [ ] 7.6 Configure dedicated role-middleware test routes in the testing environment

## 8. Backend Registration Tests

- [x] 8.1 Test successful registration with the `user` role
- [x] 8.2 Test successful registration with the `organizer` role
- [x] 8.3 Test that public registration rejects the `admin` role
- [x] 8.4 Test that public registration rejects an unknown role
- [x] 8.5 Test that public registration rejects a missing role
- [x] 8.6 Test duplicate email rejection
- [x] 8.7 Test password confirmation failure
- [x] 8.8 Test invalid email validation
- [x] 8.9 Test that the stored email is normalized
- [x] 8.10 Test that the stored password is hashed
- [x] 8.11 Test that a failed registration does not create a user
- [x] 8.12 Test registration rate limiting

## 9. Backend Login and Session Tests

- [x] 9.1 Test successful login
- [x] 9.2 Test that successful login returns a Bearer token
- [x] 9.3 Test login using an email that requires normalization
- [x] 9.4 Test invalid-password rejection
- [x] 9.5 Test unknown-email rejection
- [x] 9.6 Verify that unknown-email and wrong-password responses are identical
- [x] 9.7 Test login rate limiting
- [x] 9.8 Test authenticated profile retrieval
- [x] 9.9 Test unauthenticated profile rejection
- [x] 9.10 Test successful logout
- [x] 9.11 Test that logout revokes the current token
- [x] 9.12 Test that a revoked token is rejected
- [x] 9.13 Test that logout leaves other active tokens valid
- [x] 9.14 Test logout without authentication returns `401`

## 10. Backend Resource and Authorization Tests

- [x] 10.1 Test that `UserResource` contains `id`, `name`, `email`, `role`, `created_at`, and `updated_at`
- [x] 10.2 Test that `UserResource` does not expose the password
- [x] 10.3 Test that `UserResource` does not expose `remember_token`
- [x] 10.4 Test that token internals are not exposed
- [x] 10.5 Test role middleware access for a permitted `user`
- [x] 10.6 Test role middleware access for a permitted `organizer`
- [x] 10.7 Test role middleware access for a permitted `admin`
- [x] 10.8 Test routes that allow multiple roles
- [x] 10.9 Test that an authenticated user with the wrong role receives `403`
- [x] 10.10 Test that an unauthenticated request receives `401`

## 11. Frontend Authentication Types and API Layer

- [x] 11.1 Create the `UserRole` TypeScript union or enum
- [x] 11.2 Create the authenticated-user type
- [x] 11.3 Create registration request and response types
- [x] 11.4 Create login request and response types
- [x] 11.5 Create validation-error and API-error types
- [x] 11.6 Create the shared Axios client
- [x] 11.7 Configure the Axios base URL using `VITE_API_URL`
- [x] 11.8 Create a centralized token-storage utility
- [x] 11.9 Configure the request interceptor to attach the Bearer token
- [x] 11.10 Configure response handling for expired or invalid sessions
- [x] 11.11 Avoid clearing the session for unrelated public-endpoint `401` responses
- [x] 11.12 Create the authentication API module
- [x] 11.13 Implement the register API function
- [x] 11.14 Implement the login API function
- [x] 11.15 Implement the current-user API function
- [x] 11.16 Implement the logout API function

## 12. Frontend Authentication State

- [x] 12.1 Create `AuthProvider` using React Context
- [x] 12.2 Define authenticated, unauthenticated, and restoring states
- [x] 12.3 Implement login state management
- [x] 12.4 Store the token only after a successful login or registration response
- [x] 12.5 Implement logout state cleanup
- [x] 12.6 Restore the session on page refresh by loading the token
- [x] 12.7 Validate the restored token by calling `/api/v1/auth/me`
- [x] 12.8 Clear the token when session restoration returns `401`
- [x] 12.9 Prevent protected-route redirect flashes while restoration is pending
- [x] 12.10 Expose loading and authentication errors consistently
- [x] 12.11 Avoid duplicating authentication state in unrelated components

## 13. Frontend Registration and Login Pages

- [x] 13.1 Create the registration page
- [x] 13.2 Build the registration form with React Hook Form and Zod
- [x] 13.3 Add `user` and `organizer` role selection
- [x] 13.4 Display user-friendly labels such as Attendee and Organizer
- [x] 13.5 Ensure Admin is never displayed as a registration option
- [x] 13.6 Map backend validation errors to registration fields
- [x] 13.7 Create the login page
- [x] 13.8 Build the login form with React Hook Form and Zod
- [x] 13.9 Handle invalid-credentials errors without exposing account existence
- [x] 13.10 Handle network and server errors
- [x] 13.11 Disable repeated form submission while a request is pending
- [x] 13.12 Create the logout action or button

## 14. Frontend Route Protection

- [x] 14.1 Create `ProtectedRoute`
- [x] 14.2 Make `ProtectedRoute` wait until authentication restoration is complete
- [x] 14.3 Redirect unauthenticated users to login
- [x] 14.4 Preserve the intended destination during login redirection
- [x] 14.5 Create `RoleGate` for role-aware routing and UI behavior
- [x] 14.6 Allow `RoleGate` to accept one or multiple roles
- [x] 14.7 Create a Forbidden page
- [x] 14.8 Redirect authenticated users with an invalid role to the Forbidden page
- [x] 14.9 Configure protected routes in React Router
- [x] 14.10 Document that frontend route guards are not a backend security boundary

## 15. Frontend Testing Foundation

- [x] 15.1 Configure Vitest
- [x] 15.2 Configure React Testing Library
- [x] 15.3 Configure `jest-dom`
- [x] 15.4 Create shared render helpers with router and authentication providers
- [x] 15.5 Configure API mocking for authentication tests
- [x] 15.6 Document any new testing dependency added to the project

## 16. Frontend Authentication Tests

- [x] 16.1 Test registration role selection
- [x] 16.2 Test that User/Attendee appears as a registration option
- [x] 16.3 Test that Organizer appears as a registration option
- [x] 16.4 Test that Admin does not appear as a registration option
- [x] 16.5 Test registration validation-error rendering
- [x] 16.6 Test successful login state
- [x] 16.7 Test invalid-login error rendering
- [x] 16.8 Test protected-route redirection
- [x] 16.9 Test preservation of the intended destination
- [x] 16.10 Test authenticated-session restoration
- [x] 16.11 Test that an invalid restored token clears the session
- [x] 16.12 Test that session restoration does not cause a redirect flash
- [x] 16.13 Test logout behavior
- [x] 16.14 Test role-aware navigation
- [x] 16.15 Test that a user with the wrong role sees the Forbidden page

## 17. Documentation

- [x] 17.1 Document all authentication endpoints
- [x] 17.2 Document request and response examples
- [x] 17.3 Document authentication and validation error formats
- [x] 17.4 Document the allowed public-registration roles
- [x] 17.5 Document that Admin accounts cannot be created through public registration
- [x] 17.6 Document the frontend token-storage decision
- [x] 17.7 Document the security implications of Bearer-token storage
- [x] 17.8 Document the CORS configuration
- [x] 17.9 Update `.env.example` files for API and frontend configuration
- [x] 17.10 Update the root README with authentication setup and verification commands

## 18. Code Quality and Verification

### Backend

- [x] 18.1 Run `vendor/bin/pint --dirty`
- [x] 18.2 Run `vendor/bin/pint --test`
- [x] 18.3 Run `php artisan test --compact`
- [x] 18.4 Confirm all authentication Pest tests pass
- [x] 18.5 Confirm no testing-only routes are available outside the test environment

### Frontend

- [x] 18.6 Run `npm run lint`
- [x] 18.7 Run `npm run typecheck`
- [x] 18.8 Run `npm run test:run`
- [x] 18.9 Run `npm run build`
- [x] 18.10 Confirm all frontend authentication tests pass

# Verification

- [x] V1: A visitor can register with the `user` role
- [x] V2: A visitor can register with the `organizer` role
- [x] V3: Public registration rejects the `admin` role with status `422`
- [x] V4: Public registration rejects an unknown role with status `422`
- [x] V5: Public registration rejects a missing role with status `422`
- [x] V6: Duplicate emails are rejected with status `422`
- [x] V7: Password-confirmation failures are rejected with status `422`
- [x] V8: Registered passwords are securely hashed
- [x] V9: A registered user can log in and receive a Bearer token
- [x] V10: Invalid credentials return `401` without revealing whether the email exists
- [x] V11: An authenticated user can retrieve their safe profile
- [x] V12: An unauthenticated profile request returns `401`
- [x] V13: Logout revokes the current access token
- [x] V14: Logout does not revoke other active tokens
- [x] V15: A revoked token cannot access protected endpoints
- [x] V16: Role-protected routes allow permitted roles
- [x] V17: Role-protected routes return `403` for authenticated users with an invalid role
- [x] V18: Authentication endpoints are rate limited
- [x] V19: User resources do not expose sensitive fields
- [x] V20: The registration form displays only User/Attendee and Organizer
- [x] V21: The frontend login flow stores and applies the Bearer token
- [x] V22: Protected routes redirect unauthenticated users to login
- [x] V23: The intended destination is preserved during login redirection
- [x] V24: The authenticated session is restored after page refresh
- [x] V25: An invalid restored token clears the frontend session
- [x] V26: Users without the required role see the Forbidden page
- [x] V27: All Pest tests pass
- [x] V28: All Vitest tests pass
- [x] V29: Backend formatting checks pass
- [x] V30: Frontend lint and TypeScript checks pass
- [x] V31: The frontend production build completes without errors
