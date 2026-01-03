<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

// add
use Illuminate\Support\Facades\DB;
use Faker\Factory as Faker;

class EventSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create('id_ID');

        $institutes = DB::table('institutes')->pluck('institute_id');

        $categories = [
            'Sosial',
            'Lingkungan',
            'Pendidikan',
            'Kesehatan',
        ];

        $start  = $faker->dateTimeBetween('-1 month', '+1 month');
        $finish = (clone $start)->modify('+'.rand(1, 5).' days');

        $registrationDeadline = (clone $start)->modify('-'.rand(1, 14).' days');

        foreach ($institutes as $instituteId) {
            $totalEvent = rand(3, 6);

            for ($i = 1; $i <= $totalEvent; $i++) {
                $start  = $faker->dateTimeBetween('-1 month', '+1 month');
                $finish = (clone $start)->modify('+'.rand(1, 5).' days');

                DB::table('events')->insert([
                    'institute_id'          => $instituteId,
                    'thumbnail'             => null,
                    'event_name'            => $faker->words(3, true),
                    'event_description'     => $faker->paragraph(3),
                    'category'              => $faker->randomElement($categories), 
                    'event_start'           => $start->format('Y-m-d'),
                    'event_finish'          => $finish->format('Y-m-d'),
                    'event_start_time'      => null,
                    'event_end_time'        => null,
                    'event_location'        => $faker->city(),
                    'address'               => $faker->address(),
                    'quota'                 => rand(10, 100),
                    'registration_deadline' => $registrationDeadline->format('Y-m-d'),
                    'benefit_consumption'   => $faker->boolean(),
                    'benefit_certificate'   => $faker->boolean(),
                    'benefit_jam_volunt'    => $faker->boolean(),
                    'contact_person'        => $faker->phoneNumber(),
                    'group_link'            => null,
                    'event_status'          => $faker->randomElement(['active', 'finished']),
                    'created_at'            => now(),
                    'updated_at'            => now(),
                ]);

            }
        }
    }
}
