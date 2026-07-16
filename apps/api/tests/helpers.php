<?php

use App\Models\User;
use Illuminate\Testing\TestResponse;

if (! function_exists('createUser')) {
    function createUser(string $role = 'user', array $overrides = []): User
    {
        return User::factory()->create(array_merge([
            'role' => $role,
        ], $overrides));
    }
}

if (! function_exists('createUserWithToken')) {
    function createUserWithToken(string $role = 'user'): array
    {
        $user = createUser($role);
        $token = $user->createToken('auth-token')->plainTextToken;

        return ['user' => $user, 'token' => $token];
    }
}

if (! function_exists('registerUser')) {
    function registerUser(array $overrides = []): TestResponse
    {
        return $this->postJson('/api/auth/register', array_merge([
            'name' => 'Test User',
            'email' => fake()->unique()->safeEmail(),
            'password' => 'password123',
            'password_confirmation' => 'password123',
            'role' => 'user',
        ], $overrides));
    }
}

if (! function_exists('loginUser')) {
    function loginUser(User $user): TestResponse
    {
        return $this->postJson('/api/auth/login', [
            'email' => $user->email,
            'password' => 'password123',
        ]);
    }
}

if (! function_exists('authHeaders')) {
    function authHeaders(string $token): array
    {
        return ['Authorization' => "Bearer $token"];
    }
}
