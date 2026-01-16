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
        return Inertia::render('Auth/Login');
    }

    // modif authenticate
    public function authenticate(): void{
        $this->ensureIsNotRateLimited();

        if(! Auth::attempt(
            $this->only('email', 'password'),
            $this->boolean('remember'), //remember me
        )){
            RateLimiter::hit($this->throttleKey());//catat fail login

            throw ValidationException::withMessages([
                'email' => trans('auth.failed'),
            ]);
        }

        RateLimiter::clear($this->throttleKey()); //clear catatan fail
    }
    /**
     * Handle an incoming authentication request.
     */
    public function store(LoginRequest $request): RedirectResponse
    {
        $request->authenticate(); //cocokan email, pass -> save ke user session
        $request->session()->regenerate(); //regenerate session id

        $account = Auth::user(); //account model

        // akun diblokir admin
        if (!$account->is_active){
            Auth::logout();
            $request->session()->invalidate();
            $request->session()->regenerateToken();

            return back()->withErrors([
                'email'=> 'Akun anda telah diblokir, silahkan hubungi admin.'
            ]);
        }


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
        if ($account->isUser()) {
            return redirect()->route('dashboard.user');
        }
        // user -> dashboard user
        // return redirect()->route('dashboard.user');
        return redirect('/');
    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request)
    {
        Auth::guard('web')->logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

       return Inertia::location('/'); //balik landing page 
    }
}
