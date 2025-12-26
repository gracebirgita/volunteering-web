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
        $date=$request->date;

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
                    ->distinct()->pluck('institute_category'),

                'institute' => Institute::select('institute_name')
                    ->distinct()->pluck('institute_name'),

                'locations' => Event::select('event_location')
                    ->distinct()->pluck('event_location'),

                // search bar folter
                'filters' => $request->only([
                    'search', 'category', 'organization', 'location', 'date'
                ]),
            ]);
        
            
    }
}
