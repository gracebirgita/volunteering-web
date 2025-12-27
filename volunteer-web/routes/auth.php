<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\ConfirmablePasswordController;
use App\Http\Controllers\Auth\EmailVerificationNotificationController;
use App\Http\Controllers\Auth\EmailVerificationPromptController;
use App\Http\Controllers\Auth\NewPasswordController;
use App\Http\Controllers\Auth\PasswordController;
use App\Http\Controllers\Auth\PasswordResetLinkController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\Auth\VerifyEmailController;
use Illuminate\Support\Facades\Route;


// add
use App\Http\Controllers\Auth\AuthenticatedUserController;
use App\Http\Controllers\Dashboard\AdminDashboardController;
use App\Http\Controllers\Dashboard\UserDashboardController;
use App\Http\Controllers\Dashboard\InstituteDashboardController;
use Inertia\Inertia;
use App\Http\Controllers\VolunteerProfilController;
use App\Http\Controllers\Auth\AdminAuthController;
use App\Http\Controllers\VolunteerSettingsController;
// relawan
use App\Http\Controllers\Relawan\EventController;
use App\Http\Controllers\Relawan\EventRegistController;


// GUEST = belum login

Route::get('/', function () {
    return Inertia::render('Landing');
});

Route::middleware('guest')->group(function(){
        // LOGIN
        Route::get('/login', [AuthenticatedSessionController::class, 'create'])
                ->name('login');
        Route::post('/login', [AuthenticatedSessionController::class, 'store'])
                ->name('login.store');

        // admin login
        Route::get('/admin/login', [AdminAuthController::class, 'create'])
                ->name('admin.login');
        Route::post('/admin/login', [AdminAuthController::class, 'store'])
                ->name('admin.store');
                
        // REGIST
        Route::get('/register', [RegisteredUserController::class, 'create'])
            ->name('register');
        // post register -> DB
        Route::post('/register', [RegisteredUserController::class, 'store'])
            ->name('register.store');

        Route::get('/logout', function(){
                return redirect()->route('login'); //guest tdk bs logout
        });


        // FORGET PASSWORD
        // Route::get('/forgot-password', [PasswordResetLinkController::class, 'create'])
        // ->name('password.request');

        // // submit email reset
        // Route::post('/forgot-password', [PasswordResetLinkController::class, 'store'])
        //         ->name('password.email');
        // // form isi password baru
        // Route::get('/reset-password/{token}', [NewPasswordController::class, 'create'])
        //         ->name('password.reset');
        // // submit new pass
        // Route::post('/reset-password', [NewPasswordController::class, 'store'])
        //         ->name('password.store');
});

// yg sdh ter auth
Route::middleware(['auth'])->group(function(){
        // -- ROLE ADMIN
        Route::middleware('role:admin')->group(function(){
                Route::get('/dashboard/admin', [AdminDashboardController::class, 'index'])
                        ->name('dashboard.admin');
        });

        // -- ROLE USER / RELAWAN  / VOLUNTEER
        Route::middleware('role:user')->group(function(){
                Route::get('/dashboard/user', [UserDashboardController::class, 'index'])
                        ->name('dashboard.user');

                // Profil Saya (showcase profil user)
                Route::get('/profile', [VolunteerProfilController::class, 'show'])
                        ->name('volunteer.profile');

                // Profile settings and update
                Route::get('/settings', [VolunteerSettingsController::class, 'edit'])
                        ->name('volunteer.settings.edit');

                Route::post('/settings/profile', [VolunteerSettingsController::class, 'updateProfile'])
                        ->name('volunteer.settings.profile');

                Route::post('/settings/password', [VolunteerSettingsController::class, 'updatePassword'])
                        ->name('volunteer.settings.password');
                // Explore Event(relawan)
                // show(read db) ke relawan
                Route::get('/events', [EventController::class, 'index'])
                        ->name('events.index');
                // event detail relawan
                Route::get('/events/{event}', [EventController::class, 'show'])
                        ->name('events.show');

                // "Jadi Relawan" dr detail page
                Route::post('/events/{event}/join', [EventRegistController::class, 'join'])
                        ->name('events.join');
                // cancel (bs jk status = pending)
                Route::delete('/events/{event}/cancel', [EventRegistController::class, 'cancel']);


        });
        
        // -- ROLE INSTITUTE
        Route::middleware('role:institute')->group(function(){
                Route::get('/dashboard/institute', [InstituteDashboardController::class, 'index'])
                        ->name('dashboard.institute');
        });
        
        // -- LOGOUT
        Route::post('/logout', [AuthenticatedSessionController::class, 'destroy'])
                ->name('logout');
});
        
// Route::middleware('guest')->group(function () {
//     Route::get('register', [RegisteredUserController::class, 'create'])
//         ->name('register');

//     Route::post('register', [RegisteredUserController::class, 'store']);

//     Route::get('login', [AuthenticatedSessionController::class, 'create'])
//         ->name('login');

//     Route::post('login', [AuthenticatedSessionController::class, 'store']);

//     Route::get('forgot-password', [PasswordResetLinkController::class, 'create'])
//         ->name('password.request');

//     Route::post('forgot-password', [PasswordResetLinkController::class, 'store'])
//         ->name('password.email');

//     Route::get('reset-password/{token}', [NewPasswordController::class, 'create'])
//         ->name('password.reset');

//     Route::post('reset-password', [NewPasswordController::class, 'store'])
//         ->name('password.store');
// });

// Route::middleware('auth')->group(function () {
//     Route::get('verify-email', EmailVerificationPromptController::class)
//         ->name('verification.notice');

//     Route::get('verify-email/{id}/{hash}', VerifyEmailController::class)
//         ->middleware(['signed', 'throttle:6,1'])
//         ->name('verification.verify');

//     Route::post('email/verification-notification', [EmailVerificationNotificationController::class, 'store'])
//         ->middleware('throttle:6,1')
//         ->name('verification.send');

//     Route::get('confirm-password', [ConfirmablePasswordController::class, 'show'])
//         ->name('password.confirm');

//     Route::post('confirm-password', [ConfirmablePasswordController::class, 'store']);

//     Route::put('password', [PasswordController::class, 'update'])->name('password.update');

//     Route::post('logout', [AuthenticatedSessionController::class, 'destroy'])
//         ->name('logout');
// });
