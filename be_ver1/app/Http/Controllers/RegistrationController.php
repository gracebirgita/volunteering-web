<?php

namespace App\Http\Controllers;

use App\Models\Event;
use App\Models\User;
use Illuminate\Http\Request;

class RegistrationController extends Controller
{
    public function store(Event $event, Request $request)
    {
        // pastikan user login
        if (!session('logged_in')) {
            return redirect('/login')->with('error', 'Please login first');
        }

        $user = User::findOrFail(session('user_id'));

        // cek pernah daftar ga
        if ($user->registeredEvents()->where('events.id', $event->id)->exists()) {
            return back()->with('error', 'You already registered for this event.');
        }

        $user->registeredEvents()->attach($event->id, [
            'regist_date'   => now(),
            'regist_status' => 'terdaftar',
        ]);

        return back()->with('success', 'Registered successfully.');
    }
}
