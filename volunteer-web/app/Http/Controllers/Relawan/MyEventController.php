<?php

namespace App\Http\Controllers\Relawan;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use App\Models\EventRegist;

class MyEventController extends Controller
{
    public function index(Request $request)
    {
        $user = Auth::user();
        
        // 1. Get the User's Profile ID (Since registrations are linked to Profile, not Account)
        $profile = $user->users_profiles; 

        if (!$profile) {
            // Edge case: User hasn't completed profile setup
            return redirect()->route('volunteer.settings'); 
        }

        // 2. Start Querying Registrations
        $query = EventRegist::query()
            ->with(['event.institute', 'event.category']) // Eager load for performance
            ->where('user_id', $profile->user_id);

        // 3. Handle Tabs (Mapping Indonesian UI to Database English/Enum)
        $tab = $request->input('tab', 'Semua');
        if ($tab !== 'Semua') {
            $statusMap = [
                'Diterima' => 'Accepted',
                'Pending'  => 'Pending',
                'Ditolak'  => 'Rejected'
            ];
            
            if (isset($statusMap[$tab])) {
                $query->where('regist_status', $statusMap[$tab]);
            }
        }

        // 4. Handle Search (Event Name OR Organizer Name)
        if ($search = $request->input('search')) {
            $query->whereHas('event', function ($q) use ($search) {
                $q->where('event_name', 'like', "%{$search}%")
                  ->orWhereHas('institute', function ($q2) use ($search) {
                      $q2->where('institute_name', 'like', "%{$search}%");
                  });
            });
        }

        // 5. Date Filter ---
        if ($date = $request->input('date')) {
            $query->whereHas('event', function ($q) use ($date) {
                $q->whereDate('event_start', '=', $date); 
            });
        }
    
        // 6. Fetch & Format
        $events = $query->latest('regist_date')
            ->paginate(9)
            ->withQueryString()
            ->through(function ($regist) {
                return [
                    'id' => $regist->event->event_id, // Link to event detail
                    'regist_id' => $regist->regist_id, // In case we need to cancel
                    'title' => $regist->event->event_name,
                    'category' => $regist->event->category->name ?? 'Umum',
                    'location' => $regist->event->event_location,
                    'date' => \Carbon\Carbon::parse($regist->event->event_start)->translatedFormat('d M Y'),
                    'image' => $regist->event->thumbnail ? '/storage/' . $regist->event->thumbnail : 'https://placehold.co/600x400',
                    'status' => strtolower($regist->regist_status), // 'accepted', 'pending', 'rejected'
                    'organizer' => $regist->event->institute->institute_name ?? 'Unknown',
                ];
            });

        return Inertia::render('Relawan/MyEvent', [
            'events' => $events,
            'filters' => $request->only(['search', 'tab']),
        ]);
    }
}