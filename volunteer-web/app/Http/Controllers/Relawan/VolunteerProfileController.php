<?php

namespace App\Http\Controllers\Relawan;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Http\Controllers\Controller;


class VolunteerProfileController extends Controller
{
    // SHOWCASE PROFIL SAYA (Relawan) - read sj

    public function show(){
    $account = auth()->user();

    if (!$account || !$account->isUser()) {
        abort(403);
    }

    $profile = $account->profile;

    

    if (!$profile) {
        abort(404, 'Volunteer profile not found');
    }

    return inertia('Relawan/Profile', [
        'volunteer' => [
            'name'        => $profile->user_name ?? '-',
            'email'       => $account->email,
            'phone'       => $profile->user_phone ?? '-',
            'domicile'    => $profile->user_domicile ?? '-',
            'birth_date' => $profile->user_dob,
            'interest'   => $profile->user_interest ?? '-',
            'avatar_url' => profile_image_url($profile),
        ],
    ]);
}

}
