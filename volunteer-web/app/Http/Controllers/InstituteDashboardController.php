<?php

namespace App\Http\Controllers;
use App\Models\Account;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;

class InstituteDashboardController extends Controller
{
    public function index()
    {   //DUMMY
        $account = Account::where('role', 'institute')->first();
        //$account = auth()->user();

        //pastiin role institute
        if (!$account || !$account->isInstitute()) {
            abort(403, 'Only institute can access this page.');
        }

        $institute = $account->institutes()->latest('institute_id')->first();
        if (!$institute) {
            return redirect('/')->withErrors(['institute' => 'Institute profile not found.']);
        }

        $today = Carbon::today();

        // semua event milik institute
        $eventsQuery = $institute->events(); 

        $totalEvents = (clone $eventsQuery)->count();

        // Total relawan yang mendaftar
        $totalVolunteers = (clone $eventsQuery)
            ->join('events_regists', 'events.event_id', '=', 'events_regists.event_id')
            ->distinct('events_regists.user_id')
            ->count('events_regists.user_id');

        // Event sedang berjalan
        $ongoingEvents = (clone $eventsQuery)
            ->whereDate('event_start', '<=', $today)
            ->whereDate('event_finish', '>=', $today)
            ->count();

        // Event akan datang
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
            ->get(['event_id','event_name','event_start','event_finish','event_location','event_status']);

        $upcomingList = (clone $eventsQuery)
            ->whereDate('event_start', '>', $today)
            ->orderBy('event_start')
            ->limit(5)
            ->get(['event_id','event_name','event_start','event_finish','event_location','event_status']);

        return view('institute.dashboard', compact(
            'institute',
            'totalEvents',
            'totalVolunteers',
            'ongoingEvents',
            'upcomingEvents',
            'pendingApprovals',
            'ongoingList',
            'upcomingList',
        ));
    }
}
