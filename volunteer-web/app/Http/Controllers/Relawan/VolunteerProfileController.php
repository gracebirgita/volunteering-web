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

        if (!$account || !$account->isUser()) {
            abort(403);
        }

        if (!$account->profile) {
            abort(404, 'Volunteer profile not found');
        }

        return inertia('Relawan/VolProfile', [
            'account' => [
                'email' => $account->email,
            ],
            'profile' => $account->profile,
        ]);
    }

}
