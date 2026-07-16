<?php

use App\Http\Controllers\AuthController;
use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Facades\Route;

RateLimiter::for('register', function (Request $request) {
    return Limit::perMinute(5)->by($request->ip());
});

RateLimiter::for('login', function (Request $request) {
    return Limit::perMinute(5)->by($request->input('email', '').'|'.$request->ip());
});

RateLimiter::for('password', function (Request $request) {
    return Limit::perMinute(3)->by($request->input('email', '').'|'.$request->ip());
});

// Public routes
Route::post('/auth/register', [AuthController::class, 'register'])
    ->middleware('throttle:register');
Route::post('/auth/login', [AuthController::class, 'login'])
    ->middleware('throttle:login');
Route::post('/auth/forgot-password', [AuthController::class, 'forgotPassword'])
    ->middleware('throttle:password');
Route::post('/auth/reset-password', [AuthController::class, 'resetPassword'])
    ->middleware('throttle:password');

// Protected routes
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/auth/me', [AuthController::class, 'me']);
    Route::post('/auth/logout', [AuthController::class, 'logout']);
    Route::post('/auth/logout-all', [AuthController::class, 'logoutAll']);
});
