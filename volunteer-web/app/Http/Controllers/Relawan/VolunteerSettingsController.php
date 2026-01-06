<?php

namespace App\Http\Controllers\Relawan;

use App\Http\Controllers\Controller;
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
        if (!$account) abort(403);

        $data = $request->validate([
            'user_name'     => 'required|string|max:100',
            'user_email'    => 'nullable|email|max:255',
            'user_phone'    => 'nullable|string|max:20',
            'user_domicile' => 'nullable|string|max:255',
            'user_dob'      => 'nullable|date',
            'user_interest' => 'nullable|string|max:255',
        ]);

        $data['account_id'] = $account->account_id ?? $account->id;

        $profile = $account->users_profiles()
            ->latest('user_id')
            ->first();

        if ($profile) {
            $profile->update($data);
        } else {
            UserProfile::create($data);
        }

        if (!empty($data['user_email']) && $data['user_email'] !== $account->email) {
            $account->email = $data['user_email'];
            $account->save();
        }

        return back()->with('status_profile', 'Profile updated.');
    }


    public function updatePassword(Request $request)
    {
        $account = auth()->user();

    $request->validate([
        'current_password' => 'required',
        'password' => 'required|min:8|confirmed',
    ]);

    //password lama salah
    if (!Hash::check($request->current_password, $account->password)) {
        throw ValidationException::withMessages([
            'current_password' => 'Current password is incorrect.',
        ]);
    }

    //password baru sama dengan yang lama
    if (Hash::check($request->password, $account->password)) {
        throw ValidationException::withMessages([
            'password' => 'New password must be different from the current password.',
        ]);
    }

    $account->password = Hash::make($request->password);
    $account->save();

    return back()->with('status_password', 'Password updated successfully.');
    }
}
