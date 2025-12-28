<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class InstituteProfileController extends Controller
{
    
    public function show()
    {
        $account = auth()->user();

        if (!$account || !$account->isInstitute()) {
            abort(403);
        }

        // ambil institute milik account login
        $institute = $account->institute;

        if (!$institute) {
            abort(404, 'Institute profile not found');
        }

        return inertia('Institute/Profile', [
            'institute' => [
                'institute_id'   => $institute->institute_id,
                'name'           => $institute->institute_name,
                'description'    => $institute->institute_desc,
                'location'       => $institute->institute_location,
                'logo'           => $institute->logo,
                'cover_image'    => $institute->cover_image,
            ],
        ]);
    }
}
