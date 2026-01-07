<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Event;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class InstituteEventController extends Controller
{
    public function create()
    {
        // Fetch all active categories
        $categories = Category::where('is_active', true)->get();

        return inertia('Institute/CreateEvent', [
            'categories' => $categories
        ]);
    }

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
            'category_id'                => 'required|exists:categories,category_id',
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
            'other_benefit'           => 'nullable|string|max:100',

            // 'divisions'     => 'required|array', // Validasi array divisions
            // 'divisions.*.name'   => 'required|string',
            // 'divisions.*.amount' => 'required|integer|min:1',
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

        return redirect()->back()->with('success', 'Event berhasil dibuat');
    }

    public function index(Request $request)
    {
        $account = auth()->user();
        if (!$account || !$account->isInstitute()) abort(403);

        $institute = $account->institute;
        if (!$institute) abort(404, 'Institute not found');

        // ambil keyword search kalau ada
        $search = $request->input('search');

        $events = Event::where('institute_id', $institute->institute_id)
                    //filter kalau ada search
                    ->when($search, function ($query, $search) {
                        return $query->where('event_name', 'like', "%{$search}%");
                    })
                    ->latest()
                    ->get();

        return inertia('Institute/OrganizeEvent', [
            'events' => $events,
            'filters' => $request->only(['search']) 
        ]);
    }

    // UPDATE EVENT
    public function update(Request $request, Event $event)
    {
        $account = auth()->user();
        // Pastikan hanya pemilik event (institute tersebut) yang bisa edit
        if (!$account || $event->institute_id !== $account->institute->institute_id) {
            abort(403, 'Unauthorized action.');
        }

        $data = $request->validate([
            'event_name'            => 'required|string|max:255',
            'event_description'     => 'required|string',
            'category_id'              => 'required|exists:categories,category_id',
            'thumbnail'             => 'nullable|image|max:2048',
            'event_start'           => 'required|date',
            'event_finish'          => 'required|date',
            'event_start_time'      => 'required',
            'event_end_time'        => 'required',
            'event_location'        => 'required|string|max:255',
            'address'               => 'required|string',
            'quota'           => 'required|integer|min:1',
            'registration_deadline' => 'required|date',
            'benefit_consumption'   => 'boolean',
            'benefit_certificate'   => 'boolean',
            'benefit_jam_volunt'    => 'boolean',
            'other_benefit'         => 'nullable|string|max:100',
            'contact_person'        => 'nullable|string|max:50',
            // 'divisions'     => 'required|array', // Validasi array divisions
            // 'divisions.*.name'   => 'required|string',
            // 'divisions.*.amount' => 'required|integer|min:1',
            'group_link'            => 'nullable|string',
            'event_status'          => 'required|in:active,closed',
        ]);

        // Update thumbnail jika ada file baru
        if ($request->hasFile('thumbnail')) {
            // Hapus foto lama jika ada
            if ($event->thumbnail) {
                Storage::disk('public')->delete($event->thumbnail);
            }

            $data['thumbnail'] = $request->file('thumbnail')->store('events', 'public');
        }else{
            unset($data['thumbnail']);
        }

        $event->update($data);

        // kembali ke  list 
        return redirect()->route('institute.organize')->with('success', 'Event berhasil diperbarui');
    }
}
