<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\Event;
use App\Models\EventRegistration;
use App\Models\EventAttendance;

class UserDashboardController extends Controller
{
    public function index()
    {
        // 1. Ambil account
        $account = auth()->user();

        // 2. Ambil user profile dari relasi
        $userProfile = $account->users_profiles;

        if (!$userProfile) {
            abort(403, 'User profile not found');
        }

        // 3. Event aktif
        $events = Event::with('institute')
            ->where('event_status', 'active')
            ->whereDate('event_start', '>=', now())
            ->orderBy('event_start')
            ->take(12)
            ->get()
            ->map(function ($event) use ($userProfile) {
                return [
                    'event_id'       => $event->event_id,
                    'event_name'     => $event->event_name,
                    'event_start'    => $event->event_start,
                    'event_organizer' => $event->institute?->institute_name,
                    'event_status' => $event->event_status,
                    'event_description' => $event->event_description,
                    'event_location' => $event->event_location,
                    'category'      => $event->category,
                    'thumbnail'      => $event->thumbnail,
                    'quota'          => $event->quota,
                    'registered'     => $event->registrations()
                        ->where('user_id', $userProfile->user_id)
                        ->exists(),
                    'image_url' => event_image_url($event),
                ];
            });

        // 4. Statistik
        $stats = [
            'total_events' => EventRegistration::where('user_id', $userProfile->user_id)
                ->where('status', 'approved')
                ->count(),

            'total_hours' => EventAttendance::whereHas('registration', function ($q) use ($userProfile) {
                    $q->where('user_id', $userProfile->user_id)
                      ->where('status', 'approved');
                })
                ->selectRaw('SUM(TIMESTAMPDIFF(HOUR, check_in, check_out)) as total')
                ->value('total') ?? 0,

            'total_certificates' => EventRegistration::where('user_id', $userProfile->user_id)
                ->where('status', 'approved')
                ->count(),
        ];

       
        return inertia('Dashboard/User', [
            'events' => $events,
            'stats'  => $stats,
            'profileUser' => [
                'user_name' => $userProfile->user_name,
                'avatar_url' => profile_image_url($userProfile),
            ],
        ]);
    }
}
