<?php

namespace App\Http\Controllers\Relawan;

use App\Http\Controllers\Controller;
use App\Models\EventRegistration;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;


use App\Models\Institute;
use App\Models\Category;

class MyEventController extends Controller
{
    public function index(Request $request)
    {
        // 1. AUTH & PROFILE VALIDATION
        $user = Auth::user();
        $profile = $user->profile;

        // User wajib punya profile untuk melihat event
        if (!$profile) {
            return redirect()->route('volunteer.settings');
        }

        
        //2. BASE QUERY (EVENT REGISTRATIONS BY PROFILE)
        $query = EventRegistration::query()
            ->where('profile_id', $profile->profile_id)
            ->with([
                'event.institute',
                'event.category',
            ])

            ->when($request->input('category'), function ($q, $cat) {
                $q->whereHas('event.category', function ($sub) use ($cat) {
                    // Jika inst adalah nama organisasi:
                    $sub->where('slug', $cat); 
                });
            })
            ->when($request->input('institute'), function ($q, $inst) {
                $q->whereHas('event.institute', function ($sub) use ($inst) {
                    // Jika inst adalah nama organisasi:
                    $sub->where('institute_name', $inst); 
                });
            });


     
        // 3. TAB FILTER (UI → DATABASE STATUS MAPPING)

        $tab = $request->input('tab', 'Semua');

        if ($tab !== 'Semua') {
            $statusMap = [
                'Diterima' => 'Accepted',
                'Pending'  => 'Pending',
                'Ditolak'  => 'Rejected',
            ];

            if (array_key_exists($tab, $statusMap)) {
                $query->where('regist_status', $statusMap[$tab]);
            }
        }

        /**
         * 4. SEARCH FILTER
         * - Event Name
         * - Institute Name
        **/
        if ($search = $request->input('search')) {
            $query->whereHas('event', function ($eventQuery) use ($search) {
                $eventQuery
                    ->where('event_name', 'like', "%{$search}%")
                    ->orWhereHas('institute', function ($instituteQuery) use ($search) {
                        $instituteQuery->where('institute_name', 'like', "%{$search}%");
                    });
            });
        }

        //5. DATE FILTER (EVENT START DATE)
        if ($date = $request->input('date')) {
            $query->whereHas('event', function ($eventQuery) use ($date) {
                $eventQuery->whereDate('event_start', $date);
            });
        }

        //6. PAGINATION & DATA TRANSFORMATION (API CONTRACT)
        $events = $query
            ->latest('applied_at')
            ->paginate(9)
            ->withQueryString()
            ->through(function (EventRegistration $registration) {
                $event = $registration->event;

                return [
                    'event_id'        => $event->event_id,
                    'registration_id'=> $registration->regist_id,

                    'title'           => $event->event_name,
                    // 'category'        => $event->category->name ?? 'Umum',


                    'event_description' => $event->event_description,
                    'category' => $event->category ? [
                        'name'  => $event->category->name,
                        'slug'  => $event->category->slug,
                        'color' => $event->category->color,
                    ] : null,


                    'organizer'       => $event->institute->institute_name ?? 'Unknown',

                    'location'        => $event->event_location,
                    'date'            => \Carbon\Carbon::parse($event->event_start)
                                            ->translatedFormat('d M Y'),

                    'image' => event_image_url($event),

                    // accepted | pending | rejected
                    'status'          => strtolower($registration->regist_status),
                ];
            });

        $categories = Category::all(['name', 'slug']);
        $institutes = Institute::whereHas('events.registrations', function($q) use ($profile) {
            $q->where('profile_id', $profile->profile_id);
        })->pluck('institute_name'); 

        //7. RENDER INERTIA PAGE
        return Inertia::render('Relawan/MyEvent', [
            'events'  => $events,
            
            // dropdown filter
            'categories'=> $categories,
            'institutes'=>$institutes,

            'filters' => $request->only(['search', 'tab', 'date', 'category', 'institute']),
        ]);
    }
}
