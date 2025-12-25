<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;

// LOGIN
class AuthenticatedSessionController extends Controller
{
    /**
     * Display the login view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Login', [
            'canResetPassword' => Route::has('password.request'),
            'status' => session('status'),
        ]);
    }

    /**
     * Handle an incoming authentication request.
     */
    public function store(LoginRequest $request): RedirectResponse
    {
        $request->authenticate(); //cocokan email, pass - save ke user session
        $request->session()->regenerate(); //regenerate session id

        $account = Auth::user(); //account model
        $selectedRole=$request->input('role');

        // validasi role hrs sesuai saat login
        if(
            ($selectedRole==='user' && !$account->isUser()) ||
            ($selectedRole === 'institute' && ! $account->isInstitute()) ||
            ($selectedRole === 'admin' && ! $account->isAdmin())
        ){
            Auth::logout();
            return back()->withErrors([
                'role'=>'Akun terdaftar sebagai '.$account->roleLabel(),
            ]);
        }

        // dashboard sesuai role
        if($account->isAdmin()){
            return redirect()->route('dashboard.admin');
        }
        if($account->isInstitute()){
            return redirect()->route('dashboard.institute');
        }
        // user -> dashboard user
        return redirect()->route('dashboard.user');
    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): RedirectResponse
    {
        Auth::guard('web')->logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/'); //balik landing page
    }
}
