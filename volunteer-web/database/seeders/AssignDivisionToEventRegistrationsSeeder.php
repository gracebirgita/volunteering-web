<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\EventDivision;
use App\Models\EventRegistration;

class AssignDivisionToEventRegistrationsSeeder extends Seeder
{
    public function run(): void
    {
        // Ambil semua division (group by event)
        $divisionsByEvent = EventDivision::all()
            ->groupBy('event_id');

        if ($divisionsByEvent->isEmpty()) {
            $this->command->warn('❌ Tidak ada event divisions. Seeder dilewati.');
            return;
        }

        EventRegistration::whereNull('division_id')
            ->get()
            ->each(function ($registration) use ($divisionsByEvent) {

                $eventId = $registration->event_id;

                // Pastikan event punya division
                if (! isset($divisionsByEvent[$eventId])) {
                    return;
                }

                $division = $divisionsByEvent[$eventId]->random();

                $registration->update([
                    'division_id' => $division->division_id,
                ]);
            });

        $this->command->info('✅ Division berhasil di-assign ke event registrations.');
    }
}
