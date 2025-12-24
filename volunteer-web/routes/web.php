<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\VolunteerSettingsController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return view('landingPage');
});


Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth'])->name('dashboard');

// Route::middleware('auth')->group(function () {
//     Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
//     Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
//     Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
// });

//login routes blm, harus login dulu

Route::get('/settings', [VolunteerSettingsController::class, 'edit'])
    ->name('volunteer.settings');

Route::post('/settings/profile', [VolunteerSettingsController::class, 'updateProfile'])
    ->name('volunteer.settings.profile');

Route::post('/settings/password', [VolunteerSettingsController::class, 'updatePassword'])
    ->name('volunteer.settings.password');


require __DIR__.'/auth.php';
