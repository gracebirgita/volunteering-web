<?php

namespace App\Http\Controllers\Relawan;

use App\Http\Controllers\Controller;
use App\Models\UserProfile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\ValidationException;
use Illuminate\Validation\Rule;

class VolunteerSettingsController extends Controller
{
    public function edit()
    {
        $account = auth()->user();
        if (!$account || !$account->isUser()) abort(403);

        $profile = $account->profile;

        return inertia('Relawan/Settings', [
            'auth' => [
                'user' => $account,
                'profile' => $profile ? [
                    'user_name'     => $profile->user_name,
                    'user_phone'    => $profile->user_phone,
                    'user_domicile' => $profile->user_domicile,
                    'user_interest' => $profile->user_interest,
                    'avatar_url'    => profile_image_url($profile),
                ] : null,
            ],
        ]);
    }

    public function updateProfile(Request $request)
    {
        $account = auth()->user();
        if (!$account || !$account->isUser()) abort(403);

        $data = $request->validate([
            'name'         => 'required|string|max:100',
            'phone'        => 'nullable|string|max:20',
            'domicile'     => 'nullable|string|max:100',
            'interest'     => 'nullable|string|max:100',
            'photo'        => 'nullable|image|max:2048',
            'remove_photo' => 'nullable|boolean',
        ]);

        $profile = $account->profile ?? new UserProfile([
            'account_id' => $account->account_id,
        ]);

        /* REMOVE PHOTO */
        if ($request->boolean('remove_photo')) {
            if ($profile->profile_picture) {
                Storage::disk('public')->delete($profile->profile_picture);
            }
            $profile->profile_picture = null;
        }

        /* UPLOAD PHOTO */
        if ($request->hasFile('photo')) {
            if ($profile->profile_picture) {
                Storage::disk('public')->delete($profile->profile_picture);
            }

            $profile->profile_picture = $request
                ->file('photo')
                ->store('avatars/volunteers', 'public');
        }

        $profile->user_name     = $data['name'];
        $profile->user_phone    = $data['phone'] ?? null;
        $profile->user_domicile = $data['domicile'] ?? null;
        $profile->user_interest = $data['interest'] ?? null;

        $profile->save();

        return back()->with('success', 'Profil berhasil diperbarui');
    }

    public function updatePassword(Request $request)
    {
        $account = auth()->user();
        if (!$account) abort(403);

        $request->validate([
            'current_password' => 'required',
            'password'         => 'required|min:8|confirmed',
        ]);

        if (!Hash::check($request->current_password, $account->password)) {
            throw ValidationException::withMessages([
                'current_password' => 'Password lama tidak sesuai.',
            ]);
        }

        if (Hash::check($request->password, $account->password)) {
            throw ValidationException::withMessages([
                'password' => 'Password baru harus berbeda.',
            ]);
        }

        $account->password = Hash::make($request->password);
        $account->save();

        return back()->with('success', 'Password berhasil diperbarui');
    }

    public function updateEmail(Request $request){

    $account = auth()->user();
    if (!$account || !$account->isUser()) abort(403);

    $data = $request->validate([
        'email' => [
            'required',
            'email',
            Rule::unique('accounts', 'email')
                ->ignore($account->account_id, 'account_id'),
        ],
        'password' => 'required',
    ]);

    if (!Hash::check($data['password'], $account->password)) {
        throw ValidationException::withMessages([
            'password' => 'Password tidak sesuai.',
        ]);
    }

    $account->email = $data['email'];
    $account->email_verified_at = null;
    $account->save();

    return back()->with('success', 'Email berhasil diperbarui');
    }
}
