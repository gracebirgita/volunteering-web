<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use Illuminate\Support\Carbon;

class InstituteDashboardController extends Controller
{
    public function index()
    {
        $account = auth()->user();
        $institute = $account->institute;

        if (!$institute) {
            return inertia('Dashboard/Institute', [
                'institute' => null,
                'stats' => [
                    'totalEvents' => 0,
                    'ongoingEvents' => 0,
                    'totalVolunteers' => 0,
                    'pendingApprovals' => 0,
                ],
                'ongoingList' => [],
                'upcomingList' => [],
            ]);
        }

        $today = Carbon::today();
        $eventsQuery = $institute->events();

        

        // total event pernah dibuat 
        $totalEvents = (clone $eventsQuery)->count();

        // total pendaftar unik ke semua event
        $totalVolunteers = (clone $eventsQuery)
            ->join('events_regists', 'events.event_id', '=', 'events_regists.event_id')
            ->distinct('events_regists.user_id')
            ->count('events_regists.user_id');

        // total pending approval (semua event, lama & baru)
        $pendingApprovals = (clone $eventsQuery)
            ->join('events_regists', 'events.event_id', '=', 'events_regists.event_id')
            ->where('events_regists.regist_status', 'Pending')
            ->whereDate('events.event_finish', '>', $today)
            ->count();

        // event yang sedang berlangsung
        $ongoingEvents = (clone $eventsQuery)
            ->whereDate('event_start', '<=', $today)
            ->whereDate('event_finish', '>=', $today)
            ->count();

        // event aktif 
        $ongoingList = (clone $eventsQuery)
            ->whereDate('event_start', '<=', $today)
            ->whereDate('event_finish', '>=', $today)
            ->orderBy('event_finish')
            ->limit(5)
            ->get([
                'event_id',
                'event_name',
                'event_start',
                'event_finish',
                'event_location',
                'event_status',
                'event_description',
                'event_quota',
            ]);

        // event yang akan datang
        $upcomingList = (clone $eventsQuery)
            ->whereDate('event_start', '>', $today)
            ->orderBy('event_start')
            ->limit(5)
            ->get([
                'event_id',
                'event_name',
                'event_start',
                'event_finish',
                'event_location',
                'event_status',
                'event_description',
                'event_quota',
            ]);

        return inertia('Dashboard/Institute', [
            'institute' => $institute,
            'stats' => [
                'totalEvents' => $totalEvents,
                'ongoingEvents' => $ongoingEvents,
                'totalVolunteers' => $totalVolunteers,
                'pendingApprovals' => $pendingApprovals,
            ],
            'ongoingList' => $ongoingList,
            'upcomingList' => $upcomingList,
        ]);
    }
}
