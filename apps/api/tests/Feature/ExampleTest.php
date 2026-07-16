<?php

use Illuminate\Support\Facades\Artisan;

test('the application returns a successful response', function () {
    if (empty(config('app.key'))) {
        Artisan::call('key:generate', ['--force' => true]);
    }

    $response = $this->get('/');

    $response->assertStatus(200);
});
