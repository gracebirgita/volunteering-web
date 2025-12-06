<?php
use App\Http\Controllers\EventController;
use App\Http\Controllers\RegistrationController;
use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return redirect()->route('events.index');
});

// AUTH
Route::get('/register', [AuthController::class, 'registerForm'])->name('register.form');
Route::post('/register', [AuthController::class, 'register'])->name('register');

Route::get('/login', [AuthController::class, 'loginForm'])->name('login.form');
Route::post('/login', [AuthController::class, 'login'])->name('login');

Route::post('/logout', [AuthController::class, 'logout'])->name('logout');

Route::get('/dashboard', function () {
    return "You are logged in as ".session('user_name').' ('.session('user_role').')';
})->middleware('checkLogin');

// LIST EVENT
Route::get('/events', [EventController::class, 'index'])->name('events.index');

// CREATE EVENT 
Route::middleware(['checkLogin', 'orgAdmin'])->group(function () {
    Route::get('/events/create', [EventController::class, 'create'])->name('events.create');
    Route::post('/events', [EventController::class, 'store'])->name('events.store');
});

// DETAIL EVENT 
Route::get('/events/{event}', [EventController::class, 'show'])
    ->whereNumber('event')   // optional, biar hanya angka
    ->name('events.show');

// REGISTER EVENT
Route::post('/events/{event}/register', [RegistrationController::class, 'store'])
    ->middleware('checkLogin')
    ->name('events.register');
