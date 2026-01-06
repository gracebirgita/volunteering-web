<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Faker\Factory as Faker;
use Carbon\Carbon;

class EventAttendancesSeeder extends Seeder
{
    public function run(): void
    {
        $faker = Faker::create('id_ID');

        // Ambil hanya registration yang APPROVED
        $registrations = DB::table('event_registrations')
            ->where('status', 'Accepted')
            ->get(['registration_id', 'event_id']);

        foreach ($registrations as $registration) {

            // 1–3 hari absensi per registration (dummy)
            $totalDays = rand(1, 3);

            for ($i = 0; $i < $totalDays; $i++) {

                $attendanceDate = Carbon::now()->subDays(rand(0, 7))->toDateString();

                // Prevent duplicate attendance per date
                $exists = DB::table('event_attendances')
                    ->where('registration_id', $registration->registration_id)
                    ->where('attendance_date', $attendanceDate)
                    ->exists();

                if ($exists) {
                    continue;
                }

                $checkIn  = Carbon::parse($attendanceDate.' 08:00')
                    ->addMinutes(rand(0, 30));
                $checkOut = (clone $checkIn)->addHours(rand(4, 8));

                DB::table('event_attendances')->insert([
                    'registration_id' => $registration->registration_id,
                    'attendance_date' => $attendanceDate,
                    'check_in'        => $checkIn->format('H:i:s'),
                    'check_out'       => $checkOut->format('H:i:s'),
                    'is_present'      => true,
                    'created_at'      => now(),
                    'updated_at'      => now(),
                ]);
            }
        }
    }
}
