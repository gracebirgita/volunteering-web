<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\VolunteerSettingsController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Auth\RegisteredUserController;

// LARAVEL
// Route::get('/', function () {
//     return view('landingPage');
// });

// Route::middleware(['auth'])->group(function(){
//     Route::get('/settings', [VolunteerSettingsController::class, 'edit'])->name('volunteer.settings');

//     Route::post('/settings/profile', [VolunteerSettingsController::class, 'updateProfile'])
//         ->name('volunteer.settings.profile');

//     Route::post('/settings/password', [VolunteerSettingsController::class, 'updatePassword'])
//         ->name('volunteer.settings.password');

// });


//login routes blm, harus login dulu
// Route::get('/settings', [VolunteerSettingsController::class, 'edit'])
//     ->name('volunteer.settings');

// Route::post('/settings/profile', [VolunteerSettingsController::class, 'updateProfile'])
//     ->name('volunteer.settings.profile');

// Route::post('/settings/password', [VolunteerSettingsController::class, 'updatePassword'])
//     ->name('volunteer.settings.password');


require __DIR__.'/auth.php';
