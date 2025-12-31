<?php

// lokasi di folder dashboard
namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;


class InstituteDashboardController extends Controller
{
    //
    public function index(){
        $account = auth()->user();
        $institute = $account->institute;

        if ($institute){
            $today = Carbon::today();
            $eventsQuery = $institute->events();

            $totalEvents = (clone $eventsQuery)->count();

            $totalVolunteers = (clone $eventsQuery)
                ->join('events_regists', 'events.event_id', '=', 'events_regists.event_id')
                ->distinct('events_regists.user_id')
                ->count('events_regists.user_id');

            $ongoingEvents = (clone $eventsQuery)
                ->whereDate('event_start', '<=', $today)
                ->whereDate('event_finish', '>=', $today)
                ->count();

            $upcomingEvents = (clone $eventsQuery)
                ->whereDate('event_start', '>', $today)
                ->count();

            $pendingApprovals = (clone $eventsQuery)
                ->join('events_regists', 'events.event_id', '=', 'events_regists.event_id')
                ->where('events_regists.regist_status', 'pending')
                ->count();
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
                    'event_quota'
                ]);

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
                    'event_quota'
                ]);
        }else{
            $totalEvents = 0;
            $totalVolunteers = 0;
            $ongoingEvents = 0;
            $upcomingEvents = 0;
            $pendingApprovals = 0;
            $ongoingList = [];
            $upcomingList = [];
        }
        return inertia('Dashboard/Institute',[
            'institute'=> $account->institute,
            'stats' => [
                'totalEvents' => $totalEvents,
                'totalVolunteers' => $totalVolunteers,
                'ongoingEvents' => $ongoingEvents,
                'upcomingEvents' => $upcomingEvents,
                'pendingApprovals' => $pendingApprovals,
            ],
            'ongoingList' => $ongoingList,
            'upcomingList' => $upcomingList,
        ]);
    }
}
