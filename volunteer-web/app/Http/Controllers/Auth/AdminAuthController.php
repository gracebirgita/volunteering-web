<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Auth;

class AdminAuthController extends Controller
{
    //
    public function create(): Response
    {
        return Inertia::render('Auth/AdminLogin', [

        ]);
    }

    public function store(Request $request){
        $credentials= $request->validate([
            'email'=>'required|email',
            'password'=>'required',
        ]);

        if(! Auth::attempt($credentials)){
            return back()->withErrors(['email'=>'Email atau password salah']);
        }

        if(! Auth::user()->isAdmin()){
            Auth::logout();
            return back()->withErrors(['email'=>'Account tidak terverifikasi sebagai admin']);
        }

        $request->session()->regenerate();

        return redirect()->route('dashboard.admin');

    }
}
