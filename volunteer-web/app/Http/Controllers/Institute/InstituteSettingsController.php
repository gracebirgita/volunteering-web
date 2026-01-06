<?php

namespace App\Http\Controllers\Institute;

use App\Http\Controllers\Controller; 
use App\Models\Institute;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\ValidationException;

class InstituteSettingsController extends Controller
{
    public function edit(Request $request)
    {
        $account = auth()->user();
        if (!$account || !$account->isInstitute()) abort(403);

        $institute = $account->institute;
        if (!$institute) abort(404, 'Institute not found');

        return inertia('Institute/Settings', [
            'auth' => [
                'user' => [
                    'id' => $account->id,
                    'name' => $institute->institute_name,
                    'email' => $account->email,
                    'email_verified_at' => $account->email_verified_at,
                    'institute' => [
                        'institute_name'    => $institute->institute_name,
                        'institute_address' => $institute->institute_address,
                        'institute_phone'   => $institute->institute_phone,
                        'postal_code'       => $institute->postal_code,
                        'bio'               => $institute->institute_desc,
                        'institute_logo'    => $institute->institute_logo,
                    ],
                ],
            ],
        ]);
    }

    public function updateProfile(Request $request)
    {
        $account = auth()->user();
        if (!$account || !$account->isInstitute()) abort(403);

        $data = $request->validate([
            'name'        => 'required|string|max:50',
            'phone'       => 'nullable|string|max:20',
            'address'     => 'nullable|string|max:255',
            'postal_code' => 'nullable|string|max:20',
            'bio'         => 'nullable|string',
            'photo'       => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
        ]);

        $institute = $account->institute;

        if (!$institute) {
            $institute = Institute::create([
                'account_id' => $account->account_id,
            ]);
        }

        $institute->update([
            'institute_name'    => $data['name'],
            'institute_phone'   => $data['phone'] ?? null,
            'institute_address' => $data['address'] ?? null,
            'postal_code'       => $data['postal_code'] ?? null,
            'institute_desc'    => $data['bio'] ?? null,
        ]);

        // change logo
        if ($request->hasFile('photo')) {
            if ($institute->institute_logo) {
                Storage::disk('public')->delete($institute->institute_logo);
            }

            $path = $request->file('photo')->store('institutes', 'public');

            $institute->update([
                'institute_logo' => $path,
            ]);
        }

        return back()->with('success', 'Profil berhasil diperbarui');
    }

    public function updateEmail(Request $request)
    {
        $account = auth()->user();
        if (!$account || !$account->isInstitute()) abort(403);

        $request->validate([
            'email'    => 'required|email|unique:accounts,email,' . $account->id,
            'password' => 'required',
        ]);

        if (!Hash::check($request->password, $account->password)) {
            throw ValidationException::withMessages([
                'password' => 'Password salah',
            ]);
        }

        $account->email = $request->email;
        $account->email_verified_at = null;
        $account->save();

        return back()->with('success', 'Email berhasil diubah');
    }

    public function updatePassword(Request $request)
    {
        $account = auth()->user();
        if (!$account || !$account->isInstitute()) abort(403);

        $request->validate([
            'current_password' => 'required',
            'password'         => 'required|min:8|confirmed',
        ]);

        if (!Hash::check($request->current_password, $account->password)) {
            throw ValidationException::withMessages([
                'current_password' => 'Password saat ini salah',
            ]);
        }

        $account->password = Hash::make($request->password);
        $account->save();

        return back()->with('success', 'Password berhasil diperbarui');
    }
}
