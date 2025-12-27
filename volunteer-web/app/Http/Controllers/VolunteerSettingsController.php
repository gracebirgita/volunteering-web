<?php

namespace App\Http\Controllers;

use App\Models\UserProfile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Models\Account;

class VolunteerSettingsController extends Controller
{
    public function edit()
    {
        // perlu login dulu
        $account = auth()->user();
        if(!$account || !$account->isuser()) abort(403);

        $profile = $account->users_profiles()
            ->latest('user_id')
            ->first();

        return view('volunteer.settings', compact('account', 'profile'));
    }

    public function updateProfile(Request $request)
    {
        $account = auth()->user();

        $data = $request->validate([
            'user_name'     => 'required|string|max:100',
            'user_email'    => 'nullable|email|max:255',
            'user_phone'    => 'nullable|string|max:20',
            'user_domicile' => 'nullable|string|max:255',
            'user_dob'      => 'nullable|date',
            'user_interest' => 'nullable|string|max:255',
        ]);

        $data['account_id'] = $account->account_id;

        $profile = $account->users_profiles()->latest('user_id')->first();
        if ($profile) $profile->update($data);
        else UserProfile::create($data);

        // sync email akun
        if (!empty($data['user_email'])) {
            $account->email = $data['user_email'];
            $account->save();
        }

        return back()->with('status_profile', 'Profile updated.');
    }

    public function updatePassword(Request $request)
    {
        $account = auth()->user();

        $request->validate([
            'password' => 'required|min:8|confirmed',
        ]);

        $account->password = Hash::make($request->password);
        $account->save();

        return back()->with('status_password', 'Password updated.');
    }
}
