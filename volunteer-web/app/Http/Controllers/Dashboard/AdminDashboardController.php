<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Account;
use App\Models\Event;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class AdminDashboardController extends Controller
{
    public function index()
    {
        // 1. Basic Counts
        $totalUsers = Account::where('role', 'user')->count();
        $totalInstitutes = Account::where('role', 'institute')->count();
        $totalEvents = Event::count();

        // 2. Total Volunteer Hours Logic
        // Sum of (Event Duration) for all 'Accepted' registrations in 'finished' events
        $totalHours = DB::table('events_regists')
            ->join('events', 'events_registrations.event_id', '=', 'events.event_id')
            ->where('events_regists.regist_status', 'Accepted') // Matches schema Enum
            ->where('events.event_status', 'finished')          // Matches schema Enum
            ->selectRaw('SUM(TIMESTAMPDIFF(HOUR, events.event_start, events.event_finish)) as total_hours')
            ->value('total_hours');

        // 3. Chart Data: Registrations per Week (Last 8 Weeks)
        $chartData = Account::selectRaw('YEARWEEK(created_at) as week_num, COUNT(*) as count')
            ->where('created_at', '>=', Carbon::now()->subWeeks(8))
            ->groupBy('week_num')
            ->orderBy('week_num', 'asc')
            ->get()
            ->map(function ($item, $index) {
                return [
                    'week' => 'Week ' . ($index + 1),
                    'registrations' => $item->count
                ];
            });

        // 4. Get Admin Name
        $user = auth()->user();
        $adminName = $user->admin ? $user->admin->admin_name : 'Super Admin';

        return Inertia::render('Dashboard/Admin', [ 
            'auth' => [
                'user' => $user
            ],
            'stats' => [
                'total_users' => $totalUsers,
                'total_institutes' => $totalInstitutes,
                'total_events' => $totalEvents,
                'total_hours' => (int) $totalHours ?? 0,
            ],
            'chartData' => $chartData,
            'adminName' => $adminName,
        ]);
    }
}