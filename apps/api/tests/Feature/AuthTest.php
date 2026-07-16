<?php

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;

uses(RefreshDatabase::class);

describe('Registration', function () {
    it('registers a user with the user role', function () {
        $response = $this->postJson('/api/auth/register', [
            'name' => 'Test User',
            'email' => 'user@example.com',
            'password' => 'password123',
            'password_confirmation' => 'password123',
            'role' => 'user',
        ]);

        $response->assertStatus(201)
            ->assertJsonStructure([
                'user' => ['id', 'name', 'email', 'role', 'created_at', 'updated_at'],
                'token',
            ]);

        $this->assertDatabaseHas('users', [
            'email' => 'user@example.com',
            'role' => 'user',
        ]);
    });

    it('registers a user with the organizer role', function () {
        $response = $this->postJson('/api/auth/register', [
            'name' => 'Test Organizer',
            'email' => 'organizer@example.com',
            'password' => 'password123',
            'password_confirmation' => 'password123',
            'role' => 'organizer',
        ]);

        $response->assertStatus(201)
            ->assertJsonStructure([
                'user' => ['id', 'name', 'email', 'role', 'created_at', 'updated_at'],
                'token',
            ]);

        $this->assertDatabaseHas('users', [
            'email' => 'organizer@example.com',
            'role' => 'organizer',
        ]);
    });

    it('rejects registration with admin role', function () {
        $response = $this->postJson('/api/auth/register', [
            'name' => 'Test Admin',
            'email' => 'admin@example.com',
            'password' => 'password123',
            'password_confirmation' => 'password123',
            'role' => 'admin',
        ]);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['role']);

        $this->assertDatabaseMissing('users', ['email' => 'admin@example.com']);
    });

    it('rejects registration with unknown role', function () {
        $response = $this->postJson('/api/auth/register', [
            'name' => 'Test User',
            'email' => 'user@example.com',
            'password' => 'password123',
            'password_confirmation' => 'password123',
            'role' => 'unknown',
        ]);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['role']);

        $this->assertDatabaseMissing('users', ['email' => 'user@example.com']);
    });

    it('rejects registration with missing role', function () {
        $response = $this->postJson('/api/auth/register', [
            'name' => 'Test User',
            'email' => 'user@example.com',
            'password' => 'password123',
            'password_confirmation' => 'password123',
        ]);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['role']);

        $this->assertDatabaseMissing('users', ['email' => 'user@example.com']);
    });

    it('rejects duplicate email', function () {
        User::factory()->create(['email' => 'existing@example.com']);

        $response = $this->postJson('/api/auth/register', [
            'name' => 'Test User',
            'email' => 'existing@example.com',
            'password' => 'password123',
            'password_confirmation' => 'password123',
            'role' => 'user',
        ]);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['email']);
    });

    it('rejects password confirmation failure', function () {
        $response = $this->postJson('/api/auth/register', [
            'name' => 'Test User',
            'email' => 'user@example.com',
            'password' => 'password123',
            'password_confirmation' => 'different-password',
            'role' => 'user',
        ]);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['password']);

        $this->assertDatabaseMissing('users', ['email' => 'user@example.com']);
    });

    it('rejects invalid email format', function () {
        $response = $this->postJson('/api/auth/register', [
            'name' => 'Test User',
            'email' => 'not-an-email',
            'password' => 'password123',
            'password_confirmation' => 'password123',
            'role' => 'user',
        ]);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['email']);
    });

    it('normalizes email before storage', function () {
        $response = $this->postJson('/api/auth/register', [
            'name' => 'Test User',
            'email' => 'User@Example.COM',
            'password' => 'password123',
            'password_confirmation' => 'password123',
            'role' => 'user',
        ]);

        $response->assertStatus(201);

        $this->assertDatabaseHas('users', [
            'email' => 'user@example.com',
        ]);
    });

    it('hashes password before storage', function () {
        $response = $this->postJson('/api/auth/register', [
            'name' => 'Test User',
            'email' => 'user@example.com',
            'password' => 'password123',
            'password_confirmation' => 'password123',
            'role' => 'user',
        ]);

        $response->assertStatus(201);

        $user = User::where('email', 'user@example.com')->first();
        expect($user->password)->not->toBe('password123');
    });

    it('does not create user on failed registration', function () {
        $response = $this->postJson('/api/auth/register', [
            'name' => 'Test User',
            'email' => 'user@example.com',
            'password' => 'password123',
            'password_confirmation' => 'different-password',
            'role' => 'user',
        ]);

        $response->assertStatus(422);

        $this->assertDatabaseMissing('users', ['email' => 'user@example.com']);
    });
});

