<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/reset-password/{token}', function () {
    $email = request()->query('email');
    return redirect("{$FRONTEND_URL}/reset-password?token=" . request()->route('token') . "&email={$email}");
})->name('password.reset');
