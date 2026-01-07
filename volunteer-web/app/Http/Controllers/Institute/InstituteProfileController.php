<?php

namespace App\Http\Controllers\Institute;

use App\Http\Controllers\Controller;
use Inertia\Inertia;

class InstituteProfileController extends Controller
{
    public function show()
    {
        $account = auth()->user();

        // ✅ HARUS institute
        if (!$account || !$account->isInstitute()) {
            abort(403);
        }

        $institute = $account->institute;

        if (!$institute) {
            abort(404, 'Institute profile not found');
        }

        return Inertia::render('Institute/Profile', [
            'institute' => [
                'name'        => $institute->institute_name,
                'email'       => $account->email,
                'phone'       => $institute->institute_phone,
                'address'     => $institute->institute_address,
                'postal_code' => $institute->postal_code,
                'logo_url'    => $institute->institute_logo
                    ? asset('storage/' . $institute->institute_logo)
                    : asset('assets/Dashboard/Institute/who.png'),
            ],
        ]);
    }
}
