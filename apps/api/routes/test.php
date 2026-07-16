<?php

use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum', 'role:user'])->group(function () {
    Route::get('/test/user-only', fn () => response()->json(['message' => 'user access granted']));
});

Route::middleware(['auth:sanctum', 'role:organizer'])->group(function () {
    Route::get('/test/organizer-only', fn () => response()->json(['message' => 'organizer access granted']));
});

Route::middleware(['auth:sanctum', 'role:admin'])->group(function () {
    Route::get('/test/admin-only', fn () => response()->json(['message' => 'admin access granted']));
});

Route::middleware(['auth:sanctum', 'role:user,organizer'])->group(function () {
    Route::get('/test/user-or-organizer', fn () => response()->json(['message' => 'user or organizer access granted']));
});
