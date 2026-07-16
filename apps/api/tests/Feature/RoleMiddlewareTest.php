<?php

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Route;

uses(RefreshDatabase::class);

beforeEach(function () {
    // Only add test routes in testing environment
    if (app()->environment('testing')) {
        Route::middleware(['auth:sanctum', 'role:user'])->get('/test/role-user', fn () => response()->json(['message' => 'allowed']));
        Route::middleware(['auth:sanctum', 'role:organizer'])->get('/test/role-organizer', fn () => response()->json(['message' => 'allowed']));
        Route::middleware(['auth:sanctum', 'role:admin'])->get('/test/role-admin', fn () => response()->json(['message' => 'allowed']));
        Route::middleware(['auth:sanctum', 'role:user,organizer'])->get('/test/role-user-organizer', fn () => response()->json(['message' => 'allowed']));
    }
});

describe('Role Middleware', function () {
    it('allows access for permitted user role', function () {
        $user = User::factory()->user()->create();

        $this->actingAs($user)
            ->getJson('/test/role-user')
            ->assertStatus(200);
    });

    it('allows access for permitted organizer role', function () {
        $user = User::factory()->organizer()->create();

        $this->actingAs($user)
            ->getJson('/test/role-organizer')
            ->assertStatus(200);
    });

    it('allows access for permitted admin role', function () {
        $user = User::factory()->admin()->create();

        $this->actingAs($user)
            ->getJson('/test/role-admin')
            ->assertStatus(200);
    });

    it('allows access for multiple permitted roles', function () {
        $user = User::factory()->user()->create();

        $this->actingAs($user)
            ->getJson('/test/role-user-organizer')
            ->assertStatus(200);
    });

    it('denies access for wrong role', function () {
        $user = User::factory()->user()->create();

        $this->actingAs($user)
            ->getJson('/test/role-organizer')
            ->assertStatus(403);
    });
});
