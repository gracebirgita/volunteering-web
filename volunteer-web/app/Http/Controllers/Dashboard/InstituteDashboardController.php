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

        // total event yang dibuat
        $totalEvents = (clone $eventsQuery)->count();

        // jumlah pendaftar unik
        $totalVolunteers = (clone $eventsQuery)
            ->join('events_registrations', 'events.event_id', '=', 'events_registrations.event_id')
            ->distinct('events_registrations.user_id')
            ->count('events_registrations.user_id');

        // pendaftar status pending
        $pendingApprovals = (clone $eventsQuery)
            ->join('events_registrations', 'events.event_id', '=', 'events_registrations.event_id')
            ->where('events_registrations.regist_status', 'Pending')
            ->whereDate('events.event_finish', '>', $today)
            ->count();

        // jumlah event aktif hari ini
        $ongoingEvents = (clone $eventsQuery)
            ->whereDate('event_start', '<=', $today)
            ->whereDate('event_finish', '>=', $today)
            ->count();

        // list event berlangsung & jumlah pendaftar per status
        $ongoingList = (clone $eventsQuery)
            ->whereDate('event_start', '<=', $today)
            ->whereDate('event_finish', '>=', $today)
            ->withCount([
                'registrations as total_pending' => function ($query) {
                    $query->where('regist_status', 'Pending');
                },
                'registrations as total_accepted' => function ($query) {
                    $query->where('regist_status', 'Accepted');
                },
                'registrations as total_rejected' => function ($query) {
                    $query->where('regist_status', 'Rejected');
                }
            ])
            ->orderBy('event_finish')
            ->get([
                'event_id',
                'event_name',
                'event_start',
                'event_finish',
                'event_location',
                'event_status',
                'event_description',
                'event_quota',
                'category',
            ]);

        // list event mendatang & jumlah pendaftar per status
        $upcomingList = (clone $eventsQuery)
            ->whereDate('event_start', '>', $today)
            ->withCount([
                'registrations as total_pending' => function ($query) {
                    $query->where('regist_status', 'Pending');
                },
                'registrations as total_accepted' => function ($query) {
                    $query->where('regist_status', 'Accepted');
                },
                'registrations as total_rejected' => function ($query) {
                    $query->where('regist_status', 'Rejected');
                }
            ])
            ->orderBy('event_start')
            ->get([
                'event_id',
                'event_name',
                'event_start',
                'event_finish',
                'event_location',
                'event_status',
                'event_description',
                'event_quota',
                'category',
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