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
use App\Http\Controllers\Auth\AdminAuthController;
use App\Http\Controllers\VolunteerSettingsController;
use App\Http\Controllers\InstituteProfileController;
use App\Http\Controllers\InstituteSettingsController;
// relawan
use App\Http\Controllers\Relawan\EventController;
use App\Http\Controllers\Relawan\EventRegistController;
use App\Http\Controllers\Relawan\VolunteerProfilController;

use App\Http\Controllers\ProfileController;

// GUEST = belum login

Route::get('/', function () {
    return Inertia::render('LandingPage');
})->name('home');

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

                // MODIF PAKAI CONTROLLER**
                // 1. manajemen user
                Route::get('/user-manage', function () {
                        return Inertia::render('Admin/UserManage');
                })->name('manage.user');

                // 2. manajemen konten
                Route::get('/content-manage', function () {
                        return Inertia::render('Admin/ContentManage');
                })->name('manage.content');

                
        });

        // -- ROLE USER / RELAWAN  / VOLUNTEER
        Route::middleware('role:user')->group(function(){
                // === UTAMA
                // 1. dashboard
                Route::get('/dashboard/user', [UserDashboardController::class, 'index'])
                        ->name('dashboard.user');


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

                // 3. Event Saya (MODIF nanti sesuai controller & function yg dipakai)**
                Route::get('/myevents', function () {
                        return Inertia::render('Relawan/MyEvent');
                })->name('myevents.index');


                // === AKTIVITAS (opsional)
                // === AKUN
                // 1.Profil (showcase profil user)
                Route::get('/profile', [VolunteerProfilController::class, 'show'])
                        ->name('volunteer.profile');
                // 2. Pengaturan
                Route::get('/settings', [VolunteerSettingsController::class, 'edit'])
                        ->name('volunteer.settings');

                Route::post('/settings/profile', [VolunteerSettingsController::class, 'updateProfile'])
                        ->name('volunteer.settings.profile');

                Route::post('/settings/password', [VolunteerSettingsController::class, 'updatePassword'])
                        ->name('volunteer.settings.password');
        });
        
        // -- ROLE INSTITUTE
        Route::middleware('role:institute')->group(function(){
                // 1. dashboard
                Route::get('/dashboard/institute', [InstituteDashboardController::class, 'index'])
                        ->name('dashboard.institute');
                // 2. create event
                Route::get('/institute/create-event', function () {
                        return Inertia::render('Institute/CreateEvent');
                })->name('institute.create');

                // 3. atur event 
                Route::get('/institute/organize-event', function () {
                        return Inertia::render('Institute/OrganizeEvent');
                })->name('institute.organize');

                // 4. app volunteer 
                Route::get('/institute/app-volunteer', function () {
                        return Inertia::render('Institute/AppVolunteer');
                })->name('institute.appvol');

                // 5. atur absensi 
                Route::get('/institute/attendance', function () {
                        return Inertia::render('Institute/Attendance');
                })->name('institute.attendance');

                // 6. profil organisasi
                Route::get('/institute/profile', [InstituteProfileController::class, 'show'])->name('institute.profile');

                // 7. pengaturan
                Route::get('/institute/settings', [InstituteSettingsController::class, 'edit'])
                ->name('institute.settings');

                Route::post('/institute/settings/profile', [InstituteSettingsController::class, 'updateProfile'])
                ->name('institute.settings.profile');

                Route::post('/institute/settings/email', [InstituteSettingsController::class, 'updateEmail'])
                ->name('institute.settings.email');

                Route::post('/institute/settings/password', [InstituteSettingsController::class, 'updatePassword'])
                ->name('institute.settings.password');
                                
        });
        
        // -- LOGOUT / KELUAR
        Route::post('/logout', [AuthenticatedSessionController::class, 'destroy'])
                ->name('logout');
});
        

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

Route::get('/_debug/dashboard/user', function () {
    return Inertia::render('Dashboard/User', [
        'auth' => [
            'user' => [
                'id' => 999,
                'name' => 'DEBUG USER',
                'email' => 'debug@local.test',
                'role' => 'user',
            ],
        ],
    ]);
});