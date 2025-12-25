<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class VolunteerProfilController extends Controller
{
    // SHOWCASE PROFIL SAYA (Relawan) - read sj

    public function show(){
        $account = auth()->user();
        // dd(auth()->user()->userProfile);

        return Inertia::render('Profile/VolProfile', [
            'account' => $account,
            'profile' => $account->userProfile, //object
        ]);
    }

}
