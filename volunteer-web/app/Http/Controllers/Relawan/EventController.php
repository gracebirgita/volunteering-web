<?php

namespace App\Http\Controllers\Relawan;

use App\Http\Controllers\Controller;
use App\Models\Event;
use App\Models\Institute;
use App\Models\Category;
use App\Models\EventRegistration;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class EventController extends Controller
{
    /**
     * =========================
     * EXPLORE EVENT (LIST)
     * =========================
     */
    public function index(Request $request): Response
    {
        $filters = $request->only([
            'search',
            'category',
            'institute',
            'location',
            'status',
            'date',
        ]);

        /**
         * BASE QUERY
         * - Selalu load relasi yang dipakai
         */
        $baseQuery = Event::with(['institute', 'category'])
            ->when($filters['search'] ?? null, function ($q, $search) {
                $q->where(function ($sub) use ($search) {
                    $sub->where('event_name', 'like', "%{$search}%")
                        ->orWhere('event_location', 'like', "%{$search}%");
                });
            })
            ->when($filters['institute'] ?? null, function ($q, $inst) {
                $q->whereHas('institute', function ($sub) use ($inst) {
                    $sub->where('institute_name', $inst);
                });
            })
            ->when($filters['location'] ?? null, fn ($q, $loc) =>
                $q->where('event_location', $loc)
            )
            ->when($filters['status'] ?? null, fn ($q, $status) =>
                $q->where('event_status', $status)
            )
            ->when($filters['date'] ?? null, fn ($q, $date) =>
                $q->whereDate('event_start', $date)
            )
            ->when($filters['category'] ?? null, function ($q, $cat) {
                $q->whereHas('category', function ($sub) use ($cat) {
                    $sub->where('slug', $cat);
                });
            });

        /**
         * EVENTS (PAGINATED)
         */
        $events = (clone $baseQuery)
            ->withCount([
                'registrations as accepted_count' => fn ($q) =>
                    $q->where('regist_status', 'Accepted')
            ])
            ->orderBy('event_start')
            ->paginate(6)
            ->withQueryString()
            ->through(function (Event $event) {
                $remaining = max(0, $event->quota - $event->accepted_count);

                return [
                    'event_id'          => $event->event_id,
                    'event_name'        => $event->event_name,
                    'category' => $event->category ? [
                        'name'  => $event->category->name,
                        'slug'  => $event->category->slug,
                        'color' => $event->category->color,
                    ] : null,
                    'event_location'    => $event->event_location,
                    'event_description' => $event->event_description,
                    'event_start'       => $event->event_start,
                    'event_finish'      => $event->event_finish,
                    'event_status'      => $event->event_status,
                    'address'           => $event->address,
                    'thumbnail'         => $event->thumbnail,
                    'event_organizer'   => $event->institute?->institute_name,
                    'image_url'         => event_image_url($event),

                    // optional
                    'quota_remaining'   => $remaining,
                    'is_full'           => $remaining <= 0,
                ];
            });

        /**
         * CATEGORY COUNTS (UNTUK FILTER)
         */
        $categoryCounts = (clone $baseQuery)
            ->whereHas('category')
            ->join('categories', 'events.category_id', '=', 'categories.category_id')
            ->selectRaw('categories.slug as slug, COUNT(*) as total')
            ->groupBy('categories.slug')
             ->pluck('total', 'slug');

        $user    = auth()->user();
        $profile = $user?->profile;

        return Inertia::render('Relawan/ExploreEvent', [
            'events' => $events,

            'profileUser' => $profile ? [
                'user_name'  => $profile->user_name,
                'avatar_url' => profile_image_url($profile),
            ] : null,

            // FILTER OPTIONS
            'categories' => Category::orderBy('name')->get([
                'category_id',
                'name',
                'slug',
                'color',
            ]),

            'categoryCounts' => $categoryCounts,

            'institutes' => Institute::orderBy('institute_name')
                ->pluck('institute_name'),

            'locations' => Event::select('event_location')
                ->distinct()
                ->orderBy('event_location')
                ->pluck('event_location'),

            'status' => Event::select('event_status')
                ->distinct()
                ->pluck('event_status'),

            'filters' => $filters,
        ]);
    }

    /**
     * =========================
     * EVENT DETAIL
     * =========================
     */
    public function show(Event $event): Response
    {
        $event->load([
            'category',
            'institute.account',
            'registrations.userProfile',
            'registrations.division',
            'agendas',
            'divisions',
        ]);

        $accepted  = $event->registrations
            ->where('regist_status', 'Accepted')
            ->count();

        $remaining = max(0, $event->quota - $accepted);

        $user    = auth()->user();
        $profile = $user?->profile;

        $userRegistration = $event->registrations()
            ->where('profile_id', $profile?->profile_id)
            ->first();

        $usedPerDivision = EventRegistration::where('event_id', $event->event_id)
            ->where('regist_status', 'Accepted')
            ->selectRaw('division_id, COUNT(*) as total')
            ->groupBy('division_id')
            ->pluck('total', 'division_id');

        $isProfileComplete = $profile &&
            $profile->user_phone !== '-' &&
            $profile->user_domicile !== '-';

        return Inertia::render('Relawan/EventDetail', [
            'event' => [
                'id'          => $event->event_id,
                'name'        => $event->event_name,
                'description' => $event->event_description,
                'category' => $event->category ? [
                    'id'    => $event->category->category_id,
                    'name'  => $event->category->name,
                    'slug'  => $event->category->slug,
                    'color' => $event->category->color,
                ] : null,
                'location'    => $event->event_location,
                'start_date'  => $event->event_start,
                'end_date'    => $event->event_finish,
                'start_time'  => $event->event_start_time,
                'end_time'    => $event->event_end_time,
                'status'      => $event->event_status,
                'quota'       => $event->quota,
                'image_url'   => event_image_url($event),

                'benefit_consumption' => $event->benefit_consumption,
                'benefit_certificate' => $event->benefit_certificate,
                'benefit_hour_volunt' => $event->benefit_jam_volunt,

                'quota_remaining' => $remaining,
                'is_full'         => $remaining <= 0,

                'agendas' => $event->agendas->map(fn ($a) => [
                    'agenda_id'          => $a->id,
                    'agenda_start_time'  => $a->start_time->format('H:i'),
                    'agenda_end_time'    => $a->end_time->format('H:i'),
                    'agenda_title'       => $a->title,
                    'agenda_description' => $a->description,
                ])->values(),
            ],

            'institute' => [
                'name'     => $event->institute->institute_name,
                'category' => $event->institute->institute_category,
                'email'    => $event->institute->account->email ?? '-',
                'phone'    => $event->institute->institute_phone,
                'pic'      => $event->institute->institute_pic_name,
            ],

            'volunteers' => $event->registrations->map(fn ($r) => [
                'name'   => $r->userProfile?->user_name ?? '-',
                'avatar' => $r->userProfile
                    ? profile_image_url($r->userProfile)
                    : asset('images/avatar-placeholder.png'),
                'division' => $r->division->name ?? '-',
                'status'   => $r->regist_status,
            ])->values(),

            'divisions' => $event->divisions->map(fn ($d) => [
                'division_id' => $d->division_id,
                'name'        => $d->name,
                'quota'       => $d->quota,
                'used'        => $usedPerDivision[$d->division_id] ?? 0,
            ])->values(),

            'isRegistered'      => (bool) $userRegistration,
            'isProfileComplete' => $isProfileComplete,
            'isAccepted'        => $userRegistration?->regist_status === 'Accepted',
            'isRejected'        => $userRegistration?->regist_status === 'Rejected',
            'registStatus'      => $userRegistration?->regist_status,
        ]);
    }
}