describe('Login', function () {
    it('logs in with valid credentials', function () {
        $user = User::factory()->create([
            'email' => 'user@example.com',
            'password' => 'password123',
        ]);

        $response = $this->postJson('/api/auth/login', [
            'email' => 'user@example.com',
            'password' => 'password123',
        ]);

        $response->assertStatus(200)
            ->assertJsonStructure([
                'user' => ['id', 'name', 'email', 'role', 'created_at', 'updated_at'],
                'token',
            ]);
    });

    it('returns Bearer token on successful login', function () {
        $user = User::factory()->create([
            'email' => 'user@example.com',
            'password' => 'password123',
        ]);

        $response = $this->postJson('/api/auth/login', [
            'email' => 'user@example.com',
            'password' => 'password123',
        ]);

        $response->assertStatus(200)
            ->assertJsonStructure(['token']);
    });

    it('normalizes email before authentication', function () {
        $user = User::factory()->create([
            'email' => 'user@example.com',
            'password' => 'password123',
        ]);

        $response = $this->postJson('/api/auth/login', [
            'email' => 'USER@EXAMPLE.COM',
            'password' => 'password123',
        ]);

        $response->assertStatus(200);
    });

    it('rejects invalid password', function () {
        $user = User::factory()->create([
            'email' => 'user@example.com',
            'password' => 'password123',
        ]);

        $response = $this->postJson('/api/auth/login', [
            'email' => 'user@example.com',
            'password' => 'wrong-password',
        ]);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['email']);
    });

    it('rejects unknown email', function () {
        $response = $this->postJson('/api/auth/login', [
            'email' => 'nonexistent@example.com',
            'password' => 'password123',
        ]);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['email']);
    });

    it('returns identical responses for invalid email and password', function () {
        User::factory()->create([
            'email' => 'existing@example.com',
            'password' => 'password123',
        ]);

        $response1 = $this->postJson('/api/auth/login', [
            'email' => 'existing@example.com',
            'password' => 'wrong-password',
        ]);

        $response2 = $this->postJson('/api/auth/login', [
            'email' => 'nonexistent@example.com',
            'password' => 'password123',
        ]);

        $response1->assertStatus(422);
        $response2->assertStatus(422);
    });
});

describe('Profile', function () {
    it('retrieves authenticated user profile', function () {
        $user = User::factory()->create();

        $response = $this->actingAs($user)
            ->getJson('/api/auth/me');

        $response->assertStatus(200)
            ->assertJsonStructure([
                'user' => ['id', 'name', 'email', 'role', 'created_at', 'updated_at'],
            ]);
    });

    it('rejects unauthenticated profile access', function () {
        $response = $this->getJson('/api/auth/me');

        $response->assertStatus(401);
    });
});

describe('Logout', function () {
    it('logs out successfully', function () {
        $user = User::factory()->create();
        $token = $user->createToken('auth-token')->plainTextToken;

        $response = $this->withHeader('Authorization', "Bearer $token")
            ->postJson('/api/auth/logout');

        $response->assertStatus(200);
    });

    it('revokes current token on logout', function () {
        $user = User::factory()->create();
        $token = $user->createToken('auth-token')->plainTextToken;

        // Extract the token part (after the pipe)
        $tokenParts = explode('|', $token);
        $plainToken = $tokenParts[1] ?? $token;

        // Verify token exists in database
        $this->assertDatabaseHas('personal_access_tokens', [
            'token' => hash('sha256', $plainToken),
        ]);

        $this->withHeader('Authorization', "Bearer $token")
            ->postJson('/api/auth/logout')
            ->assertStatus(200);

        // Verify the token is deleted from database
        $this->assertDatabaseMissing('personal_access_tokens', [
            'token' => hash('sha256', $plainToken),
        ]);
    });

    it('rejects revoked token', function () {
        $user = User::factory()->create();
        $token = $user->createToken('auth-token')->plainTextToken;

        // Extract the token part (after the pipe)
        $tokenParts = explode('|', $token);
        $plainToken = $tokenParts[1] ?? $token;

        $this->withHeader('Authorization', "Bearer $token")
            ->postJson('/api/auth/logout')
            ->assertStatus(200);

        // Verify the token is deleted from database
        $this->assertDatabaseMissing('personal_access_tokens', [
            'token' => hash('sha256', $plainToken),
        ]);
    });

    it('leaves other tokens valid after logout', function () {
        $user = User::factory()->create();
        $token1 = $user->createToken('auth-token-1')->plainTextToken;
        $token2 = $user->createToken('auth-token-2')->plainTextToken;

        $this->withHeader('Authorization', "Bearer $token1")
            ->postJson('/api/auth/logout');

        $response = $this->withHeader('Authorization', "Bearer $token2")
            ->getJson('/api/auth/me');

        $response->assertStatus(200);
    });

    it('rejects unauthenticated logout', function () {
        $response = $this->postJson('/api/auth/logout');

        $response->assertStatus(401);
    });
});

