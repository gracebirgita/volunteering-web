<?php

namespace App\Http\Controllers\Relawan;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Http\Controllers\Controller;


class VolunteerProfilController extends Controller
{
    // SHOWCASE PROFIL SAYA (Relawan) - read sj

    public function show(){
        $account = auth()->user();
        // dd(auth()->user()->userProfile);

        return Inertia::render('Relawan/VolProfile', [
            'account' => $account,
            'profile' => $account->users_profiles, //object
        ]);
    }

}
