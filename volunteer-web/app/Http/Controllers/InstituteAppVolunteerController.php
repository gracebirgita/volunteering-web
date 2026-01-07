<?php

namespace App\Http\Controllers;

use App\Models\Event;
use App\Models\EventRegistration;
use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;

class InstituteAppVolunteerController extends Controller
{
    public function index(Request $request)
    {
        $account = auth()->user();
        if (!$account || !$account->isInstitute()) abort(403);

        $institute = $account->institute;
        if (!$institute) abort(404, 'Institute not found');

        $categories = Category::where('is_active', true)->get();

        $search = $request->input('search');

        $events = Event::where('institute_id', $institute->institute_id)
            ->with(['registrations.userProfile', 'category'])
            ->when($search, function ($query, $search) {
                return $query->where('event_name', 'like', "%{$search}%");
            })
            ->latest()
            ->get();

        return Inertia::render('Institute/AppVolunteer', [
            'events' => $events,
            'categories' => $categories,
            'filters' => $request->only(['search'])
        ]);
    }

   
    public function updateStatus(Request $request, $registration_id)
    {
        $request->validate([
            'status' => 'required|in:Accepted,Rejected,Pending',
        ]);

        // Ambil data pendaftaran beserta data event-nya
        $registration = EventRegistration::with('event')->where('registration_id', $registration_id)->firstOrFail();
        $event = $registration->event;

        $oldStatus = $registration->regist_status;
        $newStatus = $request->status;

        // status berubah dari TIDAK Accepted menjadi Accepted (Kuota berkurang)
        if ($oldStatus !== 'Accepted' && $newStatus === 'Accepted') {
            if ($event->quota <= 0) {
                return back()->withErrors(['error' => 'Kuota event sudah penuh!']);
            }
            $event->decrement('quota');
        }

        // status berubah dari Accepted menjadi yang lain (Kuota dikembalikan)
        if ($oldStatus === 'Accepted' && $newStatus !== 'Accepted') {
            $event->increment('quota');
        }

        // Update status pendaftaran
        $registration->update([
            'regist_status' => $newStatus
        ]);

        return back()->with('success', 'Status diperbarui dan kuota disesuaikan.');
    }
}
