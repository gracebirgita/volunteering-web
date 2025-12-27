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
    //  $table->id('event_id');
    //         $table->foreignId('institute_id')->constrained('institutes', 'institute_id')->cascadeOnDelete(); //FK
    //         $table->string('event_name', 100);
    //         $table->text('event_description');
    //         $table->date('event_start');
    //         $table->date('event_finish');
    //         $table->string('event_location', 255);
    //         $table->string('event_status', 20);
    //         $table->integer('event_quota')->default(0);
    //         $table->timestamps();
    public function index(Request $request): Response{
        // dd($events->toArray());
        $search = $request->input('search');

        // fitur filter by
        $institute_cat =$request->institute_cat;
        $institute=$request->institute;
        $location=$request->location;
        $date=$request->input('date');

        $events = Event::with('institute')
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

            ->when($location, fn($q)=>
                $q->where('event_location', $location)
            )
            ->when($date, fn($q)=>
                $q->whereDate('event_start', $date)
            )

            // get order by event start
            ->orderBy('event_start')
            ->get();
        
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

                // search bar folter
                'filters' => $request->only([
                    'search', 'category', 'organization', 'location', 'date'
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

        // get user yang sedang login
        $userId = auth()->id();
        // get data regist user yg login
        $userRegistration = $event->registrations()
            ->where('user_id', $userId)
            ->first();

        return Inertia::render('Relawan/EventDetail',[
            'event'=>[
                'id' => $event->event_id,
                'name' => $event->event_name,
                'description' => $event->event_description,
                'location' => $event->event_location,
                'start' => $event->event_start,
                'finish' => $event->event_finish,
                'status' => $event->event_status,
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
