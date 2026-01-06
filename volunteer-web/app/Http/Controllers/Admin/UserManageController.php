<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Account;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Hash;

class UserManageController extends Controller
{
    public function index(Request $request)
    {
        // 1. Determine Tab/Role (Default to 'relawan')
        $tab = $request->input('tab', 'relawan'); 
        $role = ($tab === 'organisasi') ? 'institute' : 'user';

        // 2. Start Query
        $query = Account::query()
            ->where('role', $role)
            ->with(['users_profiles', 'institute']); // Load relations to get Names

        // 3. Search Logic (Complex: Search Name in related tables OR Email in account table)
        if ($search = $request->input('search')) {
            $query->where(function ($q) use ($search, $role) {
                // Search Email
                $q->where('email', 'like', "%{$search}%");

                // Search Name based on role
                if ($role === 'user') {
                    $q->orWhereHas('users_profiles', function ($q2) use ($search) {
                        $q2->where('user_name', 'like', "%{$search}%");
                    });
                } elseif ($role === 'institute') {
                    $q->orWhereHas('institute', function ($q2) use ($search) {
                        $q2->where('institute_name', 'like', "%{$search}%");
                    });
                }
            });
        }

        // 4. Transform Data for React
        $users = $query->paginate(10)->withQueryString()->through(function ($account) {
            // Get the correct name based on role
            $name = 'Unknown';
            if ($account->role === 'user' && $account->users_profiles) {
                $name = $account->users_profiles->user_name;
            } elseif ($account->role === 'institute' && $account->institute) {
                $name = $account->institute->institute_name;
            }

            return [
                'id' => $account->account_id,
                'name' => $name,
                'email' => $account->email,
                'status' => $account->is_active ? 'Aktif' : 'Blokir',
                'is_active' => $account->is_active,
                // Generate avatar based on name
                'avatar' => "https://ui-avatars.com/api/?name=" . urlencode($name) . "&background=random",
            ];
        });

        return Inertia::render('Admin/UserManage', [
            'users' => $users,
            'filters' => $request->only(['search', 'tab']),
        ]);
    }

    public function toggleStatus(Account $account)
    {
        $account->update([
            'is_active' => ! $account->is_active
        ]);

        return redirect()->back();
    }

    public function resetPassword(Account $account)
    {
        $account->update([
            'password' => Hash::make('password123')
        ]);

        return redirect()->back()->with('success', 'Password reset successfully.');
    }
}