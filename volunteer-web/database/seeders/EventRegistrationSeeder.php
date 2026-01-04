<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

// add
use Illuminate\Support\Facades\DB;
use Faker\Factory as Faker;

class EventRegistrationSeeder extends Seeder
{
    public function run(): void
    {
        $faker = Faker::create('id_ID');

        $users  = DB::table('users_profiles')->pluck('user_id');
        $events = DB::table('events')->pluck('event_id');

        foreach ($users as $userId) {
            // 1–4 event per user (dummy data)
            $eventSample = $events->random(rand(1, min(4, $events->count())));

            foreach ($eventSample as $eventId) {

                // prevent duplicate (important even for seeder)
                $exists = DB::table('event_registrations')
                    ->where('user_id', $userId)
                    ->where('event_id', $eventId)
                    ->exists();

                if ($exists) {
                    continue;
                }

                DB::table('event_registrations')->insert([
                    'user_id'    => $userId,
                    'event_id'   => $eventId,
                    'status'     => $faker->randomElement([
                        'Pending',
                        'Accepted',
                        'Rejected',
                    ]),
                    'created_at'=> now(),
                    'updated_at'=> now(),
                ]);
            }
        }
    }
}

