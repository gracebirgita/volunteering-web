<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Event;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class InstituteEventController extends Controller
{
    // STORE EVENT
    public function store(Request $request)
    {
        $account = auth()->user();
        if (!$account || !$account->isInstitute()) abort(403);

        $institute = $account->institute;
        if (!$institute) abort(404, 'Institute not found');

        $data = $request->validate([
            'event_name'              => 'required|string|max:255',
            'event_description'       => 'required|string',
            'category'                => 'required|in:Lingkungan,Sosial,Pendidikan,Kesehatan ',
            'thumbnail'               => 'nullable|image|max:2048',

            'event_start'             => 'required|date',
            'event_finish'            => 'required|date',
            'event_start_time'        => 'required',
            'event_end_time'          => 'required',

            'event_location'          => 'required|string|max:255',
            'address'                 => 'required|string',

            'quota'                   => 'required|integer|min:1',
            'registration_deadline'   => 'required|date',

            'benefit_consumption'     => 'boolean',
            'benefit_certificate'     => 'boolean',
            'benefit_jam_volunt'      => 'boolean',

            'contact_person'          => 'nullable|string|max:50',
            'group_link'              => 'nullable|string',
            'event_status'            => 'required|in:active,closed',
        ]);

        // upload thumbnail
        if ($request->hasFile('thumbnail')) {
            $data['thumbnail'] = $request->file('thumbnail')
                ->store('events', 'public');
        }

        $data['institute_id'] = $institute->institute_id;

        Event::create($data);

        return redirect()
            ->route('institute.events.index')
            ->with('success', 'Event berhasil dibuat');
    }

    // UPDATE EVENT
    public function update(Request $request, Event $event)
    {
        $account = auth()->user();
        if (!$account || !$account->isInstitute()) abort(403);

        if ($event->institute_id !== $account->institute->institute_id) {
            abort(403);
        }

        $data = $request->validate([
            'event_name'              => 'required|string|max:255',
            'event_description'       => 'required|string',
            'category'                => 'required|in:Lingkungan,Sosial,Pendidikan,Kesehatan ',
            'thumbnail'               => 'nullable|image|max:2048',

            'event_start'             => 'required|date',
            'event_finish'            => 'required|date',
            'event_start_time'        => 'required',
            'event_end_time'          => 'required',

            'event_location'          => 'required|string|max:255',
            'address'                 => 'required|string',

            'quota'                   => 'required|integer|min:1',
            'registration_deadline'   => 'required|date',

            'benefit_consumption'     => 'boolean',
            'benefit_certificate'     => 'boolean',
            'benefit_jam_volunt'      => 'boolean',

            'contact_person'          => 'nullable|string|max:50',
            'group_link'              => 'nullable|string',
            'event_status'            => 'required|in:active,closed',
        ]);

        if ($request->hasFile('thumbnail')) {
            if ($event->thumbnail) {
                Storage::disk('public')->delete($event->thumbnail);
            }

            $data['thumbnail'] = $request->file('thumbnail')
                ->store('events', 'public');
        }

        $event->update($data);

        return back()->with('success', 'Event berhasil diperbarui');
    }
}
