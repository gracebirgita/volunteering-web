<?php

namespace App\Http\Controllers;

use App\Models\Event;
use App\Models\Institute;
use Illuminate\Http\Request;

class EventController extends Controller
{
    // GET /events
    public function index()
    {
        $events = Event::with('institute')
            ->orderBy('start_date', 'asc')
            ->get();

        return view('events.index', compact('events'));
    }

    // GET /events/{event}
    public function show(Event $event)
    {
        $event->load('institute');

        return view('events.show', compact('event'));
    }

    // GET /events/create (khusus org_admin)
    public function create()
    {
        $institutes = Institute::all();

        return view('events.create', compact('institutes'));
    }

    // POST /events  (store BE)
    public function store(Request $request)
    {
        // validasi
        $data = $request->validate([
            'id_institute' => 'required|exists:institutes,id',
            'event_name'   => 'required|string|max:100',
            'description'  => 'nullable|string',
            'start_date'   => 'required|date',
            'finish_date'  => 'required|date|after_or_equal:start_date',
            'location'     => 'required|string|max:200',
            'quota'        => 'required|integer|min:1',
        ]);

        $event = Event::create($data);

        return redirect()->route('events.show', $event)
            ->with('success', 'Event created successfully.');
    }
}