describe('User Resource', function () {
    it('contains safe fields', function () {
        $user = User::factory()->create();

        $response = $this->actingAs($user)
            ->getJson('/api/auth/me');

        $response->assertStatus(200)
            ->assertJsonStructure([
                'user' => ['id', 'name', 'email', 'role', 'created_at', 'updated_at'],
            ]);
    });

    it('does not expose password', function () {
        $user = User::factory()->create();

        $response = $this->actingAs($user)
            ->getJson('/api/auth/me');

        $response->assertStatus(200)
            ->assertJsonMissing(['password']);
    });

    it('does not expose remember_token', function () {
        $user = User::factory()->create();

        $response = $this->actingAs($user)
            ->getJson('/api/auth/me');

        $response->assertStatus(200)
            ->assertJsonMissing(['remember_token']);
    });
});

describe('Rate Limiting', function () {
    it('rate limits registration', function () {
        for ($i = 0; $i < 5; $i++) {
            $this->postJson('/api/auth/register', [
                'name' => "User $i",
                'email' => "user$i@example.com",
                'password' => 'password123',
                'password_confirmation' => 'password123',
                'role' => 'user',
            ]);
        }

        $response = $this->postJson('/api/auth/register', [
            'name' => 'Rate Limited User',
            'email' => 'ratelimited@example.com',
            'password' => 'password123',
            'password_confirmation' => 'password123',
            'role' => 'user',
        ]);

        $response->assertStatus(429);
    });

    it('rate limits login', function () {
        for ($i = 0; $i < 5; $i++) {
            $this->postJson('/api/auth/login', [
                'email' => 'user@example.com',
                'password' => 'wrong-password',
            ]);
        }

        $response = $this->postJson('/api/auth/login', [
            'email' => 'user@example.com',
            'password' => 'wrong-password',
        ]);

        $response->assertStatus(429);
    });
});

describe('Password Reset', function () {
    it('sends password reset link for valid email', function () {
        $user = User::factory()->create(['email' => 'user@example.com']);

        $response = $this->postJson('/api/auth/forgot-password', [
            'email' => 'user@example.com',
        ]);

        $response->assertStatus(200)
            ->assertJson(['message' => 'If an account exists with that email, you will receive a password reset link.']);
    });

    it('returns success message even for non-existent email', function () {
        $response = $this->postJson('/api/auth/forgot-password', [
            'email' => 'nonexistent@example.com',
        ]);

        $response->assertStatus(200)
            ->assertJson(['message' => 'If an account exists with that email, you will receive a password reset link.']);
    });

    it('validates email format for forgot password', function () {
        $response = $this->postJson('/api/auth/forgot-password', [
            'email' => 'not-an-email',
        ]);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['email']);
    });

    it('resets password with valid token', function () {
        $user = User::factory()->create(['email' => 'user@example.com']);

        $token = Password::createToken($user);

        $response = $this->postJson('/api/auth/reset-password', [
            'token' => $token,
            'email' => 'user@example.com',
            'password' => 'new-password-123',
            'password_confirmation' => 'new-password-123',
        ]);

        $response->assertStatus(200)
            ->assertJson(['message' => 'Password has been reset.']);

        $user->refresh();
        $this->assertTrue(Hash::check('new-password-123', $user->password));
    });

    it('rejects reset with invalid token', function () {
        $response = $this->postJson('/api/auth/reset-password', [
            'token' => 'invalid-token',
            'email' => 'user@example.com',
            'password' => 'new-password-123',
            'password_confirmation' => 'new-password-123',
        ]);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['email']);
    });

    it('validates password confirmation for reset', function () {
        $user = User::factory()->create(['email' => 'user@example.com']);
        $token = Password::createToken($user);

        $response = $this->postJson('/api/auth/reset-password', [
            'token' => $token,
            'email' => 'user@example.com',
            'password' => 'new-password-123',
            'password_confirmation' => 'different-password',
        ]);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['password']);
    });

    it('validates minimum password length for reset', function () {
        $user = User::factory()->create(['email' => 'user@example.com']);
        $token = Password::createToken($user);

        $response = $this->postJson('/api/auth/reset-password', [
            'token' => $token,
            'email' => 'user@example.com',
            'password' => 'short',
            'password_confirmation' => 'short',
        ]);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['password']);
    });
});
