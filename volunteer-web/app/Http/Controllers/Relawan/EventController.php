<?php

namespace App\Http\Controllers\Relawan;

use Illuminate\Http\Request;

// add
use App\Models\Event;
use App\Models\Institute;
use Inertia\Inertia;
use Inertia\Response;
use App\Http\Controllers\Controller;

class EventController extends Controller
{

    public function index(Request $request): Response{
        // dd($events->toArray());
        $search = $request->input('search');

        // fitur filter by
        $institute_cat =$request->institute_cat;
        $institute=$request->institute;
        $location=$request->location;
        $status=$request->status;
        $date=$request->input('date');

        $events = Event::with('institute')
            // hitung relawan ACCEPTED
            ->withCount(['registrations as accepted_count' => function($query){
                $query->where('regist_status', 'Accepted');
            }])

            // search bar
            ->when($search, function($query, $search){
                $query->where('event_name', 'like', "%{$search}%")
                    ->orWhere('event_location', 'like', "%{$search}%");
            })

            // filter by
            ->when($institute_cat, function($q, $institute_cat){
                $q->whereHas('institute', fn($sub)=>
                    $sub->where('institute_category', $institute_cat)
                );
            })
            ->when($institute, function($q, $institute){
                $q->whereHas('institute', fn($sub)=>
                    $sub->where('institute_name', $institute)
                );
            })

            ->when($status, fn($q)=>
                $q->where('event_status', $status)
            )
            ->when($location, fn($q)=>
                $q->where('event_location', $location)
            )
            ->when($date, fn($q)=>
                $q->whereDate('event_start', $date)
            )

            // get order by event start
            ->orderBy('event_start')
            ->get()
            ->map(function ($event) {
                $quota = (int) $event->event_quota;
                $accepted = (int) $event->accepted_count;
                $remaining = $quota -$accepted;
                
                $isFull = ($quota > 0) && ($remaining <= 0);
                
                return [
                    'event_id' => $event->event_id,
                    'event_name' => $event->event_name,
                    'event_location' => $event->event_location,
                    'event_description' => $event->event_description,
                    'event_start' => $event->event_start,
                    'event_finish' => $event->event_finish,
                    'event_quota' => $event->event_quota, 
                    'event_status' => $event->event_status,

                    // remaining quota
                    'quota_remaining'=>$remaining,
                    'is_full'=>$isFull, //tanda relawan event full capacity
                    'display_quota'=> $isFull ? 'Full' : 'Slot relawan tersedia : '.$remaining,
                    'institute' => [
                        'institute_name' => $event->institute->institute_name,
                        'institute_category' => $event->institute->institute_category,
                    ],
                    // utk show di card event
                ];
            });
        
        return Inertia::render('Relawan/ExploreEvent',[
                'events'=>$events,
                // search bar filter
                // 'filters'=>[
                //     'search'=>$search,
                // ],

                // dropdown filter
                'categories' => Institute::select('institute_category')
                    ->where('institute_category', '!=', '')
                    ->distinct()->orderBy('institute_category', 'asc')
                    ->pluck('institute_category'),

                'institutes' => Institute::select('institute_name')
                    ->distinct()->pluck('institute_name'),

                'locations' => Event::select('event_location')
                    ->distinct()->pluck('event_location'),
                
                'status'=>Event::select('event_status')
                    ->distinct()->pluck('event_status'),

                // search bar filter
                'filters' => $request->only([
                    'search', 'category', 'organization', 'location', 'date', 'status'
                ]),
            ]);
    }


    // SHOW DETAIL EVENT
    // get event
    public function show(Event $event){
        $event->load([
            'institute.account',
            'registrations.userProfile' //relawan terdaftar
        ]);
        // jml accepted 1 event
        $acceptedCount = $event->registrations->where('regist_status', 'Accepted')->count();
        $remaining=$event->event_quota - $acceptedCount;

        // get user yang sedang login
        $user = auth()->user();
        // get data regist user yg login
        $userRegistration = $event->registrations()
            ->where('user_id', $user->users_profiles->user_id)
            ->first();
        
        $profile = $user->users_profiles;

        // Cek apakah data kritikal sudah diisi (bukan tanda hubung)
        $isProfileComplete = $profile && 
                            $profile->user_phone !== '-' && 
                            $profile->user_domicile !== '-';


        return Inertia::render('Relawan/EventDetail',[
            'event'=>[
                'id' => $event->event_id,
                'name' => $event->event_name,
                'description' => $event->event_description,
                'location' => $event->event_location,
                'start' => $event->event_start,
                'finish' => $event->event_finish,
                'status' => $event->event_status,
                'quota'=>$event->event_quota,

                // remaining relawan quota
                'quota_remaining'=>$remaining,
                'is_full'=> $remaining <=0,
            ],
            'institute'=>[
                'name' => $event->institute->institute_name,
                'category' => $event->institute->institute_category,

                // get email dr table account
                'email' => $event->institute->account->email ?? '-',
                'phone' => $event->institute->institute_phone,
                'pic' => $event->institute->institute_pic_name,
                // 'bio' => $event->institute->bio ?? '-',
            ],
            'volunteers'=>$event->registrations->map(fn ($r)=>[
                    'name'=>$r->userProfile->user_name ?? '-',
                    'status'=>$r->regist_status,
            ])->values(),

            // regist Jadi Relawan
            'isRegistered' => (bool) $userRegistration,
            'isProfileComplete' => $isProfileComplete,
            'isAccepted'   => $userRegistration?->regist_status === 'Accepted',
            'isRejected'   => $userRegistration?->regist_status === 'Rejected',
            'registStatus' => $userRegistration?->regist_status,

        ]);
    }


     // show status daftar event user
    // public function show(Event $event)
    // {
    //     // get user yang sedang login
    //     $userId = auth()->id();

    //     // get data regist user yg login
    //     $userRegistration = $event->registrations()
    //         ->where('user_id', $userId)
    //         ->first();

    //     return Inertia::render('Relawan/EventDetail', [
    //         'event' => [
    //             'id' => $event->event_id,
    //             'name' => $event->event_name,
    //         ],

    //         'isRegistered' => (bool) $userRegistration,

    //         'isAccepted'   => $userRegistration && $userRegistration->status === 'Accepted',
    //         'isRejected'   => $userRegistration && $userRegistration->status === 'Rejected',

    //         // send status regist
    //         'registStatus'=> $userRegistration->status ?? null,
    //     ]);
    // }
}
