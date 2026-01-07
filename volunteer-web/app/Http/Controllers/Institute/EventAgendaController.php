<?php

namespace App\Http\Controllers\Institute;

use App\Http\Controllers\Controller;
use App\Models\Event;
use App\Models\EventAgenda;
use Illuminate\Http\Request;

class EventAgendaController extends Controller
{
    public function store(Request $request, Event $event)
    {
        // OPTIONAL: pastikan event milik institute ini
        // $this->authorize('update', $event);

        $request->validate([
            'agendas' => 'required|array',
            'agendas.*.start_time' => 'required',
            'agendas.*.end_time' => 'required',
            'agendas.*.title' => 'required|string|max:255',
            'agendas.*.description' => 'nullable|string',
        ]);

        // Reset agenda (MVP-friendly)
        $event->agendas()->delete();

        foreach ($request->agendas as $index => $agenda) {
            EventAgenda::create([
                'event_id' => $event->event_id,
                'start_time' => $agenda['start_time'],
                'end_time' => $agenda['end_time'],
                'title' => $agenda['title'],
                'description' => $agenda['description'] ?? null,
                'order' => $index + 1,
            ]);
        }

        return back()->with('success', 'Agenda berhasil disimpan');
    }
}

